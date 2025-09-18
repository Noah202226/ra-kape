"use client";

import { useState } from "react";
import { database } from "@/appwrite";
import { ID } from "appwrite";

const DATABASE_ID = "6870ab6f0018df40fa94";
const COUPONS_COLLECTION_ID = "coupons";

export default function CouponForm({ fetchCoupons }) {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    usageLimit: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await database.createDocument(
        DATABASE_ID,
        COUPONS_COLLECTION_ID,
        ID.unique(),
        {
          ...form,
          code: form.code.toUpperCase(),
          discountValue: Number(form.discountValue),
          usageLimit: form.usageLimit ? Number(form.usageLimit) : null,
          isActive: true,
          usedCount: 0,
        }
      );

      setForm({
        code: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        usageLimit: "",
      });

      // ✅ close modal after submit
      document.getElementById("coupon_modal").close();

      fetchCoupons();
    } catch (err) {
      console.error("Error creating coupon:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Trigger button */}
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("coupon_modal").showModal()}
        >
          ➕ Add Coupon
        </button>
      </div>

      {/* Modal */}
      <dialog id="coupon_modal" className="modal">
        <div className="modal-box w-full max-w-2xl">
          <h3 className="text-xl font-bold mb-4">➕ Create Coupon</h3>

          <form onSubmit={handleSubmit} className="grid gap-4">
            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="code"
                placeholder="Coupon Code"
                value={form.code}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <select
                name="discountType"
                value={form.discountType}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="number"
                name="discountValue"
                placeholder="Discount Value"
                value={form.discountValue}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
            </div>

            {/* Row 3 */}
            <input
              type="number"
              name="usageLimit"
              placeholder="Usage Limit (optional)"
              value={form.usageLimit}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            {/* Actions */}
            <div className="modal-action flex flex-col sm:flex-row sm:justify-end gap-3">
              <button
                type="button"
                className="btn w-full sm:w-auto"
                onClick={() => document.getElementById("coupon_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full sm:w-auto"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
