import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "lartistevisuel@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Limite simple par adresse IP : 5 messages par tranche de 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();

function isRateLimited(ip: string) {
    const now = Date.now();
    const recent = (requests.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

    if (recent.length >= MAX_REQUESTS) {
        requests.set(ip, recent);
        return true;
    }

    recent.push(now);
    requests.set(ip, recent);

    return false;
}

function clean(value: unknown, max: number) {
    return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function fail(error: string, status: number) {
    return NextResponse.json({ success: false, error }, { status });
}

export async function POST(req: Request) {
    let body: Record<string, unknown>;

    try {
        body = await req.json();
    } catch {
        return fail("Requête invalide.", 400);
    }

    // Champ piège rempli : c'est un robot, on répond OK sans rien envoyer.
    if (clean(body?.website, 200)) {
        return NextResponse.json({ success: true });
    }

    const name = clean(body?.name, 100);
    const email = clean(body?.email, 200);
    const phone = clean(body?.phone, 40);
    const message = clean(body?.message, 5000);

    if (!name || !email || !message) {
        return fail("Merci de remplir le nom, l'email et le message.", 400);
    }

    if (!EMAIL_PATTERN.test(email)) {
        return fail("L'adresse email ne semble pas valide.", 400);
    }

    if (message.length < 10) {
        return fail("Votre message est un peu court : décrivez votre projet en quelques mots.", 400);
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "inconnu";

    if (isRateLimited(ip)) {
        return fail("Trop de messages envoyés. Réessayez dans quelques minutes.", 429);
    }

    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY manquante : impossible d'envoyer le message.");
        return fail("L'envoi est momentanément indisponible. Écrivez-moi directement par email.", 500);
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const { error } = await resend.emails.send({
            from: "nv client <onboarding@resend.dev>",
            to: TO,
            replyTo: email,
            subject: `Nouveau projet de ${name.replace(/[\r\n]+/g, " ")}`,
            html: `
        <h2>Nouvelle demande de projet</h2>

        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Téléphone :</strong> ${escapeHtml(phone) || "—"}</p>

        <hr>

        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
        });

        if (error) throw error;

        return NextResponse.json({ success: true });

    } catch (error) {

        console.error(error);

        return fail("Une erreur est survenue. Réessayez ou écrivez-moi directement par email.", 500);
    }
}
