import React from "react";
import useSettingsStore from "../stores/useSettingsStore";

function AboutUs() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <div className="py-16 px-4 mx-auto max-w-7xl w-full">
      <div
        className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {/* Image */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-none">
          <img
            src={settings?.aboutImage || "/rakape-logo.jpg"} // Fallback image if not set
            alt="About Us"
            className="
              rounded-xl shadow-lg w-full object-cover 
              h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]
              transition-all duration-300
              hover:ring-4 hover:ring-[var(--title)] hover:ring-offset-2 hover:ring-offset-transparent
            "
          />

          {/* Steam animation */}
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

        {/* Text */}
        <div className="flex-1 text-center lg:text-left max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[var(--title)]">
            {settings?.aboutTitle || "About Us"}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-4">
            {settings?.aboutDescription ||
              "At RA KAPE, we believe in the magic of coffee. Our journey began with a simple passion for crafting the perfect cup, and it has grown into a community of coffee lovers who share our vision."}
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            {settings?.aboutDescription2 ||
              "Join us as we explore the world of coffee, from the rich flavors of our blends to the stories behind each bean. Whether you're a seasoned coffee connoisseur or just starting your journey, RA KAPE is here to inspire and delight."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
