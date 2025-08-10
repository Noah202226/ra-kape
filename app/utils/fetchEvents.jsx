import { database } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";

export async function fetchEvents() {
  try {
    const response = await database.listDocuments(
      "6870ab6f0018df40fa94", // database ID
      "689898d3001b38bc0cf3" // collection ID
    );

    console.log("Fetched events:", response.documents);

    // Set to zustand
    useSettingsStore.getState().setEvents(response.documents);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
  }
}
