"use client";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { fetchProducts } from "../utils/fetchProducts";

function page() {
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center px-0 md:px-24 pt-20">
      <LoginForm />
    </main>
  );
}

export default page;
