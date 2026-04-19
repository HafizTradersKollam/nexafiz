'use client';

import { UserPlus, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { PROCESS_STEPS } from './constants';

const iconMap: Record<string, React.ElementType> = {
  UserPlus,
  ShoppingBag,
  Users,
  TrendingUp,
};

export default function HowItWorksSteps() {
  return (
    <Section>
      <AnimatedSection>
        <SectionHeader
          subtitle="Step by Step"
          title="Your Journey to Financial Freedom"
          description="Follow these simple steps to start earning from your daily purchases."
        />
      </AnimatedSection>

      <StaggerContainer className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-accent to-primary hidden sm:block" />

        {PROCESS_STEPS.map((step, index) => {
          const Icon = iconMap[step.icon] || UserPlus;
          const isEven = index % 2 === 0;

          return (
            <StaggerItem key={step.step}>
              <div className={`relative flex items-center gap-6 mb-12 last:mb-0 ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Step Number Circle */}
                <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10 hidden sm:flex">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-primary to-primary-dark text-white text-xl font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {step.step}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${isEven ? 'lg:pr-24 lg:text-right' : 'lg:pl-24'} sm:pl-24 lg:pl-0`}>
                  <div className="p-6 bg-surface border border-border rounded-2xl hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <div className="sm:hidden w-10 h-10 rounded-full bg-primary text-white text-lg font-bold flex items-center justify-center">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-foreground-muted">{step.description}</p>
                  </div>
                </div>

                <div className="flex-1 hidden lg:block" />
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

