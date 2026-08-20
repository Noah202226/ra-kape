import React, { useState } from "react";
import useSettingsStore from "../stores/useSettingsStore";
import toast from "react-hot-toast";
import { normalizeImageUrl } from "@/app/lib/imageHelper";

function ShowAllReviews() {
  const { reviews, setReviews } = useSettingsStore((state) => state);

  const [editingReview, setEditingReview] = useState(null);
  const [comments, setComments] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpenEdit = (review) => {
    setEditingReview(review);
    setComments(review.comments || "");
    setImageFile(null);
    setImagePreview(normalizeImageUrl(review.reviewImage) || "");
  };

  const handleCloseEdit = () => {
    setEditingReview(null);
    setComments("");
    setImageFile(null);
    setImagePreview("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    if (!comments.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = editingReview.reviewImage;

      // If a new image file was selected, upload it first
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          throw new Error(uploadData.error || "Image upload failed");
        }
        finalImageUrl = uploadData.fileUrl;
      }

      // Send PUT request to update the review in Appwrite
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingReview.$id,
          comments: comments.trim(),
          reviewImage: finalImageUrl,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Update store state
        setReviews(
          reviews.map((r) =>
            r.$id === editingReview.$id
              ? { ...r, comments: comments.trim(), reviewImage: finalImageUrl }
              : r,
          ),
        );

        toast.success("✅ Review updated successfully!");
        handleCloseEdit();
      } else {
        toast.error(data.error || "Failed to update review.");
      }
    } catch (err) {
      console.error("Error updating review:", err);
      toast.error(err.message || "Failed to update review.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this review?");
    if (!confirmed) return;

    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });

      const deletedReview = reviews.find((p) => p.$id === id);

      setReviews(reviews.filter((p) => p.$id !== id));

      toast.success(
        `🗑️ Deleted: ${deletedReview?.comments || deletedReview?.$id}`,
      );
    } catch (err) {
      console.error("Failed to delete review", err);
      toast.error("Failed to delete review.");
    }
  };

  if (reviews.length === 0)
    return <p className="text-center py-8 text-gray-500">No Reviews found.</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((product) => (
          <div
            key={product.$id}
            className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between"
          >
            <img
              src={normalizeImageUrl(product.reviewImage) || "/rakape-logo.jpg"}
              alt="Customer review"
              onError={(e) => {
                e.target.src = "/rakape-logo.jpg";
              }}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <div className="grow">
              <p className="text-gray-700 italic">“{product.comments}”</p>
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => handleOpenEdit(product)}
                className="btn btn-sm bg-black hover:bg-gray-800 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.$id)}
                className="btn btn-sm bg-red-600 hover:bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Review Modal */}
      {editingReview && (
        <dialog id="edit-review-modal" className="modal modal-open">
          <div className="modal-box bg-white text-gray-900 rounded-2xl p-6 max-w-md w-full border border-amber-200 shadow-2xl">
            <h3 className="font-bold text-xl text-amber-700 mb-4 text-center">
              ✏️ Edit Review
            </h3>

            <form onSubmit={handleUpdateReview} className="space-y-4">
              {/* Image Preview & File Input */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold text-black">
                    Review Image
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full text-black bg-white border-2 border-black"
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Review Preview"
                  onError={(e) => {
                    e.target.src = "/rakape-logo.jpg";
                  }}
                  className="w-full h-40 object-cover rounded-xl border border-gray-200"
                />
              )}

              {/* Comment Input */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-semibold text-black">
                    Comment
                  </span>
                </div>
                <textarea
                  placeholder="Type review comment here"
                  className="textarea textarea-bordered w-full text-black bg-white border-2 border-black h-24"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </label>

              {/* Action Buttons */}
              <div className="modal-action flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop bg-black/50">
            <button onClick={handleCloseEdit}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
}

export default ShowAllReviews;

