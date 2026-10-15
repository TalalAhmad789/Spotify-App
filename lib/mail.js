import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token) {
    const verifyUrl = `${process.env.APP_URL}/api/verification-email?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: processe.env.RESEND_FROM,
        to: email,
        subject: "Verify your email address",
        html: `
        <p>Thanks for signing up! Please confirm your email address to activate your account.</p>
        <p><a href="${verifyUrl}">Click here to verify your email</a></p>
        <p>This link expires in 24 hours. If you didn't create an account, you can ignore this email.</p>
        `,
    })

    if (error) {
        console.error("Resend error:", error);
        throw new Error("Failed to send verification email");
    }

    return data;
}

