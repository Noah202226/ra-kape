import { database } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";

export async function fetchProducts() {
  try {
    const response = await database.listDocuments(
      "6870ab6f0018df40fa94", // database ID
      "products" // collection ID
    );

    // Set to zustand
    useSettingsStore.getState().setProducts(response.documents);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
  }
}
