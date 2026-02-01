'use client';

import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { FileText, Scale, AlertTriangle, CreditCard, UserCheck, Ban } from 'lucide-react';

const sections = [
  {
    icon: UserCheck,
    title: 'Acceptance of Terms',
    content: 'By accessing and using the NEXAFIZ platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.',
  },
  {
    icon: FileText,
    title: 'Platform Services',
    content: 'NEXAFIZ provides a digital direct selling platform that connects consumers with partner shops. Our services include: tracking purchases and business volume, calculating earnings based on our compensation plan, providing network management tools, and facilitating communication between members and shops.',
  },
  {
    icon: CreditCard,
    title: 'Earnings & Compensation',
    content: 'Earnings are calculated based on your personal purchases and your network\'s purchases according to our binary compensation plan. All earnings are subject to verification and may be adjusted for returns or fraudulent activity. Minimum withdrawal thresholds and processing times apply. NEXAFIZ does not guarantee any specific income level.',
  },
  {
    icon: Scale,
    title: 'Member Responsibilities',
    content: 'As a NEXAFIZ member, you agree to: provide accurate personal information, maintain the confidentiality of your account, comply with all applicable laws, not engage in fraudulent or deceptive practices, not make false income claims, and respect the intellectual property of NEXAFIZ and partner shops.',
  },
  {
    icon: Ban,
    title: 'Prohibited Activities',
    content: 'The following activities are strictly prohibited: creating multiple accounts, manipulating the compensation system, making unauthorized income claims, spamming or harassing other members, using automated tools to access the platform, and any activity that violates local laws or regulations.',
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: 'NEXAFIZ is not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount of earnings you have received in the past 12 months. We do not guarantee uninterrupted access to our services.',
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section background="alt" padding="xl" className="pt-32">
        <AnimatedSection>
          <SectionHeader
            subtitle="Legal"
            title="Terms of Service"
            description="Please read these terms carefully before using the NEXAFIZ platform. These terms govern your use of our services."
          />
        </AnimatedSection>
        <div className="text-center text-sm text-foreground-muted">
          Last updated: December 1, 2025
        </div>
      </Section>

      {/* Content Sections */}
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <AnimatedSection key={index}>
              <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl shrink-0">
                    <section.icon size={24} className="text-primary" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground">{section.title}</h2>
                </div>
                <p className="text-foreground-muted leading-relaxed pl-16">{section.content}</p>
              </div>
            </AnimatedSection>
          ))}

          {/* Additional Terms */}
          <AnimatedSection>
            <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
              <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Additional Terms</h2>
              <div className="space-y-4 text-foreground-muted leading-relaxed">
                <p><strong className="text-foreground">Governing Law:</strong> These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Kerala.</p>
                <p><strong className="text-foreground">Severability:</strong> If any provision of these terms is found invalid, the remaining provisions shall continue in effect.</p>
                <p><strong className="text-foreground">Entire Agreement:</strong> These terms constitute the entire agreement between you and NEXAFIZ regarding the use of our platform.</p>
                <p><strong className="text-foreground">Termination:</strong> We may terminate or suspend your account at any time for violation of these terms or for any other reason at our discretion.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <AnimatedSection>
            <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 lg:p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Questions About Terms?</h2>
              <p className="text-foreground-muted mb-4">
                If you have any questions about these Terms of Service, please contact our legal team.
              </p>
              <a
                href="mailto:legal@nexafiz.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors"
              >
                Contact Legal Team
              </a>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}

