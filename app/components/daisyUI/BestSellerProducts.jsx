"use client";
import useCartStore from "@/app/stores/useCartStore";
import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";

function BestSellerCarousel() {
  const addToCart = useCartStore((state) => state.addToCart);
  const { products } = useSettingsStore((state) => state);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("Small"); // default size

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

  const handleAdd = () => {
    if (!selectedProduct) return;

    // map size to price fields from Appwrite
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

    // Reset state and close modal
    setSelectedProduct(null);
    setSelectedSize("Small");
    document.getElementById("order-modal").close();
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
                <div
                  className="
                    absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300
                  "
                />
              </figure>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-black">
                  {product.productName}
                </h3>
                <div className="badge badge-outline mb-2">
                  {product.category}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {product.productDescription}
                </p>
                {/* Price Section */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    {/* Small Cup */}
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-lg" />
                      <span className="font-bold text-black">
                        ₱{product.priceSmall}
                      </span>
                      <span className="text-xs text-gray-500">(Small)</span>
                    </div>

                    {/* Large Cup */}
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-2xl" />
                      <span className="font-bold text-black">
                        ₱{product.priceLarge}
                      </span>
                      <span className="text-xs text-gray-500">(Large)</span>
                    </div>
                  </div>
                </div>
                {/* Order Button */}
                <button
                  className="btn btn-sm btn-neutral w-full mt-2"
                  onClick={() => {
                    setSelectedProduct(product);
                    document.getElementById("order-modal").showModal();
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for size selection */}
      <dialog id="order-modal" className="modal">
        <div className="modal-box">
          {selectedProduct && (
            <>
              <h3 className="text-lg font-bold mb-4">
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
                    className={`flex justify-between px-4 py-2 rounded-lg border ${
                      selectedSize === opt.label
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-black border-gray-300"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span>₱{opt.price}</span>
                  </button>
                ))}
              </div>

              <div className="modal-action">
                <form method="dialog" className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                  <button className="btn">Cancel</button>
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
