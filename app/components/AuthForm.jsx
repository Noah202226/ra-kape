import { useState } from "react";
import { Mail, Lock, Phone, Home } from "lucide-react";
import { RiProfileFill } from "react-icons/ri";

export default function AuthForm({ handleSubmit, submitType, onToggle }) {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const name = formData.get("name");

    try {
      await handleSubmit({ email, password, contact, address, name }); // ✅ pass values, not the event
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md shadow-xl bg-black">
      <form className="card-body space-y-2" onSubmit={onSubmit}>
        {/* Title */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center">
          {submitType === "Sign Up" ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Email</span>
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Mail className="w-5 h-5 opacity-70 text-white" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="grow text-white placeholder:text-white/60"
            />
          </label>
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-white">Password</span>
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Lock className="w-5 h-5 opacity-70 text-white" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className="grow text-white placeholder:text-white/60"
            />
          </label>
        </div>

        {/* Extra fields only for Sign Up */}
        {submitType === "Sign Up" && (
          <>
            {/* Contact Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <RiProfileFill className="w-5 h-5 opacity-70 text-white" />
                <input
                  type="tel"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="grow text-white placeholder:text-white/60"
                />
              </label>
            </div>
            {/* Contact Number */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Contact Number</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Phone className="w-5 h-5 opacity-70 text-white" />
                <input
                  type="tel"
                  name="contact"
                  placeholder="Enter your contact number"
                  required
                  className="grow text-white placeholder:text-white/60"
                />
              </label>
              <span className="label-text text-right text-orange-500">
                Expect a text or call for your orders confirmation
              </span>
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Address</span>
              </label>
              <label className="input input-bordered flex items-center gap-2 w-full">
                <Home className="w-5 h-5 opacity-70 text-white" />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  required
                  className="grow text-white placeholder:text-white/60"
                />
              </label>
            </div>
          </>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full flex justify-center items-center"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              {submitType}...
            </>
          ) : (
            submitType
          )}
        </button>

        {/* Toggle */}
        {onToggle && (
          <p className="text-center text-sm text-white">
            {submitType === "Sign Up" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onToggle}
                  className="link link-primary"
                  disabled={loading}
                >
                  Log In
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={onToggle}
                  className="link link-primary"
                  disabled={loading}
                >
                  Sign Up
                </button>
              </>
            )}
          </p>
        )}
      </form>
    </div>
  );
}
