"use client";
import React, { useEffect, useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import { fetchSettings } from "../utils/fetchSettings";
import { updateMultipleSettings } from "../utils/updateMultipleSettings";

import toast from "react-hot-toast";

function Login() {
  const settings = useSettingsStore((state) => state.settings);

  const [appTitle, setApptitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [CTAButton, setCTAButton] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    if (settings.webTitle !== undefined) {
      setApptitle(settings.webTitle);
      setHeroDescription(settings.heroDescriptions);
      setCTAButton(settings.heroCTA);
    }
  }, [settings.webTitle]);

  const saveUpdate = async () => {
    setIsSaving(true);
    try {
      await updateMultipleSettings({
        webTitle: appTitle,
        heroDescriptions: heroDescription,
        heroCTA: CTAButton,
      });
      toast.success("Settings updated!");
    } catch (err) {
      toast.error("Failed to update settings.");
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="bg-amber-600 p-4">
        {/* App title */}
        <h2>Hero Section</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-[var(--title)]">
            WEB TITLE
          </legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={appTitle}
            onChange={(e) => setApptitle(e.target.value)}
          />
          <p className="label">{settings.webTitle}</p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-[var(--title)]">
            Landing Page Descriptions
          </legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
          />
          <p className="label">{settings.heroDescriptions}</p>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend text-[var(--title)]">
            CTA BUTTON
          </legend>
          <input
            type="text"
            className="input"
            placeholder="Type here"
            value={CTAButton}
            onChange={(e) => setCTAButton(e.target.value)}
          />
          <p className="label">{settings.heroCTA}</p>
        </fieldset>

        <button
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
          onClick={() => saveUpdate()}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save All"}
        </button>
      </div>
    </div>
  );
}

export default Login;
