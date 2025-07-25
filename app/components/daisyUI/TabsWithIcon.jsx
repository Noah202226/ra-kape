"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchSettings } from "@/app/utils/fetchSettings";
import { updateMultipleSettings } from "@/app/utils/updateMultipleSettings";

import toast from "react-hot-toast";
import FileUploader from "../FileUploader";
import AddImage from "@/app/admin/AddImage";
import ShowAllProducts from "../ShowAllProducts";
import ImagePreview from "../ImagePreview";

function TabsWithIcon() {
  const router = useRouter();
  const settings = useSettingsStore((state) => state.settings);

  const [appTitle, setApptitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [CTAButton, setCTAButton] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("live");

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
      toast.success("Settings updated! Redirecting to home...");
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      toast.error("Failed to update settings.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="w-full">
        <div className="mx-auto px-0 md:px-4">
          <div className="tabs tabs-lift w-full ">
            <button
              onClick={() => setActiveTab("live")}
              className={`tab text-black  ${
                activeTab === "live"
                  ? "bg-black text-white tab-active"
                  : "bg-white text-black"
              }`}
            >
              <span className="flex items-center gap-1">
                ▶ <span>SETTINGS</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("laugh")}
              className={`tab ${
                activeTab === "laugh"
                  ? "bg-black text-white tab-active"
                  : "bg-white"
              }`}
            >
              <span className="flex items-center gap-1">
                🍨 <span>PRODUCTS</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab("love")}
              className={`tab  ${
                activeTab === "love"
                  ? "bg-black text-white tab-active"
                  : "bg-white"
              }`}
            >
              <span className="flex items-center gap-1">
                🛴 <span>CONTACT</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("live")}
              className={`tab  ${
                activeTab === "live"
                  ? "bg-black text-white tab-active"
                  : "bg-white"
              }`}
            >
              <span className="flex items-center gap-1">
                ▶ <span>BLOGS</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`tab ${
                activeTab === "customers"
                  ? "bg-black text-white tab-active"
                  : "bg-white text-black"
              }`}
            >
              <span className="flex items-center gap-1">
                ▶ <span>Customers Review</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "live" && (
        <div className="w-full border-t border-base-300 py-0 md:py-6">
          <div className="mx-auto p-0 md:p-6 grid gap-8 grid-cols-1 lg:grid-cols-1">
            {/* Hero Section */}
            <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black">
                Hero Section Settings
              </h2>
              <fieldset className="space-y-1">
                <legend className="text-sm font-semibold text-black">
                  WEB TITLE
                </legend>
                <input
                  type="text"
                  className="input bg-black w-full text-white"
                  placeholder="Type here"
                  value={appTitle}
                  onChange={(e) => setApptitle(e.target.value)}
                />
                <p className="text-xs text-black">
                  Last data: {settings.webTitle}
                </p>
              </fieldset>
              <fieldset className="space-y-1">
                <legend className="text-sm font-semibold text-black">
                  Landing Page Descriptions
                </legend>
                <input
                  type="text"
                  className="input bg-black w-full text-white"
                  placeholder="Type here"
                  value={heroDescription}
                  onChange={(e) => setHeroDescription(e.target.value)}
                />
                <p className="text-xs text-black">
                  Last data: {settings.heroDescriptions}
                </p>
              </fieldset>
              <fieldset className="space-y-1">
                <legend className="text-sm font-semibold text-black">
                  CTA BUTTON
                </legend>
                <input
                  type="text"
                  className="input bg-black w-full text-white"
                  placeholder="Type here"
                  value={CTAButton}
                  onChange={(e) => setCTAButton(e.target.value)}
                />
                <p className="text-xs text-black">
                  Last data: {settings.heroCTA}
                </p>
              </fieldset>

              <div className="card shadow-md p-0 md:p-6">
                <h2 className="text-lg font-bold mb-4 text-neutral">
                  Hero Image
                </h2>
                <ImagePreview fileUrl={settings.heroImage} />
                <FileUploader />
              </div>
            </div>

            {/* About Section */}
            <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
              <h2>About Section</h2>
            </div>

            {/* Products Section */}
            <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black">
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
            <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
              <h2 className="text-2xl font-bold text-black">
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
        </div>
      )}

      {activeTab === "laugh" && (
        <div className="w-full border-t border-base-300 py-6">
          <AddImage />
          <ShowAllProducts />
        </div>
      )}

      {activeTab === "love" && (
        <div className="w-full border-t border-base-300 py-6">
          <div className="max-w-6xl mx-auto p-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
            <div className="bg-pink-300 p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-2">Tab 3 Content</h2>
              <p>Placeholder for future section content.</p>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-amber-500 border-t border-base-100 p-2 flex justify-end shadow z-50">
        <button
          className="btn btn-accent px-6"
          onClick={saveUpdate}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "💾 Save All"}
        </button>
      </div>
    </div>
  );
}

export default TabsWithIcon;
