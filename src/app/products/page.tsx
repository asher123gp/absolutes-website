"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useSearchParams, useRouter } from "next/navigation";
import { products, productCategories, type ProductCategory, type Product } from "@/data/products";

function ProductDossier({ product, onClose }: { product: Product; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate position with navbar offset
      const headerOffset = 100;
      const elementPosition = containerRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      // Smooth scroll to the dossier
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Subtle entrance animation for the content
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const ctx = gsap.context(() => {
          gsap.fromTo(containerRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
          gsap.fromTo(".dossier-content", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.3 });
        }, containerRef);
        return () => ctx.revert();
      }
    }
  }, [product.id]);

  return (
    <div ref={containerRef} className="relative w-full bg-charcoal text-ivory min-h-screen grain mt-20 border-t border-charcoal/20">
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-8 right-8 lg:top-12 lg:right-12 z-20 flex items-center gap-4 group">
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-ivory/50 group-hover:text-ivory transition-colors duration-300">Close Dossier</span>
        <div className="w-10 h-10 border border-ivory/20 rounded-full flex items-center justify-center group-hover:border-ivory transition-colors duration-300 bg-charcoal/50 backdrop-blur-md">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left: Cinematic Visual */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto lg:min-h-screen relative dossier-content">
          <Image src={product.image} alt={product.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/20 lg:bg-gradient-to-r" />
          
          <div className="absolute bottom-10 left-10 hidden lg:block">
            <div className="font-sans text-[0.55rem] tracking-[0.2em] uppercase text-ivory/40">Technical Visual</div>
            <div className="w-20 h-px bg-ivory/20 mt-2" />
          </div>
        </div>

        {/* Right: Technical Specification */}
        <div className="w-full lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center">
          <div className="max-w-[600px] w-full mx-auto">
            
            <div className="dossier-content flex items-center gap-4 mb-8">
              <span className="font-sans text-[0.65rem] tracking-[0.25em] text-brass uppercase font-medium">
                {product.category}
              </span>
              <span className="w-12 h-px bg-brass/30" />
            </div>

            <h1 className="dossier-content font-serif text-[clamp(3rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em] font-medium mb-10">
              {product.name}
            </h1>

            <p className="dossier-content font-sans text-[1.1rem] leading-[1.8] text-ivory/70 font-light border-l border-ivory/10 pl-6 mb-16">
              {product.description}
            </p>

            {/* Scientific Spec Sheet Grid */}
            <div className="dossier-content grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 border-t border-ivory/10 pt-10">
              <div>
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-2">CAS Number</span>
                <span className="font-sans text-[0.9rem] tracking-wide text-ivory">{product.cas}</span>
              </div>
              <div>
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-2">Botanical Origin</span>
                <span className="font-sans text-[0.9rem] text-ivory italic">Documented on request</span>
              </div>
              <div className="sm:col-span-2">
                <span className="block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-ivory/40 mb-2">Applications</span>
                <span className="font-sans text-[0.9rem] text-ivory leading-relaxed">
                  Food & Beverage, Flavor & Fragrance, Specialized Formulation
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="dossier-content flex flex-wrap gap-6 mt-20">
              <Link href={`/request-sample?product=${encodeURIComponent(product.name)}`} className="group relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.65rem] font-medium tracking-[0.1em] uppercase text-charcoal bg-ivory px-10 py-4 transition-transform duration-500 hover:scale-[1.02]">
                <span className="absolute inset-0 bg-brass translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500">Request Sample</span>
              </Link>
              <Link href="/contact?type=Technical+Enquiry" className="group relative inline-flex items-center justify-center overflow-hidden font-sans border border-ivory/20 text-ivory px-10 py-4 text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:border-ivory/40 transition-colors duration-500">
                <span className="absolute inset-0 bg-ivory -translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500">Request COA</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialDetail = searchParams.get("detail");

  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    initialDetail ? products.find((p) => p.id === initialDetail) ?? null : null
  );
  
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);

  const filtered = useMemo(() => {
    return products.filter((p) => activeCategory === "all" || p.category === activeCategory);
  }, [activeCategory]);

  const availableCategories = productCategories.filter((cat) => products.some((p) => p.category === cat));

  // Animate filtering using GSAP
  useEffect(() => {
    if (!gridRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gridRef.current.querySelectorAll(".catalogue-item");
    gsap.fromTo(items, 
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out", clearProps: "all" }
    );
  }, [filtered]);

  const openDossier = (product: Product) => {
    scrollPosRef.current = window.scrollY;
    router.push(`?detail=${product.id}`, { scroll: false });
    setSelectedProduct(product);
  };

  const closeDossier = () => {
    router.push("/products", { scroll: false });
    setSelectedProduct(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPosRef.current, behavior: "smooth" });
    });
  };

  return (
    <>
      <section className="pt-[25vh] pb-10 bg-ivory text-charcoal relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          
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
          <div className="flex flex-wrap gap-8 lg:gap-16 border-b border-charcoal/10 pb-8 mb-16">
            <button
              onClick={() => setActiveCategory("all")}
              className={`relative font-sans text-[0.7rem] tracking-[0.15em] uppercase pb-2 transition-colors duration-500 ${
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
                className={`relative font-sans text-[0.7rem] tracking-[0.15em] uppercase pb-2 transition-colors duration-500 ${
                  activeCategory === cat ? "text-charcoal font-medium" : "text-charcoal/40 hover:text-charcoal"
                }`}
              >
                {cat}
                {activeCategory === cat && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-charcoal" />}
              </button>
            ))}
          </div>

          {/* Asymmetric Product Grid */}
          <div ref={gridRef} className="columns-1 md:columns-2 gap-10 lg:gap-20 space-y-10 lg:space-y-20">
            {filtered.map((product, i) => {
              // Create layout variation based on index
              const isLarge = i % 3 === 0;
              return (
                <div key={product.id} className="catalogue-item break-inside-avoid">
                  <button
                    onClick={() => openDossier(product)}
                    className="w-full text-left group block"
                  >
                    <div className={`relative w-full overflow-hidden mb-6 bg-charcoal/5 ${isLarge ? "aspect-[4/5]" : "aspect-square"}`}>
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-700" />
                    </div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="block font-sans text-[0.55rem] tracking-[0.2em] uppercase text-botanical font-medium mb-3">
                          {product.category}
                        </span>
                        <h3 className="font-serif text-[1.8rem] leading-none text-charcoal mb-2 group-hover:text-brass transition-colors duration-500">
                          {product.name}
                        </h3>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-charcoal/20 flex items-center justify-center shrink-0 group-hover:bg-charcoal group-hover:border-charcoal group-hover:text-ivory transition-colors duration-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {selectedProduct && <ProductDossier product={selectedProduct} onClose={closeDossier} />}
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-ivory flex items-center justify-center text-charcoal/50 tracking-[0.2em] text-[0.7rem] uppercase">Loading...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
