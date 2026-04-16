import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const secure = process.env.SMTP_SECURE === 'true';

console.log({ smtpHost, smtpPort, smtpUser, smtpPass: smtpPass ? 'SET' : 'EMPTY', secure });

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

try {
  const info = await transporter.verify();
  console.log('verify ok', info);
} catch (err) {
  console.error('verify fail', err);
  process.exit(1);
}
