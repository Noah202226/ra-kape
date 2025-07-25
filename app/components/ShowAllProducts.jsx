"use client";

import React, { useEffect, useState } from "react";

import useSettingsStore from "../stores/useSettingsStore";
import toast from "react-hot-toast";

export default function ShowAllProducts() {
  const { products, setProducts } = useSettingsStore((state) => state);

  const handleEdit = (product) => {
    // You can route to edit page or open a modal here
    alert(`Edit ${product.productName}`);
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      setProducts(products.filter((p) => p.$id !== id));
      toast.success(`${products.filter(p => p.$id === id)} deleted.`)
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  if (products.length === 0)
    return <p className="text-center py-8">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.$id}
          className="border rounded-xl p-4 shadow bg-white flex flex-col justify-between"
        >
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.productName}</h3>
            <p className="text-gray-600">{product.productDescription}</p>
            <p className="text-amber-600 italic">
              {product.category} - {product.productType}
            </p>
            <p className="text-amber-700 font-bold mt-2">₱{product.price}</p>
          </div>
          <div className="flex justify-between mt-4 gap-2">
            <button
              onClick={() => handleEdit(product)}
              className="btn btn-sm bg-blue-600 hover:bg-blue-500 text-white"
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
  );
}
