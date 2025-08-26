"use client";
import React, { useState } from "react";
import useSettingsStore from "@/app/stores/useSettingsStore";

function PromoCarousel() {
  const { events } = useSettingsStore((state) => state);
  const [current, setCurrent] = useState(0);
  const [modalData, setModalData] = useState(null);

  const handleLearnMore = (slide) => {
    setModalData(slide);
    document.getElementById("promo-modal").showModal();
  };

  return (
    <>
      {/* Carousel */}
      <div
        className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden rounded-none md:rounded-xl shadow-lg my-8 sm:my-12 lg:my-20"
        data-aos="fade-right"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
      >
        {events.map((slide, index) => (
          <div
            key={slide.$id}
            className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
              index === current
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-4 sm:p-6 lg:p-10 text-white">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {slide.title}
              </h2>
              <p className="mb-2 text-sm sm:text-base lg:text-lg">
                {slide.desc}
              </p>
              <span className="text-xs sm:text-sm opacity-80">
                {slide.date}
              </span>
              <button
                onClick={() => handleLearnMore(slide)}
                className="mt-4 bg-amber-500 hover:bg-amber-600 text-white px-3 sm:px-4 lg:px-6 py-2 rounded-lg shadow-md text-xs sm:text-sm lg:text-base transition"
              >
                Learn More →
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition ${
                i === current ? "bg-amber-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <button
          onClick={() =>
            setCurrent((prev) => (prev - 1 + events.length) % events.length)
          }
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 lg:p-4 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % events.length)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 sm:p-3 lg:p-4 rounded-full"
        >
          ❯
        </button>
      </div>

      {/* Modal */}
      <dialog id="promo-modal" className="modal">
        <div className="modal-box max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl relative overflow-hidden p-0">
          {modalData && (
            <>
              {/* Blurred background */}
              <div className="absolute inset-0">
                <img
                  src={modalData.img}
                  alt={modalData.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
              </div>

              {/* Content */}
              <div className="relative p-4 sm:p-6 text-white">
                <h3 className="text-xl sm:text-2xl font-bold">
                  {modalData.title}
                </h3>
                <p className="py-2 text-sm sm:text-base">{modalData.desc}</p>
                <p className="text-xs sm:text-sm opacity-80">
                  📅 {modalData.date} <br /> 📍 {modalData.location}
                </p>
                <div className="mt-4 flex gap-3 flex-wrap">
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      modalData.title
                    )}&details=${encodeURIComponent(
                      modalData.desc
                    )}&location=${encodeURIComponent(modalData.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-white border-white text-xs sm:text-sm"
                  >
                    Add to Calendar
                  </a>
                </div>
              </div>
            </>
          )}
          <div className="modal-action relative z-10">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default PromoCarousel;
