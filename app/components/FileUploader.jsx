// components/FileUploader.js
"use client";
import { useEffect, useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import ImagePreview from "./ImagePreview";
import { fetchSettings } from "../utils/fetchSettings";
import { database } from "@/appwrite";
import toast from "react-hot-toast";
import Image from "next/image";

export default function FileUploader() {
  const settings = useSettingsStore((state) => state.settings);

  const [file, setFile] = useState(null);

  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);

    // 3. Update settings document in Appwrite
    try {
      const updated = await database.updateDocument(
        "6870ab6f0018df40fa94", // RakapeDB
        "6870ab9e0013bcd4d615", // settings collection
        "687e3bc3003e319903fa", // document ID of heroImage
        { value: data.fileUrl } // Use `value` field (based on your Appwrite structure)
      );

      console.log("Settings updated with new hero image:", updated);
      fetchSettings(); // Refresh local state
      setFile(null); // Clear file after upload
      toast.success("File uploaded and settings updated successfully!");
    } catch (err) {
      console.error("Failed to update settings:", err);
    }
  };

  useEffect(() => {
    if (!file) {
      console.log("No file selected");

      if (settings.heroImage) {
        console.log("Setting default file from settings:", settings.heroImage);
      } else {
        console.log("No default file set in settings", settings);
      }
    }

    // if (file) {
    //   console.log("File selected:", file.name);
    // }
  }, [file]);

  return (
    <div className="flex flex-col gap-4 items-start">
      <h2 className="text-lg font-semibold">Upload Hero Image</h2>

      {file && (
        <div className="w-full max-w-xs overflow-hidden rounded-xl shadow border">
          <Image
            src={URL.createObjectURL(file)}
            alt="Preview"
            width={300}
            height={200}
            className="object-cover w-full h-48"
          />
        </div>
      )}

      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        accept="image/*"
        onChange={(e) => {
          const selected = e.target.files[0];
          console.log("File selected:", selected);
          setFile(selected);
        }}
      />

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="btn btn-outline bg-amber-700"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
