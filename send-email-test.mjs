import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const message = {
  from: process.env.EMAIL_FROM || `CasRael <${process.env.SMTP_USER}>`,
  to: process.env.EMAIL_TO || process.env.SMTP_USER,
  subject: 'Test email from portfolio SMTP',
  text: 'This is a test email sent from the portfolio SMTP setup.',
};

try {
  const info = await transporter.sendMail(message);
  console.log('sendMail success', info);
} catch (err) {
  console.error('sendMail failed', err);
  console.error('response', err.response || err.responseCode || err.rejected);
  process.exit(1);
}
