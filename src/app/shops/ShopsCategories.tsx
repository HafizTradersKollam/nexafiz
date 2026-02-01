'use client';

import { ShoppingCart, Shirt, Smartphone, Home, Sparkles, Store } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SHOP_CATEGORIES } from './constants';

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart,
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Store,
};

export default function ShopsCategories() {
  return (
    <Section>
      <AnimatedSection>
        <SectionHeader
          subtitle="Browse by Category"
          title="Shop Categories"
          description="Find exactly what you need from our diverse range of partner shops."
        />
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {SHOP_CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon] || Store;
          return (
            <StaggerItem key={category.id}>
              <Card hover className="text-center cursor-pointer group">
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary-light flex items-center justify-center mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-foreground-muted">{category.count} Shops</p>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}

