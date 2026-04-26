import type { Metadata } from 'next';
import Section from '@/components/ui/Section';
import RegistrationForm from './RegistrationForm';

export const metadata: Metadata = {
  title: 'Become a Distributor | Nexafiz',
  description:
    'Apply to become an independent Nexafiz distributor. Fill in your personal, KYC, and bank details to get started — free registration, no investment required.',
};

// Hero is a server component — import motion only inside client parts
function RegisterHero() {
  return (
    <Section className="pt-32 lg:pt-40 pb-12" background="alt">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
          Free Registration
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Become a <span className="gradient-text">Distributor</span>
        </h1>
        <p className="text-lg text-foreground-muted leading-relaxed mb-4">
          Join the Nexafiz network and start earning from your daily purchases. Zero investment,
          zero risk — just fill in the form below.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {['Free to Join', 'Zero Investment', 'KYC Verified', 'Commission Every 10 Days'].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-surface border border-border rounded-full text-foreground-muted">
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default function RegisterPage() {
  return (
    <>
      <RegisterHero />
      <Section background="default" padding="xl">
        <RegistrationForm />
      </Section>
    </>
  );
}