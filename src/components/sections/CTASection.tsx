'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { COMPANY } from '@/lib/constants';

const benefits = [
  'No investment required',
  'No selling pressure',
  'Earn from daily purchases',
  'Transparent earnings',
];

export default function CTASection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Accent Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl" />

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <AnimatedSection>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-full mb-8 backdrop-blur-md border border-white/10"
          >
            <Sparkles size={16} className="text-accent" />
            Start Today, Earn Tomorrow
          </motion.div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Ready to Transform Your{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                Daily Shopping
              </span>
            </span>{' '}
            Into Income?
          </h2>

          {/* Description */}
          <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join members who are already earning from their everyday purchases.
            Zero investment, zero risk — just shop and earn.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-white/90 text-sm sm:text-base"
              >
                <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center shrink-0">
                  <CheckCircle size={14} className="text-primary" />
                </div>
                <span>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-linear-to-r from-primary to-primary-dark text-white hover:opacity-90 shadow-xl shadow-primary/30 group px-8"
              >
                Join {COMPANY.name} Free
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  );
}

