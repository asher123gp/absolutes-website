export type ProductCategory = "Spice Oil" | "Oleoresin" | "Absolute";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  cas: string;
  description: string;
  colorAccent: string;
  colorDark: string;
  image: string;
  imageAlt: string;
  origin?: string;
  productType?: string;
  applications?: string[];
}

export const products: Product[] = [
  {
    id: "paprika-oleoresin",
    name: "Paprika Oleoresin",
    category: "Oleoresin",
    cas: "68917-14-6",
    description:
      "Deep red colorant and flavor base, standardized ASTA units, for sauces and processed meats.",
    colorAccent: "#A52A2A",
    colorDark: "#7a1f1f",
    image: "/products/paprika-oleoresin.jpg",
    imageAlt:
      "Paprika oleoresin extract — deep crimson liquid in a glass vial with dried paprika pods",
  },
  {
    id: "vanillin-absolute",
    name: "Vanillin Absolute",
    category: "Absolute",
    cas: "121-33-5",
    description:
      "High-purity concentrate with rounded, warm sweetness — the signature note for bakery and beverage.",
    colorAccent: "#2A1C13",
    colorDark: "#4a3222",
    image: "/products/vanillin-absolute.jpg",
    imageAlt:
      "Vanillin absolute extract — dark amber liquid in an apothecary bottle with vanilla bean pods",
  },
  {
    id: "cinnamon-bark-oil",
    name: "Cinnamon Bark Oil",
    category: "Spice Oil",
    cas: "8015-91-6",
    description:
      "Steam-distilled, high-cinnamaldehyde profile for confectionery, oral care, and beverage.",
    colorAccent: "#D8A657",
    colorDark: "#b8843a",
    image: "/products/cinnamon-bark-oil.jpg",
    imageAlt:
      "Cinnamon bark essential oil — golden amber liquid in a dropper bottle with cinnamon sticks",
  },
  {
    id: "black-pepper-oleoresin",
    name: "Black Pepper Oleoresin",
    category: "Oleoresin",
    cas: "8006-82-4",
    description:
      "Piperine-standardized extract delivering clean pungency without volatile loss on shelf.",
    colorAccent: "#7D956D",
    colorDark: "#5c7050",
    image: "/products/black-pepper-oleoresin.jpg",
    imageAlt:
      "Black pepper oleoresin — dark green-brown extract in a glass vial with whole peppercorns",
  },
];

export const productCategories: ProductCategory[] = [
  "Spice Oil",
  "Oleoresin",
  "Absolute",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}
