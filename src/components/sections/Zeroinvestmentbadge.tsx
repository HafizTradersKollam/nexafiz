'use client';

import { useState } from 'react';
import { ShoppingCart, Clock, Users, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  {
    icon: ShoppingCart,
    colorClass: 'bg-emerald-50 text-emerald-700',
    title: 'No extra cost to start',
    desc: 'You already buy daily essentials — groceries, household products, personal care. Here, that same spending becomes the foundation of a business. There&aposs no separate capital required.',
  },
  {
    icon: Clock,
    colorClass: 'bg-blue-50 text-blue-700',
    title: 'Why there&aposs no risk',
    desc: 'Traditional businesses demand lakhs in investment, a physical location, staff wages, and ongoing overhead — all before earning a rupee. This model removes every one of those barriers. You don&apost risk what you don&apost spend.',
  },
  {
    icon: Users,
    colorClass: 'bg-amber-50 text-amber-700',
    title: 'Earn through your network',
    desc: 'When you refer family and friends across India, every purchase they make generates income for you — automatically. Your network becomes an asset that grows over time.',
  },
];

const PILLS = [
  'Quality products at lower prices',
  'Pan-India reach',
  'Passive income model',
  'No storefront needed',
  'Shop → Share → Earn',
];

export default function ZeroInvestmentBadge() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Badge Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-light text-primary text-sm font-medium rounded-full mb-6 hover:bg-primary/10 transition-colors"
      >
        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        Zero Investment · Zero Risk
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 z-50 w-[360px] sm:w-[420px] bg-background border border-border rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-border">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Zero Investment · Zero Risk
                </p>
                <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                  A new approach to earning — built around what you already spend, not extra capital.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-3 mt-0.5 p-1 rounded-lg hover:bg-surface transition-colors text-foreground-muted hover:text-foreground shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Sections */}
            <div className="px-5 py-4 flex flex-col gap-4">
              {SECTIONS.map((s, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.colorClass}`}>
                    <s.icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-0.5">{s.title}</p>
                    <p className="text-xs text-foreground-muted leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pills */}
            <div className="px-5 pb-4 flex flex-wrap gap-2">
              {PILLS.map((pill) => (
                <span
                  key={pill}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-border text-foreground-muted"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Legal Footer */}
            <div className="px-5 py-3 bg-surface border-t border-border">
              <p className="text-[11px] text-foreground-muted leading-relaxed">
                Earnings depend on your personal purchasing activity and the size and activity of your network. This is a supplemental income model — not a guaranteed salary or investment scheme. Please review full terms before joining.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}