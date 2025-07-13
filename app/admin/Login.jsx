"use client";
import React, { useEffect, useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import { fetchSettings } from "../utils/fetchSettings";
import { updateMultipleSettings } from "../utils/updateMultipleSettings";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

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
      toast.success("Settings updated! REDIRECTING TO HOME...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      toast.error("Failed to update settings.");
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="relative min-h-screen">
        {/* Grid of cards */}
        <div className="max-w-6xl mx-auto p-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Hero Section */}
          <div className="bg-amber-700 shadow rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              Hero Section Settings
            </h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-900">
                WEB TITLE
              </legend>
              <input
                type="text"
                className="input bg-white"
                placeholder="Type here"
                value={appTitle}
                onChange={(e) => setApptitle(e.target.value)}
              />
              <p className="label">Last data: {settings.webTitle}</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-900">
                Landing Page Descriptions
              </legend>
              <input
                type="text"
                className="input bg-white"
                placeholder="Type here"
                value={heroDescription}
                onChange={(e) => setHeroDescription(e.target.value)}
              />
              <p className="label">Last data: {settings.heroDescriptions}</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-900">
                CTA BUTTON
              </legend>
              <input
                type="text"
                className="input bg-white"
                placeholder="Type here"
                value={CTAButton}
                onChange={(e) => setCTAButton(e.target.value)}
              />
              <p className="label">Last data: {settings.heroCTA}</p>
            </fieldset>
          </div>

          {/* About Section */}
          <div className="bg-amber-700 shadow rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              About Section Settings
            </h2>
            <input
              type="text"
              placeholder="About Title"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="About Description"
              className="textarea textarea-bordered w-full"
            ></textarea>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="toggle" />
              Show About Section
            </label>
          </div>

          {/* Products Section */}
          <div className="bg-amber-700 shadow rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              Products Section Settings
            </h2>
            <input
              type="text"
              placeholder="Products Section Title"
              className="input input-bordered w-full"
            />
            <label className="flex items-center gap-2">
              <input type="checkbox" className="toggle" />
              Show Featured Products
            </label>
          </div>

          {/* Testimonials Section */}
          <div className="bg-amber-700 shadow rounded-2xl p-6 space-y-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              Testimonials Section Settings
            </h2>
            <input
              type="text"
              placeholder="Testimonials Title"
              className="input input-bordered w-full"
            />
            <label className="flex items-center gap-2">
              <input type="checkbox" className="toggle" />
              Enable Testimonials
            </label>
          </div>
        </div>

        {/* Sticky Save Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            className="btn btn-primary shadow-lg rounded-full px-6 py-3 text-lg hover:scale-105 transition"
            onClick={() => saveUpdate()}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
