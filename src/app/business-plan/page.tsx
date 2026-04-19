import type { Metadata } from 'next';
import BusinessPlanPage from './BusinessPlanPage';

export const metadata: Metadata = {
  title: 'Business Plan | Nexafiz',
  description:
    'Full transparency on the Nexafiz direct selling business plan — compensation structure, binary income model, eligibility, and legal compliance per Consumer Protection Rules 2021.',
};

export default function Page() {
  return <BusinessPlanPage />;
}