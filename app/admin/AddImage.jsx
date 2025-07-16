"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

function AddImage() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Coffee");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !name || !price || !category || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      // upload image
      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();

      if (!uploadData.success) throw new Error(uploadData.error);

      // save product with uploaded image URL
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          category,
          description,
          image: uploadData.fileUrl,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Product added successfully!");
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setImageFile(null);
        setImagePreview("");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold text-black">
          Product Name
        </legend>
        <input
          type="text"
          className="input bg-white w-full"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold text-black">
          Description
        </legend>
        <input
          type="text"
          className="input bg-white w-full"
          placeholder="Type here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold text-black">Category</legend>
        <input
          type="text"
          className="input bg-white w-full"
          placeholder="Type here"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </fieldset>

      <fieldset className="space-y-1">
        <legend className="text-sm font-semibold text-black">Price</legend>
        <input
          type="number"
          className="input bg-white w-full"
          placeholder="Type here"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </fieldset>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="input w-full"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-32 h-32 object-cover mt-2"
        />
      )}

      <button
        disabled={loading}
        className="btn"
        onClick={(e) => handleSubmit(e)}
      >
        Add Product
      </button>
    </div>
  );
}

export default AddImage;
