"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegistrerenPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <SignUp
        routing="path"
        path="/werkgevers/registreren"
        forceRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            cardBox: "shadow-sm rounded-xl",
            headerTitle: "text-2xl font-bold text-gray-900",
            headerSubtitle: "text-gray-600",
            formButtonPrimary:
              "bg-[#F1592A] hover:bg-[#e04d1f] text-white",
            footerActionLink: "text-[#F1592A] hover:text-[#e04d1f]",
          },
        }}
      />
    </div>
  );
}
