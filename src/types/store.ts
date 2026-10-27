export type ProductId = 'energy' | 'sleep' | 'focus' | 'nad' | 'immunity';
export type ProductCategory = 'day' | 'night' | 'longevity';
export type ProductFilter = 'all' | ProductCategory;
export type PurchaseMode = 'once' | 'subscribe';
export type Currency = 'USD' | 'GBP' | 'EUR';

export interface Product {
  id: ProductId;
  name: string;
  benefit: string;
  description: string;
  ingredients: string[];
  flavor: string;
  price: number;
  color: string;
  onColor: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  badge?: string;
  status: 'live' | 'drop';
}

export interface CartItem {
  key: string;
  productId: ProductId;
  mode: PurchaseMode;
  quantity: number;
}

export interface Review {
  id: string;
  headline: string;
  body: string;
  name: string;
  location: string;
  productId: ProductId;
  rating: number;
}

export interface UgcPost {
  id: string;
  image: string;
  handle: string;
  caption: string;
  likes: string;
}

export interface HowStep {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface ComparisonRow {
  label: string;
  pills: string;
  powders: string;
  zolv: string;
}