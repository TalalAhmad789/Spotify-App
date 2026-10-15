"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MESSAGES = {
  success: "Your email has been verified. You can now sign in.",
  expired: "This verification link has expired. Please request a new one.",
  invalid: "This verification link is invalid.",
  missing_token: "No verification token was provided.",
};

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const message = MESSAGES[status] || "Check your inbox for a verification link.";

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
      {status === "success" && <Link href="/login">Go to Sign In</Link>}
    </div>
  );
}
