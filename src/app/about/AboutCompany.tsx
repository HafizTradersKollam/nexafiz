"use client";

import {
  ShoppingBag,
  IndianRupee,
  Shield,
  Users,
  Wallet,
  Award,
  BadgeCheck,
} from "lucide-react";
import Section from "@/components/ui/Section";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedSection";

const FEATURES = [
  {
    icon: ShoppingBag,
    title: "Smart Shopping",
    description:
      "Find profit and value in every purchase you already make daily.",
  },
  {
    icon: IndianRupee,
    title: "Spend Now Income",
    description:
      "Make every penny a part of your financial growth — automatically.",
  },
  {
    icon: Shield,
    title: "Secure Future",
    description:
      "Build your own business empire with Nexafiz's powerful system.",
  },
];

const HIGHLIGHTS = [
  {
    icon: BadgeCheck,
    label: "Retail Profit",
    desc: "The best direct benefit that members can get.",
    color: "bg-primary-light text-primary",
  },
  {
    icon: Wallet,
    label: "Cashback Benefits",
    desc: "Earn back through your own shopping activity.",
    color: "bg-accent-light text-accent-dark",
  },
  {
    icon: Users,
    label: "Team Income",
    desc: "Bonuses from the growth of your business network.",
    color: "bg-primary-light text-primary",
  },
  {
    icon: Award,
    label: "Rewards & Incentives",
    desc: "Deserved recognition and rewards for every achievement.",
    color: "bg-accent-light text-accent-dark",
  },
];

export default function AboutCompany() {
  return (
    <>
      {/* ── About the Company ── */}
      <Section>
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent bg-accent-light rounded-full">
                About the Company
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Nexafiz: A New{" "}
                <span className="gradient-text-accent">Business Culture</span>{" "}
                for Change
              </h2>
              <p className="text-lg text-foreground-muted leading-relaxed max-w-3xl mx-auto">
                Nexafiz Global Private Limited is a fast-growing innovative
                venture in the field of direct selling. We offer a wide range of
                food products, home care, personal care, and dental care
                categories — prepared to provide the best value and quality.
              </p>
            </div>
          </AnimatedSection>

          {/* Quote banner */}
          <AnimatedSection delay={0.1}>
            <div className="relative p-6 lg:p-8 bg-primary/5 border border-primary/20 rounded-2xl mb-12 text-center overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2" />
              <p className="relative text-xl lg:text-2xl font-bold text-foreground mb-2">
                Shop Smart... Save More...{" "}
                <span className="gradient-text">Earn More!</span>
              </p>
              <p className="relative text-sm text-foreground-muted">
                Start your journey to success with Nexafiz today.
              </p>
            </div>
          </AnimatedSection>

          {/* Features */}
          <AnimatedSection delay={0.15}>
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">
              Nexafiz Features
            </h3>
          </AnimatedSection>
          <StaggerContainer className="grid sm:grid-cols-3 gap-5 mb-16">
            {FEATURES.map((f) => (
              <StaggerItem key={f.title}>
                <div className="flex flex-col items-center text-center p-6 bg-surface border border-border rounded-2xl h-full group hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <f.icon
                      size={22}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{f.title}</h4>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Business Highlights */}
          <AnimatedSection delay={0.1}>
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary bg-primary-light rounded-full">
                Business Highlights
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                A Complete Income Model for Financial Growth
              </h3>
            </div>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h) => (
              <StaggerItem key={h.label}>
                <div className="flex items-start gap-4 p-5 bg-surface border border-border rounded-2xl hover:border-primary/30 transition-colors">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${h.color}`}
                  >
                    <h.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      {h.label}
                    </h4>
                    <p className="text-sm text-foreground-muted">{h.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>
    </>
  );
}
