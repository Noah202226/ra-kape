import React from "react";

const bestSellers = [
  {
    id: 1,
    name: "Tiramisu",
    description: "Sweet, creamy caramel blended to perfection.",
    image: "/downloads/tiramisu2.jpg",
    price: "₱120",
  },
  {
    id: 2,
    name: "Hot Latte",
    description: "Smooth espresso with steamed milk.",
    image: "/products/product2.jpg",
    price: "₱100",
  },
  {
    id: 3,
    name: "Iced Americano",
    description: "Bold espresso over ice for a refreshing kick.",
    image: "/products/iced-americano.jpg",
    price: "₱90",
  },
  {
    id: 4,
    name: "Chocolate Muffin",
    description: "Rich, moist chocolate muffin to pair with your brew.",
    image: "/products/product2.jpg",
    price: "₱60",
  },
];

function BestSellerCarousel() {
  return (
    <div className="py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-[var(--title)]">
        Best Sellers
      </h2>
      <div
        className="
        grid gap-6 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        max-w-7xl mx-auto
      "
      >
        {bestSellers.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-xl"
                data-aos="fade-up"
              />
            </figure>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
                {product.name}
              </h3>
              <div className="badge badge-warning">New</div>
              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-black">
                  {product.price}
                </span>
                <button className="btn btn-sm btn-primary text-[var(--title)]">
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BestSellerCarousel;
