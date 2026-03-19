"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      company: formData.get("company"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data.error || "Er ging iets mis. Probeer het later opnieuw.",
        );
        return;
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("Network error:", error);
      setStatus("error");
      setErrorMessage("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-12">
      <section className="py-16 bg-gray-50 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Neem <span className="text-[#F1592A]">contact</span> met ons op.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Heb je vragen over vacatures, wil je samenwerken, of gewoon even
            hallo zeggen? We reageren meestal binnen 24 uur.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl mx-auto px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="company"
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input id="name" name="name" required disabled={loading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Vraag over een vacature"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Bericht *</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Vertel ons hoe we je kunnen helpen..."
              className="min-h-37.5 resize-none"
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Versturen..." : "Verstuur bericht"}
          </Button>

          {status === "success" && (
            <p className="text-green-600 text-sm">
              ✅ Je bericht is succesvol verzonden!
            </p>
          )}

          {status === "error" && errorMessage && (
            <p className="text-red-600 text-sm">❌ {errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
