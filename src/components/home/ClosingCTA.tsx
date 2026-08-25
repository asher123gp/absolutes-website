"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export function ClosingCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-stagger",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="contact" className="py-32 lg:py-40 bg-charcoal text-ivory relative z-10 border-t border-ivory/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center text-center">
        
        <div className="cta-stagger flex items-center gap-4 mb-8">
          <span className="w-10 h-px bg-brass/50" />
          <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-brass font-medium">
            Formulate with precision
          </span>
          <span className="w-10 h-px bg-brass/50" />
        </div>

        <h2 className="cta-stagger font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[1] tracking-[-0.02em] font-medium mb-12">
          Ready to work <br />
          with <em className="italic text-ivory/60 font-light">pure</em> extracts?
        </h2>

        <p className="cta-stagger font-sans text-[1rem] lg:text-[1.1rem] leading-[1.8] text-ivory/60 font-light max-w-[600px] mb-16">
          Request a sample kit or full documentation package. Most quotes are returned within one business day.
        </p>

        <div className="cta-stagger flex flex-col sm:flex-row gap-6">
          <Link 
            href="/request-sample"
            className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase text-charcoal bg-ivory px-12 py-5 transition-transform duration-500 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-charcoal transition-colors duration-500">
              Request a Sample
            </span>
          </Link>

          <Link 
            href="/request-quote"
            className="group relative inline-flex items-center justify-center overflow-hidden font-sans border border-ivory/20 text-ivory px-12 py-5 text-[0.75rem] font-medium tracking-[0.1em] uppercase hover:border-ivory/40 transition-colors duration-500"
          >
            <span className="absolute inset-0 bg-ivory -translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500">
              Request a Quote
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
