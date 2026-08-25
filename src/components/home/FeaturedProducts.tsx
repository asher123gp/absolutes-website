"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function FeaturedProducts() {
  const featured = products.slice(0, 2);
  const secondary = products.slice(2, 4);

  return (
    <section className="bg-parchment py-28 lg:py-36">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <RevealOnScroll>
          <div className="max-w-[640px] mb-16">
            <SectionEyebrow>The Range</SectionEyebrow>
            <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.7rem)] font-semibold text-espresso leading-[1.12] mt-5">
              Four extraction formats,
              <br className="hidden sm:block" />
              one standard of purity.
            </h2>
            <p className="mt-5 text-muted text-[1rem] font-light leading-relaxed max-w-[540px]">
              Every product ships with a certificate of analysis, solubility
              data, and recommended dosage for your application.
            </p>
          </div>
        </RevealOnScroll>

        {/* Featured Products — Two large with images, editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-hairline mb-px">
          {featured.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 0.12}>
              <Link
                href={`/products?detail=${product.id}`}
                className="group bg-ivory flex flex-col overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-56 lg:h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <span className="absolute top-5 left-6 text-[0.62rem] tracking-[0.18em] uppercase text-white/90 font-medium bg-black/20 backdrop-blur-sm px-3 py-1">
                    {product.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-7 lg:p-9 flex-1 flex flex-col">
                  <h3 className="font-serif text-[1.3rem] font-semibold text-espresso group-hover:text-burgundy transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-[0.9rem] text-muted font-light leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-6 pt-5 border-t border-hairline">
                    <span className="text-[0.73rem] text-muted-light tracking-[0.04em]">
                      CAS {product.cas}
                    </span>
                    <span className="text-[0.78rem] text-espresso font-medium border-b border-espresso/50 group-hover:border-burgundy group-hover:text-burgundy transition-colors duration-300 pb-px">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Secondary Products — Compact with small images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline">
          {secondary.map((product, i) => (
            <RevealOnScroll key={product.id} delay={i * 0.1 + 0.15}>
              <Link
                href={`/products?detail=${product.id}`}
                className="group bg-ivory flex items-stretch overflow-hidden"
              >
                {/* Small product image */}
                <div className="relative w-28 lg:w-36 shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    sizes="144px"
                  />
                </div>
                <div className="p-5 lg:p-6 flex-1">
                  <span className="text-[0.6rem] tracking-[0.18em] uppercase text-burgundy font-medium">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-[1.05rem] font-semibold text-espresso mt-1.5 group-hover:text-burgundy transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 text-[0.82rem] text-muted font-light leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-hairline">
                    <span className="text-[0.68rem] text-muted-light">
                      CAS {product.cas}
                    </span>
                    <span className="text-[0.73rem] text-espresso font-medium border-b border-espresso/40 group-hover:border-burgundy group-hover:text-burgundy transition-colors duration-300 pb-px">
                      Details
                    </span>
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>

        {/* Catalogue CTA */}
        <RevealOnScroll className="mt-14 flex justify-center">
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-[0.88rem] font-medium text-espresso hover:text-burgundy transition-colors duration-300"
          >
            <span className="border-b border-espresso/40 group-hover:border-burgundy transition-colors duration-300 pb-0.5">
              View Complete Catalogue
            </span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
