import { database } from "@/appwrite";
import { Query } from "appwrite";

export async function updateSettingByName(settingName, newValue) {
  try {
    // Find document by settingName
    const list = await database.listDocuments(
      "6870ab6f0018df40fa94",
      "6870ab9e0013bcd4d615",
      [Query.equal("settingName", settingName)]
    );

    if (list.total === 0) {
      throw new Error(`No document found for settingName: ${settingName}`);
    }

    const docId = list.documents[0].$id;

    // Update the document
    const updated = await database.updateDocument(
      "6870ab6f0018df40fa94",
      "6870ab9e0013bcd4d615",
      docId,
      { value: newValue }
    );

    console.log(`Updated ${settingName} to:`, newValue);
    return updated;
  } catch (err) {
    console.error(`Error updating ${settingName}:`, err);
    throw err;
  }
}
