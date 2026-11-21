import { Github, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-32">
      <div className="hero-orb absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/[.06] blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#64748B]">07 / Contact</span>
        <h2 className="mt-5 text-[clamp(40px,8.5vw,88px)] font-black leading-[1.05] tracking-[-.04em] text-[#0F172A]">Let&apos;s build the <span className="font-normal italic text-[#2563EB]">next thing.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-[#475569] sm:mt-7">Open to software engineering opportunities, academic collaboration and Master&apos;s-level research conversations.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
          <a href="mailto:hello@example.com" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,.18)] sm:w-auto transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]">Email me <Mail size={15} /></a>
          <a href="https://github.com/Mehedi1-SWE" target="_blank" rel="noreferrer" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white/90 px-5 text-sm font-bold text-[#0F172A] shadow-sm sm:w-auto transition hover:-translate-y-0.5 hover:border-[#CBD5E1]">GitHub <Github size={15} /></a>
        </div>
      </div>
    </section>
  );
}
