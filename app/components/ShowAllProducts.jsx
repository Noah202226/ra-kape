"use client";

import React, { useEffect, useState } from "react";

import useSettingsStore from "../stores/useSettingsStore";
import toast from "react-hot-toast";
import { CiCoffeeCup } from "react-icons/ci";
import { database } from "@/appwrite";

export default function ShowAllProducts() {
  const { products, setProducts } = useSettingsStore((state) => state);

  const [editingProduct, setEditingProduct] = useState(null);
  const [category, setCategory] = useState(
    products?.category || "ice-drip-coffee"
  );

  const [sortBy, setSortBy] = useState("productType");
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "productType") {
      return a.productType.localeCompare(b.productType);
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    if (sortBy === "productName") {
      return a.productName.localeCompare(b.productName);
    }
    if (sortBy === "priceSmall") {
      return a.priceSmall - b.priceSmall;
    }
    if (sortBy === "priceLarge") {
      return a.priceLarge - b.priceLarge;
    }
    return 0;
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleEdit = (product) => {
    setCategory(product.category);
    setEditingProduct(product);
  };
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveEdit = async () => {
    setIsSaving(true); // show loading
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
      }
      const response = await database.updateDocument(
        "6870ab6f0018df40fa94",
        "products",
        editingProduct.$id, // documentId
        {
          productName: editingProduct.productName,
          productDescription: editingProduct.productDescription,
          priceSmall: editingProduct.priceSmall,
          priceLarge: editingProduct.priceLarge,
          category: editingProduct.category,
          productType: editingProduct.productType,
          image: uploadData.fileUrl,
        }
      );

      // Update state with new product
      setProducts(
        products.map((p) => (p.$id === editingProduct.$id ? response : p))
      );

      toast.success(`✅ Updated: ${response.productName}`);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setIsSaving(false); // hide loading
    }
  };

  const handleDelete = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const deletedProduct = products.find((p) => p.$id === id); // Get the product before removing

      await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p.$id !== id));

      toast.success(
        `🗑️ Deleted: ${deletedProduct?.productName || deletedProduct?.$id}`
      );
    } catch (err) {
      console.error("Failed to delete product", err);
      toast.error("Failed to delete product.");
    }
  };

  if (sortedProducts.length === 0)
    return <p className="text-center py-8">No products found.</p>;

  return (
    <>
      <div className="text-center my-4">
        <div>
          <hr className="border-amber-400 mb-4" />
        </div>
        <h2 className="text-2xl font-bold text-amber-700">All Products</h2>
        <p className="text-gray-600">Manage your product listings here.</p>
        <span className="text-gray-700">
          Total Products:{" "}
          <span className="font-bold text-amber-600">{products.length}</span>
        </span>
      </div>

      <div className="flex justify-end p-4">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded p-2"
        >
          <option value="productType">Sort by Product Type</option>
          <option value="category">Sort by Category</option>
          <option value="productName">Sort by Name</option>
          <option value="priceSmall">Sort by Price (Small)</option>
          <option value="priceLarge">Sort by Price (Large)</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {sortedProducts
          .filter((product) => product.productType === "best-seller")
          .map((product) => (
            <div
              key={product.$id}
              data-aos="zoom-in"
              className="
            bg-white rounded-xl shadow-lg overflow-hidden 
            transition-all duration-300 
            hover:shadow-[0_0_25px_rgba(0,0,0,0.6)]
            hover:scale-105 hover:-translate-y-1
            flex flex-col
          "
            >
              {/* Image */}
              <figure className="relative group overflow-hidden">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="
                w-full 
                h-72 sm:h-48 md:h-56 lg:h-64 xl:h-72 
                object-cover 
                transition-transform duration-300 group-hover:scale-110
              "
                />
                <div
                  className="
                absolute inset-0 bg-gradient-to-t from-amber-800/40 to-transparent 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              "
                />
              </figure>

              {/* Card Content */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <h3 className="text-4xl sm:text-lg md:text-xl font-semibold mb-2 text-black line-clamp-1 text-center sm:text-left">
                  {product.productName}
                </h3>

                <div className="badge badge-outline mb-2 text-lg sm:text-sm text-black text-center sm:text-left">
                  {product.category}
                </div>

                <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-4 line-clamp-3 text-center sm:text-left">
                  {product.productDescription}
                </p>

                {/* Price Section */}
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-lg text-black" />
                      <span className="font-bold text-xl sm:text-lg md:text-xs text-black">
                        ₱{product.priceSmall}
                      </span>
                      <span className="text-xl sm:text-lg md:text-xs text-gray-500">
                        (Regular)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CiCoffeeCup className="text-2xl text-black" />
                      <span className="font-bold text-xl sm:text-lg md:text-xs text-black">
                        ₱{product.priceLarge}
                      </span>
                      <span className="text-xl sm:text-lg md:text-xs text-gray-500">
                        (Upsize)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Button */}
                <button
                  className="btn btn-xl sm:btn-sm md:btn-md btn-neutral w-full mt-3 text-xl sm:text-lg md:text-xl font-semibold "
                  onClick={() => {
                    setSelectedProduct(product);
                    document.getElementById("order-modal")?.showModal();
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          ))}

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96 max-h-[75vh] overflow-y-auto">
              <h2 className="text-lg font-bold mb-4">
                Edit -- {editingProduct.productName}
              </h2>

              <label className="py-4 my-4">Product Name :</label>
              <input
                type="text"
                value={editingProduct.productName}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    productName: e.target.value,
                  })
                }
                className="border rounded p-2 w-full mb-2"
              />

              <img
                src={imageFile ? imagePreview : editingProduct.image}
                alt={editingProduct.productName}
                className="w-full h-40 object-cover rounded mb-2"
              />

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

              {/* {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-xl border"
              />
            )} */}

              {/* Category */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-black font-semibold">
                    Category
                  </span>
                </div>
                <select
                  className="select select-bordered text-black bg-white w-full bg-[var(--title) text-white] border-2 border-black"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  <option value="ice-drip-coffee">ICE DRIP COFFEE</option>
                  <option value="ice-premium-espresso">
                    ICE PREMIUM ESPRESSO
                  </option>
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
                  value={editingProduct.productType}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      productType: e.target.value,
                    })
                  }
                >
                  <option disabled value="">
                    Select a type
                  </option>
                  <option value="normal">Normal</option>
                  <option value="best-seller">Best Seller</option>
                  <option value="special">Special</option>
                </select>
              </label>

              {/* Example for updating price */}
              <label className="py-4 my-4">Small Price :</label>
              <input
                type="number"
                value={editingProduct.priceSmall}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    priceSmall: parseInt(e.target.value),
                  })
                }
                className="border rounded p-2 w-full mb-2"
              />

              {/* Example for updating price */}
              <label className="py-4 my-4">Large Price :</label>
              <input
                type="number"
                value={editingProduct.priceLarge}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    priceLarge: parseInt(e.target.value),
                  })
                }
                className="border rounded p-2 w-full mb-2"
              />

              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                  onClick={() => setEditingProduct(null)}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleSaveEdit}
                >
                  {isSaving ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
