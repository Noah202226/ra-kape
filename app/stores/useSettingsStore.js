import { create } from "zustand";

const useSettingsStore = create((set) => ({
  dbId: "6870ab6f0018df40fa94",
  settings: {},
  setSettings: (settings) => set(() => ({ settings })),

  cart: [],
  setCart: () => set((state) => state.cart),
}));

export default useSettingsStore;
