import { useState } from "react";
import CouponForm from "./CouponForm";
import CouponsTable from "./CouponTable";
import { database } from "@/appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
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
        COUPONS_COLLECTION_ID,
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
