// src/app/login/page.js
"use client";

import AuthForm from "../components/AuthForm";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthStore } from "../stores/useAuthStore";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, register, getCurrentUser } = useAuthStore((state) => state);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const handleLogin = async ({ email, password }) => {
    const user = await login({ email, password });
    if (user) router.push("/"); // ✅ safe navigation
  };

  const handleRegister = async ({
    email,
    password,
    contact,
    address,
    name,
  }) => {
    const user = await register({ email, password, contact, address, name });

    console.log(user);
    if (user) router.push("/"); // ✅ safe navigation
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? "signup" : "login"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            <AuthForm
              handleSubmit={isSignUp ? handleRegister : handleLogin}
              submitType={isSignUp ? "Sign Up" : "Log In"}
              onToggle={() => setIsSignUp(!isSignUp)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
