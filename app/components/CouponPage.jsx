import { useState } from "react";
import CouponForm from "./CouponForm";
import CouponsTable from "./CouponTable";
import { database } from "@/appwrite";

const DATABASE_ID = "6870ab6f0018df40fa94";
const COUPONS_COLLECTION_ID = "coupons";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await database.listDocuments(
        DATABASE_ID,
        COUPONS_COLLECTION_ID
      );
      setCoupons(res.documents);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">🎟️ Coupon Management</h1>
        <CouponForm fetchCoupons={fetchCoupons} />
      </div>
      <CouponsTable
        fetchCoupons={fetchCoupons}
        loading={loading}
        coupons={coupons}
      />
    </div>
  );
}
