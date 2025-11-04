import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TProduct } from "@/types";

interface ProductState {
  products: TProduct[],
  pagination: {
    total: number,
    limit: number,
    page: number
  },
  favorites: TProduct[],
  filter: 'all' | 'favorites',
  setProducts: (products: TProduct[]) => void,
  setPagination: (page: number, limit: number, totalFetch?: number) => void,
  getPaginatedProducts: () => TProduct[];
  getProduct: (id: number) => TProduct | undefined,
  createProduct: (product: TProduct) => void,
  deleteProduct: (id: number) => void,
  toggleFavorite: (product: TProduct) => void,
  selectFilter: (filter: 'all' | 'favorites') => void
}

export const useProductStore = create(persist<ProductState>((set, get) => ({
  products: [],
  pagination: {
    total: 0,
    limit: 9,
    page: 1
  },
  favorites: [],
  filter: 'all',

  setProducts: (products) => {
    set({
      products,
    });
  },
  setPagination: (page: number, limit: number, totalFetch?: number) => {
    const state = get();
    const total = totalFetch || state.products.length;
    set({
      pagination: { page, limit, total }
    });
  },
  getPaginatedProducts: () => {
    const state = get();
    const { page, limit } = state.pagination;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return state.products.slice(startIndex, endIndex);
  },
  getProduct: (id: number) => {
    const state = get();
    return state.products.find(p => p.id === id);
  },
  createProduct: (product) => {
    const state = get();
    const newProducts = [product, ...state.products];
    const total = newProducts.length;

    set({
      products: newProducts,
      pagination: { ...state.pagination, total }
    });
  },
  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id),
      pagination: { ...state.pagination, total: state.pagination.total - 1 },
      favorites: state.favorites.filter(fav => fav.id !== id),
    }));
  },
  toggleFavorite: (product) => set((state) => ({
    favorites: state.favorites.some(fav => fav.id === product.id)
      ? state.favorites.filter(fav => fav.id !== product.id)
      : [...state.favorites, product]
  })),
  selectFilter: (filter) => {
    set({ filter })
  }
}),
  { name: 'PRODUCT-APP-NEXT-KEY' }
));