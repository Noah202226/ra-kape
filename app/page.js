"use client";

import { useEffect, useState } from "react";
import BestSellerCarousel from "./components/daisyUI/BestSellerProducts";
import Hero from "./components/daisyUI/Hero";

import Aos from "aos";
import "aos/dist/aos.css";
import CustomerReviews from "./components/daisyUI/CustomerReviews";
import AboutUs from "./components/AboutUs";

import { database } from "@/appwrite";

import { fetchSettings } from "./utils/fetchSettings";
import { fetchProducts } from "./utils/fetchProducts";

import useAuthStore from "./stores/useAuthStore";
import useSettingsStore from "./stores/useSettingsStore";
export default function Home() {
  const { authUser, checkUser } = useAuthStore((state) => state);
  const { setProducts } = useSettingsStore((state) => state);
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
      mirror: true, // Whether elements should animate out while scrolling up
    });

    fetchSettings();
    fetchProducts();
    checkUser();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px:5 sm:px-24 pt-20">
      <Hero />
      <AboutUs />
      <BestSellerCarousel />
      <CustomerReviews />
    </main>
  );
}
