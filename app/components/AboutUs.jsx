import React from "react";

function AboutUs() {
  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <div
        className="flex flex-col lg:flex-row items-center gap-12"
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
      >
        {/* Image */}
        <div className="flex-1">
          <img
            src="/downloads/starting-outside.jpg"
            alt="About Us"
            className="rounded-xl shadow-lg w-full object-cover h-96"
          />
        </div>

        {/* Text */}
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4">About RA KAPE</h2>
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
