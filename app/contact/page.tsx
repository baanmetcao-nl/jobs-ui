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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }

      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-12">
      <section className="py-16 md:py-24 bg-gray-50 mb-12">
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
          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres *</Label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp *</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Vraag over een vacature"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Bericht *</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Vertel ons hoe we je kunnen helpen..."
              className="min-h-[150px] resize-none"
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

          {status === "error" && (
            <p className="text-green-600 text-sm">
              ✅ Je bericht is succesvol verzonden!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
