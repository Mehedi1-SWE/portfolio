"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Academic", "#academic"],
  ["Research", "#research"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 top-[42px] z-50 w-full px-3 pt-0 sm:px-4 lg:top-[40px] lg:px-8">
      <nav className="mx-auto flex h-[65px] max-w-[1280px] items-center justify-between border border-white/80 bg-[#FFFDFACC] px-4 shadow-[0_18px_55px_rgba(54,39,29,.075)] backdrop-blur-xl lg:px-6">

        {/* Logo */}
        <Link
          href="#home"
          className="flex min-h-11 items-center gap-3"
          aria-label="Go to homepage"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9B3D27] text-sm font-black text-white">
            MH
          </span>

          <span className="hidden text-sm font-bold uppercase tracking-[.13em] text-[#27231F] sm:block">
            Mehedi Hasan
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="relative min-h-11 py-3 text-sm font-semibold tracking-[.01em] text-[#514B44] transition hover:text-[#211F1C]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Menu and Contact — grouped on the right for mobile */}
        <div className="flex shrink-0 items-center gap-3">
          <button type="button" aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#E8DDD7] bg-[#FFFDFACC] text-[#514B44] transition hover:border-[#9B3D27] hover:text-[#9B3D27] lg:hidden">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Contact Button */}
          <Link
          href="#contact"
          className="inline-flex min-h-[46px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#9B3D27] px-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(155,61,39,.18)] transition hover:-translate-y-0.5 hover:bg-[#7F2F20] sm:px-5"
        >
          Contact
          <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>

      <div id="mobile-navigation" className={`absolute left-4 right-4 top-[73px] max-h-[calc(100dvh-130px)] overflow-y-auto rounded-xl border border-[#E8DDD7] bg-[#FFFDFACC] p-3 shadow-[0_18px_45px_rgba(15,23,42,.14)] lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setIsMenuOpen(false)} className="flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-[#514B44] transition hover:bg-[#F7ECE7] hover:text-[#9B3D27]">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}