import { useState } from "react";
import { fetchReviews } from "../utils/fetchReviews";
import toast from "react-hot-toast";
import { fetchEvents } from "../utils/fetchEvents";

export default function AddEvent({ onSave }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

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
    if (!imageFile || !title || !desc || !date || !location) {
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
        const res = await fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            img: uploadData.fileUrl,
            title,
            desc,
            date,
            location,
          }),
        });

        const data = await res.json();
        if (data.success) {
          toast.success("Event added successfully!");

          setImageFile(null);
          setImagePreview("");

          fetchEvents();

          onSave();
        } else {
          toast.error(
            data.error,
            "ERROR SAVING EVENT" || "Something went wrong"
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
        ➕ Add New Event
      </h2>

      {/* Image Upload */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">
            Event Image
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

      {/* Title */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">Title</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          className="input input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </label>

      {/* Date */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">Date</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      {/* Location */}
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text font-semibold text-black">Location</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full text-black bg-white bg-[var(--title) text-white] border-2 border-black"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>

      <button
        className="btn bg-black text-white border-2 border-black hover:bg-amber-600  w-full my-2"
        disabled={loading}
        onClick={(e) => handleSubmit(e)}
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
    </div>
  );
}
