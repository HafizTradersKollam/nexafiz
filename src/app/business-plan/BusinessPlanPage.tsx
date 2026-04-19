'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  ArrowLeftRight,
  CalendarCheck,
  BadgeCheck,
  AlertTriangle,
  RefreshCw,
  Headphones,
  Scale,
  ChevronDown,
  IndianRupee,
  TrendingUp,
  Zap,
  Store,
  FileText,
} from 'lucide-react';
import Section, { SectionHeader } from '@/components/ui/Section';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { cn } from '@/lib/utils';

// ─── Income Calculator ────────────────────────────────────────────────────────

function IncomeCalculator() {
  const [left, setLeft] = useState(10000);
  const [right, setRight] = useState(10000);
  const RATE = 0.1;
  const MAX_PAYOUT = 130000;

  const matching = Math.min(left, right);
  const rawCommission = matching * RATE;
  const commission = Math.min(rawCommission, MAX_PAYOUT);
  const excess = Math.max(left, right) - matching;
  const capped = rawCommission > MAX_PAYOUT;

  return (
    <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
          <IndianRupee size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-foreground">Income Calculator</h3>
          <p className="text-xs text-foreground-muted">Based on matching binary volume</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Left Team */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Left Team Volume (₹)
          </label>
          <input
            type="number"
            value={left}
            min={0}
            onChange={(e) => setLeft(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          <input
            type="range"
            min={0}
            max={500000}
            step={1000}
            value={left}
            onChange={(e) => setLeft(Number(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </div>

        {/* Right Team */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Right Team Volume (₹)
          </label>
          <input
            type="number"
            value={right}
            min={0}
            onChange={(e) => setRight(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
          <input
            type="range"
            min={0}
            max={500000}
            step={1000}
            value={right}
            onChange={(e) => setRight(Number(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </div>
      </div>

      {/* Result */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-background border border-border rounded-xl p-4 text-center">
          <p className="text-xs text-foreground-muted mb-1">Matching Volume</p>
          <p className="text-lg font-bold text-foreground font-mono">
            ₹{matching.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
          <p className="text-xs text-primary mb-1 font-medium">Your Commission (10%)</p>
          <p className="text-lg font-bold text-primary font-mono">
            ₹{commission.toLocaleString('en-IN')}
          </p>
          {capped && (
            <p className="text-[10px] text-amber-600 mt-1">Capped at ₹1,30,000</p>
          )}
        </div>
        <div className="bg-background border border-border rounded-xl p-4 text-center">
          <p className="text-xs text-foreground-muted mb-1">Carry Forward</p>
          <p className="text-lg font-bold text-foreground font-mono">
            ₹{excess.toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      <p className="text-xs text-foreground-muted mt-4 text-center">
        Income paid every 10 days — on 1st, 11th & 21st of each month via banking channels.
        Minimum payout ₹100. Maximum ₹1,30,000 per cycle.
      </p>
    </div>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────

function AccordionItem({
  number,
  title,
  icon: Icon,
  children,
  accent = false,
}: {
  number: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  accent?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        'border rounded-2xl overflow-hidden transition-all duration-200',
        open ? 'border-primary/40 shadow-sm shadow-primary/10' : 'border-border',
        accent && !open && 'border-amber-200 bg-amber-50/30'
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface/60 transition-colors"
      >
        <span className="text-xs font-mono text-foreground-muted w-6 shrink-0">{number}</span>
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
            accent ? 'bg-amber-100' : 'bg-primary-light'
          )}
        >
          <Icon size={17} className={accent ? 'text-amber-600' : 'text-primary'} />
        </div>
        <span className="flex-1 font-semibold text-foreground text-sm">{title}</span>
        <ChevronDown
          size={16}
          className={cn(
            'text-foreground-muted transition-transform duration-200 shrink-0',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-0 ml-15 text-sm text-foreground-muted leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const QUICK_FACTS = [
  { icon: Users, label: 'Min. Age', value: '18 Years' },
  { icon: BadgeCheck, label: 'Registration', value: 'Free' },
  { icon: IndianRupee, label: 'Min. Payout', value: '₹100' },
  { icon: IndianRupee, label: 'Max. Payout', value: '₹1,30,000' },
  { icon: CalendarCheck, label: 'Pay Cycle', value: 'Every 10 Days' },
  { icon: Shield, label: 'KYC Required', value: 'PAN + Aadhaar' },
];

export default function BusinessPlanPage() {
  return (
    <>
      {/* ── Hero ── */}
      <Section className="pt-32 lg:pt-40 pb-12" background="alt">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary-light rounded-full">
              <FileText size={14} />
              Direct Selling Business Plan
            </span>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
              How <span className="gradient-text">Nexafiz</span> Works
            </h1>

            <p className="text-lg text-foreground-muted leading-relaxed mb-4">
              A transparent overview of our product-based direct selling model — fully compliant
              with the Consumer Protection (Direct Selling) Rules, 2021.
            </p>

            <p className="text-xs text-foreground-muted/70 mb-10">
              Nexafiz Global Private Limited · Disclosure Document
            </p>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {QUICK_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 px-4 py-3 bg-surface border border-border rounded-xl text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <f.icon size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-foreground-muted">{f.label}</p>
                    <p className="text-sm font-semibold text-foreground">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ── Binary Model Visual ── */}
      <Section>
        <AnimatedSection>
          <SectionHeader
            subtitle="Compensation Structure"
            title="Binary Income Model"
            description="Build two teams — Left and Right. Income is calculated on the matched sales volume between both teams."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            {/* Tree diagram */}
            <div className="flex flex-col items-center gap-0">
              {/* You */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Users size={28} className="text-white" />
                </div>
                <span className="text-xs font-semibold text-primary mt-2">You</span>
              </div>

              {/* Connector */}
              <div className="w-px h-8 bg-border" />
              <div className="relative w-64 h-px bg-border" />

              {/* Teams */}
              <div className="flex gap-32 mt-0">
                {/* Left */}
                <div className="flex flex-col items-center gap-2 -mt-px">
                  <div className="w-px h-8 bg-border" />
                  <div className="w-14 h-14 rounded-2xl bg-primary-light border-2 border-primary/30 flex items-center justify-center">
                    <TrendingUp size={22} className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Left Team</span>
                  <span className="text-[11px] text-foreground-muted text-center max-w-[100px]">
                    Your downline on the left leg
                  </span>
                </div>

                {/* Right */}
                <div className="flex flex-col items-center gap-2 -mt-px">
                  <div className="w-px h-8 bg-border" />
                  <div className="w-14 h-14 rounded-2xl bg-accent-light border-2 border-accent/30 flex items-center justify-center">
                    <TrendingUp size={22} className="text-accent" />
                  </div>
                  <span className="text-xs font-semibold text-foreground">Right Team</span>
                  <span className="text-[11px] text-foreground-muted text-center max-w-[100px]">
                    Your downline on the right leg
                  </span>
                </div>
              </div>
            </div>

            {/* Matching explanation */}
            <div className="mt-8 flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
              <ArrowLeftRight size={20} className="text-primary shrink-0" />
              <p className="text-sm text-foreground-muted leading-relaxed">
                <span className="font-semibold text-foreground">Matching Principle:</span> Commission
                is 10% of the <em>lower</em> volume between your two teams. Excess volume carries
                forward to the next cycle.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* ── Income Calculator ── */}
      <Section background="alt">
        <AnimatedSection>
          <SectionHeader
            subtitle="Try It Yourself"
            title="Calculate Your Income"
            description="Adjust the sliders to see how matching volume translates into commission."
          />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <div className="max-w-2xl mx-auto">
            <IncomeCalculator />
          </div>
        </AnimatedSection>
      </Section>

      {/* ── Plan Sections Accordion ── */}
      <Section>
        <AnimatedSection>
          <SectionHeader
            subtitle="Full Disclosure"
            title="Business Plan Details"
            description="Everything you need to know — click any section to expand."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="max-w-3xl mx-auto flex flex-col gap-3">

            <AccordionItem number="01" title="Eligibility Criteria" icon={BadgeCheck}>
              <ul className="space-y-2 list-none">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Must be 18 years of age or above.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Legally competent to enter into a contract.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Registration is <strong className="text-foreground">free of cost</strong> — no
                  mandatory purchase required to join.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem number="02" title="KYC & Verification" icon={Shield}>
              <p className="mb-3">
                To ensure regulatory compliance, every distributor must complete KYC verification
                before their ID is activated.
              </p>
              <div className="flex flex-wrap gap-2">
                {['PAN Card', 'Aadhaar Card', 'Bank Account Details'].map((doc) => (
                  <span
                    key={doc}
                    className="px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium"
                  >
                    {doc}
                  </span>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem number="03" title="Nature of Business" icon={Scale}>
              <p className="mb-3">
                Nexafiz Global operates as a <strong className="text-foreground">direct selling entity</strong> — 
                not a pyramid or money circulation scheme.
              </p>
              <ul className="space-y-1.5">
                <li className="flex items-start gap-2">
                  <Zap size={13} className="text-primary mt-0.5 shrink-0" />
                  Income is derived only from the sale of products/services.
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={13} className="text-primary mt-0.5 shrink-0" />
                  No remuneration for mere recruitment of members.
                </li>
                <li className="flex items-start gap-2">
                  <Zap size={13} className="text-primary mt-0.5 shrink-0" />
                  Fully compliant with Indian direct selling laws.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem number="04" title="Product Purchase Policy" icon={Store}>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Distributors purchase products at Distributor Price (DP), lower than MRP.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  All purchases are optional — never mandatory.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Forced inventory loading is strictly prohibited.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem number="05" title="Sales & Recommendation Model" icon={Users}>
              <p className="mb-3">
                Distributors are encouraged to use products personally and recommend them based
                on genuine experience. Business volume is created through{' '}
                <strong className="text-foreground">actual transactions</strong>, not recruitment.
              </p>
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl text-xs text-foreground-muted">
                <TrendingUp size={14} className="text-primary shrink-0" />
                Income is generated when products are sold to real consumers.
              </div>
            </AccordionItem>

            <AccordionItem number="06" title="Income Cycle & Payment" icon={CalendarCheck}>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['1st', '11th', '21st'].map((date) => (
                  <div key={date} className="text-center p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-lg font-bold text-primary">{date}</p>
                    <p className="text-[11px] text-foreground-muted">of every month</p>
                  </div>
                ))}
              </div>
              <p>
                Payments are transferred through banking channels only. Minimum payout is{' '}
                <strong className="text-foreground">₹100</strong>. Maximum per cycle is{' '}
                <strong className="text-foreground">₹1,30,000</strong>. Excess volume beyond the
                capped limit may be flushed as per company policy.
              </p>
            </AccordionItem>

            <AccordionItem number="07" title="Partner Merchant / Tie-Up Model" icon={Store}>
              <p className="mb-3">
                The company may enter into agreements with third-party merchants including retail
                outlets, supermarkets, hotels, travel services, and textile businesses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Partner purchases may provide discounts to customers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Partner purchases may be counted as sales volume for distributors.
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem number="08" title="Refund & Return Policy" icon={RefreshCw}>
              <p>
                A reasonable return and refund policy is in place. Products can be returned as per
                company policy within the specified return period. Please contact customer care for
                details specific to your order.
              </p>
            </AccordionItem>

            <AccordionItem number="09" title="Grievance Redressal" icon={Headphones}>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Dedicated customer care support.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Structured complaint resolution process.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  Time-bound response mechanism for all queries.
                </li>
              </ul>
            </AccordionItem>

            {/* Prohibited — accent warning */}
            <AccordionItem number="10" title="Prohibited Activities" icon={AlertTriangle} accent>
              <p className="mb-3 text-amber-700">
                The company strictly prohibits the following. Violations may result in termination
                of distributorship.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Misrepresentation of income',
                  'False promises or guaranteed returns',
                  'Recruitment-based earning claims',
                  'Stockpiling',
                  'Forced purchases',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-medium border border-amber-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </AccordionItem>

          </div>
        </AnimatedSection>
      </Section>

      {/* ── Legal Compliance Declaration ── */}
      <Section background="alt">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto">
            <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <Scale size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Legal Compliance Declaration</h2>
                  <p className="text-xs text-foreground-muted">
                    As per Consumer Protection (Direct Selling) Rules, 2021
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  'The business is not a pyramid scheme.',
                  'The business is not a money circulation scheme.',
                  'The compensation is based on the actual sale of goods/services.',
                  'The company adheres to all applicable laws under the Government of India.',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BadgeCheck size={12} className="text-primary" />
                    </div>
                    <p className="text-sm text-foreground-muted">{point}</p>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-border">
                <p className="text-xs text-foreground-muted leading-relaxed">
                  This document is issued by{' '}
                  <strong className="text-foreground">Nexafiz Global Private Limited</strong> to
                  provide full transparency regarding the business model, income structure, and
                  operational framework. All income figures shown are illustrative based on the
                  compensation formula and do not constitute a guarantee of earnings. Actual income
                  depends on individual effort, network activity, and product sales.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </Section>
    </>
  );
}