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
    comment:
      "I come here every weekend. Love the ambiance and the chocolate muffin.",
    image: "/reviews/4.jpg",
  },
  {
    id: 5,
    comment:
      "I come here every weekend. Love the ambiance and the chocolate muffin.",
    image: "/reviews/5.jpg",
  },
  {
    id: 6,
    comment:
      "I come here every weekend. Love the ambiance and the chocolate muffin.",
    image: "/reviews/6.jpg",
  },
];

function CustomerReviews() {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-8 text-[var(--title)]">
        Customer Reviews
      </h2>
      <div
        className="
        grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3
      "
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
          >
            <img
              src={review.image}
              alt="Customer"
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <p className="text-sm text-gray-600">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerReviews;
