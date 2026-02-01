'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search, HelpCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { COMPANY } from '@/lib/constants';
import { CONTAINER_PADDING, CONTAINER_MAX_WIDTH } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-light/30 via-background to-accent-light/20" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className={cn('mx-auto relative z-10 text-center', CONTAINER_MAX_WIDTH, CONTAINER_PADDING)}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <Image
              src="/logo.png"
              alt={`${COMPANY.name} Logo`}
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>

          {/* 404 Number */}
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[120px] sm:text-[180px] lg:text-[220px] font-black leading-none"
          >
            <span className="gradient-text">4</span>
            <span className="text-foreground-muted">0</span>
            <span className="gradient-text-accent">4</span>
          </motion.h1>

          {/* Message */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-foreground-muted text-lg max-w-md mx-auto mb-10">
            Oops! The page you&apos;re looking for seems to have wandered off. 
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto group">
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <HelpCircle size={18} />
                Contact Support
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/about" 
              className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              About Us
            </Link>
            <Link 
              href="/shops" 
              className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
            >
              <Search size={14} />
              Browse Shops
            </Link>
            <Link 
              href="/how-it-works" 
              className="flex items-center gap-2 text-foreground-muted hover:text-primary transition-colors"
            >
              <HelpCircle size={14} />
              How It Works
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

