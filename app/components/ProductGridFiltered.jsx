"use client";

import { useEffect, useState } from "react";
import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchProducts } from "@/app/utils/fetchProducts";
import useCartStore from "@/app/stores/useCartStore";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";

export default function ProductGridFiltered({ type }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const products = useSettingsStore((state) => state.products);
  const setProducts = useSettingsStore((state) => state.setProducts);
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("22oz");

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
    (product) => product.category?.toLowerCase() === type.toLowerCase()
  );

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.productName} (${product.size}) added to cart!`);
  };

  if (loading)
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 md:42 pt-20">
        <div className="py-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4 w-full"
            >
              {/* Image skeleton */}
              <div className="skeleton h-40 w-full rounded-xl"></div>

              {/* Title skeleton */}
              <div className="skeleton h-5 w-1/2"></div>

              {/* Description skeleton */}
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>

              {/* Price skeleton */}
              <div className="skeleton h-5 w-1/3"></div>
            </div>
          ))}
        </div>
      </main>
    );

  if (filtered.length === 0)
    return (
      <div className="text-center text-gray-500">
        No products found for "{type}".
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 md:42 pt-20">
      <div className="max-w-7xl mx-auto px-0 sm:px-6 md:px-8 lg:px-12 py-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 capitalize text-center text-black">
          {type.replace(/-/g, " ")}
        </h2>

        {/* Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((product) => (
            <div
              key={product.$id}
              data-aos="zoom-in"
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg w-full flex flex-col"
            >
              <figure className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </figure>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-3 text-black">
                  {product.productName}
                </h3>
                <div className="badge badge-outline mb-2 text-black">
                  {product.category}
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {product.productDescription}
                </p>

                {/* Price Section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-lg text-black" />
                      <span className="font-bold text-black">
                        ₱{product.priceSmall}
                      </span>
                      <span className="text-xs text-gray-500">(Regular)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-2xl text-black" />
                      <span className="font-bold text-black">
                        ₱{product.priceLarge}
                      </span>
                      <span className="text-xs text-gray-500">(Upsize)</span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  className="btn btn-sm btn-neutral w-full mt-3"
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

        {/* Modal */}
        <dialog id="order-modal" className="modal">
          <div className="modal-box bg-gray-900 max-w-sm sm:max-w-md md:max-w-lg w-full">
            {selectedProduct && (
              <>
                <h3 className="text-lg font-bold mb-4 text-white">
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
                    className="btn bg-white text-black border border-black hover:bg-gray-600 hover:text-white w-full sm:w-auto"
                  >
                    Add to Cart
                  </button>
                  <form method="dialog" className="w-full sm:w-auto">
                    <button className="btn w-full sm:w-auto">Cancel</button>
                  </form>
                </div>
              </>
            )}
          </div>
        </dialog>
      </div>
    </main>
  );
}
