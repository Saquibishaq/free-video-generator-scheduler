import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "freevideo",
  description: "The new standard for video automation.",
};

import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${plusJakarta.variable} ${bricolage.variable} min-h-screen bg-black text-white antialiased flex flex-col font-sans`}
        >
          <TooltipProvider>
            <Navbar />
            <main className="flex-1 flex flex-col pt-24 pb-8">
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
