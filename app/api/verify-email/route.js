import { getPool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(
            new Url("/verify-email?status=missing_token", req.url)
        )
    }

    const pool = getPool();

    const [rows] = await pool.query(
        "SELECT * FROM Email_Verification_Token WHERE token = ?",
        [token]
    )

    const record = rows[0]

    if (!record) {
        return NextResponse.redirect(
            new Url("/verify-email?status=invalid", req.url)
        )
    }

    if (new Date(record.expires_at) < new Date()) {
        await pool.query("DELETE FROM Email_Verification_Token WHERE id = ?", [
            record.id,
        ]);
        return NextResponse.redirect(
            new URL("/verify-email?status=expired", req.url)
        );
    }

    await pool.query("UPDATE User SET email_verified = 1 WHERE id = ?", [
        record.user_id,
    ]);
    await pool.query("DELETE FROM Email_Verification_Token WHERE id = ?", [
        record.id,
    ]);

    return NextResponse.redirect(
        new URL("/verify-email?status=success", req.url)
    );
}