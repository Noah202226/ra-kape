"use client";

import { useEffect, useState } from "react";
import useSettingsStore from "@/app/stores/useSettingsStore";
import { fetchProducts } from "@/app/utils/fetchProducts";
import useCartStore from "@/app/stores/useCartStore";
import toast from "react-hot-toast";

export default function ProductGridFiltered({ type }) {
  const products = useSettingsStore((state) => state.products);
  const setProducts = useSettingsStore((state) => state.setProducts);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts(); // ✅ use your function here
      setLoading(false);
    };
    loadProducts();
  }, [setProducts]);

  const filtered = products.filter(
    (product) => product.category?.toLowerCase() === type.toLowerCase()
  );

  const handleAdd = (product) => {
    addToCart(product);
    toast.success(`${product.productName} added to cart!`);
  };

  if (loading)
    return <div className="text-center py-10 text-lg">Loading products...</div>;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.$id}
            data-aos="zoom-in"
            className="
              bg-white rounded-xl shadow-lg overflow-hidden 
              transition-all duration-300 
              hover:shadow-[0_0_25px_rgba(219,152,52,0.6)]
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
              <div className="badge badge-warning mb-2">New</div>
              <p className="text-sm text-gray-600 mb-4">
                {product.productDescription}
              </p>
              <div className="flex justify-between items-center">
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
