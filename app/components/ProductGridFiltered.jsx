"use client";

import { useEffect, useState } from "react";
import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchProducts } from "@/app/utils/fetchProducts";
import useCartStore from "@/app/stores/useCartStore";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";
import { useAuthStore } from "../stores/useAuthStore";

export default function ProductGridFiltered({ type }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const products = useSettingsStore((state) => state.products);
  const setProducts = useSettingsStore((state) => state.setProducts);
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("22oz");

  const { current } = useAuthStore((state) => state);

  useEffect(() => {
    setHasMounted(true);
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [setProducts]);

  if (!hasMounted) return null;

  const filtered = products.filter(
    (product) => product.category?.toLowerCase() === type.toLowerCase(),
  );

  const handleAdd = (product) => {
    if (current === null) {
      toast.error("Please log in to add items to your cart.");
      setSelectedProduct(null);
      setSelectedSize("22oz");
      document.getElementById("order-modal")?.close();
      return;
    }

    addToCart(product);
    toast.success(`${product.productName} (${product.size}) added to cart!`);

    setSelectedProduct(null);
    setSelectedSize("22oz");
    document.getElementById("order-modal")?.close();
  };

  if (loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8 pt-28 pb-12 bg-gray-50">
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4 w-full animate-pulse"
            >
              <div className="h-48 w-full bg-gray-200 rounded-2xl"></div>
              <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
              <div className="h-10 bg-gray-200 rounded-xl w-full mt-2"></div>
            </div>
          ))}
        </div>
      </main>
    );

  if (filtered.length === 0)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pt-20 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 capitalize text-center text-gray-800">
          No products found for "{type}".
        </h2>
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 md:px-8 pt-28 pb-12 bg-gray-50">
      <div className="max-w-7xl w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold capitalize text-gray-900 inline-block relative">
            {type.replace(/-/g, " ")}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-black rounded-full"></span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.$id}
              data-aos="fade-up"
              className="group bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <figure className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.productName}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    !product.isAvailable ? "opacity-50 grayscale" : ""
                  }`}
                />
                {!product.isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="bg-black/70 text-white px-4 py-2 rounded-full font-bold text-sm tracking-wide">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </figure>

              {/* Card Content */}
              <div className="p-5 flex flex-col grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {product.productName}
                  </h3>
                </div>

                <span className="inline-block w-fit px-2.5 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg mb-3 uppercase tracking-wider">
                  {product.category.replace(/-/g, " ")}
                </span>

                <p className="text-sm text-gray-500 mb-6 line-clamp-2 grow">
                  {product.productDescription}
                </p>

                {/* Price Section */}
                <div className="bg-gray-50 rounded-2xl p-3 mb-4 border border-gray-100">
                  <div className="flex flex-col gap-2">
                    {product.category === "hot-coffee" ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <CiCoffeeCup className="text-xl" />
                          <span className="text-sm font-medium">10oz</span>
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                          ₱{product.priceLarge}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <div className="flex items-center gap-2 text-gray-600">
                            <CiCoffeeCup className="text-lg" />
                            <span className="text-sm font-medium">Regular</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            ₱{product.priceSmall}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-center gap-2 text-gray-600">
                            <CiCoffeeCup className="text-xl" />
                            <span className="text-sm font-medium">Upsize</span>
                          </div>
                          <span className="font-bold text-gray-900">
                            ₱{product.priceLarge}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Order Button */}
                <button
                  disabled={!product.isAvailable}
                  className={`w-full py-3.5 rounded-xl text-sm md:text-base font-bold transition-all active:scale-[0.98] ${
                    product.isAvailable
                      ? "bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    setSelectedProduct(product);
                    document.getElementById("order-modal")?.showModal();
                  }}
                >
                  {product.isAvailable ? "Order Now" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <dialog id="order-modal" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-white text-gray-900 rounded-t-3xl sm:rounded-3xl p-6 sm:p-8">
            {selectedProduct && (
              <>
                <h3 className="text-xl font-bold mb-6 pr-8 text-gray-900 border-b pb-4">
                  Select Size for{" "}
                  <span className="text-amber-600">
                    {selectedProduct.productName}
                  </span>
                </h3>

                {selectedProduct.category === "hot-coffee" ? (
                  <div className="flex flex-col gap-3 mb-8">
                    {[{ label: "10oz", price: selectedProduct.priceLarge }].map(
                      (opt) => (
                        <button
                          key={opt.label}
                          onClick={() => setSelectedSize(opt.label)}
                          className={`flex justify-between items-center px-5 py-4 rounded-xl border-2 transition-all ${
                            selectedSize === opt.label
                              ? "border-black bg-black text-white shadow-md"
                              : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                          }`}
                        >
                          <span className="font-bold">{opt.label}</span>
                          <span className="font-bold text-lg">
                            ₱{opt.price}
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 mb-8">
                    {[
                      {
                        label: "16oz",
                        price: selectedProduct.priceSmall,
                        desc: "Regular",
                      },
                      {
                        label: "22oz",
                        price: selectedProduct.priceLarge,
                        desc: "Upsize",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setSelectedSize(opt.label)}
                        className={`flex justify-between items-center px-5 py-4 rounded-xl border-2 transition-all ${
                          selectedSize === opt.label
                            ? "border-black bg-black text-white shadow-md"
                            : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <span className="font-bold">{opt.label}</span>
                          <span
                            className={`text-xs ${selectedSize === opt.label ? "text-gray-300" : "text-gray-500"}`}
                          >
                            {opt.desc}
                          </span>
                        </div>
                        <span className="font-bold text-lg">₱{opt.price}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="modal-action flex flex-col sm:flex-row-reverse gap-3 m-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleAdd({
                        ...selectedProduct,
                        size: selectedSize,
                        price:
                          selectedSize === "16oz"
                            ? selectedProduct.priceSmall
                            : selectedProduct.priceLarge,
                      })
                    }
                    className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors shadow-md"
                  >
                    Add to Cart
                  </button>
                  <form method="dialog" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">
                      Cancel
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
          <form method="dialog" className="modal-backdrop bg-black/50">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </main>
  );
}
