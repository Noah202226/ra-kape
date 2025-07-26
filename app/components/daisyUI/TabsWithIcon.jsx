"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchSettings } from "@/app/utils/fetchSettings";
import { updateMultipleSettings } from "@/app/utils/updateMultipleSettings";

import toast from "react-hot-toast";
import FileUploader from "../FileUploader";
import AddImage from "@/app/admin/AddImage";
import ShowAllProducts from "../ShowAllProducts";
import ImagePreview from "../ImagePreview";
import ShowAllReviews from "../ShowAllReviews";
import AddReview from "@/app/admin/AddReview";
import { fetchReviews } from "@/app/utils/fetchReviews";

function TabsWithIcon() {
  const router = useRouter();
  const settings = useSettingsStore((state) => state.settings);

  const [appTitle, setApptitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [CTAButton, setCTAButton] = useState("");
  const [card1Title, setCard1Title] = useState("");
  const [card1Description, setCard1Description] = useState("");
  const [card2Title, setCard2Title] = useState("");
  const [card2Description, setCard2Description] = useState("");
  const [card3Title, setCard3Title] = useState("");
  const [card3Description, setCard3Description] = useState("");

  const [aboutTitle, setAboutTitle] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [aboutDescription2, setAboutDescription2] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  const [activeTab, setActiveTab] = useState("settings");

  const modalRef = useRef(null);
  const modalCustomerRef = useRef(null);

  const handleSave = async () => {
    modalRef.current?.close(); // Close the modal
  };
  const handleSave2 = async () => {
    modalCustomerRef.current?.close(); // Close the modal
  };

  useEffect(() => {
    fetchSettings();
    fetchReviews();
  }, []);

  useEffect(() => {
    if (settings.webTitle !== undefined) {
      setApptitle(settings.webTitle);
      setHeroDescription(settings.heroDescriptions);
      setCTAButton(settings.heroCTA);
      setCard1Title(settings.heroCard1Title);
      setCard1Description(settings.heroCard1Subtitle);
      setCard2Title(settings.heroCard2Title);
      setCard2Description(settings.heroCard2Subtitle);
      setCard3Title(settings.heroCard3Title);
      setCard3Description(settings.heroCard3Subtitle);

      setAboutTitle(settings.aboutTitle);
      setAboutDescription(settings.aboutDescription);
      setAboutDescription2(settings.aboutDescription2);
    }
  }, [settings.webTitle]);

  const saveUpdate = async () => {
    setIsSaving(true);
    try {
      await updateMultipleSettings({
        webTitle: appTitle,
        heroDescriptions: heroDescription,
        heroCTA: CTAButton,
        heroCard1Title: card1Title,
        heroCard1Subtitle: card1Description,
        heroCard2Title: card2Title,
        heroCard2Subtitle: card2Description,
        heroCard3Title: card3Title,
        heroCard3Subtitle: card3Description,

        // Add other settings here as needed
        aboutTitle: aboutTitle,
        aboutDescription: aboutDescription,
        aboutDescription2: aboutDescription2,
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
            <div className="tabs tabs-lift w-full flex flex-wrap">
              {[
                { id: "settings", label: "SETTINGS", icon: "▶" },
                { id: "products", label: "PRODUCTS", icon: "🍨" },
                { id: "customers", label: "TESTIMONIALS", icon: "▶" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab flex-1 text-sm md:text-base text-black transition-all duration-200 
            ${
              activeTab === tab.id
                ? "tab-active bg-white text-white"
                : "bg-gray-800 hover:bg-white hover:text-black"
            }`}
                  style={{ minWidth: "120px", maxWidth: "200px" }}
                >
                  <span className="flex items-center justify-center gap-1">
                    {tab.icon} <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "settings" && (
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
                <FileUploader imageId={"687e3bc3003e319903fa"} />
              </div>

              <div className="card shadow-lg border-2 p-0 md:p-6">
                <h2 className="text-lg font-bold mb-4 text-neutral">
                  Hero Card 1
                </h2>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    Card Title
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card1Title}
                    onChange={(e) => setCard1Title(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard1Title}
                  </p>
                </fieldset>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    Description
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card1Description}
                    onChange={(e) => setCard1Description(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard1Subtitle}
                  </p>
                </fieldset>
              </div>

              <div className="card shadow-lg border-2 p-0 md:p-6">
                <h2 className="text-lg font-bold mb-4 text-neutral">
                  Hero Card 2
                </h2>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    Title
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card2Title}
                    onChange={(e) => setCard2Title(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard1Title}
                  </p>
                </fieldset>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    Description
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card2Description}
                    onChange={(e) => setCard2Description(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard1Subtitle}
                  </p>
                </fieldset>
              </div>

              <div className="card shadow-lg border-2 p-0 md:p-6">
                <h2 className="text-lg font-bold mb-4 text-neutral">
                  Hero Card 3
                </h2>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    Title
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card3Title}
                    onChange={(e) => setCard3Title(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard3Title}
                  </p>
                </fieldset>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    1st Hero Card Description
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={card3Description}
                    onChange={(e) => setCard3Description(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.heroCard3Subtitle}
                  </p>
                </fieldset>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
              <div className="bg-[white] shadow-2xl border-2 border-black rounded-2xl p-6 space-y-4">
                <h2 className="text-2xl font-bold text-black">
                  About Section Settings
                </h2>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    ABOUT TITLE
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.aboutTitle}
                  </p>
                </fieldset>
                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    About Descriptions
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.aboutDescription}
                  </p>
                </fieldset>

                <fieldset className="space-y-1">
                  <legend className="text-sm font-semibold text-black">
                    About Description 2
                  </legend>
                  <input
                    type="text"
                    className="input bg-black w-full text-white"
                    placeholder="Type here"
                    value={aboutDescription2}
                    onChange={(e) => setAboutDescription2(e.target.value)}
                  />
                  <p className="text-xs text-black">
                    Last data: {settings.aboutDescription2}
                  </p>
                </fieldset>

                <div className="card shadow-md p-0 md:p-6">
                  <h2 className="text-lg font-bold mb-4 text-neutral">
                    About Section Image
                  </h2>
                  <ImagePreview fileUrl={settings.aboutImage} />
                  <FileUploader imageId={"6883a2d20011c869fdbf"} />
                </div>
              </div>
            </div>

            {/* Sticky Save Button */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-base-100 p-2 flex justify-center shadow z-50">
              <button
                className="btn btn-accent px-6"
                onClick={saveUpdate}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "💾 Save All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="w-full border-t border-base-300 py-8 px-4 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-black font-semibold ">
              📦 Product Manager
            </h2>
            <button
              className="btn btn-accent"
              onClick={() => modalRef.current?.showModal()}
            >
              ➕ Add New Product
            </button>
          </div>

          {/* Product List */}
          <div>
            <ShowAllProducts />
          </div>

          {/* Modal */}
          <dialog id="my_modal_2" ref={modalRef} className="modal">
            <div className="modal-box">
              <AddImage onSave={handleSave} />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}

      {activeTab === "customers" && (
        <div className="w-full border-t border-base-300 py-8 px-4 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-black font-semibold ">
              📦 CUSTOMERS REVIEWS
            </h2>
            <button
              className="btn btn-accent"
              onClick={() => modalCustomerRef.current?.showModal()}
            >
              ➕ Add New Review
            </button>
          </div>

          {/* Product List */}
          <div>
            <ShowAllReviews />
          </div>

          {/* Modal */}
          <dialog id="my_modal_3" ref={modalCustomerRef} className="modal">
            <div className="modal-box">
              <AddReview onSave={handleSave2} />
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}

      {activeTab === "blogs" && (
        <div className="w-full border-t border-base-300 py-6">
          <div className="mx-auto p-6 grid gap-8 grid-cols-1 lg:grid-cols-2">
            <div className="bg-pink-300 p-6 rounded-xl shadow">
              <h2 className="font-bold text-xl mb-2">Tab 3 Content</h2>
              <p>Placeholder for future section content.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabsWithIcon;
