import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CursorTrail from "@/components/CursorTrail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Magischer Waldspaziergang 💚",
  description:
    "Eine magische Einladung zu einem besonderen Abenteuer unter dem Sonnenuntergang.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50 min-h-screen`}
      >
        {children}
        <CursorTrail />
      </body>
    </html>
  );
}
