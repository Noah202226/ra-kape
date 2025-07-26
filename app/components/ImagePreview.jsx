"use client";

import React from "react";

export default function ImagePreview({ fileUrl, alt = "Image Preview" }) {
  console.log(fileUrl, "File url");
  if (!fileUrl) return <p>No image to preview.</p>;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        borderRadius: "8px",
        // width: width,
      }}
      className="w-full overflow-hidden rounded-lg border border-gray-200"
    >
      <img
        src={fileUrl}
        alt={alt}
        style={{ objectFit: "contain", borderRadius: "4px" }}
      />
    </div>
  );
}
