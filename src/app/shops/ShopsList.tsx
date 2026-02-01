'use client';

import Image from 'next/image';
import { Star, MapPin, Package, ArrowRight } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SHOPS_DATA } from './constants';

export default function ShopsList() {
  return (
    <Section background="alt">
      <AnimatedSection>
        <SectionHeader
          subtitle="Featured Partners"
          title="All Partner Shops"
          description="Explore our complete network of verified shops."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {SHOPS_DATA.map((shop) => (
          <StaggerItem key={shop.id} className="h-full">
            <Card padding="none" hover uniform className="overflow-hidden group">
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                <Badge variant="accent" className="absolute top-4 left-4">
                  {shop.category}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{shop.name}</h3>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <MapPin size={14} />
                    <span>{shop.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                  {shop.description}
                </p>

                <div className="flex items-center justify-between mb-4 mt-auto">
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-accent fill-accent" />
                    <span className="font-semibold text-foreground">{shop.rating}</span>
                    <span className="text-foreground-muted text-sm">Rating</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground-muted">
                    <Package size={16} />
                    <span className="text-sm">{shop.products} Products</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full group/btn">
                  Visit Shop
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Load More */}
      <AnimatedSection delay={0.3} className="text-center mt-12">
        <Button variant="secondary" size="lg">
          Load More Shops
        </Button>
      </AnimatedSection>
    </Section>
  );
}

