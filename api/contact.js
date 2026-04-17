import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
    console.warn(
      `SMTP verify failed (${transporter.options.host}:${transporter.options.port}):`,
      error.message || error
    );
    return false;
  }
};

let cachedTransporter = null;

const initTransporter = async () => {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  if (!smtpHost || !smtpUser || !smtpPass) {
    return null;
  }

  const primaryTransporter = createTransporter(smtpHost, smtpPort, smtpSecure);
  const primaryOk = await verifyTransporter(primaryTransporter);

  if (primaryOk) {
    cachedTransporter = primaryTransporter;
    return cachedTransporter;
  }

  if (smtpAutoFallback && smtpHost.includes("gmail.com") && smtpPort === 587 && !smtpSecure) {
    const fallbackTransporter = createTransporter(smtpHost, 465, true);
    const fallbackOk = await verifyTransporter(fallbackTransporter);
    if (fallbackOk) {
      cachedTransporter = fallbackTransporter;
      return cachedTransporter;
    }
  }

  return null;
};

const sanitize = (value) =>
  typeof value === "string" ? value.replace(/<[^>]*>/g, "").trim() : "";

const isValidEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidPhone = (value) =>
  typeof value === "string" && value.length <= 20 && /^[0-9()+\-\s]*$/.test(value);

const validateContactPayload = ({ name, email, phone, message }) => {
  const sanitizedName = sanitize(name);
  const sanitizedEmail = sanitize(email);
  const sanitizedPhone = sanitize(phone || "");
  const sanitizedMessage = sanitize(message);

  if (!sanitizedName) {
    return { error: "Name is required." };
  }
  if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
    return { error: "A valid email address is required." };
  }
  if (!sanitizedMessage || sanitizedMessage.length < 10 || sanitizedMessage.length > 2000) {
    return {
      error: "Message must be between 10 and 2000 characters.",
    };
  }
  if (sanitizedPhone && !isValidPhone(sanitizedPhone)) {
    return { error: "Phone number contains invalid characters." };
  }

  return {
    data: {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
    },
  };
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!req.headers["content-type"]?.includes("application/json")) {
    return res.status(400).json({ error: "Content-Type must be application/json." });
  }

  const validation = validateContactPayload(req.body || {});
  if (validation.error) {
    return res.status(400).json({ error: validation.error });
  }

  const transporter = await initTransporter();
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
      subject: `New message from ${validation.data.name} via CasRael contact form`,
      text: `Name: ${validation.data.name}\nEmail: ${validation.data.email}\nPhone: ${validation.data.phone || "N/A"}\n\nMessage:\n${validation.data.message}`,
      html: `<p><strong>Name:</strong> ${validation.data.name}</p><p><strong>Email:</strong> ${validation.data.email}</p><p><strong>Phone:</strong> ${validation.data.phone || "N/A"}</p><p><strong>Message:</strong></p><p>${validation.data.message.replace(/\n/g, "<br />")}</p>`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("sendMail error:", error);
    return res.status(500).json({
      error: "Failed to send email notification.",
      details: error.message || String(error),
    });
  }
}
