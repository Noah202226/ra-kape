import React from "react";

export default function AddReview({ onSave }) {
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
        ➕ Add New Review
      </h2>

      {/* Description */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">Description</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      {/* Image Upload */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold">Product Image</span>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full bg-white bg-[var(--title) text-white] border-2 border-black"
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
        className="btn bg-white bg-[var(--title) text-white] border-2 border-black hover:bg-amber-600 text-black w-full my-2"
        disabled={loading}
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
