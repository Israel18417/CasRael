import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import fs from "fs";
import path from "path";
import dns from "dns";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Prefer IPv4 for SMTP connections on networks where IPv6 is not reachable.
dns.setDefaultResultOrder("ipv4first");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "0.0.0.0";
const isProduction = process.env.NODE_ENV === "production";
const dataDir = path.join(__dirname, "data");
const dbFile = path.join(dataDir, "contacts.json");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { contacts: [] });
await db.read();

const app = express();
if (!isProduction) {
  app.use(cors());
}
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});
app.use(express.json({ limit: "10kb" }));

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const emailFrom = process.env.EMAIL_FROM || "CasRael <mycasreal@gmail.com>";
const emailTo = process.env.EMAIL_TO || "mycasreal@gmail.com";
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpAutoFallback = process.env.SMTP_AUTO_FALLBACK !== "false";

const createTransporter = (host, port, secure) =>
  nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

const verifyTransporter = async (transporter) => {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.warn(`SMTP verify failed (${transporter.options.host}:${transporter.options.port}):`, error.message || error);
    return false;
  }
};

let transporter = null;
if (smtpHost && smtpUser && smtpPass) {
  const primaryTransporter = createTransporter(smtpHost, smtpPort, smtpSecure);
  const primaryOk = await verifyTransporter(primaryTransporter);

  if (primaryOk) {
    transporter = primaryTransporter;
  } else if (smtpAutoFallback && smtpHost.includes("gmail.com") && smtpPort === 587 && !smtpSecure) {
    console.log("Attempting Gmail fallback to SMTPS on port 465...");
    const fallbackTransporter = createTransporter(smtpHost, 465, true);
    const fallbackOk = await verifyTransporter(fallbackTransporter);
    if (fallbackOk) {
      transporter = fallbackTransporter;
    }
  }

  if (transporter) {
    console.log(`SMTP transporter ready: ${transporter.options.host}:${transporter.options.port} (secure=${transporter.options.secure})`);
  } else {
    console.warn(
      "SMTP is configured but verification failed. Contact emails will not be sent until SMTP settings or network access are fixed."
    );
  }
} else {
  console.warn(
    "SMTP is not configured. Contact emails will not be sent through the server until SMTP_HOST, SMTP_USER, and SMTP_PASS are set in .env."
  );
}

const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60_000;
const RATE_LIMIT_MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 8);
const rateLimitMap = new Map();

const normalizeIp = (req) => req.ip || req.headers["x-forwarded-for"] || req.connection.remoteAddress || "unknown";

const rateLimiter = (req, res, next) => {
  const ip = normalizeIp(req);
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, firstRequestAt: now };

  if (now - entry.firstRequestAt > RATE_LIMIT_WINDOW_MS) {
    entry.count = 0;
    entry.firstRequestAt = now;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please wait and try again later.",
    });
  }

  next();
};

const sanitize = (value) =>
  typeof value === "string"
    ? value.replace(/<[^>]*>/g, "").trim()
    : "";

const isValidEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) =>
  typeof value === "string" && value.length <= 20 && /^[0-9()+\-\s]*$/.test(value);

const validateContactPayload = (req, res, next) => {
  const raw = req.body || {};
  const name = sanitize(raw.name);
  const email = sanitize(raw.email);
  const phone = sanitize(raw.phone);
  const message = sanitize(raw.message);

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (!message || message.length < 10 || message.length > 2000) {
    return res.status(400).json({
      error: "Message must be between 10 and 2000 characters.",
    });
  }

  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({ error: "Phone number contains invalid characters." });
  }

  req.body = { name, email, phone, message };
  next();
};

app.post("/api/contact", rateLimiter, validateContactPayload, async (req, res) => {
  const { name, email, phone, message } = req.body;

  const newContact = {
    id: Date.now(),
    name,
    email,
    phone: phone || "",
    message,
    createdAt: new Date().toISOString(),
  };

  db.data.contacts.unshift(newContact);
  await db.write();

  if (!transporter) {
    return res.status(500).json({
      error:
        "Email service is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.",
    });
  }

  try {
    await transporter.sendMail({
      from: emailFrom,
      to: emailTo,
      subject: `New message from ${name} via CasRael contact form`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br />")}</p>`,
    });

    res.json({ success: true, contact: newContact });
  } catch (sendError) {
    console.error("sendMail error:", sendError);
    console.error("sendMail response:", sendError.response || sendError.responseCode || sendError.rejected);
    res.status(500).json({
      error: "Failed to send email notification.",
      details: sendError.message || String(sendError),
    });
  }
});

app.get("/api/contacts", async (_req, res) => {
  await db.read();
  res.json({ contacts: db.data.contacts.slice(0, 50) });
});

const distDir = path.join(__dirname, "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (
      req.method === "GET" &&
      !req.path.startsWith("/api") &&
      !req.path.startsWith("/assets") &&
      !req.path.startsWith("/favicon")
    ) {
      return res.sendFile(path.join(distDir, "index.html"));
    }
    next();
  });
}

app.use((err, req, res, next) => {
  if (err && err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request payload too large." });
  }
  next(err);
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Contact server listening on http://127.0.0.1:${PORT}`);
});
