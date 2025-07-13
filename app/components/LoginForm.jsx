"use client";
import React, { useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Login from "../admin/Login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLogin, setIslogin] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "This field is required";
    }
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
      console.log("Form submitted:", { email, password });
      // TODO: submit logic

      if (email === "admin" && password === "admin@rakape") {
        alert("login");
        setIslogin(true);
      } else {
        alert("failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      {isLogin === true ? (
        <Login />
      ) : (
        <div className="card w-full max-w-md shadow-2xl">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: "grey", text: "black" }}
                />
                {errors.email && (
                  <label className="label text-error text-sm">
                    {errors.email}
                  </label>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`input input-bordered w-full pr-12 ${
                      errors.password ? "input-error" : ""
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1} // so tab doesn't land on icon
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <label className="label text-error text-sm">
                    {errors.password}
                  </label>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
