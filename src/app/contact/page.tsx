import type { Metadata } from 'next';
import ContactHero from './ContactHero';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import Section from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with NEXAFIZ. Contact our team for inquiries about partnership, support, or joining our network.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Section background="alt" padding="xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </Section>
    </>
  );
}

