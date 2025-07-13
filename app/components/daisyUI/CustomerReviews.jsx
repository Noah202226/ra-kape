import React from "react";

const reviews = [
  {
    id: 1,
    comment:
      "Absolutely love their caramel frappe! Perfect spot to chill with friends.",
    image: "/reviews/1.jpg",
  },
  {
    id: 2,
    comment: "Their hot latte is smooth and rich. Staff are very friendly.",
    image: "/reviews/2.jpg",
  },
  {
    id: 3,
    comment:
      "I come here every weekend. Love the ambiance and the chocolate muffin.",
    image: "/reviews/3.jpg",
  },
  {
    id: 4,
    comment: "Great cozy spot for meetings or just relaxing. Highly recommend!",
    image: "/reviews/4.jpg",
  },
  {
    id: 5,
    comment:
      "The place is beautiful and their iced americano is the best in town.",
    image: "/reviews/5.jpg",
  },
  {
    id: 6,
    comment:
      "Friendly baristas and amazing desserts. A must-visit coffee shop.",
    image: "/reviews/6.jpg",
  },
];

function CustomerReviews() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-[var(--title)]">
        Customer Reviews
      </h2>
      <div
        className="
        grid gap-8 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3
      "
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            data-aos="fade-up"
            className="
              bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center
              transition-transform duration-300 
              hover:-translate-y-2 hover:scale-105 
              hover:shadow-[0_0_25px_rgba(219,152,52,0.4)]
              relative overflow-hidden
            "
          >
            {/* Gradient overlay on hover */}
            <div
              className="
              absolute inset-0 bg-gradient-to-t from-amber-700/30 to-transparent 
              opacity-0 hover:opacity-100 
              transition-opacity duration-300 pointer-events-none
            "
            />

            <img
              src={review.image}
              alt="Customer"
              className="
                w-20 h-20 rounded-full object-cover mb-4
                border-4 border-amber-700
                transition-transform duration-300 hover:scale-110
              "
            />
            <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerReviews;
