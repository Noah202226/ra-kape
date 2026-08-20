"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import Link from "next/link";
import {
  HiOutlineTrash,
  HiMinus,
  HiPlus,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { IoArrowBackOutline } from "react-icons/io5";
import { CiCoffeeCup } from "react-icons/ci";
import { getThumbnailUrl, getProductFallback } from "@/app/lib/imageHelper";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { current, getCurrentUser, logout } = useAuthStore((state) => state);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Proceeding to checkout...");
    router.push("/checkout");
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-4 md:px-8 pt-28 pb-12 bg-gray-50">
      {current ? (
        <div className="w-full max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-end mb-8 w-full">
            <div>
              <Link
                href="/"
                className="text-amber-600 flex items-center gap-1 text-sm font-bold mb-2 hover:underline transition-all"
              >
                <IoArrowBackOutline /> Back to Home
              </Link>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                My Cart
              </h1>
            </div>

            {cart.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  toast.success("Cart cleared!");
                }}
                className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
              >
                <HiOutlineTrash /> Clear Cart
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-sm border border-gray-100 animate-in fade-in zoom-in duration-300">
              <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CiCoffeeCup className="text-5xl text-gray-300" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                Looks like you haven't added any of our delicious brews yet.
              </p>
              <Link
                href="/"
                className="inline-block bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
              >
                Start Ordering
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={`${item.$id}-${item.size}`}
                    className="flex items-center gap-4 bg-white rounded-4xl p-4 pr-6 shadow-sm border border-gray-100 transition-all hover:shadow-md group"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
                      <img
                        src={getThumbnailUrl(item.image) || getProductFallback(item)}
                        alt={item.productName}
                        onError={(e) => {
                          e.target.src = getProductFallback(item);
                        }}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="grow">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {item.productName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {item.size}
                        </span>
                      </div>
                      <p className="text-sm font-black text-gray-900 mt-2">
                        ₱{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-1.5 border border-gray-100">
                      <button
                        onClick={() => decreaseQty(item.$id, item.size)}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-colors text-gray-600 active:scale-90"
                      >
                        <HiMinus />
                      </button>
                      <span className="font-bold text-gray-900 min-w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQty(item.$id, item.size)}
                        className="w-9 h-9 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-gray-100 transition-colors text-gray-600 active:scale-90"
                      >
                        <HiPlus />
                      </button>
                    </div>

                    {/* Delete Action */}
                    <button
                      onClick={() => {
                        removeFromCart(item.$id, item.size);
                        toast.success(`${item.productName} removed`);
                      }}
                      className="text-gray-300 hover:text-red-500 transition-colors ml-2 p-2"
                      title="Remove Item"
                    >
                      <HiOutlineTrash size={22} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Card */}
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 mt-10">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-4xl font-black text-gray-900 mt-1">
                      ₱{totalPrice().toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-gray-400 text-xs font-medium italic">
                      Tax included
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-5 bg-black hover:bg-zinc-800 text-white font-black text-lg rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3"
                >
                  Confirm & Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Login Required State */
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-8 text-amber-500 shadow-inner">
            <HiOutlineLockClosed size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
            Access Required
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            Please log in to your account to view your saved items and proceed
            with your order.
          </p>
          <Link
            href="/login"
            className={`w-full bg-black text-white py-5 rounded-3xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-95 shadow-xl ${
              loading ? "pointer-events-none opacity-70" : ""
            }`}
            onClick={() => setLoading(true)}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-md"></span>
                <span>Authenticating...</span>
              </div>
            ) : (
              "Login to Continue"
            )}
          </Link>
          <Link
            href="/register"
            className="mt-6 text-sm font-bold text-gray-400 hover:text-black transition-colors"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      )}
    </main>
  );
}
