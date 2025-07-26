import { useState } from "react";
import { fetchReviews } from "../utils/fetchReviews";
import toast from "react-hot-toast";

export default function AddReview({ onSave }) {
  const [comment, setComment] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !comment) {
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

        // save product with uploaded image URL
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            comments: comment,
            reviewImage: uploadData.fileUrl,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast.success("Product added successfully!");
          setComment("");
          setImageFile(null);
          setImagePreview("");

          fetchReviews();

          onSave();
        } else {
          toast.error(
            data.error,
            "ERROR SAVING PROD" || "Something went wrong"
          );
        }
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

      {/* Description */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">Comment</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </label>

      <button
        className="btn bg-black text-white border-2 border-black hover:bg-amber-600  w-full my-2"
        disabled={loading}
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  );
}
