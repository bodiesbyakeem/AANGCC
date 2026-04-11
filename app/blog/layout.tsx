import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cycling Blog | Austin Cycling Tips, Group Rides & Charity Rides | AANGCC",
  description: "The AANGCC blog covers beginner cycling tips, group rides in Austin, charity cycling events, training guides, and community stories from Austin's most purpose-driven cycling club.",
  alternates: {
    canonical: "https://www.allassnogascyclingclub.com/blog",
  },
  openGraph: {
    title: "AANGCC Blog — Austin Cycling Community",
    description: "Training tips, community stories, and cycling wisdom for riders at every level in Austin, Texas.",
    url: "https://www.allassnogascyclingclub.com/blog",
    siteName: "All Ass No Gas Cycling Club",
    type: "website",
    images: [
      {
        url: "https://www.allassnogascyclingclub.com/images/2025 MS 150 48.jpg",
        width: 1200,
        height: 630,
        alt: "AANGCC Cycling Blog — Austin Texas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AANGCC Blog — Austin Cycling Tips & Community Stories",
    description: "Beginner tips, group rides, charity cycling, and training guides from Austin's most purpose-driven cycling club.",
    images: ["https://www.allassnogascyclingclub.com/images/2025 MS 150 48.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
