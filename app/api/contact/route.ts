import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vul de verplichte velden in." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    transporter
      .sendMail({
        from: `"Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: subject || "Nieuw contactformulier bericht",
        text: `
          Naam: ${name}
          Email: ${email}

          Bericht:
          ${message}
                `,
        html: `
          <h3>Nieuw bericht via contactformulier</h3>
          <p><strong>Naam:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Onderwerp:</strong> ${subject}</p>
          <p><strong>Bericht:</strong><br/>${message}</p>
                `,
      })
      .catch((err) => {
        console.error("Mail error:", err);
      });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
