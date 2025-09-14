"use client";
import { useAuthStore } from "@/app/stores/useAuthStore";
import useCartStore from "@/app/stores/useCartStore";
import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";

function BestSellerCarousel() {
  const { current } = useAuthStore((state) => state);

  const addToCart = useCartStore((state) => state.addToCart);
  const { products } = useSettingsStore((state) => state);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("22oz"); // default size

  console.log("Current user in BestSellerProducts:", current);
  if (products.length === 0) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--title)]">
          Best Sellers
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base">
          No products available yet.
        </p>
      </div>
    );
  }

  const handleAdd = () => {
    if (current === null) {
      toast.error("Please log in to add items to your cart.");
      setSelectedProduct(null);
      setSelectedSize("22oz");
      document.getElementById("order-modal")?.close();
      return;
    }

    if (!selectedProduct) return;

    const sizePrices = {
      "16oz": selectedProduct.priceSmall,
      "22oz": selectedProduct.priceLarge,
    };

    const finalPrice = sizePrices[selectedSize] || selectedProduct.priceSmall;

    const productWithSize = {
      ...selectedProduct,
      size: selectedSize,
      price: finalPrice,
    };

    addToCart(productWithSize);
    toast.success(
      `${selectedProduct.productName} (${selectedSize}) added to cart!`
    );

    setSelectedProduct(null);
    setSelectedSize("22oz");
    document.getElementById("order-modal")?.close();
  };

  return (
    <div className="py-12 px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto w-full">
      <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-10 text-[var(--title)]">
        Best Sellers
      </h2>

      {/* Responsive Grid */}
      <div
        className="
          grid gap-6 sm:gap-8
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
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
    flex flex-col
  "
            >
              {/* Image */}
              <figure className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="
        w-full 
        h-72 sm:h-48 md:h-56 lg:h-64 xl:h-72 
        object-cover 
        transition-transform duration-300 group-hover:scale-110
      "
                />
                <div
                  className="
        absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent 
        opacity-0 group-hover:opacity-100 
        transition-opacity duration-300
      "
                />
              </figure>

              {/* Card Content */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <h3 className="text-4xl sm:text-lg md:text-xl font-semibold mb-2 text-black line-clamp-1 text-center sm:text-left">
                  {product.productName}
                </h3>

                <div className="badge badge-outline mb-2 text-lg sm:text-sm text-black text-center sm:text-left">
                  {product.category}
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-4 line-clamp-3 text-center sm:text-left">
                  {product.productDescription}
                </p>

                {/* Price Section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-lg text-black" />
                      <span className="font-bold text-xl sm:text-lg md:text-sm text-black">
                        ₱{product.priceSmall}
                      </span>
                      <span className="text-xl sm:text-lg md:text-sm text-gray-500">
                        (Regular)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-2xl text-black" />
                      <span className="font-bold text-xl sm:text-lg md:text-sm text-black">
                        ₱{product.priceLarge}
                      </span>
                      <span className="text-xl sm:text-lg md:text-sm text-gray-500">
                        (Upsize)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  className="btn btn-xl sm:btn-sm md:btn-md btn-neutral w-full mt-3 text-xl sm:text-lg md:text-xl font-semibold "
                  onClick={() => {
                    setSelectedProduct(product);
                    document.getElementById("order-modal")?.showModal();
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
      <dialog id="order-modal" className="modal">
        <div className="modal-box bg-gray-300 max-w-md sm:max-w-lg">
          {selectedProduct && (
            <>
              <h3 className="text-base sm:text-lg font-bold mb-4 text-black">
                Choose size for {selectedProduct.productName}
              </h3>

              <div className="flex flex-col gap-3 mb-4">
                {[
                  { label: "16oz", price: selectedProduct.priceSmall },
                  { label: "22oz", price: selectedProduct.priceLarge },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedSize(opt.label)}
                    className={`flex justify-between px-4 py-2 rounded-lg border text-sm sm:text-base ${
                      selectedSize === opt.label
                        ? "bg-gray-600 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span>₱{opt.price}</span>
                  </button>
                ))}
              </div>

              <div className="modal-action flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="btn bg-white text-black border border-black hover:bg-gray-600 hover:text-white w-full sm:w-auto"
                >
                  Add to Cart
                </button>
                <form method="dialog" className="w-full sm:w-auto">
                  <button className="btn w-full">Cancel</button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default BestSellerCarousel;
