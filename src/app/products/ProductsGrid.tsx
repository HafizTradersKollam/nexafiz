'use client';

import Image from 'next/image';
import { ExternalLink, ShoppingBag, ArrowRight, Package, Zap } from 'lucide-react';
import Section from '@/components/ui/Section';
import AnimatedSection, { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { PRODUCT_CATEGORIES, STORE_BASE } from './constants';

export default function ProductsGrid() {
  return (
    <Section>
      {/* Live store banner */}
      <AnimatedSection className="mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
              <Package size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Live Product Store</p>
              <p className="text-xs text-foreground-muted">
                Real products from store.nexafizglobal.com — click any category to shop
              </p>
            </div>
          </div>
          <a
            href={STORE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm shadow-primary/25"
          >
            <ShoppingBag size={15} />
            Browse All Products
            <ExternalLink size={13} />
          </a>
        </div>
      </AnimatedSection>

      {/* Category cards */}
      <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCT_CATEGORIES.map((cat, index) => (
          <StaggerItem key={cat.id} className="h-full">
            <a
              href={cat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full block group"
            >
              <div className="h-full rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 flex flex-col">

                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-background-alt shrink-0">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* BV badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-primary-light/90 backdrop-blur-sm rounded-full">
                    <Zap size={11} className="text-primary" />
                    <span className="text-xs font-bold text-primary">Earns BV</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-primary font-semibold text-sm shadow-lg">
                      <ShoppingBag size={15} />
                      Shop Now
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <ArrowRight
                      size={16}
                      className="text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-background border border-border text-xs text-foreground-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Bottom CTA */}
      <AnimatedSection delay={0.3} className="mt-12 text-center">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-sm text-foreground-muted">
            Don&apos;t see what you&apos;re looking for? Browse the full store.
          </p>
          <a
            href={STORE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            <ShoppingBag size={18} />
            Visit Full Store
            <ExternalLink size={15} />
          </a>
          <p className="text-xs text-foreground-muted">
            Every purchase generates Business Volume (BV) that contributes to your earnings.
          </p>
        </div>
      </AnimatedSection>
    </Section>
  );
}