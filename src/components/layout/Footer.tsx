import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory pt-20 pb-10 border-t border-ivory/10 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
          
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <span className="block font-serif text-[1.5rem] tracking-[0.05em] font-medium mb-2">
              ABSOLUTES
            </span>
            <p className="font-sans text-[0.9rem] leading-[1.7] text-ivory/50 font-light max-w-[320px] mb-8">
              Dynamic flavor extracts — spice oils, oleoresins, and absolutes for manufacturers who need purity they can prove.
            </p>
            <div className="flex flex-col gap-2 font-sans text-[0.8rem] text-ivory/70 tracking-wide">
              <a href="mailto:sales@absolutesextracts.com" className="hover:text-ivory transition-colors">sales@absolutesextracts.com</a>
              <a href="tel:+14424913699" className="hover:text-ivory transition-colors">+1 442 491 3699</a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <span className="block font-sans text-[0.65rem] tracking-[0.15em] uppercase text-brass mb-6">Products</span>
              <ul className="flex flex-col gap-4 font-sans text-[0.85rem] text-ivory/50 font-light">
                <li><Link href="/products" className="hover:text-ivory transition-colors">Spice Oils</Link></li>
                <li><Link href="/products" className="hover:text-ivory transition-colors">Oleoresins</Link></li>
                <li><Link href="/products" className="hover:text-ivory transition-colors">Absolutes</Link></li>
                <li><Link href="/products" className="hover:text-ivory transition-colors">Custom Blends</Link></li>
              </ul>
            </div>
            
            <div>
              <span className="block font-sans text-[0.65rem] tracking-[0.15em] uppercase text-brass mb-6">Company</span>
              <ul className="flex flex-col gap-4 font-sans text-[0.85rem] text-ivory/50 font-light">
                <li><Link href="/#process" className="hover:text-ivory transition-colors">Methodology</Link></li>
                <li><Link href="/#quality" className="hover:text-ivory transition-colors">Quality & Sourcing</Link></li>
                <li><Link href="/#contact" className="hover:text-ivory transition-colors">Request Sample</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Cinematic Final Statement */}
        <div className="border-t border-ivory/10 pt-16 pb-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="font-serif text-[clamp(2.5rem,5vw,5rem)] leading-[0.85] tracking-[-0.03em] font-medium text-ivory/20 pointer-events-none select-none">
            EXTRACTED WITH <br className="hidden sm:block" />PRECISION.
          </div>
          
          <div className="flex items-center gap-6 font-sans text-[0.65rem] tracking-[0.15em] uppercase text-ivory/30">
            <span>&copy; {new Date().getFullYear()} Absolutes Extracts</span>
            <span className="w-px h-3 bg-ivory/10" />
            <Link href="#" className="hover:text-ivory/60 transition-colors">Legal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
