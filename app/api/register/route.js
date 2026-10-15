import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid"
import { getPool } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required", success: false },
                { status: 400 }
            );
        }

        const pool = getPool();

        const [existing] = await pool.query(
            "SELECT id FROM User WHERE email = ?",
            [email]
        )

        if (existing.length > 0) {
            return NextResponse.json(
                { message: "User already exists", success: false },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users (name, email, password, provider, email_verified)
           VALUES (?, ?, ?, 'credentials', 0)`,
            [name || null, email, hashedPassword]
        );

        const userId = result.insertId;
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        await pool.query(
            "INSERT INTO Email_Verification_Token(user_id, token, expires_at) VALUES (?, ?, ?)",
            [userId, token, expiresAt]
        )

        await sendVerificationEmail(email, token);

        return NextResponse.json({
            message: "Registration successful. Please check your email to verify your account.",
            success: true
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Server error",
            success: false
        },
            { status: 500 });
    }
}





























