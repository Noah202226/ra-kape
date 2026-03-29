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
import ShowAllEvents from "../ShowAllEvents";
import AddEvent from "@/app/admin/AddEvent";
import ShowAllUsers from "../ShowAllUsers";

import AdminCouponsPage from "../CouponPage";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCube,
  HiOutlineChatBubbleLeftRight,
  HiOutlineTicket,
  HiOutlineUsers,
  HiOutlineSparkles,
  HiOutlineArrowUpTray,
} from "react-icons/hi2";

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
    modalRef.current?.close();
  };
  const handleSave2 = async () => {
    modalCustomerRef.current?.close();
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
        aboutTitle: aboutTitle,
        aboutDescription: aboutDescription,
        aboutDescription2: aboutDescription2,
      });
      toast.success("Settings updated!");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      toast.error("Failed to update settings.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    {
      id: "settings",
      label: "General",
      icon: <HiOutlineAdjustmentsHorizontal size={18} />,
    },
    { id: "products", label: "Inventory", icon: <HiOutlineCube size={18} /> },
    {
      id: "customers",
      label: "Reviews",
      icon: <HiOutlineChatBubbleLeftRight size={18} />,
    },
    { id: "events", label: "Events", icon: <HiOutlineSparkles size={18} /> },
    {
      id: "users",
      label: "Users", // Shortened for mobile space
      icon: <HiOutlineUsers size={18} />,
    },
    { id: "coupons", label: "Coupons", icon: <HiOutlineTicket size={18} /> },
  ];

  // Refined Input Component for better mobile verticality
  const AdminInput = ({ label, value, onChange, placeholder, lastData }) => (
    <div className="space-y-1 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 ml-1">
        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {label}
        </label>
        {lastData && (
          <span className="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded self-start sm:self-auto truncate max-w-full">
            Current: {lastData}
          </span>
        )}
      </div>
      <input
        type="text"
        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-amber-500 focus:bg-white rounded-xl text-sm font-bold transition-all outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Sticky Tab Navigation - Optimized for mobile touch & visibility */}
      <div className="sticky top-23 bg-white/90 backdrop-blur-lg z-40 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar gap-1 p-2 md:p-3 scroll-smooth items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap
                  ${
                    activeTab === tab.id
                      ? "bg-black text-white shadow-md scale-100"
                      : "text-gray-400 hover:text-black hover:bg-gray-50"
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8 mt-23">
        {activeTab === "settings" && (
          <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header - Scaled for mobile */}
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">
                Site Settings
              </h1>
              <p className="text-xs md:text-base text-gray-500 font-medium mt-1">
                Manage your storefront content and branding
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-8 space-y-6">
                <section className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 shadow-sm border border-gray-100 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    <h2 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tight">
                      Hero Section
                    </h2>
                  </div>

                  <AdminInput
                    label="Website Title"
                    value={appTitle}
                    onChange={(e) => setApptitle(e.target.value)}
                    lastData={settings.webTitle}
                  />
                  <AdminInput
                    label="Landing Description"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    lastData={settings.heroDescriptions}
                  />
                  <AdminInput
                    label="Call to Action Label"
                    value={CTAButton}
                    onChange={(e) => setCTAButton(e.target.value)}
                    lastData={settings.heroCTA}
                  />
                </section>

                <section className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-10 shadow-sm border border-gray-100 space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                    <h2 className="text-sm md:text-xl font-black text-gray-900 uppercase tracking-tight">
                      About Story
                    </h2>
                  </div>

                  <AdminInput
                    label="About Title"
                    value={aboutTitle}
                    onChange={(e) => setAboutTitle(e.target.value)}
                    lastData={settings.aboutTitle}
                  />
                  <AdminInput
                    label="Primary Story"
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    lastData={settings.aboutDescription}
                  />
                  <AdminInput
                    label="Secondary Story"
                    value={aboutDescription2}
                    onChange={(e) => setAboutDescription2(e.target.value)}
                    lastData={settings.aboutDescription2}
                  />
                </section>

                {/* Info Cards Grid - Better Spacing for Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      id: 1,
                      title: card1Title,
                      setT: setCard1Title,
                      desc: card1Description,
                      setD: setCard1Description,
                    },
                    {
                      id: 2,
                      title: card2Title,
                      setT: setCard2Title,
                      desc: card2Description,
                      setD: setCard2Description,
                    },
                    {
                      id: 3,
                      title: card3Title,
                      setT: setCard3Title,
                      desc: card3Description,
                      setD: setCard3Description,
                    },
                  ].map((card) => (
                    <div
                      key={card.id}
                      className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-gray-100 space-y-4"
                    >
                      <h3 className="font-black text-[10px] uppercase tracking-widest text-gray-400">
                        Card 0{card.id}
                      </h3>
                      <AdminInput
                        label="Title"
                        value={card.title}
                        onChange={(e) => card.setT(e.target.value)}
                      />
                      <AdminInput
                        label="Subtitle"
                        value={card.desc}
                        onChange={(e) => card.setD(e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Assets Area */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                  <h3 className="font-black text-sm text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineArrowUpTray /> Hero Asset
                  </h3>
                  <div className="rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 p-2 bg-gray-50">
                    <ImagePreview fileUrl={settings.heroImage} />
                  </div>
                  <div className="mt-4">
                    <FileUploader imageId={"687e3bc3003e319903fa"} />
                  </div>
                </div>

                <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                  <h3 className="font-black text-sm text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineArrowUpTray /> About Asset
                  </h3>
                  <div className="rounded-2xl overflow-hidden border-2 border-dashed border-gray-100 p-2 bg-gray-50">
                    <ImagePreview fileUrl={settings.aboutImage} />
                  </div>
                  <div className="mt-4">
                    <FileUploader imageId={"6883a2d20011c869fdbf"} />
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Save Bar - Compact and floating on mobile */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
              <button
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-2xl font-black text-base shadow-2xl hover:scale-102 active:scale-95 transition-all disabled:opacity-50"
                onClick={saveUpdate}
                disabled={isSaving}
              >
                {isSaving ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <span>💾</span> Save All Changes
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* --- Other Tabs (Shortened padding for mobile) --- */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Inventory</h2>
                <p className="text-xs text-gray-500 font-medium">
                  Manage menu and stock
                </p>
              </div>
              <button
                className="btn btn-primary rounded-xl font-bold w-full sm:w-auto"
                onClick={() => modalRef.current?.showModal()}
              >
                + New Product
              </button>
            </div>
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-hidden">
              <ShowAllProducts />
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Reviews</h2>
                <p className="text-xs text-gray-500 font-medium">
                  Public feedback
                </p>
              </div>
              <button
                className="btn btn-primary rounded-xl font-bold w-full sm:w-auto"
                onClick={() => modalCustomerRef.current?.showModal()}
              >
                + Add Review
              </button>
            </div>
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-hidden">
              <ShowAllReviews />
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Events</h2>
                <p className="text-xs text-gray-500 font-medium">
                  Promotions and shop news
                </p>
              </div>
              <button
                className="btn btn-primary rounded-xl font-bold w-full sm:w-auto"
                onClick={() => modalCustomerRef.current?.showModal()}
              >
                + Add Event
              </button>
            </div>
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
              <ShowAllEvents />
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-900">Accounts</h2>
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              <ShowAllUsers />
            </div>
          </div>
        )}

        {activeTab === "coupons" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black text-gray-900">Coupons</h2>
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-x-auto">
              <AdminCouponsPage />
            </div>
          </div>
        )}
      </div>

      {/* Shared Modals */}
      <dialog
        id="my_modal_2"
        ref={modalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box rounded-t-[2rem] sm:rounded-[2.5rem] p-6 w-full">
          <AddImage onSave={handleSave} />
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>

      <dialog
        id="my_modal_3"
        ref={modalCustomerRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box rounded-t-[2rem] sm:rounded-[2.5rem] p-6 w-full">
          <AddReview onSave={handleSave2} />
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default TabsWithIcon;
