import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  return (
    <div className="mb-12">
      <section className="py-16 md:py-24 bg-gray-50 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Neem <span className="text-[#F1592A]">contact</span> met ons op.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Heb je vragen over vacatures, wil je samenwerken, of gewoon even
            hallo zeggen? We horen graag van je en reageren binnen 24 uur.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl mx-auto px-8">
        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Voornaam</Label>
              <Input id="firstName" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Achternaam</Label>
              <Input id="lastName" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mailadres</Label>
            <Input id="email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input id="subject" placeholder="Vraag over een vacature" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              placeholder="Vertel ons hoe we je kunnen helpen..."
              className="min-h-[150px] resize-none"
            />
          </div>
          <Button className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Verstuur bericht
          </Button>
        </form>
      </div>
    </div>
  );
}
