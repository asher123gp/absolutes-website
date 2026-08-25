"use client";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const steps = [
  {
    number: "01",
    title: "Sourced",
    description:
      "Whole spice lots selected and verified at origin, from growers we track by region and harvest.",
    color: "#B8964E",
  },
  {
    number: "02",
    title: "Extracted",
    description:
      "Steam distillation for volatile oils; solvent extraction for full-spectrum oleoresins.",
    color: "#A3834A",
  },
  {
    number: "03",
    title: "Concentrated",
    description:
      "Solvent recovery and vacuum concentration bring each lot to standardized potency.",
    color: "#7A2B3A",
  },
  {
    number: "04",
    title: "Verified",
    description:
      "GC-MS profiling and COA issued before a single drop ships to your facility.",
    color: "#6B7F5E",
  },
];

export function Process() {
  return (
    <section id="process" className="py-28 lg:py-36 bg-ivory">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealOnScroll>
          <div className="max-w-[640px] mb-20">
            <SectionEyebrow>Our Philosophy</SectionEyebrow>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] font-semibold text-espresso leading-[1.12] mt-5">
              Dynamic extraction,
              <br className="hidden sm:block" />
              into one pure drop.
            </h2>
            <p className="mt-5 text-muted text-[1rem] font-light leading-relaxed max-w-[540px]">
              Every batch moves through the same spiral: raw spice, solvent or
              steam, concentration, and finally — the absolute. It&apos;s a
              controlled process built for repeatable, testable purity.
            </p>
          </div>
        </RevealOnScroll>

        {/* Process Timeline — Editorial vertical on desktop */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div
            className="hidden lg:block absolute left-[60px] top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(180deg, #B8964E, #A3834A, #7A2B3A, #6B7F5E)",
              opacity: 0.25,
            }}
            aria-hidden="true"
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.number} delay={i * 0.12}>
                <div className="flex gap-8 lg:gap-14 items-start py-8 lg:py-10 border-b border-hairline last:border-b-0 group">
                  {/* Number + Dot */}
                  <div className="flex flex-col items-center shrink-0 w-[48px] lg:w-[72px]">
                    <div
                      className="w-3 h-3 rounded-full relative z-10 mb-3"
                      style={{ backgroundColor: step.color }}
                    />
                    <span
                      className="font-serif text-[2rem] lg:text-[2.8rem] font-light leading-none"
                      style={{ color: step.color, opacity: 0.7 }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <h3 className="text-[1.1rem] font-semibold text-espresso mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[0.9rem] text-muted font-light leading-relaxed max-w-[460px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
