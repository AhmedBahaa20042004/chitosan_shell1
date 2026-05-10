export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  inStock: boolean;
  details: string[];
  scientificName?: string;
  purity?: string;
  concentration?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  zip: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi: string;
  abstract: string;
  tags: string[];
  source: 'PubMed' | 'ScienceDirect' | 'Google Scholar' | 'Nature' | 'RSC';
}

export interface ChemicalStep {
  step: number;
  name: string;
  reagent: string;
  temperature: string;
  duration: string;
  pH?: string;
  equation?: string;
  description: string;
  color: string;
}

export interface Stat {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  icon?: string;
}
