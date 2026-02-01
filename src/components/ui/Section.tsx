import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Professional spacing - consistent across the entire application
export const CONTAINER_PADDING = 'px-6 sm:px-8 lg:px-16 xl:px-20 2xl:px-24';
export const CONTAINER_MAX_WIDTH = 'max-w-[1400px]';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt' | 'surface' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  fullWidth?: boolean;
}

export default function Section({
  children,
  className,
  id,
  background = 'default',
  padding = 'lg',
  fullWidth = false,
}: SectionProps) {
  const backgrounds = {
    default: 'bg-background',
    alt: 'bg-background-alt',
    surface: 'bg-surface',
    gradient: 'bg-gradient-to-br from-primary-light to-accent-light',
  };

  const paddings = {
    none: '',
    sm: 'py-10 lg:py-14',
    md: 'py-14 lg:py-20',
    lg: 'py-20 lg:py-28',
    xl: 'py-24 lg:py-36',
  };

  return (
    <section id={id} className={cn(backgrounds[background], paddings[padding], className)}>
      <div className={cn(
        'mx-auto',
        CONTAINER_PADDING,
        fullWidth ? 'max-w-[1920px]' : CONTAINER_MAX_WIDTH
      )}>
        {children}
      </div>
    </section>
  );
}

// Section Header Component
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary-light rounded-full">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-foreground-muted text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}

