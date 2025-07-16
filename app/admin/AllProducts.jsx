"use client";

import { useEffect, useState } from "react";

const [products, setProducts] = useState([]);

// useEffect(() => {
//   const fetchProducts = async () => {
//     const res = await fetch("/api/products");
//     const data = await res.json();
//     setProducts(data.products || []);
//   };
//   fetchProducts();
// }, []);
function AllProducts() {
  return (
    <div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="space-y-4">
          {products.map((prod) => (
            <div
              key={prod.$id}
              className="p-4 border rounded-xl flex justify-between items-center"
            >
              <div>
                <p className="font-bold">
                  {prod.name} - ₱{prod.price}
                </p>
                <p className="text-sm text-gray-600">{prod.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(prod)}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(prod.$id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
