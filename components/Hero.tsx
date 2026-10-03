import Link from "next/link";

export default function Hero() {
    return (
        <section id="home" className="relative overflow-hidden bg-[#111111]">
            <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#FF3811]/10 blur-[100px]" />
            <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-[#FF3811]/5 blur-[90px]" />

            <div className="portfolio-container relative flex min-h-[calc(100vh-90px)] items-center py-24 lg:py-28">
                <div className="grid w-full items-center gap-16 lg:grid-cols-[1.15fr_.85fr]">
                    <div className="reveal-up">
                        <div className="mb-7 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#FF3811]" />
                            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#FF3811]">Software Engineer</p>
                        </div>

                        <h1 className="max-w-[760px] text-[clamp(52px,7vw,94px)] font-bold leading-[0.91] tracking-[-0.055em] text-white">
                            Mehedi
                            <br />
                            <span className="text-[#FF3811]">Hasan.</span>
                        </h1>

                        <p className="mt-8 max-w-[670px] text-[clamp(20px,2.2vw,28px)] font-medium leading-[1.35] text-white/90">
                            MERN Stack Developer building <span className="text-white/45">scalable digital products</span> with Next.js, TypeScript and MongoDB.
                        </p>

                        <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-white/50">
                            CSE graduate and full-stack developer focused on clean architecture, responsive interfaces and reliable backend systems.
                        </p>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link href="#projects" className="rounded-[6px] bg-[#FF3811] px-7 py-4 text-[15px] font-bold text-white shadow-[0_12px_30px_rgba(255,56,17,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#e8320e]">Explore My Work</Link>
                            <Link href="#contact" className="rounded-[6px] border border-white/15 bg-white/[0.03] px-7 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.07]">Let&apos;s Talk</Link>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
                            <div><p className="text-[22px] font-bold text-white">CSE</p><p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">Graduate</p></div>
                            <div><p className="text-[22px] font-bold text-white">MERN</p><p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">Developer</p></div>
                            <div><p className="text-[22px] font-bold text-white">Next.js</p><p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">TypeScript</p></div>
                        </div>
                    </div>

                    <div className="float-slow relative mx-auto w-full max-w-[480px]">
                        <div className="absolute -inset-5 rounded-[40px] border border-[#FF3811]/20" />
                        <div className="absolute -inset-10 rounded-[60px] border border-white/5" />
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/10 bg-[#1b1b1b] shadow-[0_35px_80px_rgba(0,0,0,0.4)]">
                            <img src="/profile.png" alt="Mehedi Hasan - Software Engineer" className="h-full w-full object-cover" />
                            <div className="absolute inset-x-5 bottom-5 rounded-[14px] border border-white/10 bg-[#111111]/80 p-5 backdrop-blur-xl">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3811]">Based in</p>
                                <p className="mt-1 text-lg font-semibold text-white">Dhaka, Bangladesh</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
