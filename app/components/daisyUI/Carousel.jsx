"use client";
import React, { useState, useEffect } from "react";

import useSettingsStore from "@/app/stores/useSettingsStore"; // Assuming you have a zustand store for events

// const slides = [
//   {
//     id: 1,
//     img: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
//     title: "Summer Mega Sale ☀️",
//     desc: "Up to 50% OFF on selected items. Limited time only!",
//     date: "Until Aug 31",
//     link: "/promos/summer-sale",
//     location: "Main Store & Online",
//   },
//   {
//     id: 2,
//     img: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
//     title: "New Arrivals Just In 🛍️",
//     desc: "Be the first to grab our latest collection.",
//     date: "Available Now",
//     link: "/products/new-arrivals",
//     location: "Main Store",
//   },
//   {
//     id: 3,
//     img: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
//     title: "Buy 1 Get 1 Free 🍔",
//     desc: "On all burgers every Friday. Don’t miss it!",
//     date: "Every Friday, All Day",
//     link: "/promos/bogo-burgers",
//     location: "All Branches",
//   },
//   {
//     id: 4,
//     img: "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp",
//     title: "Weekend Flash Sale ⚡",
//     desc: "Exclusive online deals, this weekend only!",
//     date: "Sat & Sun Only",
//     link: "/promos/weekend-sale",
//     location: "Online Only",
//   },
// ];

function PromoCarousel() {
  const { events } = useSettingsStore((state) => state);
  const [current, setCurrent] = useState(0);
  const [modalData, setModalData] = useState(null);

  // // Auto-slide every 5s
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % events.length);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, []);

  const handleLearnMore = (slide) => {
    setModalData(slide);
    document.getElementById("promo-modal").showModal();
  };

  return (
    <>
      {/* Carousel */}
      <div
        className="relative w-full h-[400px] overflow-hidden rounded-none md:rounded-xl shadow-lg m-20"
        data-aos="fade-right"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
      >
        {events.map((slide, index) => (
          <div
            key={slide.$id}
            className={`absolute w-full h-full object-contain transition-all duration-700 ease-in-out ${
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

            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="mb-2 text-lg">{slide.desc}</p>
              <span className="text-sm opacity-80">{slide.date}</span>
              <button
                onClick={() => handleLearnMore(slide)}
                className="mt-4 w-3xs bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md transition"
              >
                Learn More →
              </button>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition ${
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
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % events.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          ❯
        </button>
      </div>

      {/* Modal */}
      <dialog id="promo-modal" className="modal">
        <div className="modal-box max-w-lg relative overflow-hidden p-0">
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
              <div className="relative p-6 text-white">
                <h3 className="text-2xl font-bold">{modalData.title}</h3>
                <p className="py-2">{modalData.desc}</p>
                <p className="text-sm opacity-80">
                  📅 {modalData.date} <br /> 📍 {modalData.location}
                </p>
                <div className="mt-4 flex gap-3">
                  <a href={modalData.link} className="btn btn-primary">
                    Visit Promo Page
                  </a>
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      modalData.title
                    )}&details=${encodeURIComponent(
                      modalData.desc
                    )}&location=${encodeURIComponent(modalData.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline text-white border-white"
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
