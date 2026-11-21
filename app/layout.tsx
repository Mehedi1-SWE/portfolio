
import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });
const geist = Geist({ subsets: ["latin"], display: "swap", variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Mehedi Hasan | Software Engineer",
  description: "Academic, research and professional portfolio of Mehedi Hasan — Full-Stack Software Engineer.",
  keywords: ["Mehedi Hasan", "Software Engineer", "Next.js", "TypeScript", "React", "Full-Stack Developer"],
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
