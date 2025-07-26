import useCartStore from "@/app/stores/useCartStore";
import React from "react";
import toast from "react-hot-toast";

// const bestSellers = [
//   {
//     id: 1,
//     name: "Tiramisu",
//     description: "Sweet, creamy caramel blended to perfection.",
//     image: "/downloads/tiramisu2.jpg",
//     price: 200,
//   },
//   {
//     id: 2,
//     name: "Hot Latte",
//     description: "Smooth espresso with steamed milk.",
//     image: "/products/product2.jpg",
//     price: 100,
//   },
//   {
//     id: 3,
//     name: "Iced Americano",
//     description: "Bold espresso over ice for a refreshing kick.",
//     image: "/products/iced-americano.jpg",
//     price: 90,
//   },
//   {
//     id: 4,
//     name: "Chocolate Muffin",
//     description: "Rich, moist chocolate muffin to pair with your brew.",
//     image: "/products/product2.jpg",
//     price: 60,
//   },
// ];

import useSettingsStore from "@/app/stores/useSettingsStore";

function BestSellerCarousel() {
  const addToCart = useCartStore((state) => state.addToCart);

  const { products } = useSettingsStore((state) => state);

  if (products.length === 0) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-[var(--title)]">
          Best Sellers
        </h2>
        <p className="text-center text-gray-500">No products available yet.</p>
      </div>
    );
  }

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
  };

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
        {products
          .filter((product) => product.productType === "best-seller")
          .map((product) => (
            <div
              key={product.$id}
              data-aos="zoom-in"
              className="
              bg-white rounded-xl shadow-lg overflow-hidden 
              transition-all duration-300 
              hover:shadow-[0_0_25px_rgba(0,0,0,0.6)]
              hover:scale-105 hover:-translate-y-1
            "
            >
              <figure className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="
                  w-full h-48 object-cover 
                  transition-transform duration-300 group-hover:scale-110
                "
                />
                {/* Gradient overlay */}
                <div
                  className="
                absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              "
                />
              </figure>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-[var(--title)]">
                  {product.productName}
                </h3>
                <div className="badge badge-outline mb-2">
                  {product.category}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {product.productDescription}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-black">
                    ₱{product.price}
                  </span>
                  <button
                    className="btn btn-sm btn-neutral"
                    onClick={() => handleAdd(product)}
                  >
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
