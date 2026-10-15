import { v4 as uuidv4 } from "uuid";
import { getPool } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  const pool = getPool();

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? AND provider = 'credentials'",
    [email]
  );
  const user = rows[0];

  if (!user || user.email_verified) {
    return NextResponse.json({
      message: "If that account exists and is unverified, a new link has been sent.",
    });
  }

  await pool.query("DELETE FROM email_verification_tokens WHERE user_id = ?", [
    user.id,
  ]);

  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await pool.query(
    `INSERT INTO email_verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)`,
    [user.id, token, expiresAt]
  );

  await sendVerificationEmail(email, token);

  return NextResponse.json({
    message: "If that account exists and is unverified, a new link has been sent.",
  });
}
