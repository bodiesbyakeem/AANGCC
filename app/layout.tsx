import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://www.allassnogascyclingclub.com"),
  title: {
    default: "All Ass No Gas Cycling Club | Austin, Texas",
    template: "%s | AANGCC",
  },
  verification: {
    google: "nW7hThuNdtgrNF-H5LDfS7Om6MN53gzOw49xQa1Bq34",
  },
  description:
    "All Ass No Gas Cycling Club is Austin's premier cycling community. We ride with purpose, give back with every mile, and support the National Multiple Sclerosis Society through the BP MS 150 and more.",
  keywords: [
    "cycling club Austin",
    "Austin cycling community",
    "AANGCC",
    "All Ass No Gas Cycling Club",
    "BP MS 150",
    "MS Society cycling",
    "Austin bike club",
    "charity cycling Austin",
    "group rides Austin",
    "Ride to End ALZ",
  ],
  authors: [{ name: "All Ass No Gas Cycling Club" }],
  creator: "AANGCC",
  publisher: "AANGCC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.aangcc.com",
    siteName: "All Ass No Gas Cycling Club",
    title: "All Ass No Gas Cycling Club | Austin, Texas",
    description:
      "Austin's premier cycling community riding with purpose. Join us for group rides, charity events, and the fight against Multiple Sclerosis.",
    images: [
      {
        url: "/images/2025 MS 150 48.jpg",
        width: 1200,
        height: 630,
        alt: "All Ass No Gas Cycling Club — Austin, Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Ass No Gas Cycling Club | Austin, Texas",
    description:
      "Austin's premier cycling community riding with purpose. Join us for group rides, charity events, and the fight against Multiple Sclerosis.",
    images: ["/images/2025 MS 150 48.jpg"],
  },
  icons: {
    icon: "/images/AANGCC WEB LOGO.png",
    apple: "/images/AANGCC WEB LOGO.png",
  },
  alternates: {
    canonical: canonical: "https://www.allassnogascyclingclub.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-black text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
