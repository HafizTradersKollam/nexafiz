"use client";

import { Check, X, ArrowRight, ShieldCheck, TrendingUp } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const differences = [
  {
    feature: "Product Stocking",
    traditional: true,
    nexafiz: false,
    desc: "No inventory needed",
  },
  {
    feature: "Selling Pressure",
    traditional: true,
    nexafiz: false,
    desc: "Just shop, no sales",
  },
  {
    feature: "Capital Investment",
    traditional: true,
    nexafiz: false,
    desc: "Zero investment required",
  },
  {
    feature: "Financial Risk",
    traditional: true,
    nexafiz: false,
    desc: "Risk-free model",
  },
  {
    feature: "Real Purchase Income",
    traditional: false,
    nexafiz: true,
    desc: "Earn from daily buys",
  },
  {
    feature: "Transparent Tracking",
    traditional: false,
    nexafiz: true,
    desc: "Real-time analytics",
  },
  {
    feature: "Shop-Based Earnings",
    traditional: false,
    nexafiz: true,
    desc: "Local shop network",
  },
  {
    feature: "Daily Essentials Focus",
    traditional: false,
    nexafiz: true,
    desc: "Recession-proof market",
  },
];

export default function AboutDifference() {
  return (
    <Section background="alt">
      <AnimatedSection>
        <SectionHeader
          subtitle="Why We're Different"
          title="NEXAFIZ vs Traditional Models"
          description="See how our innovative approach differs from conventional direct selling models."
        />
      </AnimatedSection>

      <StaggerContainer className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Traditional Model Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-error/5 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-error/10 rounded-xl">
                  <X size={24} className="text-error" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Traditional Model
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Old-school approach
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {differences
                  .filter((d) => d.traditional)
                  .map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-3 p-3 bg-error/5 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-error/20 flex items-center justify-center shrink-0 mt-0.5">
                          <X size={14} className="text-error" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            {item.feature}
                          </span>
                          <p className="text-sm text-foreground-muted">
                            Required in traditional models
                          </p>
                        </div>
                      </li>
                    </StaggerItem>
                  ))}
              </ul>
            </div>
          </div>

          {/* NEXAFIZ Model Card */}
          <div className="bg-primary-light border-2 border-primary/20 rounded-2xl p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full -translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    NEXAFIZ Model
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    Next-generation approach
                  </p>
                </div>
              </div>

              <ul className="space-y-4">
                {differences
                  .filter((d) => d.nexafiz)
                  .map((item, index) => (
                    <StaggerItem key={index}>
                      <li className="flex items-start gap-3 p-3 bg-primary/10 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={14} className="text-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-foreground">
                            {item.feature}
                          </span>
                          <p className="text-sm text-foreground-muted">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    </StaggerItem>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <AnimatedSection className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <TrendingUp size={20} className="text-primary" />
            <span className="text-foreground font-medium">
              Join the future of direct selling
            </span>
            <ArrowRight size={18} className="text-primary" />
          </div>
        </AnimatedSection>
      </StaggerContainer>
    </Section>
  );
}
