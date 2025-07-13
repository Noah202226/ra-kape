import { updateSettingByName } from "./updateSettingByName";

export async function updateMultipleSettings(settingsObject) {
  // settingsObject: { webTitle: "New Title", heroDescriptions: "New Desc" }
  const updatePromises = Object.entries(settingsObject).map(
    ([settingName, newValue]) => updateSettingByName(settingName, newValue)
  );
  return Promise.all(updatePromises);
}
