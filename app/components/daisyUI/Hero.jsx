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
      className="hero px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20"
      data-aos="fade-down"
      data-aos-offset="1"
      data-aos-easing="ease-in-sine"
    >
      <div className="hero-content flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* IMAGE on left */}
        <div className="relative w-full max-w-[14rem] sm:max-w-[18rem]  order-1 lg:order-none">
          <img
            src={settings?.heroImage || "/r.jpg"}
            alt="RA KAPE logo"
            className="w-full rounded-4xl shadow-lg border-[var(--title)] border-2 
                       transition-transform duration-300 hover:scale-105"
          />

          {/* Floating Beans */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 space-y-1">
            <div className="w-8 sm:w-10 h-6 rounded-full opacity-80 animate-bounce-slow">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
            <div className="w-2 h-2 rounded-full opacity-60 animate-bounce-slower">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
          </div>
        </div>

        {/* TEXT on right */}
        <div className="text-center lg:text-left max-w-xl lg:max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 text-[var(--title)] leading-tight">
            ❛{settings?.webTitle}
          </h1>
          <p className="py-4 text-base sm:text-lg lg:text-xl text-gray-900">
            {settings?.heroDescriptions}
          </p>
          <a href="/ice-drip-coffee" className="inline-block">
            <button className="btn btn-lg mt-4 px-6 sm:px-8 py-3 bg-[var(--title)] border-0 hover:bg-gray-600 hover:text-black text-white text-base sm:text-lg">
              {settings?.heroCTA}
            </button>
          </a>

          {/* Cards */}
          <div
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                {settings?.heroCard1Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-900">
                {settings?.heroCard1Subtitle}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                {settings?.heroCard2Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-900">
                {settings?.heroCard2Subtitle}
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-[var(--title)]">
                {settings?.heroCard3Title}
              </h3>
              <p className="text-sm sm:text-base text-gray-900">
                {settings?.heroCard3Subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
