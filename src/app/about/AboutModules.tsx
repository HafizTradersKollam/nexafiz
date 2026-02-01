'use client';

import Link from 'next/link';
import { ArrowRight, ShoppingCart, Network, Store, LayoutGrid, Calculator, Wallet } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { BUSINESS_MODULES } from './constants';

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart,
  Network,
  Store,
  LayoutGrid,
  Calculator,
  Wallet,
};

export default function AboutModules() {
  return (
    <Section>
      <AnimatedSection>
        <SectionHeader
          subtitle="Our Ecosystem"
          title="Business Modules"
          description="A comprehensive system designed for seamless earning from daily activities."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {BUSINESS_MODULES.map((module, index) => {
          const Icon = iconMap[module.icon] || ShoppingCart;
          return (
            <StaggerItem key={index}>
              <Card hover className="h-full group">
                <div className="w-12 h-12 rounded-xl bg-accent-light flex items-center justify-center mb-4 group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Icon size={24} className="text-accent-dark group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="mb-2">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <AnimatedSection delay={0.3} className="text-center">
        <Link href="/contact">
          <Button size="lg" className="group">
            Join NEXAFIZ Today
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </AnimatedSection>
    </Section>
  );
}

