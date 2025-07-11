import { create } from "zustand";

const useSettingsStore = create((set) => ({
  pageTitle: "RA CAFE",
  setPageTitle: (newTitle) => set((state) => ({ pageTitle: newTitle })),
}));

export default useSettingsStore;
