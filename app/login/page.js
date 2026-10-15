"use client";

import React, { useEffect, useState } from "react";
import { FaSpotify, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect authenticated users
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response || response.error) {
        setError(response?.error || "Invalid email or password.");
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  const handleFacebookLogin = async () => {
    setError("");
    await signIn("facebook", {
      callbackUrl: "/",
    });
  };

  // Don't show login page while checking the session
  if (status === "loading") {
    return (
      <div className="min-h-screen w-full bg-[#121212] text-white flex items-center justify-center">
        <p className="text-sm text-[#a7a7a7]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#121212] text-white flex flex-col items-center px-4 py-10 font-sans relative overflow-hidden">
      {/* Header */}
      <header className="pt-2 pb-10 relative z-10">
        <FaSpotify className="text-white w-10 h-10" />
      </header>

      {/* Login Card */}
      <main className="w-full max-w-[420px] flex flex-col items-center relative z-10 bg-[#0d0d0d]/80 border border-[#232323] rounded-2xl shadow-2xl px-8 py-10 sm:px-10">
        <h1 className="text-[28px] sm:text-3xl font-extrabold text-center mb-8 tracking-tight">
          Welcome back
        </h1>

        {/* Credentials Form */}
        <form
          onSubmit={handleCredentialsLogin}
          className="w-full flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-xs font-bold tracking-wide text-[#e5e5e5]"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              autoComplete="email"
              className="w-full bg-[#121212] border border-[#3d3d3d] rounded-md px-3.5 py-3 text-sm text-white placeholder:text-[#6a6a6a] outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors disabled:opacity-50"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-xs font-bold tracking-wide text-[#e5e5e5]"
            >
              Password
            </label>

            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
              className="w-full bg-[#121212] border border-[#3d3d3d] rounded-md px-3.5 py-3 text-sm text-white placeholder:text-[#6a6a6a] outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors disabled:opacity-50"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Sign In */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1ed760] text-black font-bold rounded-full py-3 mt-2 hover:bg-[#50ff8d] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="w-full my-7 flex items-center gap-3 text-xs font-medium text-[#a7a7a7]">
          <span className="flex-1 h-px bg-[#2a2a2a]" />
          <span>or</span>
          <span className="flex-1 h-px bg-[#2a2a2a]" />
        </div>

        {/* Social Login */}
        <div className="w-full flex flex-col gap-3">
          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#727272] hover:border-white hover:bg-white/5 rounded-full py-3 px-4 font-bold text-sm transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="w-4.5 h-4.5 absolute left-4" />
            <span>Continue with Google</span>
          </button>

          {/* Facebook */}
          <button
            type="button"
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border border-[#727272] hover:border-white hover:bg-white/5 rounded-full py-3 px-4 font-bold text-sm transition-colors relative disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaFacebook className="w-4.5 h-4.5 text-[#1877F2] absolute left-4" />
            <span>Continue with Facebook</span>
          </button>
        </div>

        {/* Forgot Password */}
        <a
          href="#forgot"
          className="mt-7 text-sm font-semibold text-[#a7a7a7] hover:text-white underline transition-colors"
        >
          Forgot your password?
        </a>

        {/* Divider */}
        <div className="w-full h-px bg-[#2a2a2a] my-7" />

        {/* Sign Up */}
        <div className="text-center text-sm text-[#a7a7a7] flex items-center gap-1.5">
          <span>Don't have an account?</span>

          <a
            href="#signup"
            className="text-white font-bold underline hover:text-[#1ed760] transition-colors"
          >
            Sign up
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-[11px] text-[#a7a7a7] text-center max-w-xs leading-relaxed relative z-10">
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          href="#"
          className="underline hover:text-white transition-colors"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="underline hover:text-white transition-colors"
        >
          Terms of Service
        </a>{" "}
        apply.
      </footer>
    </div>
  );
};

export default LoginPage;

