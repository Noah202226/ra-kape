"use client";
import { useAuthStore } from "@/app/stores/useAuthStore";
import useCartStore from "@/app/stores/useCartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";

function Navbar() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [loading, setLoading] = useState(false); // for login/logout buttons
  const { current, getCurrentUser, logout } = useAuthStore((state) => state);

  const pathname = usePathname();
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setHasMounted(true);

    getCurrentUser();
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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/r.jpg"
            alt="Ra Kape Logo"
            className="h-8 sm:h-10 lg:h-12 w-auto rounded-3xl transition hover:scale-105"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-10">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="relative text-sm sm:text-base lg:text-lg 
                after:content-[''] after:absolute after:left-0 after:-bottom-1 
                after:w-0 after:h-[2px] after:bg-[var(--title)]
                hover:after:w-full after:transition-all after:duration-300
                hover:scale-105 transition text-[var(--title)]"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Cart & CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          {current ? (
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm font-medium text-black">
                {current.name || current.email}
              </span>
            </div>
          ) : (
            <Link
              href="/login"
              className={`btn btn-primary hidden md:inline-flex rounded-md ${
                loading ? "pointer-events-none opacity-70" : ""
              }`}
              onClick={() => setLoading(true)}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </Link>
          )}
          <div className="relative group">
            <a href="/cart" className="block group-hover:animate-bounce">
              <RiShoppingCartFill
                className="text-[var(--title)]"
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
            className="px-3 sm:px-4 lg:px-6 py-1 sm:py-2 text-sm sm:text-base lg:text-lg rounded-xl
              bg-[var(--title)] border-0 hover:shadow-2xl hover:bg-gray-800 text-white transition"
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white text-center space-y-4 py-6 transition-all duration-300 ease-in-out">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="block text-lg hover:underline hover:scale-105 transition"
            >
              {item.name}
            </a>
          ))}

          {/* Auth state on mobile */}
          {current ? (
            <div className="border-t border-base-300 pt-4 flex flex-col gap-3">
              <span className="block mb-2 text-sm font-medium text-base-content text-right">
                {current.name || current.email}
              </span>
              <button
                onClick={async () => {
                  setLoading(true);
                  await handleLogout();
                  setMenuOpen(false);
                }}
                disabled={loading}
                className="btn btn-primary rounded-md flex items-center justify-center"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className={`btn btn-primary w-full ${
                loading ? "pointer-events-none opacity-70" : ""
              }`}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setLoading(true);
              }}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
