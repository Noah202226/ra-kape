"use client";

import { useEffect, useState } from "react";
import { account, database } from "../../appwrite"; // adjust your import path
import { useAuthStore } from "@/app/stores/useAuthStore";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
  const { current, logout } = useAuthStore((state) => state);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  // Replace with your own IDs
  const DATABASE_ID = "6870ab6f0018df40fa94";
  const PROFILES_COLLECTION = "profiles";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!current) return;

        // fetch extra profile info
        const doc = await database.getDocument(
          DATABASE_ID,
          PROFILES_COLLECTION,
          current.$id
        );

        setProfile(doc);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Could not load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [current]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!current) {
    return (
      <p className="text-center text-base-content">
        Please log in to view your profile.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="card w-full mx-auto text-black shadow-2xl p-6 space-y-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold -4">My Profile</h2>

          <div className="flex items-center gap-3 justify-end w-full max-w-4xl mb-4">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="btn transition-colors duration-500 btn-sm rounded-md flex items-center justify-center"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
        {/* Core Info (from Appwrite Account) */}
        <div>
          <p className="text-sm ">Name</p>
          <p className="font-medium">{current.name || "—"}</p>
        </div>
        <div>
          <p className="text-sm ">Email</p>
          <p className="font-medium">{current.email}</p>
        </div>

        {/* Extra Info (from Profiles collection) */}
        {profile && (
          <>
            <div>
              <p className="text-sm ">Contact</p>
              <p className="font-medium">{profile.contactNumber || "—"}</p>
            </div>
            <div>
              <p className="text-sm ">Address</p>
              <p className="font-medium">{profile.address || "—"}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
