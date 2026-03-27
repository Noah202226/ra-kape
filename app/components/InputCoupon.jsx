"use client";

import { useState } from "react";
import { database } from "@/appwrite";
import { Query } from "appwrite";
import useCartStore from "../stores/useCartStore";

export default function CouponInput({
  onApplyDiscount,
  amountLestDiscount,
  couponCode,
  setCouponCode,
}) {
  const { calculateDiscountedTotal } = useCartStore((state) => state);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const COUPONS_COLLECTION_ID = "coupons";

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        COUPONS_COLLECTION_ID,
        [Query.equal("code", couponCode.toUpperCase())],
      );

      if (response.total === 0) {
        setMessage("❌ Invalid coupon code");
        return;
      }

      const coupon = response.documents[0];
      const now = new Date();

      if (!coupon.isActive) {
        setMessage("⚠️ This coupon is not active");
      } else if (new Date(coupon.expiryDate) < now) {
        setMessage("⚠️ This coupon has expired");
      } else if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        setMessage("⚠️ This coupon has reached its limit");
      } else {
        // ✅ Apply discount
        const discount = {
          type: coupon.discountType,
          value: coupon.discountValue,
        };
        onApplyDiscount(discount);
        calculateDiscountedTotal(discount, amountLestDiscount);
        setMessage(`🎉 Coupon applied: ${couponCode}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error applying coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter coupon"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className="input input-bordered w-full text-black bg-white"
      />
      <button
        onClick={handleApplyCoupon}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? "Checking..." : "Apply"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}
