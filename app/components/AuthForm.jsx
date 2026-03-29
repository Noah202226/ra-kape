import { useState } from "react";
import { Mail, Lock, Phone, Home, User } from "lucide-react";

export default function AuthForm({ handleSubmit, submitType, onToggle }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      await handleSubmit(data);
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  const isRegister = submitType === "Sign Up";

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="p-8 sm:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            {isRegister
              ? "Join our coffee community today"
              : "Your favorite brew is waiting"}
          </p>
        </div>

        <form className="space-y-5" onSubmit={onSubmit}>
          {/* Name Field (Sign Up Only) */}
          {isRegister && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-4 tracking-widest">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                  <User size={18} />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-amber-500 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase ml-4 tracking-widest">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                <Mail size={18} />
              </div>
              <input
                name="email"
                type="email"
                placeholder="hello@example.com"
                required
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-amber-500 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-gray-400 uppercase ml-4 tracking-widest">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                <Lock size={18} />
              </div>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-amber-500 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
              />
            </div>
          </div>

          {/* Register-only Fields with animation spacing */}
          {isRegister && (
            <div className="pt-2 space-y-5 animate-in fade-in slide-in-from-top-4 duration-500">
              {/* Contact */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-4 tracking-widest">
                  Contact Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                    <Phone size={18} />
                  </div>
                  <input
                    name="contact"
                    type="tel"
                    placeholder="0912 345 6789"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-amber-500 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-400 uppercase ml-4 tracking-widest">
                  Delivery Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-amber-600 transition-colors">
                    <Home size={18} />
                  </div>
                  <input
                    name="address"
                    type="text"
                    placeholder="Street, City, Zip"
                    required
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-amber-500 focus:bg-white rounded-2xl text-sm font-bold transition-all outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-5 bg-black hover:bg-zinc-800 text-white font-black text-lg rounded-3xl transition-all active:scale-95 shadow-xl shadow-gray-200 flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-md"></span>
                <span>Processing...</span>
              </>
            ) : (
              submitType
            )}
          </button>
        </form>

        {/* Toggle Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 font-bold text-sm">
            {isRegister ? "Already part of the family?" : "New to our coffee?"}{" "}
            <button
              type="button"
              onClick={onToggle}
              className="text-amber-600 hover:text-amber-700 underline underline-offset-4 decoration-2"
              disabled={loading}
            >
              {isRegister ? "Log In" : "Create Account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
