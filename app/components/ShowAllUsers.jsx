import { useEffect, useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import { database } from "@/appwrite";
import { Query } from "appwrite";

const DATABASE_ID = "6870ab6f0018df40fa94";
const PROFILES_COLLECTION_ID = "profiles";

function ShowAllUsers() {
  const { users, setUsers } = useSettingsStore((state) => state);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await database.listDocuments(
          DATABASE_ID,
          PROFILES_COLLECTION_ID,
          [Query.orderDesc("$createdAt")]
        );
        setProfiles(response.documents);
        setUsers(response.documents);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [setUsers]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading profiles...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">👥 All Users</h1>

      {profiles.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {profiles.map((p) => (
            <div
              key={p.$id}
              className="card bg-white text-black shadow-md border border-base-300"
            >
              <div className="card-body">
                <h2 className="card-title text-base">{p.name || "Unnamed"}</h2>
                <p className="text-sm text-gray-600">{p.email}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p>
                    📞{" "}
                    <span className="font-medium">
                      {p.contactNumber || "-"}
                    </span>
                  </p>
                  <p>
                    🏠 <span>{p.address || "-"}</span>
                  </p>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Created: {new Date(p.$createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllUsers;
