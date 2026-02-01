'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, ShoppingBag, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { COMPANY } from '@/lib/constants';
import { CONTAINER_PADDING, CONTAINER_MAX_WIDTH } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

// Meaningful business highlights instead of fake numbers
const HIGHLIGHTS = [
  { icon: ShoppingBag, label: 'Shop Daily Essentials', description: 'Groceries, Fashion & More' },
  { icon: Users, label: 'Build Your Network', description: 'Invite Family & Friends' },
  { icon: TrendingUp, label: 'Earn Automatically', description: 'From Every Purchase' },
  { icon: Shield, label: 'Zero Investment', description: 'No Risk, No Capital' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 lg:pt-28 pb-16 overflow-hidden">
      {/* Clean Background - No floating emojis */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-light/30 via-background to-accent-light/20" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent" />

      {/* Subtle gradient orbs for modern look */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className={cn('mx-auto relative z-10', CONTAINER_MAX_WIDTH, CONTAINER_PADDING)}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-medium rounded-full mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Zero Investment • Zero Risk
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              <span className="text-foreground">Turn Your </span>
              <span className="gradient-text">Daily Life</span>
              <br />
              <span className="text-foreground">Into </span>
              <span className="gradient-text-accent">Income</span>
            </h1>

            <p className="text-lg lg:text-xl text-foreground-muted leading-relaxed mb-8 max-w-xl">
              {COMPANY.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contact">
                <Button size="lg" className="w-full sm:w-auto group">
                  Get Started Free
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Play size={18} className="text-primary" />
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Business Highlights - No fake numbers */}
            <div className="grid grid-cols-2 gap-4">
              {HIGHLIGHTS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-surface/50 backdrop-blur-sm rounded-xl border border-border/50"
                >
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.label}</div>
                    <div className="text-xs text-foreground-muted">{item.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-12 border-2 border-dashed border-accent/30 rounded-full"
              />

              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-surface rounded-3xl shadow-2xl p-6 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt={`${COMPANY.name} Logo`}
                    width={180}
                    height={180}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Floating Cards - Meaningful content instead of fake numbers */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -right-4 top-20 bg-surface border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <Zap size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-muted">Simple Process</div>
                    <div className="text-sm font-bold text-foreground">Shop → Share → Earn</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-4 bottom-24 bg-surface border border-border rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-light rounded-full flex items-center justify-center">
                    <Shield size={20} className="text-accent-dark" />
                  </div>
                  <div>
                    <div className="text-xs text-foreground-muted">100% Secure</div>
                    <div className="text-sm font-bold text-foreground">Zero Risk Model</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

