"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import { products, productCategories, type ProductCategory } from "@/data/products";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const resolvedCategory = useMemo<ProductCategory | "all">(() => {
    if (!categoryParam) return "all";
    const normalized = categoryParam.toLowerCase().replace(/s$/, "").replace(/[-_]/g, " ");
    const match = productCategories.find(
      (cat) => cat.toLowerCase().replace(/s$/, "").replace(/[-_]/g, " ") === normalized
    );
    return match ?? "all";
  }, [categoryParam]);

  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(resolvedCategory);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sync category if URL parameter changes (e.g. clicking a footer link while on /products)
  useEffect(() => {
    if (categoryParam) {
      const normalized = categoryParam.toLowerCase().replace(/s$/, "").replace(/[-_]/g, " ");
      const match = productCategories.find(
        (cat) => cat.toLowerCase().replace(/s$/, "").replace(/[-_]/g, " ") === normalized
      );
      if (match) {
        setActiveCategory(match);
      }
    }
  }, [categoryParam]);

  const filtered = useMemo(() => {
    return products.filter((p) => activeCategory === "all" || p.category === activeCategory);
  }, [activeCategory]);

  const availableCategories = productCategories.filter((cat) => products.some((p) => p.category === cat));

  // Handle direct navigation via query param (e.g. from homepage "View Specification")
  useEffect(() => {
    const detail = searchParams.get("detail");
    if (detail) {
      const el = document.getElementById(detail);
      if (el) {
        const headerOffset = 100;
        const elPos = el.getBoundingClientRect().top;
        const offsetPos = elPos + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPos, behavior: "smooth" });
      }
    }
  }, [searchParams]);

  // Animate filtering using GSAP
  useEffect(() => {
    if (!gridRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gridRef.current.querySelectorAll(".catalogue-item");
    gsap.fromTo(items, 
      { opacity: 0, scale: 0.98, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "all" }
    );
  }, [filtered]);

  return (
    <section className="pt-[25vh] pb-24 bg-ivory text-charcoal relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <span className="w-12 h-px bg-charcoal/30" />
          <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-charcoal/60 font-medium">
            The Portfolio
          </span>
        </div>
        
        <h1 className="font-serif text-[clamp(3.5rem,6vw,6rem)] leading-[0.95] tracking-[-0.03em] font-medium max-w-[900px] mb-20">
          Precision extracts for <br className="hidden md:block" />
          <em className="italic text-botanical font-light">advanced</em> formulation.
        </h1>

        {/* Editorial Category Filters */}
        <div className="flex flex-nowrap items-center justify-between sm:justify-start gap-1 sm:gap-6 lg:gap-16 border-b border-charcoal/10 pb-6 lg:pb-8 mb-12 lg:mb-16 w-full overflow-visible">
          <button
            onClick={() => setActiveCategory("all")}
            className={`relative font-sans text-[0.45rem] min-[375px]:text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem] tracking-[0.02em] min-[375px]:tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em] uppercase pb-2 transition-colors duration-500 whitespace-nowrap ${
              activeCategory === "all" ? "text-charcoal font-medium" : "text-charcoal/40 hover:text-charcoal"
            }`}
          >
            All Extracts
            {activeCategory === "all" && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal" />}
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative font-sans text-[0.45rem] min-[375px]:text-[0.5rem] sm:text-[0.6rem] lg:text-[0.7rem] tracking-[0.02em] min-[375px]:tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em] uppercase pb-2 transition-colors duration-500 whitespace-nowrap ${
                activeCategory === cat ? "text-charcoal font-medium" : "text-charcoal/40 hover:text-charcoal"
              }`}
            >
              {cat}
              {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal" />}
            </button>
          ))}
        </div>

        {/* Product Cards: Image + Information Side-by-Side */}
        <div ref={gridRef} className="flex flex-col gap-12 lg:gap-16">
          {filtered.map((product, i) => (
            <article
              key={product.id}
              id={product.id}
              className="catalogue-item bg-charcoal text-ivory relative grain overflow-hidden border border-charcoal/15 grid grid-cols-1 lg:grid-cols-12 shadow-xl"
            >
              {/* Product Image Panel (Occupies ~45-50% on desktop) */}
              <div className="lg:col-span-6 relative w-full h-[300px] sm:h-[380px] lg:h-auto min-h-[340px] lg:min-h-[460px] overflow-hidden bg-espresso">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={i === 0}
                />
                {/* Cinematic gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent lg:hidden" />
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/80" />
                <div className="absolute inset-0 bg-charcoal/20 mix-blend-multiply pointer-events-none" />

                {/* Technical Identifier Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal/80 backdrop-blur-md border border-ivory/10 text-[0.55rem] tracking-[0.2em] uppercase font-sans text-ivory/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass" />
                    CAS // {product.cas}
                  </span>
                </div>
              </div>

              {/* Product Information Panel (Occupies ~50-55% on desktop) */}
              <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative z-10 bg-charcoal">
                <div>
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-sans text-[0.65rem] tracking-[0.25em] text-brass uppercase font-medium">
                      {product.category}
                    </span>
                    <span className="w-8 h-px bg-brass/40" />
                  </div>

                  {/* Product Title */}
                  <h2 className="font-serif text-[clamp(2.2rem,3.2vw,3.2rem)] leading-[1.05] tracking-[-0.02em] font-medium text-ivory mb-6">
                    {product.name}
                  </h2>

                  {/* Full Description */}
                  <p className="font-sans text-[0.95rem] lg:text-[1.05rem] leading-[1.8] text-ivory/75 font-light border-l border-ivory/15 pl-6 mb-8">
                    {product.description}
                  </p>

                  {/* Complete Specification Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 border-t border-ivory/10 pt-6 mb-8">
                    <div>
                      <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-1.5">
                        CAS Number
                      </span>
                      <span className="font-sans text-[0.9rem] tracking-wide text-ivory font-mono">
                        {product.cas}
                      </span>
                    </div>
                    <div>
                      <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-1.5">
                        Botanical Origin
                      </span>
                      <span className="font-sans text-[0.9rem] text-ivory italic">
                        {product.origin || "Documented on request"}
                      </span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-1.5">
                        Applications
                      </span>
                      <span className="font-sans text-[0.9rem] text-ivory/80 leading-relaxed">
                        {product.applications?.join(", ") || "Food & Beverage, Flavor & Fragrance, Specialized Formulation"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-ivory/10">
                  <Link
                    href={`/request-sample?product=${encodeURIComponent(product.name)}`}
                    className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.65rem] font-medium tracking-[0.1em] uppercase text-charcoal bg-ivory px-8 py-4 transition-transform duration-500 hover:scale-[1.02]"
                  >
                    <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500 flex items-center gap-2">
                      Request Sample
                      <svg className="w-3.5 h-3.5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </Link>

                  <Link
                    href={`/contact?type=Technical+Enquiry&product=${encodeURIComponent(product.name)}`}
                    className="group relative inline-flex items-center justify-center overflow-hidden font-sans border border-ivory/20 text-ivory px-8 py-4 text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:border-ivory/40 transition-colors duration-500"
                  >
                    <span className="absolute inset-0 bg-ivory -translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500">
                      Request COA
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-ivory flex items-center justify-center text-charcoal/50 tracking-[0.2em] text-[0.7rem] uppercase">Loading...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
