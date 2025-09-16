import { useEffect, useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import { account, database } from "@/appwrite";
import { Query } from "appwrite";

function ShowAllUsers() {
  const { users, setUsers } = useSettingsStore((state) => state);

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your Database + Collection IDs
  const DATABASE_ID = "6870ab6f0018df40fa94";
  const PROFILES_COLLECTION_ID = "profiles";

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await database.listDocuments(
          DATABASE_ID,
          PROFILES_COLLECTION_ID,
          [Query.orderDesc("$createdAt")] // newest first
        );
        setProfiles(response.documents);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p className="p-4">Loading profiles...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Users (Profiles)</h1>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-200">
          <thead className="bg-base-200">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((p) => (
              <tr key={p.$id}>
                <td className="font-mono text-sm">{p.name}</td>
                <td>{p.email}</td>
                <td>{p.contactNumber}</td>
                <td>{p.address}</td>
                <td>{new Date(p.$createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShowAllUsers;
