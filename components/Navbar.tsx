import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Academic", "#academic"],
  ["Research", "#research"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
] as const;

export function Navbar() {
  return (
    <header className="fixed left-0 top-[40px] z-50 w-full px-4 pt-0 lg:px-8">
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
        <div className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="relative min-h-11 py-3 text-sm font-bold tracking-[.035em] text-[#514B44] transition hover:text-[#211F1C]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact Button */}
        <Link
          href="#contact"
          className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#9B3D27] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(155,61,39,.18)] transition hover:-translate-y-0.5 hover:bg-[#7F2F20]"
        >
          Contact
          <ArrowUpRight size={14} />
        </Link>
      </nav>
    </header>
  );
}