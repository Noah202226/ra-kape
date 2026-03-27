import { database, dbId } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";

export async function fetchEvents() {
  try {
    const response = await database.listDocuments(
      dbId, // database ID
      "689898d3001b38bc0cf3", // collection ID
    );

    console.log("Fetched events:", response.documents);

    // Set to zustand
    useSettingsStore.getState().setEvents(response.documents);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
  }
}
