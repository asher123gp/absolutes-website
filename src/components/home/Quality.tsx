"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const metrics = [
  { value: "100%", label: "Lot Traceability", desc: "Every drum is linked to origin, harvest date, and extraction batch record." },
  { value: "GC-MS", label: "In-House Testing", desc: "Full aromatic profiling before release, with COA issued per shipment." },
  { value: "ISO", label: "Certified Facility", desc: "ISO 22000 and Kosher/Halal-certified production for global compliance." }
];

export function Quality() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Animate lines and grid
      gsap.fromTo(".tech-line-h", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
      );
      gsap.fromTo(".tech-line-v", 
        { scaleY: 0 }, 
        { scaleY: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
      );

      // Reveal metrics
      gsap.fromTo(".metric-block",
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 60%" }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="quality" className="relative py-32 lg:py-48 bg-[#060504] text-ivory overflow-hidden tech-grid">
      
      {/* Scientific Scanning Effect (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="w-full h-px bg-brass shadow-[0_0_15px_rgba(200,164,94,0.8)] animate-[scan_6s_linear_infinite]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ivory/10 pb-8 tech-line-h origin-left">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-2 h-2 bg-botanical rounded-full animate-pulse" />
              <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/50 font-medium">
                Quality & Verification
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,3vw,3rem)] leading-[1.1] font-medium max-w-[600px]">
              Purity you can <em className="italic text-brass font-light">prove.</em>
            </h2>
          </div>
          <div className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/30 text-right">
            <span>SYS.VER: 2026.04</span><br/>
            <span>LAT: 33.195</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ivory/10">
          {metrics.map((metric, i) => (
            <div 
              key={i} 
              className={`metric-block relative p-10 lg:p-16 ${i !== 2 ? 'border-b md:border-b-0 md:border-r border-ivory/10' : ''}`}
            >
              {/* Technical corner markers */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brass/50" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brass/50" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brass/50" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brass/50" />

              <div className="font-serif text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-brass font-light mb-6">
                {metric.value}
              </div>
              <h3 className="font-sans text-[1rem] tracking-[0.1em] uppercase text-ivory font-medium mb-4">
                {metric.label}
              </h3>
              <p className="font-sans text-[0.9rem] leading-[1.7] text-ivory/60 font-light max-w-[300px]">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical Footer */}
        <div className="mt-12 flex items-center justify-between font-sans text-[0.55rem] tracking-[0.2em] uppercase text-ivory/30">
          <span>Every lot documented from origin through final concentration.</span>
          <span>QA.STATUS: VERIFIED</span>
        </div>
      </div>

      {/* Global CSS for the scan line */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}} />
    </section>
  );
}
