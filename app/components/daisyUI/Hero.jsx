import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useEffect } from "react";

import { client } from "@/appwrite";

function Hero() {
  const settings = useSettingsStore((state) => state.settings);

  useEffect(() => {
    const channel =
      "databases.6870ab6f0018df40fa94.collections.6870ab9e0013bcd4d615.documents";

    const unsubscribe = client.subscribe(channel, (responce) => {
      const eventType = responce.events[0];
      console.log(responce.events);
      console.log(eventType);
      console.log(responce.payload);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div
      className="hero h-120 "
      data-aos="fade-down"
      data-aos-offset="1"
      data-aos-easing="ease-in-sine"
    >
      <div className="hero-content flex-col lg:flex-row gap-10">
        <div className="relative">
          <img
            src="/rakape-logo.jpg"
            alt="RA KAPE logo"
            className="w-100 sm:max-w-xs rounded-4xl shadow-lg border-amber-700 border-2"
          />

          {/* Steam animation */}
          <div className="absolute -top-2 sm:top-75 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-8 rounded-full bg-brown-400 opacity-80 animate-bounce-slow ">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
            <div className="w-2 h-2 mt-1 rounded-full bg-brown-300 opacity-60 animate-bounce-slower">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
          </div>
        </div>

        <div className="lg:text-left text-center max-w-xl">
          <h1 className="text-6xl font-extrabold mb-4 text-[var(--title)]">
            {settings?.webTitle}
          </h1>
          <p className="py-4 text-lg text-gray-600">
            {settings?.heroDescriptions}
          </p>
          <button className="btn btn-lg mt-4 bg-amber-700 border-0 hover:bg-amber-600 text-white">
            {settings.heroCTA}
          </button>

          <div
            className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-6"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[var(--title)]">
                100% Arabica
              </h3>
              <p className="text-sm text-gray-500">Locally sourced beans</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[var(--title)]">
                Cozy Vibes
              </h3>
              <p className="text-sm text-gray-500">Perfect for meetups</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[var(--title)]">
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
