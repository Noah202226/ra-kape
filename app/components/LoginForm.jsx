"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// Fixed the path to include daisyUI and removed the syntax error
import TabsWithIcon from "./daisyUI/TabsWithIcon";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLogin, setIslogin] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "This field is required";
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (
        email === process.env.NEXT_PUBLIC_ADMIN_USER &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASS
      ) {
        toast.success("Login successful");
        setIslogin(true);
      } else {
        toast.error("Invalid credentials");
      }
    }
  };

  if (isLogin) {
    return <TabsWithIcon />;
  }

  return (
    <div className="flex items-center justify-center w-full px-4 py-10">
      <div className="w-full max-w-[400px] bg-white backdrop-blur-md shadow-2xl rounded-[2.5rem] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
              Admin
            </h2>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">
              Management Portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Username / Email
              </label>
              <input
                type="text"
                placeholder="admin@store.com"
                className={`w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none text-black ${
                  errors.email ? "border-red-500 bg-red-50" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-bold ml-2">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Security Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none text-black ${
                    errors.password ? "border-red-500 bg-red-50" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-black transition"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-[10px] text-red-500 font-bold ml-2">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 flex items-center justify-center gap-3 px-6 py-4 bg-black text-white rounded-2xl font-black text-base shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-center text-[10px] text-gray-400 font-medium mt-8 uppercase tracking-widest">
            Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}
