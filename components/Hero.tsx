import Image from "next/image";
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

      <span className="text-[21px] font-semibold tracking-[-0.04em] text-[#292521]">
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
        className="relative flex min-h-[700px] items-start px-6 pb-18 pt-[120px] lg:px-12 lg:pt-[120px]"
      >
        <div
          className="grid-bg absolute inset-x-0 top-0 h-[760px] opacity-50"
          aria-hidden="true"
        />

        <div
          className="hero-orb absolute right-[8%] top-1/4 h-[380px] w-[380px] rounded-full bg-[#9B3D27]/[.07] blur-[110px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto grid w-full max-w-[1280px] items-start gap-14 lg:grid-cols-[1.08fr_.78fr] lg:items-start">
          <div className="reveal-card max-w-[760px]">
            <div className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-[.12em] text-[#5A554E]">
              <span className="h-2 w-2 rounded-full bg-[#9B3D27]" />
              Engineering · Research · Web
            </div>

            <p className="text-sm font-medium uppercase tracking-[.14em] text-[#5A554E]">
              Hello, I&apos;m
            </p>

            <h1 className="mt-3 text-[clamp(56px,7.5vw,104px)] font-black leading-[1] tracking-[-.05em] text-[#171717]">
              Mehedi{" "}
              <span className="font-sans font-normal italic text-[#9B3D27]">
                Hasan.
              </span>
            </h1>

            <h2 className="mt-9 max-w-2xl text-[clamp(28px,3.1vw,46px)] font-semibold leading-[1.15] tracking-[-.03em] text-[#242424]">
              Building modern software with a{" "}
              <span className="text-[#5A554E]">
                strong engineering and academic foundation.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#4E4A44] md:text-[17px]">
              Software engineer with a Computer Science background, focused on
              full-stack web development, practical software solutions and
              research-oriented work.
            </p>

            {/* CV BUTTONS */}
            <div className="mt-9 flex items-center gap-5">
              {/* Professional CV */}
              <a href="/professional-cv.pdf" className="group inline-flex h-[52px] w-[185px] shrink-0 items-center justify-between rounded-[12px] bg-gradient-to-r from-[#A93E25] to-[#F04A20] px-3 text-white shadow-[0_10px_24px_rgba(169,62,37,.16)] transition hover:-translate-y-0.5">
                <span className="flex items-center gap-2">
                  <FileText size={18} strokeWidth={2.2} className="shrink-0" />
                  <span className="whitespace-nowrap text-[14px] font-bold">Professional CV</span>
                </span>
                <Download size={18} strokeWidth={2.2} className="shrink-0" />
              </a>

              {/* Academic CV */}
              <a href="/academic-cv.pdf" className="group inline-flex h-[52px] w-[180px] shrink-0 items-center justify-between rounded-[12px] border border-[#CEC6BB] bg-white px-3 text-[#292521] shadow-[0_4px_12px_rgba(60,45,35,.06)] transition hover:-translate-y-0.5">
                <span className="flex items-center gap-2">
                  {/* Filled Academic Mortarboard */}
                  <svg
                    width="36"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M12 3L2.5 8L12 13L21.5 8L12 3Z"
                      fill="#A94727"
                    />
                    <path
                      d="M5.5 10.2V14.7C5.5 14.7 8.1 18 12 18C15.9 18 18.5 14.7 18.5 14.7V10.2L12 13.6L5.5 10.2Z"
                      fill="#A94727"
                    />
                    <path
                      d="M20 9V14"
                      stroke="#A94727"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="whitespace-nowrap text-[14px] font-bold">Academic CV</span>
                </span>

                <Download size={18} strokeWidth={2.2} className="shrink-0 text-[#A94727]" />
              </a>

              {/* Europass CV */}
              <a href="/europass-cv.pdf" className="group inline-flex h-[52px] w-[180px] shrink-0 items-center justify-between rounded-[12px] border border-[#CEC6BB] bg-white px-3 text-[#292521] shadow-[0_4px_12px_rgba(60,45,35,.06)] transition hover:-translate-y-0.5">
                <span className="flex items-center gap-2">
                  {/* EU Flag */}
                  <span className="flex h-[28px] w-[38px] shrink-0 items-center justify-center rounded-[2px] bg-[#0757B8]">
                    <svg
                      width="25"
                      height="21"
                      viewBox="0 0 72 60"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#FFD700">
                        <path d="M36 1l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M48 4.2l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M56.8 13l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M60 25l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M56.8 37l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M48 45.8l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M36 49l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M24 45.8l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M15.2 37l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M12 25l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M15.2 13l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                        <path d="M24 4.2l1.2 3 3.2.25-2.45 2 .8 3.05-2.75-1.6-2.75 1.6.8-3.05-2.45-2 3.2-.25z" />
                      </g>
                    </svg>
                  </span>

                  <span className="whitespace-nowrap text-[14px] font-bold">
                    <span className="text-[#7030A0]">europass</span>
                    <span className="ml-1 text-[#292521]">CV</span>
                  </span>
                </span>

                <Download size={18} strokeWidth={2.2} className="shrink-0 text-[#1769D2]" />
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-6 text-sm font-bold uppercase tracking-[.1em] text-[#5A554E]">
              <Link
                href="#academic"
                className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#9B3D27]"
              >
                Explore academic profile
                <ArrowDown size={14} />
              </Link>

              <a
                href="https://github.com/Mehedi1-SWE"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 transition hover:text-[#9B3D27]"
              >
                GitHub
                <Github size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT PROFILE CARD */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="relative overflow-hidden rounded-[24px] border border-[#DED7CE] bg-gradient-to-br from-white to-[#F8F3ED] p-5 shadow-[0_30px_85px_rgba(54,39,29,.11)] md:p-6">
              <div
                className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#9B3D27]/[.07] blur-3xl"
                aria-hidden="true"
              />

              <div className="relative flex items-center border-b border-[#E5E0D8] pb-6">
                <p className="text-sm font-bold tracking-[.04em] text-[#292521]">
                  Mehedi Hasan
                </p>
              </div>

              <div className="relative py-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-[128px] w-[100px] shrink-0 overflow-hidden rounded-[10px] border border-white/90 bg-[#EEE5DE] shadow-[0_18px_34px_rgba(84,45,31,.18)]">
                    <Image
                      src="/mehedi-hasan.jpg"
                      alt="Mehedi Hasan"
                      fill
                      sizes="104px"
                      className="object-cover object-[50%_28%]"
                      priority
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#8A3A27]">
                      Academic &amp; Professional
                    </p>

                    <h3 className="mt-2 text-[27px] font-bold leading-[1.2] tracking-[-.025em] text-[#202020] md:text-[32px]">
                      Software Engineer
                    </h3>

                    <p className="mt-3 text-sm font-medium text-[#6A625A]">
                      Full-Stack Development
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#555049]">
                  Computer Science graduate building modern web applications
                  with a practical, research-aware approach to software
                  engineering.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "MongoDB",
                    "Express",
                    "React",
                    "Next.js",
                    "Node.js",
                    "AI / ML",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full border border-[#DDD4CA] bg-white/80 px-2.5 py-1.5 text-xs font-bold text-[#4C453E] transition hover:-translate-y-0.5 hover:border-[#C6AD9E] hover:text-[#8F3623]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative grid grid-cols-2 gap-3 border-t border-[#E5E0D8] pt-4">
                <div className="rounded-2xl border border-[#E7E0D7] bg-white/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[#716A62]">
                    Education
                  </span>

                  <p className="mt-2 text-sm font-bold text-[#292521]">
                    B.Sc. in CSE
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#686159]">
                    CGPA 3.58 / 4.00
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E7E0D7] bg-white/70 p-3.5">
                  <span className="text-xs font-bold uppercase tracking-[.12em] text-[#716A62]">
                    Focus
                  </span>

                  <p className="mt-2 text-sm font-bold text-[#292521]">
                    Engineering + Research
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#686159]">
                    Web · AI / ML
                  </p>
                </div>
              </div>

              <div className="relative mt-2.5 flex items-center gap-2 rounded-2xl border border-[#E7E0D7] bg-[#FBF8F4] px-4 py-3 text-sm text-[#554E47]">
                <Sparkles size={15} className="text-[#9B3D27]" />

                <span>
                  Academic credibility meets practical software engineering.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY MARQUEE */}
      <div
        className="relative z-10 mt-6 overflow-hidden border-y border-[#DDD7CD] bg-white py-3.5"
        aria-label="Technology highlights"
      >
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
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
              className="text-sm font-bold tracking-[.16em] text-[#5F5A53]"
            >
              {item}{" "}
              <span className="ml-10 text-[#9B3D27]">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}