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
  const [selectedSize, setSelectedSize] = useState("22oz"); // default size

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    loadProducts();
  }, [setProducts]);

  if (!hasMounted) return null; // ✅ Hydration-safe guard

  const filtered = products.filter(
    (product) => product.category?.toLowerCase() === type.toLowerCase()
  );

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.productName} (${product.size}) added to cart!`);
  };

  if (loading)
    return (
      <div className="text-center py-10 text-lg flex flex-row items-center w-full justify-center gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex w-65 flex-col gap-4">
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
          </div>
        ))}
      </div>
    );

  if (filtered.length === 0)
    return (
      <div className="text-center text-gray-500">
        No products found for "{type}".
      </div>
    );

  console.log("Products", products);

  return (
    <div className="p-0 md:p-4 py-0 md:py-8">
      <h2 className="text-4xl md:text-6xl lg:text-6xl font-bold mb-2 md:mb-6 capitalize text-center text-black">
        {type.replace(/-/g, " ")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filtered.map((product) => (
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
              <div className="badge badge-outline mb-2 text-black">
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
                    <CiCoffeeCup className="text-lg text-black" />
                    <span className="font-bold text-black">
                      ₱{product.priceSmall}
                    </span>
                    <span className="text-xs text-gray-500">(Small)</span>
                  </div>

                  {/* Large Cup */}
                  <div className="flex items-center gap-1">
                    <CiCoffeeCup className="text-2xl text-black" />
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
      <dialog id="order-modal" className="modal ">
        <div className="modal-box bg-gray-900 max-w-lg">
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

              <div className="modal-action">
                <form method="dialog" className="flex gap-2">
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
                    className="btn bg-white text-black border-1 border-black hover:bg-gray-600 hover:text-white "
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
