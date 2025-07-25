"use client";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Login from "../admin/Login";

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
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { email, password });
      if (email === "admin" && password === "admin@rakape") {
        toast.success("Login successful");
        setIslogin(true);
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="">
      {isLogin ? (
        <Login />
      ) : (
        <div className="card w-full md:w-120 bg-[white] backdrop-blur-sm shadow-xl rounded-3xl">
          <div className="card-body p-8">
            <h2 className="text-4xl font-bold text-center mb-8 text-black ">
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition bg-white ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <label className="label text-error text-sm pt-1">
                    {errors.email}
                  </label>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-primary transition bg-white text-black ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary transition"
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
                  <label className="label text-error text-sm pt-1">
                    {errors.password}
                  </label>
                )}
              </div>
              <button
                type="submit"
                className="btn btn-dash w-full text-lg rounded-xl transition hover:scale-105"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
