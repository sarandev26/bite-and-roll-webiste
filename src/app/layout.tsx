import type { Metadata } from "next";
import { fontFlame, fontFlameSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "BITE & ROLL — Cinematic Street Food Experience",
  description:
    "An interactive street-food journey. Savor signature smash burgers, slow-smoked loaded wraps, crispy fries, and handcrafted drinks. Bold street energy, zero compromises.",
  keywords: [
    "Bite & Roll",
    "street food",
    "smash burger",
    "chicken wrap",
    "artisan rolls",
    "gourmet takeaway",
  ],
  authors: [{ name: "Bite & Roll Culinary Crew" }],
  openGraph: {
    title: "BITE & ROLL — Cinematic Street Food Experience",
    description: "An interactive street-food journey through taste, crunch, and bold energy.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontFlame.variable} ${fontFlameSans.variable} scroll-smooth antialiased selection:bg-[#E4572E] selection:text-[#EDE6DB]`}
    >
      <body className="bg-[#EDE6DB] text-[#14110F] font-flame-sans overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
