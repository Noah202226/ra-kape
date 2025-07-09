"use client";

import { useEffect } from "react";
import BestSellerCarousel from "./components/daisyUI/BestSellerProducts";
import Hero from "./components/daisyUI/Hero";

import Aos from "aos";
import "aos/dist/aos.css";
import CustomerReviews from "./components/daisyUI/CustomerReviews";
import AboutUs from "./components/AboutUs";

export default function Home() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library
    Aos.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Whether animation should happen only once while scrolling down
      mirror: true, // Whether elements should animate out while scrolling up
    });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 pt-20">
      <Hero />

      <AboutUs />

      <BestSellerCarousel />

      <CustomerReviews />
    </main>
  );
}
