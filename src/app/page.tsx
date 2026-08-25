import { Hero } from "@/components/home/Hero";
import { BrandIntroduction } from "@/components/home/BrandIntroduction";
import { ExtractionExperience } from "@/components/home/ExtractionExperience";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Applications } from "@/components/home/Applications";
import { Quality } from "@/components/home/Quality";
import { ClosingCTA } from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntroduction />
      <ExtractionExperience />
      <ProductShowcase />
      <Applications />
      <Quality />
      <ClosingCTA />
    </>
  );
}
