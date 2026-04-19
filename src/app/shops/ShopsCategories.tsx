'use client';

import { ShoppingCart, Shirt, Smartphone, Home, Sparkles, Store } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SHOP_CATEGORIES, SHOPS_COMING_SOON } from './constants';
import { cn } from '@/lib/utils';

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
              <Card
                className={cn(
                  'text-center group',
                  SHOPS_COMING_SOON ? 'cursor-not-allowed' : 'hover:cursor-pointer'
                )}
                hover={!SHOPS_COMING_SOON}
              >
                <div
                  className={cn(
                    'w-14 h-14 mx-auto rounded-xl bg-primary-light flex items-center justify-center mb-3 transition-all duration-300',
                    SHOPS_COMING_SOON ? 'opacity-50' : 'group-hover:bg-primary group-hover:scale-110'
                  )}
                >
                  <Icon
                    size={28}
                    className={cn(
                      'text-primary transition-colors',
                      !SHOPS_COMING_SOON && 'group-hover:text-white'
                    )}
                  />
                </div>
                <h3
                  className={cn(
                    'font-semibold text-foreground text-sm mb-1',
                    SHOPS_COMING_SOON && 'blur-[2px] select-none'
                  )}
                >
                  {category.name}
                </h3>
                <p
                  className={cn(
                    'text-xs text-foreground-muted',
                    SHOPS_COMING_SOON && 'blur-[2px] select-none'
                  )}
                >
                  {category.count} Shops
                </p>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </Section>
  );
}