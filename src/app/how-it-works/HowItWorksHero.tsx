'use client';

import { motion } from 'framer-motion';
import { PlayCircle, CheckCircle } from 'lucide-react';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';

const quickFacts = [
  'No investment required',
  'No selling pressure',
  'Earn from daily shopping',
  'Automated income tracking',
];

export default function HowItWorksHero() {
  return (
    <Section className="pt-32 lg:pt-40" background="alt">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
            Simple Process
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            How <span className="gradient-text">NEXAFIZ</span> Works
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed mb-8">
            Transform your daily shopping into a continuous income stream. Our simple, 
            transparent system makes it easy for anyone to start earning without any 
            investment or selling pressure.
          </p>

          {/* Quick Facts */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {quickFacts.map((fact, index) => (
              <motion.div
                key={fact}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle size={18} className="text-primary shrink-0" />
                <span className="text-sm text-foreground">{fact}</span>
              </motion.div>
            ))}
          </div>

          <Button size="lg" className="group">
            <PlayCircle size={20} />
            Demo Video Coming Soon
          </Button>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-video bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/10 to-accent/10">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <PlayCircle size={40} className="text-primary" />
                </div>
                <p className="text-foreground-muted">Coming Soon</p>
              </div>
            </div>
          </div>
          
          {/* Decorative */}
          <div className="absolute -z-10 -top-4 -right-4 w-full h-full bg-primary/10 rounded-2xl" />
        </motion.div>
      </div>
    </Section>
  );
}

