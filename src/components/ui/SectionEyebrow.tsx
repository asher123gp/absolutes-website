interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <div
      className={`flex items-center gap-3 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-burgundy ${className}`}
    >
      <span className="w-7 h-px bg-burgundy" aria-hidden="true" />
      {children}
    </div>
  );
}
