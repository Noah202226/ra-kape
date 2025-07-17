"use client";

import React from "react";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const cart = useCartStore((state) => state.cart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    toast.success("Proceeding to checkout...");
    router.push("/checkout");
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 pt-20">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <div className="w-full max-w-xl space-y-4">
          {cart.map((item) => (
            <div
              key={item.$id}
              className="flex justify-between items-center bg-white rounded-2xl shadow p-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.productName}
                </h3>
                <p className="text-sm text-gray-500">
                  ₱{item.price} x {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(item.$id)}
                  className="bg-gray-400 hover:bg-gray-300 text-amber-700 text-lg w-8 h-8 rounded-full transition"
                >
                  -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item.$id)}
                  className="bg-gray-400 hover:bg-gray-300 text-amber-700 text-lg w-8 h-8 rounded-full transition"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    removeFromCart(item.$id);
                    toast.success(`${item.name} removed from cart`);
                  }}
                  className="ml-2 text-red-500 hover:text-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 p-4 bg-amber-600 rounded-xl text-center shadow text-amber-950">
            <h3 className="text-xl font-bold">
              Total: ₱{totalPrice().toLocaleString()}
            </h3>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </main>
  );
}
