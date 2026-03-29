"use client";
import { useAuthStore } from "@/app/stores/useAuthStore";
import useCartStore from "@/app/stores/useCartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

function Navbar() {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { current, getCurrentUser, logout } = useAuthStore((state) => state);
  const pathname = usePathname();

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMenuOpen(false);
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    setHasMounted(true);
    getCurrentUser();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasMounted) return null;

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

  const menuItems = [
    { name: "Ice Drip", link: "/ice-drip-coffee" },
    { name: "Espresso", link: "/ice-premium-espresso" },
    { name: "Non-Coffee", link: "/non-coffee" },
    { name: "Hot Coffee", link: "/hot-coffee" },
    { name: "Ice Blended", link: "/ice-blended" },
    { name: "Pastry", link: "/pastry" },
  ];

  // Animation Variants
  const navVariants = {
    top: { y: 0, width: "100%", borderRadius: "0px", padding: "12px 24px" },
    scrolled: {
      y: 10,
      width: "95%",
      borderRadius: "20px",
      padding: "8px 20px",
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -20 },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 10 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      initial="top"
      animate={scrolled ? "scrolled" : "top"}
      variants={navVariants}
      className="fixed left-1/2 -translate-x-1/2 z-100 transition-all duration-500"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.75 bg-(--title) origin-[0%] z-101"
        style={{ scaleX, borderRadius: scrolled ? "20px 20px 0 0" : "0" }}
      />

      <div
        className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg border border-white/20 px-6 py-2"
              : "bg-transparent px-4 py-3"
          }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <motion.img
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            src="/r.jpg"
            alt="Ra Kape Logo"
            className="h-10 sm:h-12 w-auto rounded-xl shadow-sm cursor-pointer"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="relative group text-sm font-bold text-gray-800"
            >
              {item.name}
              {pathname === item.link && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-(--title)"
                />
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--title) transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 cursor-pointer"
            >
              <RiShoppingCartFill size={26} className="text-gray-800" />
              {totalQuantity > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.facebook.com/RaKapeBulacan"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1877F2] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-[#166fe5] transition-colors"
            >
              Facebook
            </a>

            {current ? (
              <Link
                href="/profile"
                className="text-sm font-bold hover:underline"
              >
                {current.name?.split(" ")[0]}
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-black text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-gray-800"
              >
                LOGIN
              </Link>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {menuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute text-gray-800 top-20 right-0 w-70 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-3 lg:hidden"
          >
            {menuItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <Link
                  href={item.link}
                  className={`block px-4 py-3 rounded-xl font-bold transition-colors text-gray-800 ${
                    pathname === item.link
                      ? "bg-(--title) text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-gray-100 flex flex-col gap-3"
            >
              <a
                href="https://www.facebook.com/RaKapeBulacan"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#1877F2] text-white py-3 rounded-xl font-bold text-center shadow-md"
              >
                Facebook
              </a>

              {current ? (
                <div className="flex flex-col gap-2 items-center ">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold"
                  >
                    {loading ? "..." : "Logout"}
                  </button>
                  {current.name?.split(" ")[0]}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-black text-white py-4 rounded-xl font-bold text-center"
                >
                  Login
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
