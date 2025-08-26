import React from "react";
import useSettingsStore from "../stores/useSettingsStore";

function AboutUs() {
  const settings = useSettingsStore((state) => state.settings);

  return (
    <section className="py-12 sm:py-16 px-4 mx-auto max-w-7xl w-full">
      <div
        className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {/* Image */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-lg xl:max-w-none">
          <img
            src={settings?.aboutImage || "/rakape-logo.jpg"}
            alt="About Us"
            className="
              rounded-xl shadow-lg w-full object-cover
              h-56 sm:h-72 md:h-96 lg:h-[28rem] xl:h-[32rem]
              transition-all duration-300
              hover:ring-4 hover:ring-[var(--title)] hover:ring-offset-2
            "
          />

          {/* Floating beans animation */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 items-center">
            <img
              src="/downloads/coffee-bean.png"
              alt="Coffee Bean"
              className="w-5 sm:w-7 animate-float-up"
            />
            <img
              src="/downloads/coffee-bean.png"
              alt="Coffee Bean"
              className="w-3 sm:w-5 animate-float-up delay-500"
            />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left max-w-2xl px-2 sm:px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[var(--title)] leading-snug">
            {settings?.aboutTitle || "About Us"}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4">
            {settings?.aboutDescription ||
              "At RA KAPE, we believe in the magic of coffee. Our journey began with a simple passion for crafting the perfect cup, and it has grown into a community of coffee lovers who share our vision."}
          </p>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            {settings?.aboutDescription2 ||
              "Join us as we explore the world of coffee, from the rich flavors of our blends to the stories behind each bean. Whether you're a seasoned coffee connoisseur or just starting your journey, RA KAPE is here to inspire and delight."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
