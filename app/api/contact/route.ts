import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, phone, message } = await req.json();

        await resend.emails.send({
            from: "nv client <onboarding@resend.dev>",
            to: "lartistevisuel@gmail.com",
            subject: `Nouveau projet de ${name}`,
            html: `
        <h2>Nouvelle demande de projet</h2>

        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>

        <hr>

        <p>${message}</p>
      `,
        });

        return NextResponse.json({
            success: true,
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}