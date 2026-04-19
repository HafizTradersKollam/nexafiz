'use client';

import { Heart, Lightbulb, TrendingUp, Users } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { CORE_VALUES } from './constants';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Lightbulb,
  TrendingUp,
  Users,
};

export default function AboutValues() {
  return (
    <Section>
      <AnimatedSection>
        <SectionHeader
          subtitle="Our Foundation"
          title="Core Values That Drive Us"
          description="These principles guide every decision we make and every feature we build."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CORE_VALUES.map((value, index) => {
          const Icon = iconMap[value.icon] || Heart;
          return (
            <StaggerItem key={index}>
              <Card hover className="text-center h-full">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-primary to-primary-dark flex items-center justify-center mb-5 shadow-lg shadow-primary/30">
                  <Icon size={32} className="text-white" />
                </div>
                <CardTitle className="mb-2">{value.title}</CardTitle>
                <CardDescription>{value.description}</CardDescription>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

