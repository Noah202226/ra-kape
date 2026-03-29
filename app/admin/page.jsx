"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import { fetchProducts } from "../utils/fetchProducts";
import { fetchEvents } from "../utils/fetchEvents";

function page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchEvents();
  }, []);

  const containerClasses = isAuthenticated
    ? "flex min-h-screen w-full flex-col"
    : "";

  return (
    <main className={containerClasses}>
      <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
    </main>
  );
}

export default page;
