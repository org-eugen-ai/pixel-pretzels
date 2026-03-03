export type CategorySlug = 'notebooks' | 'smartphones' | 'printers' | 'accessories';

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameDE: string;
  brand: string;
  category: CategorySlug;
  price: number; // cents EUR
  originalPrice?: number;
  description: string;
  descriptionDE: string;
  specs: { label: string; value: string }[];
  specsDE: { label: string; value: string }[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  badge?: 'new' | 'sale' | 'bestseller';
}

export interface Category {
  slug: CategorySlug;
  name: string;
  nameDE: string;
  description: string;
  descriptionDE: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}
