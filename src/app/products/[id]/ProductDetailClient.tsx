'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Info, Package, Store, ChevronRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { PRODUCTS_DATA } from '../constants';

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
          <span className="text-foreground">{product.name}</span>
        </nav>
      </Section>

      {/* Product Details */}
      <Section padding="md">
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
                  className="object-cover"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4 bg-error text-white px-3 py-1 rounded-full text-sm font-medium">
                    -{discount}% OFF
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all',
                      selectedImage === index ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection>
            <div className="space-y-6">
              <div>
                <span className="text-sm text-primary font-medium">{product.category}</span>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-border'} />
                    ))}
                    <span className="text-sm text-foreground-muted ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-foreground-muted">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-foreground-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm text-success font-medium">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl">
                <Package size={24} className="text-primary" />
                <div>
                  <span className="font-semibold text-foreground">Business Volume: {product.bv} BV</span>
                  <p className="text-sm text-foreground-muted">Earn from this purchase through your network</p>
                </div>
              </div>

              <p className="text-foreground-muted leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <Store size={16} className="text-primary" />
                <span>Sold by: <strong className="text-foreground">{product.shop}</strong></span>
              </div>

              <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Info size={20} className="text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">This is a showcase only</p>
                    <p className="text-sm text-foreground-muted">To purchase, visit the partner shop or login to your NEXAFIZ account.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="https://software.nexafiz.com" className="flex-1">
                  <Button className="w-full" size="lg"><ShoppingBag size={20} /> Login to Purchase</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Features & Specifications */}
      <Section background="alt">
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Features</h2>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
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
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Specifications</h2>
              <dl className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
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

