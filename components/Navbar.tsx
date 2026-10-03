"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Experience", "#experience"],
    ["Contact", "#contact"],
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[#E8E8E8] bg-white/90 backdrop-blur-xl">
            <div className="portfolio-container flex h-[90px] items-center justify-between">
                <Link href="#home" className="text-[27px] font-bold tracking-[-0.045em] text-[#151515]">
                    MEHEDI<span className="text-[#FF3811]">.</span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex">
                    {links.map(([label, href]) => (
                        <Link key={label} href={href} className="text-[14px] font-bold text-[#444444] transition-colors duration-300 hover:text-[#FF3811]">
                            {label}
                        </Link>
                    ))}
                </nav>

                <Link href="#contact" className="hidden rounded-[6px] bg-[#151515] px-6 py-[13px] text-[14px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FF3811] lg:block">
                    Hire Me
                </Link>

                <button type="button" onClick={() => setOpen(!open)} className="rounded-[6px] border border-[#E8E8E8] px-3 py-2 text-xl text-[#151515] lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
                    {open ? "×" : "☰"}
                </button>
            </div>

            {open && (
                <nav className="border-t border-[#E8E8E8] bg-white px-6 py-5 lg:hidden">
                    <div className="portfolio-container flex flex-col gap-1">
                        {links.map(([label, href]) => (
                            <Link key={label} href={href} onClick={() => setOpen(false)} className="rounded-[6px] px-4 py-3 text-[15px] font-semibold text-[#444444] transition-colors hover:bg-[#F7F7F5] hover:text-[#FF3811]">
                                {label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
