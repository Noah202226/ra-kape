"use client";

import AuthForm from "../components/AuthForm";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

export default function RegisterPage() {
  const { register, getCurrentUser } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleRegister = async (data) => {
    const user = await register(data);
    if (user) router.push("/");
  };

  const handleToggleToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gray-200/50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors ml-2"
        >
          <IoArrowBackOutline size={18} /> Back to home
        </Link>

        <AnimatePresence mode="wait">
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <AuthForm
              handleSubmit={handleRegister}
              submitType="Sign Up"
              onToggle={handleToggleToLogin}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
