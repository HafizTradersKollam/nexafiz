'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea, Select } from '@/components/ui/Input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const inquiryTypes = [
  { value: '',            label: 'Select inquiry type'  },
  { value: 'general',    label: 'General Inquiry'       },
  { value: 'partnership',label: 'Shop Partnership'      },
  { value: 'support',    label: 'Customer Support'      },
  { value: 'business',   label: 'Business Opportunity'  },
  { value: 'feedback',   label: 'Feedback'              },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData | 'server', string>>;

const EMPTY_FORM: FormData = { name: '', email: '', phone: '', inquiryType: '', message: '' };

// ── Client-side validation (mirrors API) ──────────────────────────────────────
function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim())        errors.name        = 'Full name is required.';
  if (!data.email.trim())       errors.email       = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                                errors.email       = 'Please enter a valid email address.';
  if (!data.phone.trim())       errors.phone       = 'Phone number is required.';
  else if (!/^[\+]?[\d\s\-\(\)]{7,20}$/.test(data.phone.trim()))
                                errors.phone       = 'Please enter a valid phone number.';
  if (!data.inquiryType.trim()) errors.inquiryType = 'Please select an inquiry type.';
  // message is optional
  return errors;
}

export default function ContactForm() {
  const [formData, setFormData]     = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors]         = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation first
    const clientErrors = validate(formData);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData(EMPTY_FORM);
      } else {
        setErrors(data.errors ?? { server: 'Something went wrong. Please try again.' });
      }
    } catch {
      setErrors({ server: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <AnimatedSection>
        <Card className="p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[400px]">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
            <CheckCircle2 size={36} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
          <p className="text-foreground-muted max-w-sm">
            Thanks for reaching out. We&apos;ve received your message and will get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-sm text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Send another message
          </button>
        </Card>
      </AnimatedSection>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <AnimatedSection>
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
        <p className="text-foreground-muted mb-6">
          Fill out the form below and we&apos;ll respond within 24 hours.
        </p>

        {errors.server && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {errors.server}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Full Name *"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              label="Email Address *"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Phone Number *"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <Select
              label="Inquiry Type *"
              name="inquiryType"
              options={inquiryTypes}
              value={formData.inquiryType}
              onChange={handleChange}
              error={errors.inquiryType}
            />
          </div>

          <Textarea
            label="Your Message"
            name="message"
            placeholder="Tell us how we can help you... (optional)"
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Card>
    </AnimatedSection>
  );
}