import { database } from "@/appwrite";
import useSettingsStore from "@/app/stores/useSettingsStore";

export async function fetchSettings() {
  try {
    const response = await database.listDocuments(
      "6870ab6f0018df40fa94", // database ID
      "6870ab9e0013bcd4d615" // collection ID
    );

    // Convert array into an object keyed by settingName
    const settingsData = {};
    response.documents.forEach((doc) => {
      settingsData[doc.settingName] = doc.value;
    });

    console.log("Fetched settings:", settingsData);
    // Set to zustand
    useSettingsStore.getState().setSettings(settingsData);
  } catch (err) {
    console.error("Failed to fetch settings:", err);
  }
}
