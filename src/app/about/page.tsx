import type { Metadata } from 'next';
import AboutHero from './AboutHero';
import AboutValues from './AboutValues';
import AboutDifference from './AboutDifference';
import AboutModules from './AboutModules';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about NEXAFIZ - a consumer-driven digital business platform enabling people to earn income from everyday shopping. Zero investment, zero risk.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutValues />
      <AboutDifference />
      <AboutModules />
    </>
  );
}

