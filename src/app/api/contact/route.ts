// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim());
}

const INQUIRY_LABELS: Record<string, string> = {
  general:     'General Inquiry',
  partnership: 'Shop Partnership',
  support:     'Customer Support',
  business:    'Business Opportunity',
  feedback:    'Feedback',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, message } = body;

    // ── Validation ──────────────────────────────────────────────────────────
    const errors: Record<string, string> = {};

    if (!name?.trim())             errors.name        = 'Full name is required.';
    if (!email?.trim())            errors.email       = 'Email address is required.';
    else if (!isValidEmail(email)) errors.email       = 'Please enter a valid email address.';
    if (!phone?.trim())            errors.phone       = 'Phone number is required.';
    else if (!isValidPhone(phone)) errors.phone       = 'Please enter a valid phone number.';
    if (!inquiryType?.trim())      errors.inquiryType = 'Please select an inquiry type.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Transporter ─────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,         
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    const inquiryLabel = INQUIRY_LABELS[inquiryType] ?? inquiryType;
    const firstName = name.trim().split(' ')[0];

    // ── Notification email → you ─────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Nexafiz Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Nexafiz] ${inquiryLabel} from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#00A86B;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Contact Form Submission</h1>
          </div>
          <div style="padding:32px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr>
                <td style="padding:10px 0;color:#6b7280;width:140px;vertical-align:top;border-bottom:1px solid #f3f4f6;">Name</td>
                <td style="padding:10px 0;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;vertical-align:top;border-bottom:1px solid #f3f4f6;">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid #f3f4f6;"><a href="mailto:${email}" style="color:#00A86B;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;vertical-align:top;border-bottom:1px solid #f3f4f6;">Phone</td>
                <td style="padding:10px 0;color:#111827;border-bottom:1px solid #f3f4f6;">${phone}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;vertical-align:top;border-bottom:1px solid #f3f4f6;">Inquiry Type</td>
                <td style="padding:10px 0;color:#111827;border-bottom:1px solid #f3f4f6;">${inquiryLabel}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#6b7280;vertical-align:top;">Message</td>
                <td style="padding:10px 0;color:#111827;white-space:pre-wrap;">${
                  message?.trim()
                    ? message.trim()
                    : '<em style="color:#9ca3af;">No message provided</em>'
                }</td>
              </tr>
            </table>
          </div>
          <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Sent from nexafizglobal.com · Reply directly to this email to respond to ${firstName}
          </div>
        </div>
      `,
    });

    // ── Auto-reply → sender ──────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Nexafiz Global" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `We received your message — Nexafiz Global`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#00A86B;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Thanks for reaching out, ${firstName}!</h1>
          </div>
          <div style="padding:32px;background:#fff;color:#374151;line-height:1.7;">
            <p style="margin:0 0 16px;">We've received your <strong>${inquiryLabel}</strong> and our team will get back to you within <strong>24 hours</strong>.</p>
            <p style="margin:0 0 28px;color:#6b7280;font-size:14px;">In the meantime, you can explore our member store and start turning your daily purchases into income.</p>
            <div style="text-align:center;">
              <a href="https://member.nexafizglobal.com/login" style="display:inline-block;background:#00A86B;color:#ffffff;font-weight:600;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:8px;letter-spacing:0.3px;">Visit Member Store &rarr;</a>
            </div>
          </div>
          <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Nexafiz Global &middot; nexafizglobal.com
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { success: false, errors: { server: 'Something went wrong. Please try again later.' } },
      { status: 500 }
    );
  }
}