'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Section, { SectionHeader } from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'Do I need to invest any money to start?',
    answer: 'No! NEXAFIZ is completely free to join. You earn from your own regular shopping and from your network\'s purchases. There\'s zero investment required.',
  },
  {
    question: 'How do I earn money with NEXAFIZ?',
    answer: 'You earn through Business Volume (BV) generated from purchases. When you or your network members shop at our partner stores, BV is accumulated and converted to earnings through our binary compensation plan.',
  },
  {
    question: 'Do I need to sell products?',
    answer: 'No selling required! NEXAFIZ is about shopping, not selling. You simply shop for your daily needs from our partner stores and earn automatically.',
  },
  {
    question: 'What is Business Volume (BV)?',
    answer: 'Business Volume is the value assigned to each purchase. Every product has a BV value, and when you or your network purchases products, BV is generated which contributes to your earnings.',
  },
  {
    question: 'How does the binary compensation plan work?',
    answer: 'In the binary plan, you have two legs (left and right). Earnings are calculated based on the weaker leg\'s BV. This encourages balanced team building and ensures sustainable growth.',
  },
  {
    question: 'When and how do I get paid?',
    answer: 'Earnings are calculated weekly and can be withdrawn through various methods including bank transfer, mobile wallets, and more. Minimum withdrawal thresholds may apply.',
  },
];

export default function HowItWorksFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section>
      <AnimatedSection>
        <SectionHeader
          subtitle="Got Questions?"
          title="Frequently Asked Questions"
          description="Find answers to common questions about NEXAFIZ."
        />
      </AnimatedSection>

      <StaggerContainer className="max-w-3xl mx-auto mb-12">
        {faqs.map((faq, index) => (
          <StaggerItem key={index}>
            <div className="border-b border-border last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-5 flex items-center justify-between text-left group"
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={cn(
                    'text-foreground-muted shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180 text-primary'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'
                )}
              >
                <p className="text-foreground-muted leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* CTA */}
      <AnimatedSection delay={0.3} className="text-center">
        <p className="text-foreground-muted mb-4">Still have questions?</p>
        <Link href="/contact">
          <Button size="lg">Contact Us</Button>
        </Link>
      </AnimatedSection>
    </Section>
  );
}

