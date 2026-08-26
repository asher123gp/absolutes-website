"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

// Dynamically import WebGL to avoid SSR issues and keep initial load light
const HeroVisual = dynamic(() => import("./HeroVisual").then(mod => mod.HeroVisual), { ssr: false });

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isReducedMotion) return;
    
    const ctx = gsap.context(() => {
      // Split text animation logic - simulating SplitText with spans for simplicity without premium plugins
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" }
      )
      .fromTo(
        ".hero-stagger",
        { y: 100, opacity: 0, rotation: 2 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.15 },
        "-=1.2"
      )
      .fromTo(
        [descRef.current, ctaRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
        "-=1"
      );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      
      gsap.to(".hero-content-parallax", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] overflow-hidden grain bg-charcoal"
    >
      {/* Background Image — Full Bleed */}
      <div ref={imageRef} className="absolute inset-0 z-0 origin-center">
        <Image
          src="/hero-botanical.jpg"
          alt="Golden amber oleoresin extract in a scientific flask surrounded by whole spices"
          fill
          className="object-cover opacity-60"
          priority
          sizes="100vw"
          quality={100}
        />
        {/* Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/20 to-charcoal/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
      </div>

      {/* WebGL Interaction */}
      {!isReducedMotion && <HeroVisual />}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col pt-40 lg:pt-[25vh] pb-[10vh] lg:pb-[12vh] px-6 lg:px-12 max-w-[1600px] mx-auto w-full hero-content-parallax">
        
        <div className="mt-auto w-full flex flex-col">
          {/* Top Eyebrow / Technical Label */}
          <div className="overflow-hidden mb-8 lg:mb-12">
            <div className="hero-stagger flex items-center gap-4 lg:gap-6">
              <span className="w-8 lg:w-16 h-px bg-brass/60" />
              <span className="font-sans text-[0.5rem] lg:text-[0.65rem] tracking-[0.15em] lg:tracking-[0.3em] uppercase text-brass font-medium">
                SPICE OILS &middot; OLEORESINS &middot; ABSOLUTES
              </span>
            </div>
          </div>

          {/* Massive Editorial Headline */}
          <h1 ref={titleRef} className="font-serif text-[3.2rem] min-[375px]:text-[3.5rem] md:text-[5rem] lg:text-[clamp(5rem,9vw,9rem)] leading-[1] lg:leading-[0.9] tracking-[-0.02em] lg:tracking-[-0.03em] text-ivory max-w-[1200px]">
            <div className="overflow-hidden pb-1 lg:pb-2"><div className="hero-stagger">The <em className="italic text-brass font-light pr-2">absolute</em></div></div>
            <div className="overflow-hidden pb-2"><div className="hero-stagger">essence of</div></div>
            <div className="overflow-hidden pb-2"><div className="hero-stagger">flavor,</div></div>
            <div className="overflow-hidden pb-2"><div className="hero-stagger">extracted.</div></div>
          </h1>

          {/* Subtext and CTA */}
          <div className="mt-12 lg:mt-20 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end max-w-[1200px]">
            <p ref={descRef} className="font-sans text-[1rem] lg:text-[1.1rem] leading-[1.8] text-ivory/70 font-light max-w-[540px]">
              We distill and concentrate the world&apos;s spices into pure,
              dynamic oils and oleoresins — built for flavorists, food
              manufacturers, and fragrance houses who need consistency at the
              molecular level.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6">
              <Link 
                href="/products" 
                className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.75rem] font-medium tracking-[0.1em] uppercase text-charcoal bg-ivory px-10 py-5 transition-transform duration-500 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-charcoal transition-colors duration-500">
                  Browse the Range
                  <svg className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-6 lg:left-12 z-10 flex items-center gap-4 hero-content-parallax">
        <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40">Scroll</span>
        <div className="w-12 h-px bg-ivory/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-ivory animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
