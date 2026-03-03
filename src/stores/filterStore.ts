import { create } from 'zustand';
import type { CategorySlug } from '@/types';

type SortBy = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface FilterState {
  categories: CategorySlug[];
  brands: string[];
  priceRange: { min: number; max: number } | null;
  sortBy: SortBy;
  searchQuery: string;
  setCategories: (categories: CategorySlug[]) => void;
  setBrands: (brands: string[]) => void;
  setPriceRange: (range: { min: number; max: number } | null) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const initialState = {
  categories: [] as CategorySlug[],
  brands: [] as string[],
  priceRange: null as { min: number; max: number } | null,
  sortBy: 'relevance' as SortBy,
  searchQuery: '',
};

export const useFilterStore = create<FilterState>()((set) => ({
  ...initialState,

  setCategories: (categories: CategorySlug[]) => {
    set({ categories });
  },

  setBrands: (brands: string[]) => {
    set({ brands });
  },

  setPriceRange: (priceRange: { min: number; max: number } | null) => {
    set({ priceRange });
  },

  setSortBy: (sortBy: SortBy) => {
    set({ sortBy });
  },

  setSearchQuery: (searchQuery: string) => {
    set({ searchQuery });
  },

  resetFilters: () => {
    set({ ...initialState });
  },
}));
