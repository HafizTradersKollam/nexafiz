'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Check, Info, Package, Store, ChevronRight, Clock, ArrowLeft } from 'lucide-react';
import Section from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PRODUCTS_DATA, PRODUCTS_COMING_SOON } from '../constants';

type ProductType = typeof PRODUCTS_DATA[number];

interface ProductDetailClientProps {
  product: ProductType;
  productImages: readonly string[];
  discount: number;
}

export default function ProductDetailClient({ product, productImages, discount }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      {/* Breadcrumb */}
      <Section padding="none" className="pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-foreground-muted">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className={cn('text-foreground', PRODUCTS_COMING_SOON && 'blur-[3px] select-none')}>
            {product.name}
          </span>
        </nav>
      </Section>

      {/* Coming Soon Banner */}
      {PRODUCTS_COMING_SOON && (
        <Section padding="none" className="pb-2">
          <div className="flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-50 border border-amber-200">
            <Clock size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">This is a preview only</p>
              <p className="text-xs text-amber-700 leading-relaxed mt-0.5">
                Product details shown here — including name, price, ratings, and availability — are
                illustrative and not real. Do not make purchasing decisions based on this page.
                The actual catalog launches soon.
              </p>
            </div>
          </div>
        </Section>
      )}

      {/* Product Details */}
      <Section padding="md" className={cn(PRODUCTS_COMING_SOON && 'relative')}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <AnimatedSection>
            <div className="space-y-4">
              <div className="relative aspect-square bg-surface rounded-2xl overflow-hidden border border-border">
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={cn('object-cover', PRODUCTS_COMING_SOON && 'blur-sm scale-105')}
                  priority
                  draggable={false}
                />
                {discount > 0 && !PRODUCTS_COMING_SOON && (
                  <div className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{discount}% OFF
                  </div>
                )}
                {PRODUCTS_COMING_SOON && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/20">
                    <div className="px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-full text-sm font-semibold text-foreground-muted">
                      Preview Only
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => !PRODUCTS_COMING_SOON && setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                      PRODUCTS_COMING_SOON
                        ? 'border-border cursor-not-allowed opacity-50'
                        : selectedImage === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="80px"
                      className={cn('object-cover', PRODUCTS_COMING_SOON && 'blur-sm')}
                      draggable={false}
                    />
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection>
            <div className="space-y-6">
              <div className={cn(PRODUCTS_COMING_SOON && 'select-none')}>
                <span className={cn('text-sm text-primary font-medium', PRODUCTS_COMING_SOON && 'blur-[2px]')}>
                  {product.category}
                </span>
                <h1 className={cn('text-2xl lg:text-3xl font-bold text-foreground mt-1', PRODUCTS_COMING_SOON && 'blur-[3px]')}>
                  {product.name}
                </h1>
                <div className={cn('flex items-center gap-4 mt-3', PRODUCTS_COMING_SOON && 'blur-[2px]')}>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-border'} />
                    ))}
                    <span className="text-sm text-foreground-muted ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-foreground-muted">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className={cn('flex items-baseline gap-3', PRODUCTS_COMING_SOON && 'blur-[3px] select-none')}>
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-foreground-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm text-success font-medium">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              </div>

              <div className={cn('flex items-center gap-3 p-4 bg-primary/10 rounded-xl', PRODUCTS_COMING_SOON && 'blur-[2px] select-none')}>
                <Package size={24} className="text-primary" />
                <div>
                  <span className="font-semibold text-foreground">Business Volume: {product.bv} BV</span>
                  <p className="text-sm text-foreground-muted">Earn from this purchase through your network</p>
                </div>
              </div>

              <p className={cn('text-foreground-muted leading-relaxed', PRODUCTS_COMING_SOON && 'blur-[2px] select-none')}>
                {product.description}
              </p>

              <div className={cn('flex items-center gap-2 text-sm text-foreground-muted', PRODUCTS_COMING_SOON && 'blur-[2px] select-none')}>
                <Store size={16} className="text-primary" />
                <span>Sold by: <strong className="text-foreground">{product.shop}</strong></span>
              </div>

              {/* Info box — always visible, message changes */}
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    {PRODUCTS_COMING_SOON ? (
                      <>
                        <p className="font-medium text-foreground">Preview only — not a real listing</p>
                        <p className="text-sm text-foreground-muted">
                          All details on this page are illustrative. No purchase is possible at this time.
                          The real product catalog will be available when the platform launches.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="font-medium text-foreground">This is a showcase only</p>
                        <p className="text-sm text-foreground-muted">To purchase, visit the partner shop or login to your NEXAFIZ account.</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                {PRODUCTS_COMING_SOON ? (
                  <Link href="/products" className="flex-1">
                    <Button variant="secondary" className="w-full" size="lg">
                      <ArrowLeft size={18} />
                      Back to Products
                    </Button>
                  </Link>
                ) : (
                  <Link href="https://software.nexafiz.com" className="flex-1">
                    <Button className="w-full" size="lg">Login to Purchase</Button>
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Features & Specifications */}
      <Section background="alt">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className={cn('bg-surface border border-border rounded-2xl p-6', PRODUCTS_COMING_SOON && 'select-none')}>
              <h2 className="text-xl font-bold text-foreground mb-4">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className={cn('flex items-center gap-3', PRODUCTS_COMING_SOON && 'blur-[2px]')}>
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-primary" />
                    </div>
                    <span className="text-foreground-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className={cn('bg-surface border border-border rounded-2xl p-6', PRODUCTS_COMING_SOON && 'select-none')}>
              <h2 className="text-xl font-bold text-foreground mb-4">Specifications</h2>
              <dl className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className={cn('flex justify-between py-2 border-b border-border last:border-0', PRODUCTS_COMING_SOON && 'blur-[2px]')}>
                    <dt className="text-foreground-muted">{key}</dt>
                    <dd className="font-medium text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </AnimatedSection>
        </div>
      </Section>
    </>
  );
}