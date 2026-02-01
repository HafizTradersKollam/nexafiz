'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Eye, Zap } from 'lucide-react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from './constants';
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
              <Link href={`/products/${product.id}`} className="h-full block">
                <Card padding="none" hover uniform className="overflow-hidden group cursor-pointer">
                  {/* Image */}
                  <div className="relative h-48 bg-background-alt overflow-hidden shrink-0">
                    <Image
                      src={imageSrc}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {discount > 0 && (
                      <Badge variant="accent" className="absolute top-3 left-3">
                        {discount}% OFF
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary-light rounded-full">
                      <Zap size={12} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">{product.bv} BV</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col grow">
                    <p className="text-xs text-foreground-muted mb-1">{product.shop}</p>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      <Star size={14} className="text-accent fill-accent" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-xs text-foreground-muted">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4 mt-auto">
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

                    <Button variant="primary" size="sm" className="w-full">
                      <Eye size={16} />
                      View Details
                    </Button>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Info Note */}
      <AnimatedSection delay={0.3} className="text-center mt-12">
        <p className="text-foreground-muted text-sm">
          Click on any product to view details. To purchase, login to your NEXAFIZ account.
        </p>
      </AnimatedSection>
    </Section>
  );
}

