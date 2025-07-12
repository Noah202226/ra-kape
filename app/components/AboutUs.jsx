import React from "react";

function AboutUs() {
  return (
    <div className="pt-46 sm:pt-26 mt-60 sm:mt-0 px-4 mx-auto max-w-7xl w-ful">
      <div
        className="flex flex-col lg:flex-row items-center gap-12"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {/* Image */}
        <div className="flex-1 relative">
          <img
            src="/downloads/starting-outside.jpg"
            alt="About Us"
            className="rounded-xl shadow-lg w-full object-cover h-full lg:h-96"
          />
          {/* Steam animation */}
          <div className="absolute -top-2 sm:top-75 left-1/2 transform -translate-x-1/8">
            <div className="w-12 h-8 rounded-full bg-brown-400 opacity-80 animate-bounce-slow ">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
            <div className="w-2 h-2 mt-1 rounded-full bg-brown-300 opacity-60 animate-bounce-slower">
              <img src="/downloads/coffee-bean.png" alt="Coffee Bean" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4 text-[var(--title)]">
            About RA KAPE
          </h2>
          <p className="text-gray-600 mb-6">
            At RA KAPE, we believe that coffee is more than just a drink — it's
            an experience. From our carefully sourced beans to our cozy
            ambiance, we aim to bring people together over a shared love of
            great coffee and good company.
          </p>
          <p className="text-gray-600">
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
