'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Section from '@/components/ui/Section';
import { COMPANY, STATS } from '@/lib/constants';

const MISSION_POINTS = [
  'Make everyday essential products available at high quality and affordable prices.',
  'Provide a trusted platform that ensures stable income for individuals and families.',
  'Build a strong global network of creative entrepreneurs.',
  'Ensure long-lasting business partnerships through transparency and mutual trust.',
];

export default function AboutHero() {
  return (
    <Section className="pt-32 lg:pt-40" background="alt">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
            About NEXAFIZ
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Who <span className="gradient-text">We Are</span>
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed mb-8">
            {COMPANY.name} is a modern digital business platform that enables everyday expenses
            to become income. We believe every rupee spent should be valuable — not simply disappear.
            We are starting a revolution that transforms ordinary people into entrepreneurs.
          </p>

          {/* Vision */}
          <div className="p-5 bg-surface border border-border rounded-2xl mb-4">
            <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              Our Vision
            </h3>
            <p className="text-foreground-muted text-sm leading-relaxed">
              By combining the power of technology with ethical business values, we will lead
              millions of ordinary people to financial freedom through risk-free entrepreneurship.
              Our goal is to grow into a world-class direct selling brand and empower every
              individual to build a self-reliant future.
            </p>
          </div>

          {/* Mission */}
          <div className="p-5 bg-surface border border-border rounded-2xl mb-8">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Our Mission
            </h3>
            <p className="text-foreground-muted text-sm leading-relaxed mb-3">
              To create a transparent and sustainable income ecosystem by bringing together
              consumers, entrepreneurs, and local markets under one umbrella.
            </p>
            <ul className="space-y-2">
              {MISSION_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground-muted">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {STATS.map((stat, index) => (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className="text-center p-3 bg-surface border border-border rounded-xl"
    >
      {stat.comingSoon ? (
        <div className="flex justify-center mb-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-700 leading-tight">
            Coming Soon
          </span>
        </div>
      ) : (
        <div className="text-xl lg:text-2xl font-bold text-primary mb-1">{stat.value}</div>
      )}
      <div className="text-xs text-foreground-muted">{stat.label}</div>
    </motion.div>
  ))}
</div>
 
        </motion.div>

        {/* Image/Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <div className="relative bg-surface border border-border rounded-3xl p-8 h-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt={`${COMPANY.name} Logo`}
                width={300}
                height={300}
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-light rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}