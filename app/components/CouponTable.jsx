"use client";

import { useEffect, useState } from "react";
import { database, ID } from "@/appwrite";
import toast from "react-hot-toast";

const DATABASE_ID = "6870ab6f0018df40fa94";
const COUPONS_COLLECTION_ID = "coupons";

export default function CouponsTable({ fetchCoupons, loading, coupons }) {
  // Toggle active status
  const toggleActive = async (id, isActive) => {
    try {
      await database.updateDocument(DATABASE_ID, COUPONS_COLLECTION_ID, id, {
        isActive: !isActive,
      });
      fetchCoupons();
      toast.success("Coupon updated");
    } catch (err) {
      console.error("Error toggling coupon:", err);
    }
  };

  // Delete coupon
  const deleteCoupon = async (id) => {
    try {
      await database.deleteDocument(DATABASE_ID, COUPONS_COLLECTION_ID, id);
      toast.success("Coupon Deleted ❗");
      fetchCoupons();
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🎟️ Manage Coupons</h2>

      {loading ? (
        <p>Loading coupons...</p>
      ) : coupons.length === 0 ? (
        <div className="text-center text-gray-500">No coupons available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.$id}
              className="card shadow-md hover:shadow-lg transition rounded-xl p-5 border border-base-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">{coupon.code}</h2>
                <span
                  className={`badge ${
                    coupon.isActive ? "badge-success" : "badge-error"
                  }`}
                >
                  {coupon.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <b>Type:</b>{" "}
                  <span className="capitalize">{coupon.discountType}</span>
                </p>
                <p>
                  <b>Value:</b>{" "}
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `₱${coupon.discountValue}`}
                </p>
                <p>
                  <b>Usage:</b> {coupon.usedCount || 0} /{" "}
                  {coupon.usageLimit || "∞"}
                </p>
                <p>
                  <b>Expiry:</b>{" "}
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  className="btn btn-xs btn-warning"
                  onClick={() => toggleActive(coupon.$id, coupon.isActive)}
                >
                  {coupon.isActive ? "Deactivate" : "Activate"}
                </button>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteCoupon(coupon.$id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
