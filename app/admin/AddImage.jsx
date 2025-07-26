"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchProducts } from "../utils/fetchProducts";

function AddImage({ onSave }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(50);
  const [category, setCategory] = useState("ice-drip-coffee");
  const [description, setDescription] = useState("");
  const [productType, setProductType] = useState("Normal");

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

      if (!uploadData.success) {
        throw new Error(uploadData.error);
      } else {
        toast.success("Uploaded");

        onSave();
      }

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
          productType,
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

        fetchProducts();
      } else {
        toast.error(data.error, "ERROR SAVING PROD" || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl shadow-md bg-white space-y-4 border border-amber-200">
      <h2 className="text-xl font-bold text-center text-amber-700">
        ➕ Add New Product
      </h2>

      {/* Product Name */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">
            Product Name
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      {/* Description */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">
            Description
          </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full bg-white text-black bg-[var(--title) text-white] border-2 border-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {/* Category */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-black font-semibold">Category</span>
        </div>
        <select
          className="select select-bordered text-black bg-white w-full bg-[var(--title) text-white] border-2 border-black"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
            Select a category
          </option>
          <option value="ice-drip-coffee">ICE DRIP COFFEE</option>
          <option value="ice-premium-espresso">ICE PREMIUM ESPRESSO</option>
          <option value="non-coffee">NON COFFEE</option>
          <option value="ice-blended">ICE BLENDED</option>
          <option value="hot-coffee">HOT COFFEE</option>
          <option value="add-ons">ADD-ONS</option>
        </select>
      </label>

      {/* Type */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">
            Product Type
          </span>
        </div>
        <select
          className="select w-full bg-white bg-[var(--title) text-white] border-2 border-black"
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
        >
          <option disabled value="">
            Select a type
          </option>
          <option value="normal">Normal</option>
          <option value="best-seller">Best Seller</option>
          <option value="special">Special</option>
        </select>
      </label>

      {/* Price */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">Price</span>
        </div>
        <input
          type="number"
          className="input input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
          placeholder="₱ 0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      {/* Image Upload */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">
            Product Image
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
        />
      </label>

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-40 object-cover rounded-xl border"
        />
      )}

      <button
        className="btn bg-black text-white border-2  border-black hover:bg-amber-600 w-full my-2"
        disabled={loading}
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}

export default AddImage;
