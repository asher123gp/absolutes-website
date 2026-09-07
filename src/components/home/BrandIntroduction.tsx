"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function BrandIntroduction() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".brand-intro-text", { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(".brand-intro-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
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
      className="py-[20vh] bg-ivory text-charcoal relative z-10"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-center">
        
        <div className="max-w-[700px]">
          <h2 className="brand-intro-text font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] font-medium">
            From botanical <br className="hidden sm:block" />
            <em className="italic text-botanical font-light">origin</em> to concentrated <br className="hidden sm:block" />
            <em className="italic text-brass font-light">essence.</em>
          </h2>
        </div>

        <div className="max-w-[500px]">
          <div className="brand-intro-text flex items-center gap-4 mb-6">
            <span className="w-10 h-px bg-charcoal/30" />
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-charcoal/60 font-medium">
              The Process
            </span>
          </div>
          <p className="brand-intro-text font-sans text-[1.1rem] leading-[1.8] text-charcoal/80 font-light mb-8">
            Every batch moves through the same spiral: raw spice, solvent or steam, concentration, and finally — the absolute. It&apos;s a controlled process built for repeatable, testable purity.
          </p>
        </div>

      </div>
    </section>
  );
}
