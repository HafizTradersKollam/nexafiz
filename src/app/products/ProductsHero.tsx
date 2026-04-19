"use client";

import { motion } from "framer-motion";
import { Package, TrendingUp, Tag, Clock } from "lucide-react";
import Section from "@/components/ui/Section";

const highlights = [
  { icon: Package, label: "1000+ Products" },
  { icon: TrendingUp, label: "Earn BV on Every Purchase" },
  { icon: Tag, label: "Best Prices" },
];

export default function ProductsHero() {
  return (
    <Section className="pt-32 lg:pt-40 pb-12" background="alt">
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent-light rounded-full">
            Product Catalog
          </span>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6">
            Explore <span className="gradient-text-accent">Products</span>
          </h1>

          <p className="text-lg text-foreground-muted leading-relaxed mb-6">
            Browse through our extensive catalog of essential products. Every
            purchase generates Business Volume (BV) that contributes to your
            earnings.
          </p>

          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-5 py-3 mb-8 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-sm font-medium"
          >
            <Clock size={16} className="shrink-0" />
            <span>
              Products shown below are for illustration only. Real catalog
              launches soon.
            </span>
          </motion.div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full"
              >
                <item.icon size={18} className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
