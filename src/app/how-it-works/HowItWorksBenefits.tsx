'use client';

import { Wallet, ShieldCheck, TrendingUp, Users, Gift, Clock, Sparkles, Award } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { DS_BENEFITS } from '../about/constants';

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  ShieldCheck,
  TrendingUp,
  Users,
  Gift,
  Clock,
  Sparkles,
  Award,
};

export default function HowItWorksBenefits() {
  return (
    <Section background="alt">
      <AnimatedSection>
        <SectionHeader
          subtitle="Why Choose Us"
          title="Benefits of NEXAFIZ"
          description="Discover why thousands of people trust NEXAFIZ for their financial growth."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DS_BENEFITS.map((benefit, index) => {
          const Icon = iconMap[benefit.icon] || Wallet;
          return (
            <StaggerItem key={index}>
              <Card hover className="h-full text-center group">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center mb-4 shadow-lg shadow-accent/30 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-white" />
                </div>
                <CardTitle className="mb-2">{benefit.title}</CardTitle>
                <CardDescription>{benefit.description}</CardDescription>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

