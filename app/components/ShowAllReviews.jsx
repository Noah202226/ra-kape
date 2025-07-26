import React from "react";
import useSettingsStore from "../stores/useSettingsStore";
import toast from "react-hot-toast";

function ShowAllReviews() {
  const { reviews, setReviews } = useSettingsStore((state) => state);

  const handleEdit = (product) => {
    // You can route to edit page or open a modal here
    alert(`Edit ${product.productName}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await fetch(`/api/reviews?id=${id}`, {
        method: "DELETE",
      });

      const deletedReviews = reviews.find((p) => p.$id === id); // Get the product before removing

      setReviews(reviews.filter((p) => p.$id !== id));

      toast.success(
        `🗑️ Deleted: ${deletedReviews?.comments || deletedReviews?.$id}`
      );
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product.");
    }
  };

  if (reviews.length === 0)
    return <p className="text-center py-8">No Reviews found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {reviews.map((product) => (
        <div
          key={product.$id}
          className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between"
        >
          <img
            src={product.reviewImage}
            alt={product.reviewImage}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-gray-600">{product.comments}</p>
          </div>
          <div className="flex justify-end mt-4 gap-2">
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
  );
}

export default ShowAllReviews;
