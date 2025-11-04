import { create } from 'zustand';
import { TProduct } from "@/types";

interface ProductState {
  products: TProduct[],
  pagination: {
    total: number,
    skip: number,
    limit: number,
    page: number
  },
  favorites: TProduct[],
  filter: 'all' | 'favorites',
  setProducts: (products: TProduct[]) => void,
  setPagination: (total: number, skip: number, limit: number, page: number) => void,
  getProduct: (id: number) => TProduct | undefined,
  createProduct: (product: TProduct) => void,
  deleteProduct: (id: number) => void,
  toggleFavorite: (product: TProduct) => void,
  selectFilter: (filter: 'all' | 'favorites') => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  pagination: {
    total: 0,
    skip: 0,
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
  setPagination: (total, skip, limit, page) => {
    set({
      pagination: {
        total,
        skip,
        limit,
        page
      }
    });
  },
  getProduct: (id: number) => {
    const state = get();
    return state.products.find(p => p.id === id);
  },
  createProduct: (product) => {
    set((state) => ({
      products: [product, ...state.products],
      pagination: { ...state.pagination, total: state.pagination.total + 1 }
    }));
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
}))