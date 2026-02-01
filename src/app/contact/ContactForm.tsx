'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input, { Textarea, Select } from '@/components/ui/Input';
import AnimatedSection from '@/components/ui/AnimatedSection';

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'general', label: 'General Inquiry' },
  { value: 'partnership', label: 'Shop Partnership' },
  { value: 'support', label: 'Customer Support' },
  { value: 'business', label: 'Business Opportunity' },
  { value: 'feedback', label: 'Feedback' },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    // Reset form
    setFormData({ name: '', email: '', phone: '', inquiryType: '', message: '' });
    alert('Message sent successfully! We will get back to you soon.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatedSection>
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Send us a Message</h2>
        <p className="text-foreground-muted mb-6">
          Fill out the form below and we&apos;ll respond within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
            <Select
              label="Inquiry Type"
              name="inquiryType"
              options={inquiryTypes}
              value={formData.inquiryType}
              onChange={handleChange}
              required
            />
          </div>

          <Textarea
            label="Your Message"
            name="message"
            placeholder="Tell us how we can help you..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
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

