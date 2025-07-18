import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useEffect } from "react";
import { client } from "@/appwrite";

function Hero() {
  const settings = useSettingsStore((state) => state.settings);

  useEffect(() => {
    const channel =
      "databases.6870ab6f0018df40fa94.collections.6870ab9e0013bcd4d615.documents";
    const unsubscribe = client.subscribe(channel, (response) => {
      console.log(response.events, response.payload);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      className="hero min-h-[80vh] px-4 py-8 md:py-16"
      data-aos="fade-down"
      data-aos-offset="1"
      data-aos-easing="ease-in-sine"
    >
      <div className="hero-content flex flex-col lg:flex-row gap-10 items-center lg:items-center">
        {/* IMAGE on left */}
        <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-xs order-1 lg:order-none">
          <img
            src="/rakape-logo.jpg"
            alt="RA KAPE logo"
            className="w-full rounded-4xl shadow-lg border-amber-700 border-2 
                       transition-transform duration-300 hover:scale-105"
          />

          {/* Steam / Beans */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 space-y-1">
            <div
              className="w-10 h-6 rounded-full opacity-80 animate-bounce-slow 
                            transition-transform duration-300 hover:scale-110"
            >
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
            <div
              className="w-2 h-2 rounded-full opacity-60 animate-bounce-slower 
                            transition-transform duration-300 hover:scale-110"
            >
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
          </div>
        </div>

        {/* TEXT on right */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-[var(--title)]">
            {settings?.webTitle}
          </h1>
          <p className="py-4 text-base sm:text-lg text-gray-600">
            {settings?.heroDescriptions}
          </p>
          <button className="btn btn-lg mt-4 bg-amber-700 border-0 hover:bg-amber-600 text-white">
            {settings?.heroCTA}
          </button>

          <div
            className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                100% Arabica
              </h3>
              <p className="text-sm text-gray-500">Locally sourced beans</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                Cozy Vibes
              </h3>
              <p className="text-sm text-gray-500">Perfect for meetups</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                Fresh Daily
              </h3>
              <p className="text-sm text-gray-500">Every cup made with love</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
