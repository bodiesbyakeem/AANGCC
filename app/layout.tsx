import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "All Ass No Gas Cycling Club | Austin, TX",
    template: "%s | AANGCC",
  },
  description:
    "All Ass No Gas Cycling Club — Austin's premier cycling community. We ride hard, give back, and support the National Multiple Sclerosis Society.",
  keywords: [
    "cycling club Austin",
    "AANGCC",
    "All Ass No Gas Cycling Club",
    "MS 150 Austin",
    "Austin cyclists",
    "bike club Austin TX",
  ],
  openGraph: {
    title: "All Ass No Gas Cycling Club",
    description: "Austin's premier cycling community. Ride hard. Give back.",
    url: "https://aangcc.com",
    siteName: "AANGCC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Ass No Gas Cycling Club",
    description: "Austin's premier cycling community. Ride hard. Give back.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-black text-white antialiased font-inter overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
