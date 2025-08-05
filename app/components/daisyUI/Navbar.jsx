"use client";
import useCartStore from "@/app/stores/useCartStore";
import React, { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";

function Navbar() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) return null;

  const menuItems = [
    { name: "Ice Drip Coffee", link: "/ice-drip-coffee" },
    { name: "Ice Premium Espresso", link: "/ice-premium-espresso" },
    { name: "Non Coffee", link: "/non-coffee" },
    { name: "Hot Coffee", link: "/hot-coffee" },
    { name: "Ice Blended", link: "/ice-blended" },
    { name: "Add-ons", link: "/add-ons" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 
        ${
          scrolled
            ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold text-[var(--title)] hover:scale-105 transition"
        >
          ❛ RA KAPE
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:w-0 after:h-[2px] after:bg-[var(--title)]
                hover:after:w-full after:transition-all after:duration-300
                hover:scale-105 transition text-[var(--title)]"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Cart & CTA */}
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <a href="/cart" className="block group-hover:animate-bounce">
              <RiShoppingCartFill
                className="text-[var(--title)] hover:text-amber-700"
                style={{ width: 28, height: 28 }}
              />
            </a>
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </div>
          <a
            href="https://www.facebook.com/RaKapeBulacan"
            target="_blank"
            className="btn bg-[var(--title)] border-0 hover:shadow-2xl hover:bg-gray-800 text-white"
          >
            Facebook
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-black"
              fill="none"
              stroke="black"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white text-center space-y-4 py-6 animate-slide-down">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="block hover:underline hover:scale-105 transition"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
