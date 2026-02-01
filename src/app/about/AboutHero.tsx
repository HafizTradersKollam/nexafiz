'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';
import { COMPANY, STATS } from '@/lib/constants';

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

          <p className="text-lg text-foreground-muted leading-relaxed mb-6">
            {COMPANY.name} is a consumer-driven digital business platform that enables people to earn 
            income from their everyday shopping. We believe daily expenses should create value, not disappear.
          </p>

          <div className="space-y-4 mb-8">
            <div className="p-4 bg-surface border border-border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Our Vision</h3>
              <p className="text-foreground-muted text-sm">
                To make financial freedom accessible to everyone through technology-driven, 
                zero-risk entrepreneurship.
              </p>
            </div>
            <div className="p-4 bg-surface border border-border rounded-xl">
              <h3 className="font-semibold text-foreground mb-2">Our Mission</h3>
              <p className="text-foreground-muted text-sm">
                To build a transparent and sustainable earning ecosystem by connecting shops, 
                customers, and opportunity seekers into one powerful network.
              </p>
            </div>
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
                <div className="text-xl lg:text-2xl font-bold text-primary">{stat.value}</div>
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
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
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
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-light rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-light rounded-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

