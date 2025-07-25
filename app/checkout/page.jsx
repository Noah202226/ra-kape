"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const router = useRouter();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [reference, setReference] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

   const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // or simple static skeleton
  }

  const handlePlaceOrder = async () => {
    if (!name || !address || !contact) {
      toast.error("Please fill in all fields.");
      return;
    }

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        address,
        message,
        orders: cart,
        totalAmount: totalPrice,
        imageFile,
      }),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("✅ Message sent successfully!");

      clearCart();
      router.push("/");
    } else {
      toast.error("❌ Failed to send message. Please try again.");
    }
  };
  return (
    <main className="flex flex-col items-center px-6 pt-20">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h2>

      <div className="w-full max-w-xl space-y-6">
        {/* Shipping Info */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Shipping Information
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            className="input w-full text-white bg-amber-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input w-full text-white bg-amber-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="input w-full text-white bg-amber-700"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="input w-full text-white bg-amber-700"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <textarea
            className="input w-full text-white bg-amber-700"
            maxLength={50}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        {/* Payment Info */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Payment Details
          </h3>
          <select
            className="input w-full text-white bg-amber-700"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="gcash">GCash</option>
            <option value="cod">Cash on Delivery</option>
          </select>
          {paymentMethod === "gcash" && (
            <>
            {/* Image Upload */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">Product Image</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
              />
            </label>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-180 object-center rounded-xl border"
              />
            )}
            </>
          )}
          {paymentMethod === "cod" && (
            <p className="text-gray-500 text-sm">
              Payment will be collected upon delivery.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-amber-100 shadow rounded-xl p-6 space-y-2">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            Order Summary
          </h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart?.map((item) => (
              <div key={item.$id} className="flex justify-between">
                <span className="text-black">
                  {item.productName} x {item.quantity}
                </span>
                <span className="text-black">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))
          )}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <span className="text-black">Total:</span>
            <span className="text-black font-bold">
              {cart === "₱0" ? "0" : `₱${totalPrice().toLocaleString()}`}
            </span>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition"
        >
          Place Order
        </button>
      </div>
    </main>
  );
}
