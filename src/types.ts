export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string; // SKU Segment (e.g. Pure, Calm, Shield, Comfort)
  fullName: string; // e.g. Solo Scrub Pure
  tagline: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: "all" | "post-op" | "dementia" | "incontinence" | "family";
  categoryLabel: string;
  colorScheme: {
    primary: string; // tailwind classes
    text: string;
    bg: string;
    accent: string;
    hexPrimary: string;
    hexBg: string;
  };
  scent: string;
  availability: "In Stock" | "Low Stock" | "Out of Stock";
  stockCount: number;
  pouchSize: string; // e.g. "25 Rinse-Free Sponges"
  
  // Front of pack information
  headline: string;
  corePromise: string;
  benefitStack: string[];
  
  // Detail page specifics
  description: string;
  backOfPackCopy: string;
  backOfPackHeadline: string;
  
  // Brand Differentiators
  features: ProductFeature[];
  ingredients: string[];
  formulaClaims: string[];
  
  // Images (represented as stylized gradient mockups or paths)
  image: string;
  heroImageDesc: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderSummary {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}
