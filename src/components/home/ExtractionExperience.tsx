"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const steps = [
  {
    num: "01",
    title: "Sourced",
    desc: "Whole spice lots selected and verified at origin, from growers we track by region and harvest.",
    image: "/products/black-pepper-oleoresin.jpg", // Using as botanical raw stand-in
    theme: "botanical"
  },
  {
    num: "02",
    title: "Extracted",
    desc: "Steam distillation for volatile oils; solvent extraction for full-spectrum oleoresins.",
    image: "/products/paprika-oleoresin.jpg", // Red extraction liquid
    theme: "burgundy"
  },
  {
    num: "03",
    title: "Concentrated",
    desc: "Solvent recovery and vacuum concentration bring each lot to standardized potency.",
    image: "/products/vanillin-absolute.jpg", // Dark concentrated absolute
    theme: "espresso"
  },
  {
    num: "04",
    title: "Verified",
    desc: "GC-MS profiling and COA issued before a single drop ships to your facility.",
    image: "/products/cinnamon-bark-oil.jpg", // Pure golden verified oil
    theme: "brass"
  }
];

export function ExtractionExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !visualsRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray(".extract-text") as HTMLElement[];
      const images = gsap.utils.toArray(".extract-img") as HTMLElement[];
      const progressLine = document.querySelector(".extract-progress-line");
      
      const totalSteps = steps.length;
      
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${100 * totalSteps}%`, // 400% scroll duration
          pin: true,
          scrub: 1,
        }
      });

      // Progress bar animation
      tl.to(progressLine, {
        scaleY: 1,
        ease: "none",
        duration: totalSteps
      }, 0);

      // Sequence the steps
      steps.forEach((_, i) => {
        if (i === 0) return; // First step is already visible

        const prevText = texts[i - 1];
        const nextText = texts[i];
        
        const prevImg = images[i - 1];
        const nextImg = images[i];

        const stepStartTime = i - 0.5;

        // Hide previous
        tl.to(prevText, { opacity: 0, y: -30, duration: 0.5 }, stepStartTime);
        tl.to(prevImg, { opacity: 0, scale: 1.1, duration: 0.5 }, stepStartTime);

        // Show next
        tl.fromTo(nextText, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.5 }, 
          stepStartTime
        );
        tl.fromTo(nextImg,
          { opacity: 0, scale: 0.9, filter: "blur(20px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.5 },
          stepStartTime
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section ref={sectionRef} className="h-screen w-full bg-charcoal text-ivory relative overflow-hidden grain">
        {/* Visual Background Layer */}
        <div ref={visualsRef} className="absolute inset-0 w-full h-full lg:w-[60%] lg:right-0 lg:left-auto overflow-hidden">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`extract-img absolute inset-0 w-full h-full origin-center ${i === 0 ? "opacity-100 z-10" : "opacity-0 z-20"}`}
            >
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority={i === 0}
              />
              {/* Cinematic overlay masking */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-charcoal/60 lg:bg-charcoal/30 mix-blend-multiply" />
            </div>
          ))}
        </div>

        {/* Atmospheric Glow */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-charcoal/90 rounded-full blur-[100px]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-30 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-24 h-full py-[15vh]">
            
            {/* Progress Indicator */}
            <div className="hidden lg:flex flex-col items-center gap-6 h-[60vh] relative pt-4">
              <span className="font-sans text-[0.6rem] tracking-[0.2em] text-ivory/40 uppercase">01</span>
              <div className="flex-1 w-px bg-ivory/10 relative overflow-hidden">
                <div className="extract-progress-line absolute top-0 left-0 w-full h-full bg-brass origin-top scale-y-0" />
              </div>
              <span className="font-sans text-[0.6rem] tracking-[0.2em] text-ivory/40 uppercase">04</span>
            </div>

            {/* Text Content */}
            <div className="relative h-[400px] lg:h-[500px] flex items-center">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className={`extract-text absolute top-1/2 -translate-y-1/2 left-0 w-full max-w-[500px] ${i === 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-sans text-[0.7rem] tracking-[0.25em] text-brass uppercase font-medium">
                      Stage {step.num}
                    </span>
                    <span className="w-8 h-px bg-brass/50" />
                  </div>
                  
                  <h3 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em] font-medium mb-8">
                    <em className="italic font-light">{step.title}.</em>
                  </h3>
                  
                  <p className="font-sans text-[1rem] lg:text-[1.1rem] leading-[1.8] text-ivory/70 font-light">
                    {step.desc}
                  </p>

                  <div className="mt-12 opacity-50">
                    <div className="w-full h-[2px] bg-ivory/10 relative overflow-hidden">
                      <div className="absolute top-0 left-0 h-full bg-ivory/40 w-1/4 animate-[shimmer_2s_infinite]" style={{ animationDelay: `${i * 0.5}s` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
