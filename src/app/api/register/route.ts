// app/api/register/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone: string) {
  return /^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone.trim());
}
function isValidPAN(pan: string) {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.trim().toUpperCase());
}
function isValidAadhaar(aadhaar: string) {
  return /^\d{12}$/.test(aadhaar.replace(/\s/g, ''));
}
function isValidIFSC(ifsc: string) {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase());
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      fatherName,
      motherName,
      gender,
      dob,
      maritalStatus,
      occupation,
      mobile,
      email,
      address,
      city,
      state,
      pinCode,
      panNumber,
      aadhaarNumber,
      bankName,
      accountHolderName,
      accountNumber,
      accountType,
      branch,
      ifscCode,
      nomineeName,
      nomineeRelationship,
      nomineeAge,
      declaration,
    } = body;

    const errors: Record<string, string> = {};

    // Personal
    if (!fullName?.trim())         errors.fullName      = 'Full name is required.';
    if (!fatherName?.trim())       errors.fatherName    = "Father's name is required.";
    if (!motherName?.trim())       errors.motherName    = "Mother's name is required.";
    if (!gender)                   errors.gender        = 'Please select gender.';
    if (!dob)                      errors.dob           = 'Date of birth is required.';
    if (!maritalStatus)            errors.maritalStatus = 'Please select marital status.';
    if (!occupation?.trim())       errors.occupation    = 'Occupation is required.';

    // Contact
    if (!mobile?.trim())            errors.mobile   = 'Mobile number is required.';
    else if (!isValidPhone(mobile)) errors.mobile   = 'Enter a valid mobile number.';
    if (!email?.trim())             errors.email    = 'Email address is required.';
    else if (!isValidEmail(email))  errors.email    = 'Enter a valid email address.';
    if (!address?.trim())           errors.address  = 'Address is required.';
    if (!city?.trim())              errors.city     = 'City is required.';
    if (!state?.trim())             errors.state    = 'State is required.';
    if (!pinCode?.trim())           errors.pinCode  = 'PIN code is required.';
    else if (!/^\d{6}$/.test(pinCode.trim())) errors.pinCode = 'Enter a valid 6-digit PIN code.';

    // KYC
    if (!panNumber?.trim())                  errors.panNumber     = 'PAN number is required.';
    else if (!isValidPAN(panNumber))         errors.panNumber     = 'Enter a valid PAN (e.g. ABCDE1234F).';
    if (!aadhaarNumber?.trim())              errors.aadhaarNumber = 'Aadhaar number is required.';
    else if (!isValidAadhaar(aadhaarNumber)) errors.aadhaarNumber = 'Enter a valid 12-digit Aadhaar number.';

    // Bank
    if (!bankName?.trim())           errors.bankName          = 'Bank name is required.';
    if (!accountHolderName?.trim())  errors.accountHolderName = 'Account holder name is required.';
    if (!accountNumber?.trim())      errors.accountNumber     = 'Account number is required.';
    else if (!/^\d{9,18}$/.test(accountNumber.trim())) errors.accountNumber = 'Enter a valid account number.';
    if (!accountType)                errors.accountType       = 'Please select account type.';
    if (!branch?.trim())             errors.branch            = 'Branch is required.';
    if (!ifscCode?.trim())           errors.ifscCode          = 'IFSC code is required.';
    else if (!isValidIFSC(ifscCode)) errors.ifscCode          = 'Enter a valid IFSC code (e.g. SBIN0001234).';

    // Nominee
    if (!nomineeName?.trim())         errors.nomineeName         = 'Nominee name is required.';
    if (!nomineeRelationship?.trim()) errors.nomineeRelationship = 'Nominee relationship is required.';
    if (!nomineeAge?.toString().trim()) errors.nomineeAge        = 'Nominee age is required.';
    else if (isNaN(Number(nomineeAge)) || +nomineeAge < 1 || +nomineeAge > 120) errors.nomineeAge = 'Enter a valid age between 1 and 120.';

    // Declaration
    if (!declaration) errors.declaration = 'You must agree to the declaration.';

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 422 });
    }

    // ── Send email ────────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:9px 0;color:#6b7280;width:180px;vertical-align:top;border-bottom:1px solid #f3f4f6;font-size:13px;">${label}</td>
        <td style="padding:9px 0;font-weight:600;color:#111827;border-bottom:1px solid #f3f4f6;font-size:13px;">${value || '—'}</td>
      </tr>`;

    const section = (title: string) => `
      <tr><td colspan="2" style="padding:18px 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#00A86B;border-bottom:2px solid #00A86B20;">${title}</td></tr>`;

    await transporter.sendMail({
      from: `"Nexafiz Registration" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Nexafiz] New Distributor Application — ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:680px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#00A86B;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New Distributor Application</h1>
            <p style="color:#d1fae5;margin:6px 0 0;font-size:13px;">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
          <div style="padding:32px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;">
              ${section('Personal Information')}
              ${row('Full Name', fullName)}
              ${row("Father's Name", fatherName)}
              ${row("Mother's Name", motherName)}
              ${row('Gender', gender)}
              ${row('Date of Birth', dob)}
              ${row('Marital Status', maritalStatus)}
              ${row('Occupation', occupation)}
              ${section('Contact Details')}
              ${row('Mobile', mobile)}
              ${row('Email', email)}
              ${row('Address', address)}
              ${row('City', city)}
              ${row('State / PIN', `${state} – ${pinCode}`)}
              ${section('KYC Details')}
              ${row('PAN Number', panNumber?.toUpperCase())}
              ${row('Aadhaar Number', aadhaarNumber)}
              ${section('Bank Details')}
              ${row('Bank Name', bankName)}
              ${row('Account Holder', accountHolderName)}
              ${row('Account Number', accountNumber)}
              ${row('Account Type', accountType)}
              ${row('Branch', branch)}
              ${row('IFSC Code', ifscCode?.toUpperCase())}
              ${section('Nominee')}
              ${row('Nominee Name', nomineeName)}
              ${row('Relationship', nomineeRelationship)}
              ${row('Nominee Age', `${nomineeAge} years`)}
            </table>
          </div>
          <div style="padding:14px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">
            Submitted via nexafizglobal.com · For office use — assign Distributor ID and approve.
          </div>
        </div>`,
    });

    const firstName = fullName.trim().split(' ')[0];
    await transporter.sendMail({
      from: `"Nexafiz Global" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Application Received — Nexafiz Global`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <div style="background:#00A86B;padding:24px 32px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">Application Received, ${firstName}!</h1>
          </div>
          <div style="padding:32px;background:#fff;color:#374151;line-height:1.7;">
            <p style="margin:0 0 16px;">Thank you for applying to become a Nexafiz Distributor. We've received your application and our team will review it and get back to you within <strong>2–3 working days</strong>.</p>
            <p style="margin:0 0 28px;color:#6b7280;font-size:14px;">Our team will contact you on WhatsApp or via the email address you provided to guide you through the next steps of the verification process.</p>
            <div style="text-align:center;">
              <a href="https://member.nexafizglobal.com/login" style="display:inline-block;background:#00A86B;color:#fff;font-weight:600;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:8px;">Visit Member Portal &rarr;</a>
            </div>
          </div>
          <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af;">
            Nexafiz Global · nexafizglobal.com
          </div>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Register API Error]', err);
    return NextResponse.json(
      { success: false, errors: { server: 'Something went wrong. Please try again later.' } },
      { status: 500 }
    );
  }
}