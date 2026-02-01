'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home, RefreshCw, AlertTriangle, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { COMPANY } from '@/lib/constants';
import { CONTAINER_PADDING, CONTAINER_MAX_WIDTH } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-error/5 via-background to-accent-light/10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-error/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

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

          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 bg-error/10 rounded-full flex items-center justify-center"
          >
            <AlertTriangle size={48} className="text-error" />
          </motion.div>

          {/* Message */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Something Went Wrong
          </h1>
          <p className="text-foreground-muted text-lg max-w-lg mx-auto mb-4">
            We apologize for the inconvenience. An unexpected error has occurred. 
            Please try again or contact our support team.
          </p>
          
          {error.digest && (
            <p className="text-foreground-subtle text-sm mb-10">
              Error ID: <code className="bg-surface px-2 py-1 rounded">{error.digest}</code>
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" onClick={reset} className="w-full sm:w-auto group">
              <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </Button>
            <Link href="/">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                <Home size={18} />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Support Link */}
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <Mail size={16} />
            Contact Support
          </Link>
        </motion.div>
      </div>
    </main>
  );
}

