import type { Metadata } from 'next';
import ProductsHero from './ProductsHero';
import ProductsGrid from './ProductsGrid';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Browse essential products from our partner shops. Every purchase generates Business Volume (BV) and contributes to your earnings.',
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductsGrid />
    </>
  );
}

