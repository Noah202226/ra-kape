import { create } from "zustand";

const useSettingsStore = create((set) => ({
  dbId: "6870ab6f0018df40fa94",
  settings: {},
  setSettings: (settings) => set(() => ({ settings })),

  // ✅ Add product state
  products: [],
  setProducts: (products) => set(() => ({ products })),
  addProduct: (newProduct) =>
    set((state) => ({ products: [...state.products, newProduct] })),
  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product.$id !== id),
    })),
  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.$id === updatedProduct.$id ? updatedProduct : product
      ),
    })),

  // Add customer reviews state
  reviews: [],
  setReviews: (reviews) => set(() => ({ reviews })),
  addReview: (newReview) =>
    set((state) => ({ reviews: [...state.reviews, newReview] })),
  removeReview: (id) =>
    set((state) => ({
      reviews: state.reviews.filter((review) => review.$id !== id),
    })),
  updateReview: (updatedReview) =>
    set((state) => ({
      reviews: state.reviews.map((review) =>
        review.$id === updatedReview.$id ? updatedReview : review
      ),
    })),
}));

export default useSettingsStore;
