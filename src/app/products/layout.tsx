import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalogue — Absolutes",
  description:
    "Browse our range of spice oils, oleoresins, and absolutes. Every product ships with a certificate of analysis, solubility data, and recommended dosage.",
  openGraph: {
    title: "Product Catalogue — Absolutes",
    description:
      "Four extraction formats, one standard of purity. Explore our verified product range.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
