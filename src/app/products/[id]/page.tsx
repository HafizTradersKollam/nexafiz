import { notFound } from 'next/navigation';
import { PRODUCTS_DATA } from '../constants';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all products
export function generateStaticParams() {
  return PRODUCTS_DATA.map((product) => ({
    id: product.id,
  }));
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    return { title: 'Product Not Found | NEXAFIZ' };
  }

  return {
    title: `${product.name} | NEXAFIZ`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS_DATA.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const productImages = product.images as readonly string[];

  return (
    <ProductDetailClient
      product={product}
      productImages={productImages}
      discount={discount}
    />
  );
}

