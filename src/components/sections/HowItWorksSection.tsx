'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { HOW_IT_WORKS_STEPS } from '@/app/home/constants';

export default function HowItWorksSection() {
  return (
    <Section id="how-it-works">
      <AnimatedSection>
        <SectionHeader
          subtitle="Simple Process"
          title="How NEXAFIZ Works"
          description="Start your journey to financial freedom in just a few simple steps. No complexity, no hidden fees."
        />
      </AnimatedSection>

      <StaggerContainer className="relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary -translate-y-1/2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
          {HOW_IT_WORKS_STEPS.slice(0, 6).map((item, index) => (
            <StaggerItem key={item.step}>
              <div className="relative group">
                {/* Step Number */}
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-bold flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>

                {/* Content Card */}
                <div className="text-center p-6 bg-surface border border-border rounded-2xl group-hover:border-primary/30 group-hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight className="text-primary rotate-90" size={24} />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>

      {/* CTA */}
      <AnimatedSection delay={0.4} className="text-center mt-12">
        <Link href="/how-it-works">
          <Button size="lg" className="group">
            Learn More
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </AnimatedSection>
    </Section>
  );
}

