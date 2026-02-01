'use client';

import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

export default function ContactHero() {
  return (
    <Section className="pt-32 lg:pt-40 pb-12" background="default">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
            Get in Touch
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed">
            Have questions about NEXAFIZ? Want to become a partner shop or join our network? 
            We&apos;d love to hear from you. Reach out and our team will get back to you shortly.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

