"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const applications = [
  {
    num: "01",
    title: "Food & Beverage",
    description: "Sauces, snacks, bakery, and beverage flavor systems requiring batch-to-batch consistency.",
  },
  {
    num: "02",
    title: "Flavor & Fragrance",
    description: "Base notes and modifiers for compounders building proprietary accords.",
  },
  {
    num: "03",
    title: "Nutraceutical",
    description: "Standardized actives for functional foods, supplements, and encapsulation.",
  },
  {
    num: "04",
    title: "Personal Care",
    description: "Natural aromatic bases for soap, cosmetic, and home fragrance formulation.",
  }
];

export function Applications() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".app-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="applications" 
      className="relative py-28 lg:py-40 bg-charcoal text-ivory grain overflow-hidden"
    >
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Editorial Section Header */}
        <div className="mb-16 lg:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ivory/10 pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-px bg-brass/60" />
              <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-brass font-medium">
                Applications
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.8rem)] leading-[1.05] tracking-[-0.02em] font-medium text-ivory max-w-[700px]">
              Formulated for <em className="italic text-brass font-light">precision</em> across sectors.
            </h2>
          </div>
          <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/30 md:text-right">
            <span>SECTORS: 04</span><br />
            <span>INTEGRATION: BATCH-TO-BATCH</span>
          </div>
        </div>

        {/* 2x2 Editorial Application Grid (Stacked below 1024px) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-ivory/10">
          {applications.map((app, index) => {
            const isBottomRow = index >= 2;
            const isEven = index % 2 === 0;

            return (
              <div
                key={app.num}
                className={`app-card relative p-8 sm:p-12 lg:p-16 flex flex-col justify-between transition-colors duration-500 hover:bg-ivory/[0.015] group
                  ${!isBottomRow ? "lg:border-b border-ivory/10" : ""}
                  ${isEven ? "lg:border-r border-ivory/10" : ""}
                  ${index !== applications.length - 1 ? "max-lg:border-b border-ivory/10" : ""}
                `}
              >
                {/* Technical Corner Markers on Hover */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brass/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brass/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Top Bar: Sector Eyebrow & Subtle Large Application Numeral */}
                    <div className="flex items-baseline justify-between gap-4 mb-8 lg:mb-12">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-px bg-brass/50" />
                        <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-brass font-medium">
                          Sector // {app.num}
                        </span>
                      </div>
                      <span className="font-serif text-[2.4rem] lg:text-[3.2rem] leading-none text-ivory/10 font-light select-none group-hover:text-brass/30 transition-colors duration-500">
                        {app.num}
                      </span>
                    </div>

                    {/* Application Title */}
                    <h3 className="font-serif text-[clamp(1.8rem,2.5vw,2.6rem)] leading-[1.1] tracking-[-0.02em] font-medium text-ivory mb-6 group-hover:text-brass transition-colors duration-500">
                      <em className="italic font-light">{app.title}.</em>
                    </h3>

                    {/* Hairline Divider */}
                    <div className="w-10 h-px bg-ivory/15 mb-6 group-hover:w-16 group-hover:bg-brass/40 transition-all duration-500" />

                    {/* Application Description */}
                    <p className="font-sans text-[0.95rem] lg:text-[1.05rem] leading-[1.8] text-ivory/70 font-light max-w-[480px]">
                      {app.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
