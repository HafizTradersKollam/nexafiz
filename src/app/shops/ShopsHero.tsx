'use client';

import { motion } from 'framer-motion';
import { Store, MapPin, ShieldCheck, Clock } from 'lucide-react';
import Section from '@/components/ui/Section';
import { SHOPS_COMING_SOON } from './constants';

const highlights = [
  { icon: Store, label: '200+ Partner Shops' },
  { icon: MapPin, label: 'Multiple Locations' },
  { icon: ShieldCheck, label: 'Verified & Trusted' },
];

export default function ShopsHero() {
  return (
    <Section className="pt-32 lg:pt-40 pb-12" background="alt">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
            Partner Network
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Our <span className="gradient-text">Partner Shops</span>
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed mb-6">
            Shop from our network of verified partner stores. Every purchase you make contributes
            to your business volume and earning potential.
          </p>

          {/* Coming Soon Notice */}
          {SHOPS_COMING_SOON && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2.5 px-5 py-3 mb-8 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium"
            >
              <Clock size={16} className="shrink-0" />
              <span>
                Shops shown below are for illustration only. Real partner network launches soon.
              </span>
            </motion.div>
          )}

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full"
              >
                <item.icon size={18} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}