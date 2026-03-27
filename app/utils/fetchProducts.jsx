import { database, dbId } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";
import { Query } from "appwrite";

export async function fetchProducts() {
  try {
    let allProducts = [];
    let offset = 0;
    const limit = 100; // max Appwrite allows per request

    while (true) {
      const response = await database.listDocuments(
        dbId, // database ID
        "products", // collection ID
        [Query.limit(limit), Query.offset(offset)],
      );

      allProducts = [...allProducts, ...response.documents];

      if (response.documents.length < limit) {
        break; // no more documents to fetch
      }

      offset += limit;
    }

    // Set to zustand
    useSettingsStore.getState().setProducts(allProducts);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
}
