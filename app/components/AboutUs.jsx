import React from "react";

function AboutUs() {
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
            src="/downloads/starting-outside.jpg"
            alt="About Us"
            className="
              rounded-xl shadow-lg w-full object-cover 
              h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]
              transition-all duration-300
              hover:ring-4 hover:ring-amber-700 hover:ring-offset-2 hover:ring-offset-transparent
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
            About RA KAPE
          </h2>
          <p className="text-gray-600 text-base sm:text-lg mb-4">
            At RA KAPE, we believe that coffee is more than just a drink — it's
            an experience. From our carefully sourced beans to our cozy
            ambiance, we aim to bring people together over a shared love of
            great coffee and good company.
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Whether you're here to work, catch up with friends, or simply enjoy
            a peaceful moment, we promise a cup that will warm your heart and
            fuel your day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
