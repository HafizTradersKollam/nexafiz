'use client';

import { useState } from 'react';
import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ChevronDown, HelpCircle, ShoppingBag, Users, Wallet, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqCategories = [
  {
    icon: HelpCircle,
    title: 'Getting Started',
    faqs: [
      { q: 'What is NEXAFIZ?', a: 'NEXAFIZ is a digital direct selling platform that transforms your daily shopping into income. You earn from your own purchases and your network\'s purchases at partner shops.' },
      { q: 'How do I join NEXAFIZ?', a: 'You can join by registering through our platform. There is no joining fee or investment required. Simply sign up, start shopping at partner shops, and begin earning.' },
      { q: 'Is there any investment required?', a: 'No! NEXAFIZ operates on a zero-investment model. You don\'t need to buy products to sell or maintain inventory. Just shop for your daily needs and earn.' },
    ],
  },
  {
    icon: ShoppingBag,
    title: 'Shopping & Products',
    faqs: [
      { q: 'What products are available?', a: 'Our partner shops offer daily essentials including groceries, fashion, electronics, health products, and more. We focus on products you already buy regularly.' },
      { q: 'How do I shop through NEXAFIZ?', a: 'Visit any of our partner shops, make your purchase, and provide your NEXAFIZ member ID. Your purchase will be tracked and Business Volume (BV) will be credited to your account.' },
      { q: 'Are the prices higher at partner shops?', a: 'No! Partner shops offer competitive market prices. You pay the same as regular customers but earn BV on your purchases.' },
    ],
  },
  {
    icon: Wallet,
    title: 'Earnings & Payments',
    faqs: [
      { q: 'How do I earn money?', a: 'You earn through our binary compensation plan. When you or your network makes purchases, Business Volume (BV) is generated. Based on the BV in your left and right legs, you receive income.' },
      { q: 'When do I get paid?', a: 'Earnings are calculated weekly and credited to your NEXAFIZ wallet. You can withdraw once you reach the minimum threshold of ₹500.' },
      { q: 'What is Business Volume (BV)?', a: 'BV is the value assigned to each product purchase. It\'s used to calculate your earnings. Different products have different BV values based on their category and price.' },
    ],
  },
  {
    icon: Users,
    title: 'Network & Referrals',
    faqs: [
      { q: 'How does the referral system work?', a: 'When you refer someone to NEXAFIZ, they join your network. You earn from their purchases and the purchases of everyone in your downline, creating passive income.' },
      { q: 'Is there a limit to my network size?', a: 'No! Your network can grow unlimited. The more people in your network who shop, the more you earn. We use a binary structure with left and right legs.' },
      { q: 'Do I need to recruit to earn?', a: 'No! You can earn from your own purchases alone. However, building a network multiplies your earning potential significantly.' },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Support',
    faqs: [
      { q: 'Is my data secure?', a: 'Yes! We use industry-standard encryption and security measures to protect your personal and financial information. See our Privacy Policy for details.' },
      { q: 'How do I contact support?', a: 'You can reach us via email at support@nexafiz.com, call us at +91 98765 43210, or use the contact form on our website. We respond within 24 hours.' },
      { q: 'What if I have a dispute?', a: 'Contact our support team with details of your concern. We have a dedicated dispute resolution process to ensure fair outcomes for all parties.' },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 lg:p-5 text-left bg-surface hover:bg-surface-hover transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown className={cn('w-5 h-5 text-foreground-muted shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-96' : 'max-h-0')}>
        <p className="p-4 lg:p-5 pt-0 text-foreground-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Section background="alt" padding="xl" className="pt-32">
        <AnimatedSection>
          <SectionHeader subtitle="Support" title="Frequently Asked Questions" description="Find answers to common questions about NEXAFIZ, our platform, and how to maximize your earnings." />
        </AnimatedSection>
      </Section>
      <Section>
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((category, index) => (
            <AnimatedSection key={index}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl"><category.icon size={24} className="text-primary" /></div>
                <h2 className="text-xl lg:text-2xl font-bold text-foreground">{category.title}</h2>
              </div>
              <div className="space-y-3">
                {category.faqs.map((faq, i) => (<FAQItem key={i} question={faq.q} answer={faq.a} />))}
              </div>
            </AnimatedSection>
          ))}
          <AnimatedSection>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 lg:p-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-4">Still Have Questions?</h2>
              <p className="text-foreground-muted mb-4">Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
              <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">Contact Support</a>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}

