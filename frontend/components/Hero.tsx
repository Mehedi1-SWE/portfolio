import Image from "next/image";
import { CVDownloadButtons } from "@/components/CVDownloadButtons";
import Link from "next/link";
import {
  ArrowDown,
  Download,
  FileText,
  Github,
  GraduationCap,
  Sparkles,
} from "lucide-react";

function AcademicIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2.5 9.25L12 4L21.5 9.25L12 14.5L2.5 9.25Z"
        fill="currentColor"
      />
      <path
        d="M6 11.2V15.2C6 16.9 8.69 19 12 19C15.31 19 18 16.9 18 15.2V11.2L12 14.5L6 11.2Z"
        fill="currentColor"
      />
      <path
        d="M21.5 9.25V15.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="21.5" cy="16.8" r="1.2" fill="currentColor" />
    </svg>
  );
}

function EuropassLogo() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="relative flex h-[30px] w-[42px] items-center justify-center overflow-hidden bg-[#0B4EA2]">
        <span className="absolute text-[13px] leading-none text-[#FFD700]">
          ★ ★
        </span>
        <span className="absolute mt-[10px] text-[13px] leading-none text-[#FFD700]">
          ★ ★
        </span>
        <span className="absolute mt-[20px] text-[13px] leading-none text-[#FFD700]">
          ★ ★
        </span>
      </div>

      <span className="text-[21px] font-medium tracking-[-0.04em] text-[#7030A0]">
        europass
      </span>

      <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#0F172A]">
        CV
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-0 items-start px-4 pb-14 pt-[128px] sm:px-6 sm:pb-16 sm:pt-[136px] lg:min-h-[700px] lg:px-12 lg:pb-18"
      >
        <div
          className="grid-bg absolute inset-x-0 top-0 h-[760px] opacity-50"
          aria-hidden="true"
        />

        <div
          className="hero-orb absolute right-[8%] top-1/4 h-[380px] w-[380px] rounded-full bg-[#2563EB]/[.07] blur-[110px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-[1280px] items-start gap-8 lg:grid-cols-[1.08fr_.78fr] lg:items-start lg:gap-14">
          <div className="reveal-card max-w-[760px]">
            <div className="mb-6 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[.14em] text-[#64748B]">
              <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              Engineering · Research · Web
            </div>

            <p className="text-sm font-medium uppercase tracking-[.14em] text-[#64748B]">
              Hello, I&apos;m
            </p>

            <h1 className="mt-3 text-[clamp(36px,8vw,80px)] font-semibold leading-[1.08] tracking-[-.04em] text-[#0F172A] sm:text-[clamp(52px,6.5vw,80px)]">Mehedi Hasan</h1>

            <h2 className="mt-7 max-w-2xl text-[clamp(26px,2.7vw,40px)] font-semibold leading-[1.2] tracking-[-.03em] text-[#0F172A] sm:mt-9">
              Software Developer building modern web applications with Next.js, React and Node.js.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] sm:mt-7 md:text-[17px]">
              Computer Science graduate focused on building responsive web applications, reliable backend APIs and practical software solutions with modern web technologies.
            </p>

            <CVDownloadButtons />
            <div className="mt-7 flex flex-wrap gap-6 text-sm font-bold uppercase tracking-[.1em] text-[#64748B]">
              <Link
                href="#academic"
                className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#2563EB]"
              >
                Explore academic profile
                <ArrowDown size={14} />
              </Link>

              <a
                href="https://github.com/Mehedi1-SWE"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#2563EB]"
              >
                GitHub
                <Github size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT PROFILE CARD */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="relative overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-gradient-to-br from-white to-[#F8FAFC] p-5 shadow-[0_30px_85px_rgba(15,23,42,.11)] md:p-6">
              <div
                className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#2563EB]/[.07] blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex items-center border-b border-[#E2E8F0] pb-6">
                <p className="text-sm font-bold tracking-[.04em] text-[#0F172A]">
                  Mehedi Hasan
                </p>
              </div>

              <div className="relative py-6">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="relative h-[135px] w-[105px] shrink-0 overflow-hidden rounded-[10px] border border-white/90 bg-[#EFF6FF] shadow-[0_18px_34px_rgba(15,23,42,.18)]">
                    <Image
                      src="/mehedi-hasan.jpg"
                      alt="Mehedi Hasan"
                      fill
                      sizes="105px"
                      className="object-cover object-[50%_28%]"
                      priority
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#1D4ED8]">
                      Software Development
                    </p>

                    <h3 className="mt-2 text-[clamp(19px,6vw,23px)] font-bold leading-[1.2] tracking-[-.025em] text-[#0F172A] sm:text-[27px] md:text-[32px]">
                      Software Developer
                    </h3>

                    <p className="mt-3 text-sm font-medium text-[#64748B]">
                      MERN Stack Development
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#64748B]">
                  Computer Science graduate focused on building modern web applications, responsive interfaces and practical full-stack solutions.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "MongoDB",
                    "Express.js",
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white/80 px-2.5 py-1.5 text-xs font-bold text-[#475569] transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:text-[#1D4ED8]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-4">
                <div className="rounded-2xl border border-[#E2E8F0] bg-white/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[#64748B]">
                    Education
                  </span>

                  <p className="mt-2 text-sm font-bold text-[#0F172A]">
                    B.Sc. in CSE
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    CGPA 3.58 / 4.00
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E2E8F0] bg-white/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[#64748B]">
                    Focus
                  </span>

                  <p className="mt-2 text-sm font-bold text-[#0F172A]">
                    Full-Stack Development
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#64748B]">
                    Web · Backend APIs
                  </p>
                </div>
              </div>

              <div className="relative mt-2.5 flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm text-[#475569]">
                <Sparkles size={15} className="text-[#2563EB]" />

                <span>
                  Building practical web solutions with modern technologies.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY MARQUEE */}
      <div
        className="relative z-10 mt-8 mx-auto max-w-[1280px] overflow-hidden border-y border-[#E2E8F0] bg-white py-3.5"
        aria-label="Technology highlights"
      >
        <div className="marquee flex w-max whitespace-nowrap">
          <div className="flex shrink-0 items-center gap-10 pr-10">
            {[
              "NEXT.JS",
              "REACT",
              "TYPESCRIPT",
              "NODE.JS",
              "MONGODB",
              "SOFTWARE ENGINEERING",
              "AI / ML",
              "RESEARCH",
            ].map((item) => (
              <span
                key={item}
                className="shrink-0 text-[13px] font-semibold tracking-[.12em] text-[#64748B]"
              >
                {item}{" "}
                <span className="ml-10 text-[#2563EB]">✦</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-10 pr-10" aria-hidden="true">
            {[
              "NEXT.JS",
              "REACT",
              "TYPESCRIPT",
              "NODE.JS",
              "MONGODB",
              "SOFTWARE ENGINEERING",
              "AI / ML",
              "RESEARCH",
            ].map((item) => (
              <span
                key={item}
                className="shrink-0 text-[13px] font-semibold tracking-[.12em] text-[#64748B]"
              >
                {item}{" "}
                <span className="ml-10 text-[#2563EB]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}