import { Github, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 lg:px-12">
      <div className="hero-orb absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9B3D27]/[.06] blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#625B53]">07 / Contact</span>
        <h2 className="mt-5 text-[clamp(46px,7vw,88px)] font-black leading-[1.05] tracking-[-.04em] text-[#202020]">Let&apos;s build the <span className="font-sans font-normal italic text-[#9B3D27]">next thing.</span></h2>
        <p className="mx-auto mt-7 max-w-2xl text-[16px] leading-8 text-[#5B564F]">Open to software engineering opportunities, academic collaboration and Master&apos;s-level research conversations.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="mailto:hello@example.com" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#9B3D27] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(155,61,39,.18)] transition hover:-translate-y-0.5 hover:bg-[#7F2F20]">Email me <Mail size={15} /></a>
          <a href="https://github.com/Mehedi1-SWE" target="_blank" rel="noreferrer" className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-[#CEC6BB] bg-white/90 px-5 text-sm font-bold text-[#292521] shadow-sm transition hover:-translate-y-0.5 hover:border-[#A89484]">GitHub <Github size={15} /></a>
        </div>
      </div>
    </section>
  );
}
