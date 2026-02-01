'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, MapPin, Package } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SHOPS_DATA } from '@/app/shops/constants';

export default function ShopsPreviewSection() {
  const displayShops = SHOPS_DATA.slice(0, 3);

  return (
    <Section background="alt" id="shops-preview">
      <AnimatedSection>
        <SectionHeader
          subtitle="Partner Shops"
          title="Trusted Shops, Real Products"
          description="Shop from our verified partner stores and earn with every purchase. Quality products, transparent transactions."
        />
      </AnimatedSection>

      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {displayShops.map((shop) => (
          <StaggerItem key={shop.id} className="h-full">
            <Card padding="none" hover uniform className="overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden shrink-0">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <Badge variant="accent" className="absolute top-4 left-4">
                  {shop.category}
                </Badge>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {shop.name}
                  </h3>
                  <div className="flex items-center gap-1 text-accent">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-medium">{shop.rating}</span>
                  </div>
                </div>

                <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                  {shop.description}
                </p>

                <div className="flex items-center justify-between text-sm mt-auto">
                  <div className="flex items-center gap-1 text-foreground-muted">
                    <MapPin size={14} />
                    <span>{shop.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-foreground-muted">
                    <Package size={14} />
                    <span>{shop.products} Products</span>
                  </div>
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatedSection delay={0.3} className="text-center">
        <Link href="/shops">
          <Button size="lg" variant="outline" className="group">
            View All Shops
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </AnimatedSection>
    </Section>
  );
}

