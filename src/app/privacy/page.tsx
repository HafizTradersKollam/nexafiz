'use client';

import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Shield, Lock, Eye, FileText, Users, Database } from 'lucide-react';

const sections = [
  {
    icon: Database,
    title: 'Information We Collect',
    content: [
      'Personal identification information (Name, email address, phone number)',
      'Account information for platform access',
      'Transaction and purchase history from partner shops',
      'Network and referral data',
      'Device information and usage analytics',
    ],
  },
  {
    icon: Eye,
    title: 'How We Use Your Information',
    content: [
      'To provide and maintain our platform services',
      'To calculate and process your earnings and business volume',
      'To communicate important updates and notifications',
      'To improve our services and user experience',
      'To comply with legal obligations',
    ],
  },
  {
    icon: Shield,
    title: 'Data Protection',
    content: [
      'We implement industry-standard security measures',
      'All data is encrypted in transit and at rest',
      'Regular security audits and vulnerability assessments',
      'Access controls and authentication protocols',
      'Secure data centers with 24/7 monitoring',
    ],
  },
  {
    icon: Users,
    title: 'Information Sharing',
    content: [
      'We do not sell your personal information to third parties',
      'Data is shared only with partner shops for order fulfillment',
      'Legal disclosures when required by law',
      'Anonymized analytics for service improvement',
      'With your consent for specific purposes',
    ],
  },
  {
    icon: Lock,
    title: 'Your Rights',
    content: [
      'Access and review your personal data',
      'Request correction of inaccurate information',
      'Delete your account and associated data',
      'Opt-out of marketing communications',
      'Data portability upon request',
    ],
  },
  {
    icon: FileText,
    title: 'Cookies & Tracking',
    content: [
      'Essential cookies for platform functionality',
      'Analytics cookies to improve user experience',
      'You can manage cookie preferences in your browser',
      'Third-party cookies are limited and disclosed',
      'We respect Do Not Track browser settings',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="alt" padding="xl" className="pt-32">
        <AnimatedSection>
          <SectionHeader
            subtitle="Legal"
            title="Privacy Policy"
            description="Your privacy is important to us. This policy explains how NEXAFIZ collects, uses, and protects your personal information."
          />
        </AnimatedSection>
        <div className="text-center text-sm text-foreground-muted">
          Last updated: December 1, 2025
        </div>
      </Section>

      {/* Content Sections */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <AnimatedSection key={index}>
              <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <section.icon size={24} className="text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span className="text-foreground-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}

          {/* Contact Section */}
          <AnimatedSection>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 lg:p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Questions About Privacy?</h2>
              <p className="text-foreground-muted mb-4">
                If you have any questions or concerns about our privacy practices, please contact us.
              </p>
              <a
                href="mailto:privacy@nexafiz.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                Contact Privacy Team
              </a>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}

