
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Mehedi Hasan | Software Engineer",
  description: "Academic, research and professional portfolio of Mehedi Hasan — Full-Stack Software Engineer.",
  keywords: ["Mehedi Hasan", "Software Engineer", "Next.js", "TypeScript", "React", "Full-Stack Developer"],
  openGraph: {
    title: "Mehedi Hasan | Full-Stack Software Engineer",
    description: "Explore Mehedi Hasan’s software engineering portfolio, projects, education and research interests.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mehedi Hasan | Full-Stack Software Engineer",
    description: "Software engineering portfolio featuring projects, education and research interests.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geist.variable}`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
