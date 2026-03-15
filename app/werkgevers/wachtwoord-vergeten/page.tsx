"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Wachtwoord vergeten
          </h1>
          <p className="text-gray-600 mt-2">
            Vul je e-mailadres in en we sturen een link om je wachtwoord te
            herstellen.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 mb-1">
                  E-mail verstuurd
                </h2>
                <p className="text-sm text-gray-600">
                  Als er een account bestaat voor{" "}
                  <span className="font-medium">{email}</span>, ontvang je
                  binnen enkele minuten een e-mail met een link om je wachtwoord
                  te herstellen.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/werkgevers/inloggen">
                  <Button variant="outline" className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Terug naar inloggen
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mailadres</Label>
                <div className="relative mt-1">
                  <Input
                    id="email"
                    type="email"
                    placeholder="jan@bedrijf.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#F1592A] hover:bg-[#e04d1f] text-white"
              >
                Verstuur herstelmail
              </Button>

              <div className="text-center">
                <Link
                  href="/werkgevers/inloggen"
                  className="text-sm text-[#F1592A] hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  Terug naar inloggen
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
