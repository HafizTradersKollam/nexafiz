'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NAV_LINKS, COMPANY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { CONTAINER_PADDING, CONTAINER_MAX_WIDTH } from '@/components/ui/Section';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-lg shadow-lg border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className={cn('mx-auto', CONTAINER_MAX_WIDTH, CONTAINER_PADDING)}>
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Larger Size */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt={`${COMPANY.name} Logo`}
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation - More spacing */}
          <div className="hidden lg:flex items-center gap-2 mx-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  'text-foreground-muted hover:text-foreground hover:bg-surface-hover'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions - More spacing */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle - Always render but hide until mounted */}
            <button
              onClick={toggleTheme}
              className={cn(
                'p-2.5 rounded-lg transition-all duration-200',
                'bg-surface hover:bg-surface-hover',
                'text-foreground-muted hover:text-foreground',
                !mounted && 'opacity-0'
              )}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              disabled={!mounted}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* CTA Button */}
            <Link
              href="https://member.nexafizglobal.com/login" target='_blank'
              className={cn(
                'hidden sm:flex items-center px-6 py-2.5 text-sm font-semibold rounded-lg',
                'bg-primary text-white hover:bg-primary-dark',
                'transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40'
              )}
            >
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2.5 rounded-lg transition-all duration-200',
                'bg-surface hover:bg-surface-hover',
                'text-foreground-muted hover:text-foreground'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300 ease-in-out',
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  'text-foreground-muted hover:text-foreground hover:bg-surface-hover'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="https://member.nexafizglobal.com/login" target='_blank'
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'mx-4 mt-2 px-5 py-3 text-sm font-semibold rounded-lg text-center',
                'bg-primary text-white hover:bg-primary-dark',
                'transition-all duration-200'
              )}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

