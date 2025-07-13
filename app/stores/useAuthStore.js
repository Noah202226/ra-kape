import { account } from "@/appwrite";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  authUser: null,
  checkUser: async () => {
    try {
      const user = await account.get();
      // Logged in
      set({ authUser: user });
    } catch (err) {
      // Not logged in
      console.log(err, "No user");
    }
  },
}));

export default useAuthStore;
