'use client';

import { useState, useRef } from 'react';
import {
  Send, Loader2, CheckCircle2, AlertCircle,
  User, Phone, CreditCard, Building2,
  Shield, FileText, ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────
type FormData = {
  // Personal
  fullName: string;
  fatherName: string;
  motherName: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  occupation: string;
  // Contact
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  // KYC
  panNumber: string;
  aadhaarNumber: string;
  // Bank
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: string;
  branch: string;
  ifscCode: string;
  // Nominee
  nomineeName: string;
  nomineeRelationship: string;
  nomineeAge: string;
  // Declaration
  declaration: boolean;
};

type FormErrors = Partial<Record<keyof FormData | 'server', string>>;

const EMPTY: FormData = {
  fullName: '',
  fatherName: '',
  motherName: '',
  gender: '',
  dob: '',
  maritalStatus: '',
  occupation: '',
  mobile: '',
  email: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  panNumber: '',
  aadhaarNumber: '',
  bankName: '',
  accountHolderName: '',
  accountNumber: '',
  accountType: '',
  branch: '',
  ifscCode: '',
  nomineeName: '',
  nomineeRelationship: '',
  nomineeAge: '',
  declaration: false,
};

// ── Steps ─────────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'personal',    label: 'Personal', icon: User       },
  { id: 'contact',     label: 'Contact',  icon: Phone      },
  { id: 'kyc',         label: 'KYC',      icon: Shield     },
  { id: 'bank',        label: 'Bank',     icon: Building2  },
  { id: 'nominee',     label: 'Nominee',  icon: CreditCard },
  { id: 'declaration', label: 'Declare',  icon: FileText   },
];

// ── Per-step validation ───────────────────────────────────────────────────────
function validateStep(step: number, data: FormData): FormErrors {
  const e: FormErrors = {};

  if (step === 0) {
    if (!data.fullName.trim())      e.fullName      = 'Full name is required.';
    if (!data.fatherName.trim())    e.fatherName    = "Father's name is required.";
    if (!data.motherName.trim())    e.motherName    = "Mother's name is required.";
    if (!data.gender)               e.gender        = 'Please select gender.';
    if (!data.dob)                  e.dob           = 'Date of birth is required.';
    if (!data.maritalStatus)        e.maritalStatus = 'Please select marital status.';
    if (!data.occupation.trim())    e.occupation    = 'Occupation is required.';
  }

  if (step === 1) {
    if (!data.mobile.trim())        e.mobile  = 'Mobile number is required.';
    else if (!/^[\+]?[\d\s\-\(\)]{7,20}$/.test(data.mobile.trim())) e.mobile = 'Enter a valid mobile number.';
    if (!data.email.trim())         e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email address.';
    if (!data.address.trim())       e.address = 'Address is required.';
    if (!data.city.trim())          e.city    = 'City is required.';
    if (!data.state.trim())         e.state   = 'State is required.';
    if (!data.pinCode.trim())       e.pinCode = 'PIN code is required.';
    else if (!/^\d{6}$/.test(data.pinCode.trim())) e.pinCode = 'Enter a valid 6-digit PIN code.';
  }

  if (step === 2) {
    if (!data.panNumber.trim())     e.panNumber     = 'PAN number is required.';
    else if (!/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(data.panNumber.trim())) e.panNumber = 'Enter a valid PAN (e.g. ABCDE1234F).';
    if (!data.aadhaarNumber.trim()) e.aadhaarNumber = 'Aadhaar number is required.';
    else if (!/^\d{12}$/.test(data.aadhaarNumber.replace(/\s/g, ''))) e.aadhaarNumber = 'Enter a valid 12-digit Aadhaar number.';
  }

  if (step === 3) {
    if (!data.bankName.trim())          e.bankName          = 'Bank name is required.';
    if (!data.accountHolderName.trim()) e.accountHolderName = 'Account holder name is required.';
    if (!data.accountNumber.trim())     e.accountNumber     = 'Account number is required.';
    else if (!/^\d{9,18}$/.test(data.accountNumber.trim())) e.accountNumber = 'Enter a valid account number.';
    if (!data.accountType)              e.accountType       = 'Please select account type.';
    if (!data.branch.trim())            e.branch            = 'Branch name is required.';
    if (!data.ifscCode.trim())          e.ifscCode          = 'IFSC code is required.';
    else if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(data.ifscCode.trim())) e.ifscCode = 'Enter a valid IFSC code.';
  }

  if (step === 4) {
    if (!data.nomineeName.trim())         e.nomineeName         = 'Nominee name is required.';
    if (!data.nomineeRelationship.trim()) e.nomineeRelationship = 'Relationship is required.';
    if (!data.nomineeAge.trim())          e.nomineeAge          = 'Nominee age is required.';
    else if (isNaN(Number(data.nomineeAge)) || +data.nomineeAge < 1 || +data.nomineeAge > 120) e.nomineeAge = 'Enter a valid age between 1 and 120.';
  }

  if (step === 5) {
    if (!data.declaration) e.declaration = 'You must accept the declaration to proceed.';
  }

  return e;
}

// ── Shared field wrapper ──────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

// ── Radio pill group ──────────────────────────────────────────────────────────
function RadioGroup({ label, name, options, value, onChange, error }: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <Field label={label} error={error}>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer text-sm font-medium transition-all',
              value === opt.value
                ? 'border-primary bg-primary-light text-primary'
                : 'border-border bg-surface text-foreground-muted hover:border-primary/50'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <span className={cn('w-4 h-4 rounded-full border-2 flex items-center justify-center', value === opt.value ? 'border-primary' : 'border-foreground-muted')}>
              {value === opt.value && <span className="w-2 h-2 rounded-full bg-primary" />}
            </span>
            {opt.label}
          </label>
        ))}
      </div>
    </Field>
  );
}

// ── Step 1: Personal ──────────────────────────────────────────────────────────
function StepPersonal({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Full Name *" name="fullName" placeholder="As per Aadhaar" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} error={errors.fullName} />
        <Input label="Father's Name *" name="fatherName" placeholder="Father's full name" value={data.fatherName} onChange={(e) => onChange('fatherName', e.target.value)} error={errors.fatherName} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Mother's Name *" name="motherName" placeholder="Mother's full name" value={data.motherName} onChange={(e) => onChange('motherName', e.target.value)} error={errors.motherName} />
        <Input label="Occupation *" name="occupation" placeholder="e.g. Business, Student" value={data.occupation} onChange={(e) => onChange('occupation', e.target.value)} error={errors.occupation} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <RadioGroup
          label="Gender *" name="gender"
          options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
          value={data.gender} onChange={(v) => onChange('gender', v)} error={errors.gender}
        />
        <RadioGroup
          label="Marital Status *" name="maritalStatus"
          options={[{ value: 'Married', label: 'Married' }, { value: 'Unmarried', label: 'Unmarried' }]}
          value={data.maritalStatus} onChange={(v) => onChange('maritalStatus', v)} error={errors.maritalStatus}
        />
      </div>
      <Field label="Date of Birth *" error={errors.dob}>
        <input
          type="date"
          value={data.dob}
          // eslint-disable-next-line react-hooks/purity
          max={new Date(Date.now() - 18 * 365.25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
          onChange={(e) => onChange('dob', e.target.value)}
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        />
      </Field>
    </div>
  );
}

// ── Step 2: Contact ───────────────────────────────────────────────────────────
function StepContact({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Mobile Number *" name="mobile" type="tel" placeholder="+91 98765 43210" value={data.mobile} onChange={(e) => onChange('mobile', e.target.value)} error={errors.mobile} />
        <Input label="Email Address *" name="email" type="email" placeholder="you@example.com" value={data.email} onChange={(e) => onChange('email', e.target.value)} error={errors.email} />
      </div>
      <Field label="Full Address *" error={errors.address}>
        <textarea
          rows={3}
          placeholder="House No., Street, Locality"
          value={data.address}
          onChange={(e) => onChange('address', e.target.value)}
          className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
        />
      </Field>
      <div className="grid sm:grid-cols-3 gap-5">
        <Input label="City *" name="city" placeholder="Kollam" value={data.city} onChange={(e) => onChange('city', e.target.value)} error={errors.city} />
        <Input label="State *" name="state" placeholder="Kerala" value={data.state} onChange={(e) => onChange('state', e.target.value)} error={errors.state} />
        <Input label="PIN Code *" name="pinCode" placeholder="691004" maxLength={6} value={data.pinCode} onChange={(e) => onChange('pinCode', e.target.value)} error={errors.pinCode} />
      </div>
    </div>
  );
}

// ── Step 3: KYC ───────────────────────────────────────────────────────────────
function StepKYC({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <Input
        label="PAN Number *" name="panNumber" placeholder="ABCDE1234F"
        value={data.panNumber}
        onChange={(e) => onChange('panNumber', e.target.value.toUpperCase())}
        error={errors.panNumber}
      />
      <Input
        label="Aadhaar Number *" name="aadhaarNumber" placeholder="123456789012" maxLength={12}
        value={data.aadhaarNumber}
        onChange={(e) => onChange('aadhaarNumber', e.target.value.replace(/\D/g, ''))}
        error={errors.aadhaarNumber}
      />
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>Documents to submit to office:</strong>
        <ul className="mt-2 space-y-1 list-disc list-inside text-amber-700">
          <li>Self-attested copy of Aadhaar Card</li>
          <li>Self-attested copy of PAN Card</li>
          <li>Address Proof</li>
          <li>Passport Size Photo</li>
          <li>Cancelled Cheque / Bank Proof</li>
        </ul>
      </div>
    </div>
  );
}

// ── Step 4: Bank ──────────────────────────────────────────────────────────────
function StepBank({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Bank Name *" name="bankName" placeholder="e.g. State Bank of India" value={data.bankName} onChange={(e) => onChange('bankName', e.target.value)} error={errors.bankName} />
        <Input label="Account Holder Name *" name="accountHolderName" placeholder="As per bank records" value={data.accountHolderName} onChange={(e) => onChange('accountHolderName', e.target.value)} error={errors.accountHolderName} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Account Number *" name="accountNumber" placeholder="Enter account number"
          value={data.accountNumber}
          onChange={(e) => onChange('accountNumber', e.target.value.replace(/\D/g, ''))}
          error={errors.accountNumber}
        />
        <RadioGroup
          label="Account Type *" name="accountType"
          options={[{ value: 'Savings', label: 'Savings' }, { value: 'Current', label: 'Current' }]}
          value={data.accountType} onChange={(v) => onChange('accountType', v)} error={errors.accountType}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Branch *" name="branch" placeholder="Branch name" value={data.branch} onChange={(e) => onChange('branch', e.target.value)} error={errors.branch} />
        <Input
          label="IFSC Code *" name="ifscCode" placeholder="SBIN0001234"
          value={data.ifscCode}
          onChange={(e) => onChange('ifscCode', e.target.value.toUpperCase())}
          error={errors.ifscCode}
        />
      </div>
    </div>
  );
}

// ── Step 5: Nominee ───────────────────────────────────────────────────────────
function StepNominee({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="Nominee Full Name *" name="nomineeName" placeholder="Nominee's name" value={data.nomineeName} onChange={(e) => onChange('nomineeName', e.target.value)} error={errors.nomineeName} />
        <Input label="Relationship *" name="nomineeRelationship" placeholder="e.g. Spouse, Son, Daughter" value={data.nomineeRelationship} onChange={(e) => onChange('nomineeRelationship', e.target.value)} error={errors.nomineeRelationship} />
      </div>
      <Field label="Nominee Age *" error={errors.nomineeAge}>
        <div className="relative">
          <input
            type="number"
            min={1}
            max={120}
            placeholder="e.g. 35"
            value={data.nomineeAge}
            onChange={(e) => onChange('nomineeAge', e.target.value)}
            className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition pr-16"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground-muted pointer-events-none">years</span>
        </div>
      </Field>
    </div>
  );
}

// ── Step 6: Declaration ───────────────────────────────────────────────────────
const TERMS = [
  'I will not make false or misleading income claims.',
  'I will not misrepresent the Company or its products.',
  'I will follow ethical business practices and comply with Direct Selling Rules.',
  'I understand income is based on product sales only — no fixed income is guaranteed.',
  'I am joining voluntarily without any pressure.',
  'All information provided in this form is true and correct.',
  'I will not engage in any misleading or unlawful activity.',
];

function StepDeclaration({ data, errors, onChange }: { data: FormData; errors: FormErrors; onChange: (k: keyof FormData, v: boolean) => void }) {
  return (
    <div className="space-y-5">
      <div className="p-5 bg-surface border border-border rounded-2xl">
        <h3 className="font-semibold text-foreground mb-3 text-sm">Distributor Declaration</h3>
        <ul className="space-y-2.5">
          {TERMS.map((term, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground-muted">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              {term}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 leading-relaxed">
        <strong>Legal Notice:</strong> This is a legally binding agreement under Direct Selling Rules (India). The Company reserves the right to modify policies. Any disputes shall be subject to the jurisdiction of the Company&apos;s registered office location.
      </div>
      <label className={cn(
        'flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all',
        data.declaration ? 'border-primary bg-primary-light' : 'border-border bg-surface hover:border-primary/50',
        errors.declaration && 'border-red-400 bg-red-50'
      )}>
        <input
          type="checkbox"
          checked={data.declaration}
          onChange={(e) => onChange('declaration', e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-primary shrink-0"
        />
        <span className="text-sm text-foreground leading-relaxed">
          I have read, understood, and agree to all the terms and conditions stated above. I confirm that all information provided is true and correct to the best of my knowledge.
        </span>
      </label>
      {errors.declaration && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {errors.declaration}
        </p>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RegistrationForm() {
  const [step, setStep]               = useState(0);
  const [data, setData]               = useState<FormData>(EMPTY);
  const [errors, setErrors]           = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onChange = (key: keyof FormData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleNext = () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setStep((s) => s + 1);
    scrollToForm();
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => s - 1);
    scrollToForm();
  };

  const handleSubmit = async () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setIsSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitted(true);
        scrollToForm();
      } else {
        const firstError = Object.values(json.errors ?? {})[0] as string;
        setServerError(firstError || 'Something went wrong. Please try again.');
      }
    } catch {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success ───────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <AnimatedSection>
        <div className="max-w-lg mx-auto text-center py-16 px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted!</h2>
          <p className="text-foreground-muted leading-relaxed mb-2">
            Thank you for applying to become a Nexafiz Distributor. We&apos;ve received your application and will review it within <strong>2–3 working days</strong>.
          </p>
          <p className="text-sm text-foreground-muted mb-8">
            A confirmation email has been sent to <strong>{data.email}</strong>.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 text-left">
            <strong>What&apos;s next?</strong> Our team will contact you on WhatsApp or via the email address you provided to guide you through the next steps of the verification process.
          </div>
        </div>
      </AnimatedSection>
    );
  }

  const stepComponents = [
    <StepPersonal    key="p"  data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: string) => void} />,
    <StepContact     key="c"  data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: string) => void} />,
    <StepKYC         key="k"  data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: string) => void} />,
    <StepBank        key="b"  data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: string) => void} />,
    <StepNominee     key="no" data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: string) => void} />,
    <StepDeclaration key="d"  data={data} errors={errors} onChange={onChange as (k: keyof FormData, v: boolean) => void} />,
  ];

  return (
    <div ref={formRef} className="max-w-2xl mx-auto scroll-mt-28">
      {/* Step indicator */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done   = i < step;
          const active = i === step;
          return (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300',
                  done   ? 'bg-primary text-white' : '',
                  active ? 'bg-primary text-white ring-4 ring-primary/20' : '',
                  !done && !active ? 'bg-surface border border-border text-foreground-muted' : ''
                )}>
                  {done ? <CheckCircle2 size={18} /> : <Icon size={16} />}
                </div>
                <span className={cn('text-[10px] font-medium hidden sm:block', active ? 'text-primary' : 'text-foreground-muted')}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('h-px w-6 sm:w-10 mx-1 transition-colors', i < step ? 'bg-primary' : 'bg-border')} />
              )}
            </div>
          );
        })}
      </div>

      {/* Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Step {step + 1} of {STEPS.length} — {STEPS[step].label}
          </h2>
          <p className="text-sm text-foreground-muted mt-1">
            {step === 0 && 'Enter your personal details as per official documents.'}
            {step === 1 && 'Provide your contact information and current address.'}
            {step === 2 && 'Your KYC details for identity verification.'}
            {step === 3 && 'Bank account details for commission payments.'}
            {step === 4 && 'Nominee details for your distributor account.'}
            {step === 5 && 'Review the declaration and submit your application.'}
          </p>
        </div>

        {serverError && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {serverError}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {stepComponents[step]}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-border">
          {step > 0 && (
            <Button variant="secondary" onClick={handleBack} className="flex-1 sm:flex-none">
              ← Back
            </Button>
          )}
          <div className="flex-1" />
          {step < STEPS.length - 1 ? (
            <Button onClick={handleNext} className="flex-1 sm:flex-none group">
              Next
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 sm:flex-none">
              {isSubmitting
                ? <><Loader2 size={16} className="animate-spin" /> Submitting...</>
                : <><Send size={16} /> Submit Application</>}
            </Button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={false}
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <p className="text-center text-xs text-foreground-muted mt-2">
        {Math.round(((step + 1) / STEPS.length) * 100)}% complete
      </p>
    </div>
  );
}