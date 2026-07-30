import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import smsLogo from "../assets/smsLogo.jpg";
const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess("Registration Successful");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF9F6]">
      {/* ---------- Left brand panel ---------- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0B1530] via-[#131F45] to-[#1F2F5C]">
        {/* ruled-paper texture, evokes an academic ledger */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 39px, #C9A44C 39px, #C9A44C 40px)",
          }}
        />
        {/* soft gold glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C9A44C] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4F6FE0] opacity-10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <div className="flex items-center gap-3">
            <img
              src={smsLogo}
              alt="SMS Logo"
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-white/20"
            />
            <span className="text-white font-semibold tracking-wide text-lg">
              Student<span className="text-[#C9A44C]">MS</span>
            </span>
          </div>

          <div className="max-w-md">
            <p className="text-[#C9A44C] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Join The Platform
            </p>
            <h1 className="font-serif text-4xl leading-tight text-white mb-5">
              Set up your account
              <br />
              in under a minute.
            </h1>
            <p className="text-white/60 text-sm leading-relaxed">
              One login for admissions, attendance, grading, and parent
              communication &mdash; built for institutions that run on
              precision.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              "Centralized student records",
              "Role-based staff access",
              "Real-time attendance & grading",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-white/70 text-sm"
              >
                <svg
                  className="w-4 h-4 text-[#C9A44C] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- Right form panel ---------- */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* mobile-only logo */}
          <div className="flex lg:hidden items-center gap-3 justify-center mb-10">
            <img
              src="/smsLogo.jpg"
              alt="SMS Logo"
              className="w-10 h-10 rounded-xl object-cover shadow-sm"
            />
            <span className="font-semibold tracking-wide text-lg text-[#101B33]">
              Student<span className="text-[#C9A44C]">MS</span>
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(16,27,51,0.15)] ring-1 ring-black/[0.04] p-9 sm:p-10">
            <h2 className="font-serif text-3xl text-[#101B33]">
              Create your account
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Get started with Student Management System
            </p>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mt-6 ring-1 ring-red-100">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 bg-emerald-50 text-emerald-700 text-sm px-4 py-3 rounded-lg mt-6 ring-1 ring-emerald-100">
                <svg
                  className="w-4 h-4 mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12.75l2.25 2.25L15 8.25m-8.25 8.25a9 9 0 1112.72 0"
                  />
                </svg>
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleRegister} className="mt-7 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-1.5"
                >
                  Full Name
                </label>
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Mayank Thakor"
                    className="w-full border border-slate-200 rounded-lg pl-10 pr-3.5 py-3 text-sm text-[#101B33] placeholder:text-slate-400 outline-none transition focus:border-[#C9A44C] focus:ring-2 focus:ring-[#C9A44C]/20"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@school.edu"
                    className="w-full border border-slate-200 rounded-lg pl-10 pr-3.5 py-3 text-sm text-[#101B33] placeholder:text-slate-400 outline-none transition focus:border-[#C9A44C] focus:ring-2 focus:ring-[#C9A44C]/20"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full border border-slate-200 rounded-lg pl-10 pr-11 py-3 text-sm text-[#101B33] placeholder:text-slate-400 outline-none transition focus:border-[#C9A44C] focus:ring-2 focus:ring-[#C9A44C]/20"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold tracking-wide uppercase text-slate-500 mb-1.5"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <svg
                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.75}
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    className="w-full border border-slate-200 rounded-lg pl-10 pr-11 py-3 text-sm text-[#101B33] placeholder:text-slate-400 outline-none transition focus:border-[#C9A44C] focus:ring-2 focus:ring-[#C9A44C]/20"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#101B33] text-white text-sm font-medium py-3.5 rounded-lg transition hover:bg-[#1F2F5C] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(16,27,51,0.5)]"
              >
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-7">
              Already have an account?
              <Link
                to="/login"
                className="text-[#101B33] font-semibold ml-1.5 hover:text-[#C9A44C] transition"
              >
                Login
              </Link>
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            &copy; {new Date().getFullYear()} StudentMS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;