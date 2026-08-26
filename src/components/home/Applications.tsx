"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const applications = [
  {
    id: "food-beverage",
    title: "Food & Beverage",
    description: "Sauces, snacks, bakery, and beverage flavor systems requiring batch-to-batch consistency.",
    image: "/products/black-pepper-oleoresin.jpg", // Using available imagery as stand-in
  },
  {
    id: "flavor-fragrance",
    title: "Flavor & Fragrance",
    description: "Base notes and modifiers for compounders building proprietary accords.",
    image: "/products/vanillin-absolute.jpg",
  },
  {
    id: "nutraceutical",
    title: "Nutraceutical",
    description: "Standardized actives for functional foods, supplements, and encapsulation.",
    image: "/products/cinnamon-bark-oil.jpg",
  },
  {
    id: "personal-care",
    title: "Personal Care",
    description: "Natural aromatic bases for soap, cosmetic, and home fragrance formulation.",
    image: "/products/paprika-oleoresin.jpg",
  }
];

export function Applications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(applications[0].id);

  // Handle active state change with GSAP
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    // Animate image opacity change
    gsap.to(".app-bg-image", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });
    
    gsap.to(`.app-bg-image-${activeId}`, {
      opacity: 0.4,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });

  }, [activeId]);

  return (
    <section ref={containerRef} id="applications" className="relative min-h-[90vh] bg-charcoal text-ivory overflow-hidden flex items-center py-20">
      
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {applications.map((app) => (
          <div 
            key={`bg-${app.id}`} 
            className={`app-bg-image app-bg-image-${app.id} absolute inset-0 ${activeId === app.id ? "opacity-40" : "opacity-0"}`}
          >
            <Image
              src={app.image}
              alt=""
              fill
              className="object-cover scale-105"
              sizes="100vw"
            />
            {/* Cinematic masking */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/80" />
          </div>
        ))}
        {/* Grain overlay */}
        <div className="absolute inset-0 grain opacity-50 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Left: Interactive Menu (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-12">
            <span className="w-8 h-px bg-brass/50" />
            <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-brass font-medium">
              Applications
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {applications.map((app, index) => {
              const isActive = activeId === app.id;
              return (
                <button
                  key={app.id}
                  onClick={() => setActiveId(app.id)}
                  className="group flex flex-col items-start text-left w-full relative pl-8 py-2"
                >
                  {/* Active Indicator Line */}
                  <span 
                    className={`absolute left-0 top-0 h-full w-[2px] transition-colors duration-500 ${
                      isActive ? "bg-brass" : "bg-ivory/10 group-hover:bg-ivory/30"
                    }`} 
                  />
                  
                  <span className={`font-sans text-[0.6rem] tracking-[0.2em] mb-2 transition-colors duration-500 ${
                    isActive ? "text-brass" : "text-ivory/40"
                  }`}>
                    0{index + 1}
                  </span>
                  
                  <h3 className={`font-serif text-[1.8rem] lg:text-[2.2rem] leading-none transition-all duration-500 ${
                    isActive ? "text-ivory opacity-100 translate-x-2" : "text-ivory/40 opacity-60 group-hover:text-ivory/80 group-hover:translate-x-1"
                  }`}>
                    {app.title}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Content (7 cols offset) */}
        <div className="relative lg:col-span-7 lg:col-start-6 flex items-center h-[280px] sm:h-[300px] lg:h-[500px] mt-4 lg:mt-0 w-full">
          {applications.map((app) => (
            <div 
              key={`content-${app.id}`} 
              className={`absolute top-1/2 -translate-y-1/2 left-0 w-full max-w-[600px] transition-all duration-700 ${
                activeId === app.id 
                  ? "opacity-100 translate-y-0 pointer-events-auto" 
                  : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              <h4 className="font-serif text-[clamp(2.2rem,4vw,4rem)] leading-[1.05] tracking-[-0.02em] font-medium mb-6 lg:mb-8 text-ivory">
                <em className="italic font-light">{app.title}.</em>
              </h4>
              <p className="font-sans text-[1rem] sm:text-[1.1rem] lg:text-[1.3rem] leading-[1.7] text-ivory/70 font-light border-l border-ivory/10 pl-6 lg:pl-8">
                {app.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
