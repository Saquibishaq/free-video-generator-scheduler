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

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "freevideo",
  description: "The new standard for video automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${plusJakarta.variable} ${bricolage.variable} min-h-screen antialiased flex flex-col font-sans`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
