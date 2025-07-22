"use client";

import { useEffect, useState } from "react";
import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchProducts } from "@/app/utils/fetchProducts";
import useCartStore from "@/app/stores/useCartStore";
import toast from "react-hot-toast";

export default function ProductGridFiltered({ type }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const products = useSettingsStore((state) => state.products);
  const setProducts = useSettingsStore((state) => state.setProducts);
  const addToCart = useCartStore((state) => state.addToCart);

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
    toast.success(`${product.productName} added to cart!`);
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {type.replace(/-/g, " ")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {filtered.map((product) => (
          <div
            key={product.$id}
            data-aos="zoom-in"
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(219,152,52,0.6)] hover:scale-105 hover:-translate-y-1 w-full max-w-[250px] mx-auto"
          >
            <figure className="relative group overflow-hidden h-[180px]">
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </figure>

            <div className="p-4 h-[200px] flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--title)] line-clamp-1">
                  {product.productName}
                </h3>
                <div className="badge badge-warning my-2">New</div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {product.productDescription}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="font-bold text-lg text-black">
                  ₱{product.price}
                </span>
                <button
                  className="btn btn-sm btn-primary"
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
