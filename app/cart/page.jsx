"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../stores/useAuthStore";
import Link from "next/link";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const router = useRouter();
  const [loading, setLoading] = useState(false); // for login/logout buttons
  const { current, getCurrentUser, logout } = useAuthStore((state) => state);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Proceeding to checkout...");
    router.push("/checkout");
  };

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

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

  console.log("Cart items:", cart);
  console.log("Current User sss:", current);

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pt-20">
      {/* flex of my cart and clear cart button */}
      {/* show current user */}
      {current ? (
        <>
          <div className="flex justify-between items-center w-full max-w-4xl mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Cart</h1>
            <button
              onClick={() => {
                useCartStore.getState().clearCart();
                toast.success("Cart cleared!");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>

          {cart.length === 0 ? (
            <>
              <p className="text-gray-500">Your cart is empty</p>
            </>
          ) : (
            <div className="w-full max-w-xl space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.$id}-${item.size}`}
                  className="flex justify-between items-center bg-white rounded-2xl shadow p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.productName} - {item.size}
                    </h3>
                    <p className="text-sm text-gray-500">
                      ₱{item.price} x {item.quantity} = ₱
                      {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.$id, item.size)}
                      className="bg-gray-400 hover:bg-gray-300 text-amber-700 text-lg w-8 h-8 rounded-full transition"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.$id, item.size)}
                      className="bg-gray-400 hover:bg-gray-300 text-amber-700 text-lg w-8 h-8 rounded-full transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        removeFromCart(item.$id, item.size);
                        toast.success(
                          `${item.name} - ${item.size} removed from cart`
                        );
                      }}
                      className="ml-2 text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-gray-500 rounded-xl text-center shadow text-white">
                <h3 className="text-xl font-bold">
                  Total: ₱{totalPrice().toLocaleString()}
                </h3>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-4 py-3 bg-gray-800 text-white hover:bg-black hover:text-white  font-semibold rounded-xl transition cursor-pointer shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex  flex-col justify-between items-center w-full mb-8 h-full">
          <h2>Please login first to continue</h2>
          <Link
            href="/login"
            className={`btn btn-primary  md:inline-flex rounded-md ${
              loading ? "pointer-events-none opacity-70" : ""
            }`}
            onClick={() => setLoading(true)}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Login"
            )}
          </Link>
        </div>
      )}
    </main>
  );
}
