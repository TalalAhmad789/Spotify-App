import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { getPool } from '@/lib/db';
import bcrypt from 'bcryptjs';

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const pool = getPool();

                const rows = await pool.query(
                    "SELECT * FROM User WHERE email = ? AND provider = 'credentials'",
                    [credentials.email]
                )

                const user = rows[0];

                if (!user || !user.password) {
                    throw new Error("Invalid email or password");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Invalid email or password");
                }

                if (!user.email_verified) {
                    throw new Error("Please verify your email before signing in");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],

    session: {
        strategy: "jwt"
    },

    secret: process.env.NEXTAUTH_SECRET,

    pages: {
        signIn: "/login"
    },

    callbacks: {
        // Runs on sign-in for OAuth providers — manually upsert into MySQL
        async signIn({ user, account }) {
            if (account.provider === "google" || account.provider === "facebook") {
                const pool = getPool();

                const [rows] = await pool.query(
                    "SELECT * FROM User WHERE email = ?",
                    [user.email]
                );

                if (rows.length === 0) {
                    await pool.query(
                        `INSERT INTO User (name, email, image, provider, provider_id, email_verified)
             VALUES (?, ?, ?, ?, ?, 1)`,
                        [user.name, user.email, user.image, account.provider, account.providerAccountId]
                    );
                } else {
                    await pool.query(
                        `UPDATE User SET name = ?, image = ? WHERE email = ?`,
                        [user.name, user.image, user.email]
                    );
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            if (user) {
                const pool = getPool();
                const [rows] = await pool.query(
                    "SELECT id, name, email, image, provider FROM User WHERE email = ?",
                    [user.email]
                );
                if (rows[0]) {
                    token.id = rows[0].id;
                    token.provider = rows[0].provider;
                }
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.provider = token.provider;
                console.log("Session", session)
            }
            return session;
        },
    },
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }