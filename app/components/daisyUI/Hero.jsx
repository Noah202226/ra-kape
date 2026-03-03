import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useEffect, useState } from "react";
import { client } from "@/appwrite";

function Hero() {
  const settings = useSettingsStore((state) => state.settings);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const channel =
      "databases.6870ab6f0018df40fa94.collections.6870ab9e0013bcd4d615.documents";
    const unsubscribe = client.subscribe(channel, (response) => {
      console.log(response.events, response.payload);
    });
    return () => unsubscribe();
  }, []);

  // FLEXIBLE IMAGE LOGIC:
  // Priority 1: Image URL from Appwrite/Settings store
  // Priority 2: Local fallback image
  const menuImage = settings?.heroImage || "/rakape-new-menu.jpg";

  return (
    <div
      className="hero px-4 sm:px-6 lg:px-2 py-8 sm:py-12 lg:py-6 w-full"
      data-aos="fade-down"
    >
      <div className="hero-content flex flex-col gap-8 items-center">
        {/* TEXT SECTION */}
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 text-[var(--title)] leading-tight">
            ❛{settings?.webTitle}
          </h1>
          <p className="py-4 text-base sm:text-lg lg:text-2xl text-gray-900">
            {settings?.heroDescriptions}
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-lg mt-2 px-6 sm:px-8 py-3 bg-[var(--title)] border-0 hover:bg-gray-600 text-white"
          >
            {settings?.heroCTA}
          </button>
        </div>

        {/* PREVIEW IMAGE */}
        <div className="relative w-full max-w-7xl group">
          <div
            className="cursor-pointer overflow-hidden rounded-2xl shadow-2xl border-[var(--title)] border-2 transition-all active:scale-95 lg:hover:scale-[1.01]"
            onClick={() => setIsOpen(true)}
          >
            <img src={menuImage} alt="Menu Preview" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-white text-black px-4 py-2 rounded-full font-bold shadow-lg">
                Tap to Expand
              </span>
            </div>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="text-center p-4 rounded-xl bg-white/50 shadow-sm border border-white/20">
            <h3 className="text-lg font-bold text-[var(--title)]">
              {settings?.heroCard1Title || "Fresh Beans"}
            </h3>
            <p className="text-sm text-gray-900">
              {settings?.heroCard1Subtitle || "Locally sourced, roasted daily."}
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 shadow-sm border border-white/20">
            <h3 className="text-lg font-bold text-[var(--title)]">
              {settings?.heroCard2Title || "Crafted Drinks"}
            </h3>
            <p className="text-sm text-gray-900">
              {settings?.heroCard2Subtitle || "Made your way."}
            </p>
          </div>
          <div className="text-center p-4 rounded-xl bg-white/50 shadow-sm border border-white/20">
            <h3 className="text-lg font-bold text-[var(--title)]">
              {settings?.heroCard3Title || "Cozy Vibes"}
            </h3>
            <p className="text-sm text-gray-900">
              {settings?.heroCard3Subtitle || "We make memories."}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE-FRIENDLY LIGHTBOX */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          {/* Top Bar for Mobile UI */}
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-[10000] bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-white/70 text-sm font-medium">
              ← Scroll to see full menu →
            </span>
            <button
              className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all active:scale-90"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Image Container: Fixed Left-Side Clipping */}
          <div className="w-full h-full overflow-x-auto overflow-y-hidden flex items-center cursor-grab active:cursor-grabbing">
            {/* We use justify-start on mobile to ensure the left side isn't cut off.
                The w-max ensures the container expands to the full width of the landscape image.
            */}
            <div className="flex justify-start sm:justify-center items-center h-full w-max min-w-full px-6">
              <img
                src={menuImage}
                alt="Full Menu"
                className="max-w-none sm:max-w-full max-h-[80vh] h-auto rounded-lg shadow-2xl transition-transform duration-300"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          <p className="absolute bottom-6 text-white/40 text-xs italic bg-black/20 px-4 py-1 rounded-full">
            Tap anywhere to close
          </p>
        </div>
      )}
    </div>
  );
}

export default Hero;
