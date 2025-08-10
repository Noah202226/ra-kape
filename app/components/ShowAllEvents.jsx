"use client";

import React, { useEffect } from "react";
import { database } from "@/appwrite";
import toast from "react-hot-toast";
import useSettingsStore from "../stores/useSettingsStore"; // We'll store events here too

export default function ShowAllEvents() {
  const { events, setEvents } = useSettingsStore((state) => state);

  console.log("Events:", events);

  const handleEdit = (event) => {
    alert(`Edit ${event.title}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const deletedEvent = events.find((e) => e.$id === id);

      await fetch(`/api/events?id=${id}`, { method: "DELETE" });

      setEvents(events.filter((e) => e.$id !== id));

      toast.success(`🗑️ Deleted: ${deletedEvent?.title || deletedEvent?.$id}`);
    } catch (err) {
      console.error("Failed to delete event", err);
      toast.error("Failed to delete event.");
    }
  };

  if (events.length === 0)
    return <p className="text-center py-8">No events found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.map((event) => (
        <div
          key={event.$id}
          className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between max-w-[250px] mx-auto"
        >
          {/* Image */}
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-[180px] object-cover rounded mb-2"
          />

          {/* Content */}
          <div className="h-[200px] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {event.description}
              </p>
              <p className="text-amber-600 italic text-sm">{event.date}</p>
              <p className="text-gray-500 text-xs">{event.location}</p>
            </div>
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.$id)}
                className="btn btn-sm bg-red-600 hover:bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
