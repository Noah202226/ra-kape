import { database } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";

export async function fetchReviews() {
  try {
    const response = await database.listDocuments(
      "6870ab6f0018df40fa94", // database ID
      "68842cca00175d53d7f5" // collection ID
    );

    // Set to zustand
    useSettingsStore.getState().setReviews(response.documents);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
  }
}
