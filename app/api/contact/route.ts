import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, company } = await req.json();

    if (company && company.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vul alle verplichte velden in." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "BaanmetCAO contactformulier <info@baanmetcao.nl>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: subject || "Nieuw bericht via contactformulier",
      html: `
        <h3>Nieuw bericht</h3>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Er ging iets mis." }, { status: 500 });
  }
}
