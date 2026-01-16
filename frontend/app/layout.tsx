import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paloma Marketing Agent | AI-Powered Ads Analytics",
  description: "Unified Marketing Intelligence Agent connecting Meta Ads & Google Ads into a powerful chat interface. Get insights, analyze performance, and optimize your ad spend with AI.",
  keywords: ["marketing", "ads", "analytics", "meta ads", "google ads", "ai", "dashboard"],
  authors: [{ name: "Paloma Marketing Agent" }],
  openGraph: {
    title: "Paloma Marketing Agent | AI-Powered Ads Analytics",
    description: "Your AI-powered assistant for Meta & Google Ads analytics",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
