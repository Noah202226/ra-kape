"use client";
import { useAuthStore } from "@/app/stores/useAuthStore";
import useCartStore from "@/app/stores/useCartStore";
import useSettingsStore from "@/app/stores/useSettingsStore";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";
import { getThumbnailUrl, getProductFallback } from "@/app/lib/imageHelper";

function BestSellerCarousel() {
  const { current } = useAuthStore((state) => state);
  const addToCart = useCartStore((state) => state.addToCart);
  const { products } = useSettingsStore((state) => state);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("22oz");

  // DEBUG: Log first product image - MUST BE BEFORE CONDITIONAL RETURN
  useEffect(() => {
    if (products.length > 0) {
      const firstProduct = products.find((p) => p.productType === "best-seller");
      if (firstProduct) {
        const thumbnailUrl = getThumbnailUrl(firstProduct.image);
        console.log("=== DEBUG: Best-Seller Product ===");
        console.log("Product Name:", firstProduct.productName);
        console.log("Raw Image Field:", firstProduct.image);
        console.log("Generated Thumbnail URL:", thumbnailUrl);
        console.log("Correct Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
        console.log("Image Processing:");
        console.log("  - Is HTTP URL?", firstProduct.image?.startsWith("http"));
        console.log("  - Contains 'appwrite'?", firstProduct.image?.includes("appwrite"));
        console.log("  - Final URL to use:", thumbnailUrl);
      }
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="py-20 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900">
          Best Sellers
        </h2>
        <p className="text-gray-500 text-lg">
          Our favorites are brewing. Check back soon!
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
      `${selectedProduct.productName} (${selectedSize}) added to cart!`,
    );

    setSelectedProduct(null);
    setSelectedSize("22oz");
    document.getElementById("order-modal")?.close();
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-white">
      {/* Modern Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight inline-block relative">
          Best Sellers
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-black rounded-full"></span>
        </h2>
        <p className="mt-6 text-gray-500 font-medium">
          The most loved brews in the house.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products
          .filter((product) => product.productType === "best-seller")
          .map((product) => (
            <div
              key={product.$id}
              data-aos="fade-up"
              className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden"
            >
              {/* Image with consistent aspect ratio */}
              <figure className="relative w-full aspect-4/5 overflow-hidden">
                <img
                  src={getThumbnailUrl(product.image) || getProductFallback(product)}
                  alt={product.productName}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = getProductFallback(product);
                  }}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    !product.isAvailable ? "opacity-40 grayscale" : ""
                  }`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Availability Badge */}
                {!product.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-black px-6 py-2 rounded-full font-bold text-sm">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </figure>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <div className="mb-auto">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 mb-2 block">
                    {product.category.replace(/-/g, " ")}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                    {product.productDescription}
                  </p>
                </div>

                {/* Pricing Interface */}
                <div className="flex items-center justify-between mb-6 px-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      Regular
                    </span>
                    <span className="text-lg font-black text-gray-900">
                      ₱{product.priceSmall}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-gray-100" />
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      Upsize
                    </span>
                    <span className="text-lg font-black text-gray-900">
                      ₱{product.priceLarge}
                    </span>
                  </div>
                </div>

                {/* Modern Button */}
                <button
                  disabled={!product.isAvailable}
                  className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${
                    product.isAvailable
                      ? "bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    document.getElementById("order-modal")?.showModal();
                  }}
                >
                  {product.isAvailable ? "Add to Order" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modern Modal / Bottom Sheet */}
      <dialog id="order-modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-t-4xl sm:rounded-4xl p-8 shadow-2xl">
          {selectedProduct && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-900">
                  Pick Your Size
                </h3>
                <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">
                  Best Seller
                </span>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  {
                    label: "16oz",
                    price: selectedProduct.priceSmall,
                    type: "Regular",
                  },
                  {
                    label: "22oz",
                    price: selectedProduct.priceLarge,
                    type: "Upsize",
                  },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => setSelectedSize(opt.label)}
                    className={`w-full flex justify-between items-center p-5 rounded-2xl border-2 transition-all ${
                      selectedSize === opt.label
                        ? "border-black bg-gray-900 text-white"
                        : "border-gray-100 bg-gray-50 text-gray-900 hover:border-gray-200"
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-bold text-lg">{opt.label}</p>
                      <p
                        className={`text-xs ${selectedSize === opt.label ? "text-gray-400" : "text-gray-500"}`}
                      >
                        {opt.type} Serving
                      </p>
                    </div>
                    <p className="text-xl font-black">₱{opt.price}</p>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-black rounded-2xl shadow-xl shadow-amber-100 transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <form method="dialog" className="flex-1">
                  <button className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-all">
                    Maybe Later
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default BestSellerCarousel;
