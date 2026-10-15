"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    // Don't redirect to /login — the account isn't usable until verified
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h1>Check your inbox</h1>
        <p>
          We sent a verification link to <strong>{form.email}</strong>.
          Click it to activate your account before signing in.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Create Account</button>
    </form>
  );
}
