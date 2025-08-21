"use client";

import React, { useEffect, useState } from "react";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ReceiptGenerator from "../utils/ReceiptGenerator";

export default function CheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.totalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const [barangay, setBarangay] = useState(); // Default barangay, can be changed based on user selection

  const priceRange = [
    { barangay: "Akle", price: 215 },
    { barangay: "Alagao", price: 185 },
    { barangay: "Anyatam", price: 78 },
    { barangay: "Bagong Barrio", price: 175 },
    { barangay: "Basuit", price: 140 },
    { barangay: "Bubulong Malaki", price: 135 },
    { barangay: "Bubulong Munti", price: 179 },
    { barangay: "Buhol na Mangga", price: 211 },
    { barangay: "Bulusukan", price: 150 },
    { barangay: "Calasag", price: 75 },
    { barangay: "Calawitan", price: 85 },
    { barangay: "Casalat", price: 249 },
    { barangay: "Gabihan", price: 132 },
    { barangay: "Garlang", price: 80 },
    { barangay: "Lapnit", price: 53 },
    { barangay: "Maasim", price: 100 },
    { barangay: "Makapilapil", price: 59 },
    { barangay: "Malipampang", price: 95 },
    { barangay: "Mataas na Parang", price: 73 },
    { barangay: "Matimbubong", price: 61 },
    { barangay: "Nabaong Garlang", price: 92 },
    { barangay: "Palapala", price: 103 },
    { barangay: "Pasong Bangkal", price: 209 },
    { barangay: "Pinaod", price: 79 },
    { barangay: "Poblacion", price: 60 },
    { barangay: "Pulong Tamo", price: 96 },
    { barangay: "San Juan", price: 48 },
    { barangay: "Santa Catalina Bata", price: 96 },
    { barangay: "Santa Catalina Matanda", price: 110 },
    { barangay: "Sapang Dayap", price: 175 },
    { barangay: "Sapang Putik", price: 155 },
    { barangay: "Sapang Putol", price: 65 },
    { barangay: "Sumandig", price: 105 },
    { barangay: "Telapatio", price: 109 },
    { barangay: "Umpucan", price: 137 },
    { barangay: "Upig", price: 179 },
  ];

  const router = useRouter();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [gcashUrl, setGcashUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Function to get shipping fee based on selected barangay
  // This function can be used in the form to calculate shipping fee dynamically
  const getShippingFee = (selectedBarangay) => {
    const barangay = priceRange.find((b) => b.barangay === selectedBarangay);
    return barangay ? barangay.price : 0;
  };
  const shippingFee = getShippingFee(barangay);
  const grandTotal = totalPrice() + shippingFee;

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // or simple static skeleton
  }

  const handlePlaceOrder = async () => {
    console.log("Placing order with data:", {
      name,
      imageFile,
    });
    if (!name || !address || !contact) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // upload image
      const formData = new FormData();
      formData.append("file", imageFile);

      if (paymentMethod === "gcash" && !imageFile) {
        toast.error("Please upload your GCash payment receipt.");
        return;
      } else if (paymentMethod === "gcash") {
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadData.error) {
          throw new Error(uploadData.error);
        } else {
          setGcashUrl(uploadData.fileUrl);
        }
        if (!uploadData.success) {
          throw new Error(uploadData.error);
        } else {
          setGcashUrl(uploadData.fileUrl);
          toast.success("Uploaded", uploadData.fileUrl);
          console.log("Gcash url::", gcashUrl);

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
              modeOfPayment: paymentMethod,
              barangay,
              shippingFee,
              totalAmount: totalPrice,
              grandTotal,
              reference: uploadData.fileUrl, // Use the uploaded image URL as reference
            }),
          });
          const data = await res.json();
          if (data.success) {
            toast.success("✅ Message sent successfully!");
            clearCart();
            router.push("/");

            // <ReceiptGenerator
            //   order={{
            //     orderId: "RAKAPE-20250806",
            //     customerName: "Noa Ligpitan",
            //     date: Date.now(),
            //     paymentMethod: "GCash",
            //     items: [
            //       { name: "Iced Latte", qty: 2, price: 120 },
            //       { name: "Espresso", qty: 1, price: 100 },
            //     ],
            //     total: 340,
            //   }}
            // />;
          } else {
            toast.error("❌ Failed to send message. Please try again.");
          }
        }
      } else if (paymentMethod === "cash" || paymentMethod === "cod") {
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
            barangay,
            shippingFee,
            modeOfPayment: paymentMethod,
            totalAmount: totalPrice,
            grandTotal,
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
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex flex-col items-center px-6 pt-20">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h2>
      {/* <ReceiptGenerator
        order={{
          orderId: "RAKAPE-20250806",
          customerName: "Noa Ligpitan",
          date: Date.now(),
          paymentMethod: "GCash",
          items: [
            { name: "Iced Latte", qty: 2, price: 120 },
            { name: "Espresso", qty: 1, price: 100 },
          ],
          total: 340,
        }}
      /> */}
      ;
      <div className="w-full max-w-xl space-y-6">
        {/* Shipping Info */}
        <div className="bg-white shadow rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Shipping Information
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            className="input w-full text-white bg-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input w-full text-white bg-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="input w-full text-white bg-gray-900"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="input w-full text-white bg-gray-900"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <textarea
            className="input w-full text-white bg-gray-900"
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
            className="input w-full text-white bg-gray-900"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="gcash">GCash</option>
            <option value="cash">Cash (Pick up)</option>
            <option value="cod">COD</option>
          </select>
          {paymentMethod === "gcash" && (
            <>
              {/* Image Upload */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold">
                    Product Image
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
                />
              </label>

              <div className="mb-4">
                <label className="block mb-2 font-semibold">Barangay</label>
                <select
                  className="border rounded p-2 w-full"
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  required
                >
                  <option value="">Select Barangay</option>
                  {priceRange.map((item, index) => (
                    <option key={index} value={item.barangay}>
                      {item.barangay}
                    </option>
                  ))}
                </select>
              </div>

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
            <div className="mb-4">
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Barangay</label>
                <select
                  className="border rounded p-2 w-full"
                  value={barangay}
                  onChange={(e) => setBarangay(e.target.value)}
                  required
                >
                  <option value="">Select Barangay</option>
                  {priceRange.map((item, index) => (
                    <option key={index} value={item.barangay}>
                      {item.barangay}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-500 text-sm">
                Payment will be collected upon delivery.
              </p>
            </div>
          )}

          {paymentMethod === "cash" && (
            <p className="text-gray-500 text-sm">
              Payment will be collected in our store.
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-900 shadow rounded-xl p-6 space-y-2">
          <h3 className="text-xl font-semibold mb-2 text-white">
            Order Summary
          </h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart?.map((item, index) => (
              <div
                key={`${item.$id} - ${index}`}
                className="flex justify-between"
              >
                <span className="text-white">
                  {item.productName} ({item.size}) x {item.quantity}
                </span>
                <span className="text-white">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))
          )}
          <div className="flex justify-between text-white">
            <span>Subtotal:</span>
            <span>₱{totalPrice().toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Shipping Fee:</span>
            <span>₱{shippingFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold text-white">
            <span>Total:</span>
            <span>₱{grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={loading || cart.length === 0}
          className="w-full py-3 bg-gray-800 hover:bg-black text-white font-semibold rounded-xl transition cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </main>
  );
}
