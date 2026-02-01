'use client';

import {
  ShoppingBag,
  Users,
  Shield,
  Zap,
  Globe,
  BarChart3,
} from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card, { CardTitle, CardDescription } from '@/components/ui/Card';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { FEATURES } from '@/app/home/constants';

const iconMap: Record<string, React.ElementType> = {
  ShoppingBag,
  Users,
  Shield,
  Zap,
  Globe,
  BarChart3,
};

export default function FeaturesSection() {
  return (
    <Section background="alt" id="features">
      <AnimatedSection>
        <SectionHeader
          subtitle="Why NEXAFIZ?"
          title="Everything You Need to Succeed"
          description="A complete ecosystem designed to help you earn from everyday purchases without any investment or selling pressure."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {FEATURES.map((feature, index) => {
          const Icon = iconMap[feature.icon] || ShoppingBag;
          return (
            <StaggerItem key={index}>
              <Card hover className="h-full group">
                <div className="w-14 h-14 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="mb-3">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

