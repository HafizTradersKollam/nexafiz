import type { Metadata } from 'next';
import HowItWorksHero from './HowItWorksHero';
import HowItWorksSteps from './HowItWorksSteps';
import HowItWorksBenefits from './HowItWorksBenefits';
import HowItWorksFAQ from './HowItWorksFAQ';

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Learn how NEXAFIZ transforms your daily shopping into income. Simple steps: Sign up, shop essentials, build your network, and earn automatically.',
};

export default function HowItWorksPage() {
  return (
    <>
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksBenefits />
      <HowItWorksFAQ />
    </>
  );
}

