import type { Metadata } from 'next';
import ShopsHero from './ShopsHero';
import ShopsCategories from './ShopsCategories';
import ShopsList from './ShopsList';

export const metadata: Metadata = {
  title: 'Partner Shops',
  description:
    'Explore our verified partner shops across groceries, fashion, electronics, and more. Shop from trusted stores and earn with every purchase.',
};

export default function ShopsPage() {
  return (
    <>
      <ShopsHero />
      <ShopsCategories />
      <ShopsList />
    </>
  );
}