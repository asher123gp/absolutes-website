"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/#applications" },
  { label: "Quality", href: "/#quality" },
  { label: "Contact", href: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Handle cross-page hash navigation race condition with GSAP
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const overlay = document.querySelector(".mobile-menu-overlay");
    const links = document.querySelectorAll(".mobile-link");

    if (mobileOpen && overlay) {
      gsap.to(overlay, { opacity: 1, duration: 0.6, ease: "power3.out", display: "flex" });
      if (links.length > 0) {
        gsap.fromTo(links, 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out", delay: 0.2 }
        );
      }
    } else if (mounted && overlay) {
      gsap.to(overlay, { opacity: 0, duration: 0.5, ease: "power3.in", onComplete: () => {
        gsap.set(overlay, { display: "none" });
      }});
    }
    
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      setMobileOpen(false);
      const targetId = href.split("#")[1];
      const target = document.getElementById(targetId);
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        // Update URL hash without jumping
        window.history.pushState(null, "", href);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-charcoal/70 backdrop-blur-md border-b border-ivory/[0.04] py-3 lg:py-3"
            : "bg-transparent py-4 lg:py-6"
        }`}
      >
        <nav
          className="max-w-[1600px] mx-auto flex items-center justify-between px-6 lg:px-12"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-4 relative z-50">
            <div className="flex flex-col">
              <span className="font-serif text-[1.2rem] font-medium tracking-[0.05em] text-ivory">
                ABSOLUTES
              </span>
              <span className="font-sans text-[0.45rem] tracking-[0.3em] uppercase text-ivory/50 font-normal -mt-0.5">
                Dynamic Flavor Extracts
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative font-sans text-[0.65rem] text-ivory/60 hover:text-ivory transition-colors duration-400 tracking-[0.1em] uppercase group overflow-hidden"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brass -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            ))}
            
            <Link
              href="/request-sample"
              className="ml-6 relative overflow-hidden font-sans border border-ivory/20 text-ivory px-6 py-3 text-[0.65rem] font-medium tracking-[0.1em] uppercase hover:border-ivory/40 transition-colors duration-500 group"
            >
              <span className="absolute inset-0 bg-ivory -translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              <span className="relative z-10 group-hover:text-charcoal transition-colors duration-500">
                Request Sample
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 flex flex-col justify-center items-end w-10 h-10 gap-[6px]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block h-[1px] bg-ivory transition-all duration-400 origin-right ${mobileOpen ? "w-6 -rotate-45 -translate-y-[2px]" : "w-6"}`} />
            <span className={`block h-[1px] bg-ivory transition-all duration-400 ${mobileOpen ? "opacity-0 w-0" : "w-4"}`} />
            <span className={`block h-[1px] bg-ivory transition-all duration-400 origin-right ${mobileOpen ? "w-6 rotate-45 translate-y-[2px]" : "w-5"}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu — Fullscreen Overlay via Portal */}
      {mounted && createPortal(
        <div className="mobile-menu-overlay fixed top-0 left-0 w-full h-[100dvh] z-[100] bg-charcoal hidden flex-col justify-center items-center opacity-0">
          
          {/* Texture & Glow Backgrounds */}
          <div className="absolute inset-0 grain pointer-events-none" />
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-botanical/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brass/10 rounded-full blur-[120px]" />
          </div>

          <nav className="relative z-10 flex flex-col items-center gap-6 w-full px-6">
            {navLinks.map((link) => (
              <div key={link.label} className="overflow-hidden">
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="mobile-link block font-sans text-[1.1rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </div>
            ))}
            <div className="overflow-hidden mt-6">
              <Link
                href="/request-sample"
                onClick={() => setMobileOpen(false)}
                className="mobile-link block border border-ivory/30 text-ivory px-8 py-3 text-[0.7rem] font-medium tracking-[0.15em] uppercase hover:bg-ivory hover:text-charcoal transition-all duration-500"
              >
                Request Sample
              </Link>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </>
  );
}
