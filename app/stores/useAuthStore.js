// stores/authStore.js
import { create } from "zustand";
import { account, database, dbId } from "../../appwrite";
import { ID } from "appwrite";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  current: null,
  loading: true,

  register: async ({ email, password, contact, address, name }) => {
    console.log("Registering user:", email);
    try {
      // Create auth account
      const newUser = await account.create(ID.unique(), email, password, name);

      // Save extra details in database profiles collection
      try {
        const parsedContact = contact ? (isNaN(parseInt(contact)) ? 0 : parseInt(contact)) : 0;
        await database.createDocument(dbId, "profiles", newUser.$id, {
          userID: newUser.$id,
          email: email || "",
          name: name || "",
          contactNumber: parsedContact,
          address: address || "",
          password: password || "",
        });
      } catch (dbErr) {
        console.warn("Could not save profile details to database:", dbErr);
      }

      // Auto-login
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();

      set({ current: currentUser });
      toast.success("Account created 🎉");
      return currentUser;
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error?.message || "Signup failed ❌");
      return null;
    }
  },

  login: async ({ email, password }) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      set({ current: user });
      toast.success("Welcome back 👋");
      return user;
    } catch (error) {
      toast.error(error?.message || "Login failed ❌");
      return null; // ✅ prevent app from crashing
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      set({ current: null });
      toast("Logged out 👋");
    } catch (error) {
      toast.error(error?.message || "Logout failed ❌");
    }
  },

  getCurrentUser: async () => {
    try {
      const user = await account.get();
      set({ current: user, loading: false });
    } catch {
      set({ current: null, loading: false });
    }
  },
}));
