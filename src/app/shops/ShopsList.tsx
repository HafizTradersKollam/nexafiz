'use client';

import Image from 'next/image';
import { Star, MapPin, Package, Lock } from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SHOPS_DATA, SHOPS_COMING_SOON } from './constants';
import { cn } from '@/lib/utils';

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
            <Card padding="none" uniform className="overflow-hidden group h-full">
              {/* Image */}
              <div className="relative h-52 overflow-hidden shrink-0">
                <Image
                  src={shop.image}
                  alt={shop.name}
                  fill
                  className={cn(
                    'object-cover transition-transform duration-500',
                    SHOPS_COMING_SOON ? 'blur-sm scale-105' : 'group-hover:scale-110'
                  )}
                  draggable={false}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                <Badge
                  variant="accent"
                  className={cn('absolute top-4 left-4', SHOPS_COMING_SOON && 'opacity-40')}
                >
                  {shop.category}
                </Badge>

                <div
                  className={cn(
                    'absolute bottom-4 left-4 right-4',
                    SHOPS_COMING_SOON && 'select-none'
                  )}
                >
                  <h3
                    className={cn(
                      'text-xl font-bold text-white mb-1',
                      SHOPS_COMING_SOON && 'blur-[3px]'
                    )}
                  >
                    {shop.name}
                  </h3>
                  <div
                    className={cn(
                      'flex items-center gap-1 text-white/80 text-sm',
                      SHOPS_COMING_SOON && 'blur-[2px]'
                    )}
                  >
                    <MapPin size={14} />
                    <span>{shop.location}</span>
                  </div>
                </div>

                {/* Coming soon image overlay */}
                {SHOPS_COMING_SOON && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-xs font-semibold text-white/90 tracking-wide">
                      Coming Soon
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={cn('p-6 flex flex-col grow', SHOPS_COMING_SOON && 'select-none')}>
                <p
                  className={cn(
                    'text-foreground-muted text-sm mb-4 line-clamp-2',
                    SHOPS_COMING_SOON && 'blur-[2px]'
                  )}
                >
                  {shop.description}
                </p>

                <div
                  className={cn(
                    'flex items-center justify-between mb-4 mt-auto',
                    SHOPS_COMING_SOON && 'blur-[2px]'
                  )}
                >
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

                {/* CTA */}
                {SHOPS_COMING_SOON ? (
                  <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border bg-surface text-foreground-muted text-sm font-medium cursor-not-allowed">
                    <Lock size={14} />
                    Available Soon
                  </div>
                ) : (
                  <button className="w-full group/btn flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border hover:border-primary/50 text-foreground text-sm font-medium transition-colors">
                    Visit Shop
                  </button>
                )}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Footer notice or Load More */}
      <AnimatedSection delay={0.3} className="mt-12">
        {SHOPS_COMING_SOON ? (
          <div className="max-w-xl mx-auto text-center px-6 py-5 rounded-2xl border border-border bg-surface">
            <p className="text-sm font-semibold text-foreground mb-1">
              Partner network launching soon
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed">
              The shops shown above are illustrative examples only. Names, ratings, locations, and
              product counts are not real and should not be relied upon. The actual partner network
              will be available once the platform goes live.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <button className="px-6 py-3 rounded-xl border border-border bg-surface text-foreground text-sm font-medium hover:border-primary/50 transition-colors">
              Load More Shops
            </button>
          </div>
        )}
      </AnimatedSection>
    </Section>
  );
}