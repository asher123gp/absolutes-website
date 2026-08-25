"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { products } from "@/data/products";

export function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Animate the header
      gsap.fromTo(".showcase-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );

      // Animate each product block
      const productBlocks = gsap.utils.toArray(".product-editorial-block") as HTMLElement[];
      productBlocks.forEach((block, i) => {
        const img = block.querySelector(".product-img-wrap");
        const content = block.querySelector(".product-content");
        
        gsap.fromTo(img,
          { opacity: 0, clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.1 },
          { 
            opacity: 1, clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", scale: 1, 
            duration: 1.5, ease: "power4.out",
            scrollTrigger: { trigger: block, start: "top 75%" }
          }
        );

        gsap.fromTo(content,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3,
            scrollTrigger: { trigger: block, start: "top 75%" }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Use the first 3 products for the showcase
  const displayProducts = products.slice(0, 3);

  return (
    <section ref={containerRef} className="py-[20vh] bg-ivory text-charcoal relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="showcase-header flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-charcoal/20 pb-12 mb-[15vh]">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-charcoal/60 font-medium">
                The Portfolio
              </span>
            </div>
            <h2 className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] font-medium max-w-[600px]">
              Extracts for precise <br className="hidden sm:block" />
              <em className="italic text-botanical font-light">formulation.</em>
            </h2>
          </div>
          <Link 
            href="/products"
            className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.65rem] font-medium tracking-[0.1em] uppercase text-ivory bg-charcoal px-8 py-4 transition-transform duration-500 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-charcoal transition-colors duration-500">
              View Complete Catalogue
            </span>
          </Link>
        </div>

        {/* Editorial Product Grid */}
        <div className="flex flex-col gap-[15vh]">
          {displayProducts.map((product, i) => {
            const isEven = i % 2 === 0;
            return (
              <div 
                key={product.id} 
                className={`product-editorial-block grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center ${
                  isEven ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Image Area (7 cols wide) */}
                <div className={`lg:col-span-7 ${isEven ? "lg:col-start-1" : "lg:col-start-6"}`}>
                  <Link href={`/products?detail=${product.id}`} className="group block relative w-full aspect-[4/3] overflow-hidden product-img-wrap bg-charcoal/5">
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
                    
                    {/* Hover Explore Label */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100">
                      <span className="bg-ivory/90 backdrop-blur-md text-charcoal font-sans text-[0.65rem] tracking-[0.2em] uppercase px-6 py-3 font-medium">
                        Explore
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Content Area (4 cols wide with 1 col offset) */}
                <div className={`lg:col-span-4 product-content ${isEven ? "lg:col-start-9" : "lg:col-start-1"}`}>
                  <div className="flex flex-col h-full justify-center">
                    <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-brass font-medium mb-5 block">
                      {product.category}
                    </span>
                    
                    <h3 className="font-serif text-[clamp(2rem,3vw,2.5rem)] leading-[1.1] text-charcoal font-medium mb-6 group-hover:text-brass transition-colors duration-500">
                      {product.name}
                    </h3>
                    
                    <p className="font-sans text-[0.95rem] leading-[1.8] text-charcoal/70 font-light mb-8">
                      {product.description}
                    </p>
                    
                    {/* Technical Metadata */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-charcoal/10 mb-8">
                      <div>
                        <span className="block font-sans text-[0.55rem] tracking-[0.15em] uppercase text-charcoal/40 mb-1">CAS Number</span>
                        <span className="font-sans text-[0.8rem] text-charcoal tracking-wide">{product.cas}</span>
                      </div>
                      <div>
                        <span className="block font-sans text-[0.55rem] tracking-[0.15em] uppercase text-charcoal/40 mb-1">State</span>
                        <span className="font-sans text-[0.8rem] text-charcoal">Standardized</span>
                      </div>
                    </div>
                    
                    <div>
                      <Link 
                        href={`/products?detail=${product.id}`}
                        className="inline-flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-charcoal font-medium group"
                      >
                        <span className="relative overflow-hidden pb-1">
                          View Specification
                          <span className="absolute bottom-0 left-0 w-full h-px bg-charcoal -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                        </span>
                        <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
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
