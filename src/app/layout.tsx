import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spirex Infoways — Transforming Ideas Into Digital Reality",
  description:
    "Spirex Infoways is a software development company crafting premium digital experiences, scalable software, and innovative technology solutions — web, mobile, ERP, CRM, HRMS, LMS, e-commerce, automation, and API integrations.",
  keywords: [
    "software development company",
    "web development",
    "mobile app development",
    "ERP software",
    "CRM solutions",
    "Spirex Infoways",
  ],
  openGraph: {
    title: "Spirex Infoways — Transforming Ideas Into Digital Reality",
    description:
      "Premium digital experiences, scalable software, and innovative technology solutions for businesses worldwide.",
    type: "website",
    siteName: "Spirex Infoways",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spirex Infoways",
    description: "Transforming Ideas Into Digital Reality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <body className={`${inter.variable} ${grotesk.variable} noise antialiased`}>
        <Loader />
        <SmoothScroll />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
