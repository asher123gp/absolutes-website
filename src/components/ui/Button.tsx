"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden text-[0.82rem] font-medium tracking-[0.06em] uppercase transition-all duration-500";

  const variants = {
    primary:
      "bg-ivory text-espresso px-8 py-4 hover:text-ivory",
    ghost:
      "border border-ivory/20 text-ivory/80 px-8 py-4 hover:text-ivory hover:border-ivory/40",
    dark:
      "bg-burgundy text-ivory px-8 py-4 hover:bg-burgundy-deep",
  };

  const inner = (
    <>
      {/* Sliding fill background */}
      {variant !== "dark" && (
        <span
          className={`absolute inset-0 z-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-full group-hover:translate-x-0 ${
            variant === "primary" ? "bg-burgundy" : "bg-ivory/10"
          }`}
        />
      )}
      {/* Arrow */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {inner}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      {inner}
    </motion.button>
  );
}
