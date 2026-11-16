
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

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
      <body className={inter.variable} suppressHydrationWarning>{children}</body>
    </html>
  );
}
