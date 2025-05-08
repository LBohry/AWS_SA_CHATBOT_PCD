import React from "react";
import { Check } from 'lucide-react';
import Link from 'next/link';

interface PricingSectionProps {
  tiers?: Tier[];
}

interface Tier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isMostPop: boolean;
}

const defaultTiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    description: "Ideal for individual AWS architects starting with AI-driven design.",
    features: [
      "AI-Powered Recommendations",
      "Basic AWS Documentation Access",
      "Community Support"
    ],
    isMostPop: false
  },
  {
    id: "pro",
    name: "Pro",
    price: 59,
    description: "Perfect for small teams building complex AWS architectures.",
    features: [
      "Advanced AI Agents",
      "Retrieval-Augmented Generation (RAG)",
      "Team Collaboration Tools",
      "Priority Email Support"
    ],
    isMostPop: true
  },
  {
    id: "business",
    name: "Business",
    price: 99,
    description: "For growing businesses needing robust AWS solutions.",
    features: [
      "Custom Fine-Tuned Models",
      "Advanced Analytics Dashboard",
      "Dedicated Account Manager",
      "24/7 Premium Support"
    ],
    isMostPop: false
  }
];

const PricingSection = ({ tiers = defaultTiers }: PricingSectionProps) => {
  return (
    <section className="isolate relative overflow-hidden bg-white dark:bg-transparent py-24 sm:py-32">
    <p className="pb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl text-purple-900 dark:text-gray-200">
      Choose the Perfect Plan for Your AWS Architecture
    </p>
    <div className="absolute -z-1 inset-0 h-[321px] w-full bg-transparent opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

    <div className="mx-auto max-w-7xl px-6 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400/90"></h2>
      </div>
      <div className="relative mt-6 pb-12">
        <svg
          viewBox="0 0 1208 1024"
          className="absolute opacity-70 -top-10 left-1/2 -z-8 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
        >
          <defs>
            <radialGradient id="pricing-gradient">
              <stop stopColor="#9333EA" />
              <stop offset={1} stopColor="#7E22CE" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div className="flow-root z-20 bg-transparent pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-3xl p-8 shadow-xl ring-1 ring-purple-200 dark:ring-gray-900/10 sm:p-10 dark:[border:1px_solid_rgba(255,255,255,.1)] bg-white dark:bg-transparent/10 ${tier.isMostPop ? 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-indigo-900/50 dark:to-purple-900/50' : ''}`}
            >
              {tier.isMostPop && (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-purple-100 dark:bg-indigo-950/50 text-purple-800 dark:text-white/90 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(147,51,234,0.2),rgba(255,255,255,0))] text-center text-sm font-semibold">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400/90">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-purple-900 dark:text-gray-200">
                    ${tier.price}
                  </span>
                  <span className="text-base font-semibold leading-7 text-purple-700 dark:text-gray-400">
                    /month
                  </span>
                </div>
                <p className="mt-6 text-base leading-7 text-purple-700 dark:text-gray-400">
                  {tier.description}
                </p>
                <ul role="list" className="mt-10 space-y-4 text-sm leading-6 text-purple-800 dark:text-gray-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400/90" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/auth/register"
                className="mt-8 block rounded-md bg-gradient-to-br from-purple-600 to-purple-700 dark:from-indigo-400 dark:to-indigo-700 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient-to-br hover:from-purple-700 hover:to-purple-800 dark:hover:from-indigo-500 dark:hover:to-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 dark:focus-visible:outline-indigo-400/90"
              >
                Get Started Today
              </Link>
            </div>
          ))}
          <div className="flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl p-8 ring-1 ring-purple-200 dark:ring-gray-900/10 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center dark:[border:1px_solid_rgba(255,255,255,.1)] bg-white dark:bg-transparent/10">
            <div className="lg:min-w-0 lg:flex-1">
              <h3 className="text-lg font-semibold leading-8 tracking-tight text-purple-600 dark:text-purple-400/90">
                Enterprise
              </h3>
              <p className="mt-1 text-base leading-7 text-purple-700 dark:text-gray-400">
                Custom solutions for large-scale AWS architecture projects. Contact us for personalized pricing and features.
              </p>
            </div>
            <Link
              href="/contact"
              className="rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-purple-600 dark:text-purple-400/90 ring-1 ring-inset ring-purple-300 dark:ring-purple-400/90 hover:ring-purple-400 dark:hover:ring-purple-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 dark:focus-visible:outline-purple-400/90"
            >
              Contact Sales <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PricingSection;