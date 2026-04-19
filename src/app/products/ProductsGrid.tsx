'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Zap, Lock } from 'lucide-react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES, PRODUCTS_COMING_SOON } from './constants';
import { formatCurrency, calculateDiscount } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState('All Products');

  const filteredProducts =
    activeCategory === 'All Products'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <Section>
      {/* Category Filter */}
      <AnimatedSection className="mb-10">
        <div className="flex flex-wrap justify-center gap-2">
          {PRODUCT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-full transition-all duration-200',
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-surface border border-border text-foreground-muted hover:text-foreground hover:border-primary/50'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </AnimatedSection>

      {/* Products Grid */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const imageSrc = product.images[0];
          const discount = calculateDiscount(product.originalPrice, product.price);

          return (
            <StaggerItem key={product.id} className="h-full">
              {/* Wrapper — not a Link since products aren't live */}
              <div className="h-full relative">
                <Card padding="none" uniform className="overflow-hidden group h-full">
                  {/* Image */}
                  <div
                    className={cn(
                      'relative h-48 bg-background-alt overflow-hidden shrink-0',
                      PRODUCTS_COMING_SOON && 'select-none'
                    )}
                  >
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className={cn(
                        'object-cover transition-transform duration-500',
                        PRODUCTS_COMING_SOON ? 'blur-sm scale-105' : 'group-hover:scale-110'
                      )}
                      draggable={false}
                    />
                    {discount > 0 && (
                      <Badge
                        variant="accent"
                        className={cn('absolute top-3 left-3', PRODUCTS_COMING_SOON && 'opacity-40')}
                      >
                        {discount}% OFF
                      </Badge>
                    )}
                    <div
                      className={cn(
                        'absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary-light rounded-full',
                        PRODUCTS_COMING_SOON && 'opacity-40'
                      )}
                    >
                      <Zap size={12} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">{product.bv} BV</span>
                    </div>

                    {/* Coming soon overlay on image */}
                    {PRODUCTS_COMING_SOON && (
                      <div className="absolute inset-0 bg-background/30 flex items-center justify-center">
                        <span className="px-3 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-full text-xs font-semibold text-foreground-muted tracking-wide">
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={cn(
                      'p-4 flex flex-col grow',
                      PRODUCTS_COMING_SOON && 'select-none'
                    )}
                  >
                    <p
                      className={cn(
                        'text-xs text-foreground-muted mb-1',
                        PRODUCTS_COMING_SOON && 'blur-[3px]'
                      )}
                    >
                      {product.shop}
                    </p>
                    <h3
                      className={cn(
                        'font-semibold text-foreground mb-2 line-clamp-1',
                        PRODUCTS_COMING_SOON && 'blur-[2px]'
                      )}
                    >
                      {product.name}
                    </h3>

                    <div
                      className={cn(
                        'flex items-center gap-1 mb-3',
                        PRODUCTS_COMING_SOON && 'blur-[2px]'
                      )}
                    >
                      <Star size={14} className="text-accent fill-accent" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-xs text-foreground-muted">({product.reviews})</span>
                    </div>

                    <div
                      className={cn(
                        'flex items-center justify-between mb-4 mt-auto',
                        PRODUCTS_COMING_SOON && 'blur-[2px]'
                      )}
                    >
                      <div>
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="ml-2 text-sm text-foreground-muted line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Locked CTA */}
                    {PRODUCTS_COMING_SOON ? (
                      <div className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-border bg-surface text-foreground-muted text-sm font-medium cursor-not-allowed">
                        <Lock size={14} />
                        Available Soon
                      </div>
                    ) : null}
                  </div>
                </Card>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {PRODUCTS_COMING_SOON && (
        <AnimatedSection delay={0.3} className="mt-12">
          <div className="max-w-xl mx-auto text-center px-6 py-5 rounded-2xl border border-border bg-surface">
            <p className="text-sm font-semibold text-foreground mb-1">
              Product catalog launching soon
            </p>
            <p className="text-xs text-foreground-muted leading-relaxed">
              The products shown above are illustrative examples only. Prices, names, ratings, and
              availability are not real and should not be relied upon. The actual catalog will be
              available once the platform goes live.
            </p>
          </div>
        </AnimatedSection>
      )}
    </Section>
  );
}