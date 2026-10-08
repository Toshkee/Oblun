import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/*
 * E-mail is sent over SMTP (e.g. the mailbox behind info@oblun.com).
 * Required environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.
 * Optional: MAIL_FROM (defaults to SMTP_USER), MAIL_TO (defaults to info@oblun.com).
 */

export type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string };

export const mailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

export const resortInbox = () => process.env.MAIL_TO || "info@oblun.com";

let transporter: Transporter | null = null;

export async function sendMail(mail: Mail): Promise<void> {
  if (!mailConfigured()) {
    if (process.env.NODE_ENV === "production") throw new Error("SMTP is not configured");
    console.info(`[mail] SMTP not configured – would send to ${mail.to}: ${mail.subject}\n${mail.text}`);
    return;
  }
  transporter ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({
    from: process.env.MAIL_FROM || `Oblun Eco Resort <${process.env.SMTP_USER}>`,
    ...mail,
  });
}

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
