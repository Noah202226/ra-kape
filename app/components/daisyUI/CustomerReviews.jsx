"use client";

import useSettingsStore from "@/app/stores/useSettingsStore";
import { useEffect, useState } from "react";

function CustomerReviews() {
  const { reviews } = useSettingsStore((state) => state);
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null;

  if (loading) {
    return (
      <div className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-[var(--title)]">
          Customer Reviews
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center animate-pulse"
            >
              <div className="skeleton w-24 h-24 rounded-full mb-6"></div>
              <div className="skeleton h-4 w-3/4 mb-3"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[var(--title)]">
          Customer Reviews
        </h2>
        <p className="text-gray-500">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-[var(--title)]">
        Customer Reviews
      </h2>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviews.map((review) => (
          <div
            key={review.$id}
            data-aos="fade-up"
            className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center
              transition-all duration-300 
              hover:-translate-y-2 hover:scale-105 
              hover:shadow-[0_0_35px_rgba(0,0,0,0.15)]
              relative overflow-hidden"
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-amber-700/30 to-transparent 
              opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            />

            <img
              src={review.reviewImage}
              alt="Customer"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-6
                border-4 border-[var(--title)]
                transition-transform duration-500 hover:scale-110"
            />
            <p className="text-base md:text-lg text-gray-600 italic leading-relaxed">
              “{review.comments}”
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerReviews;
