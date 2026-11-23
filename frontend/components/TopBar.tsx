"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socialItems = [
  {
    label: "LinkedIn",
    href: "http://www.linkedin.com/in/mehedi-hasan96",
    color:
      "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[0_0_24px_rgba(10,102,194,.65)]",
    icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Mehedi1-SWE",
    color:
      "hover:bg-[#181717] hover:text-white hover:border-[#181717] hover:shadow-[0_0_24px_rgba(24,23,23,.70)]",
    icon: GitHubIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+8801758685869",
    color:
      "hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_0_24px_rgba(37,211,102,.65)]",
    icon: WhatsAppIcon,
  },
  {
    label: "WeChat",
    href: "#",
    color:
      "hover:bg-[#07C160] hover:text-white hover:border-[#07C160] hover:shadow-[0_0_24px_rgba(7,193,96,.65)]",
    icon: WeChatIcon,
  },
  {
    label: "Google Sites",
    href: "https://sites.google.com/view/swe-mehedi-hasan/home",
    color:
      "hover:bg-white hover:border-white hover:shadow-[0_0_24px_rgba(66,133,244,.60)]",
    icon: GoogleSitesIcon,
  },
  {
    label: "Gmail",
    href: "mailto:mehedi.se4@gmail.com",
    color:
      "hover:bg-white hover:border-white hover:shadow-[0_0_24px_rgba(234,67,53,.55)]",
    icon: GmailIcon,
  },
  {
    label: "Facebook",
    href: "#",
    color:
      "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-[0_0_24px_rgba(24,119,242,.65)]",
    icon: FacebookIcon,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@swemehedihasan?si=IwQPqQXmtsvW7Sz-",
    color:
      "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000] hover:shadow-[0_0_24px_rgba(255,0,0,.65)]",
    icon: YouTubeIcon,
  },
] as const;

const languages = [
  { code: "EN", label: "English" },
  { code: "PT", label: "Português" },
  { code: "FR", label: "Français" },
] as const;

export function TopBar() {
  const [showWeChat, setShowWeChat] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<(typeof languages)[number]>(languages[0]);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <div className="fixed left-1/2 top-0 z-[60] w-full max-w-[1280px] -translate-x-1/2 border-b border-white/15 bg-[#A63D24] text-white shadow-[0_8px_28px_rgba(80,31,19,.16)]">

      <div className="flex h-[42px] w-full items-center gap-3 overflow-x-auto px-3 lg:min-h-[42px] lg:justify-between lg:gap-3 lg:overflow-visible lg:px-6">

        <div className="flex min-w-0 shrink-0 items-center gap-2 px-0 lg:min-h-[42px] lg:gap-5 lg:px-0">

          {/* ================= LEFT CONTACT INFORMATION ================= */}

          <div className="flex shrink-0 items-center gap-1 text-[10px] font-semibold tracking-[.01em] lg:gap-5 lg:text-[13px]">

            {/* =====================================================
                            LOCATION
  ===================================================== */}
            <a
              href="https://maps.app.goo.gl/4xqh8tFgmjTRSE9i6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open exact location in Google Maps"
              className="group inline-flex min-w-0 items-center gap-2 whitespace-nowrap rounded-md outline-none transition-all duration-200 ease-out hover:text-white active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-white/40 ">
              {/* Icon */}
              <span className=" relative flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] transition-all duration-200 ease-out group-hover:bg-white/[.13] group-hover:shadow-[0_4px_14px_rgba(0,0,0,.14)] group-active:scale-[.94]">
                {/* Normal */}
                <MapPin size={16} strokeWidth={2.25} className=" absolute transition-all duration-200 ease-out group-hover:scale-0 group-hover:opacity-0" />

                {/* Hover */}
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="
          absolute
          scale-0
          opacity-0
          transition-all duration-200 ease-out
          group-hover:scale-100
          group-hover:opacity-100
        "
                >
                  <path
                    d="M24 3C13.5 3 5 11.5 5 22c0 14.2 19 23 19 23s19-8.8 19-23C43 11.5 34.5 3 24 3Z"
                    fill="#4285F4"
                  />

                  <path
                    d="M24 3C13.5 3 5 11.5 5 22c0 4.8 2.2 9 5.1 12.6L24 18V3Z"
                    fill="#EA4335"
                  />

                  <path
                    d="M10.1 34.6C15.2 41.1 24 45 24 45s8.8-3.9 13.9-10.4L24 18 10.1 34.6Z"
                    fill="#34A853"
                  />

                  <path
                    d="M5 22c0 3.2.9 6.1 2.5 8.7L24 18 43 22c0-10.5-8.5-19-19-19S5 11.5 5 22Z"
                    fill="#4285F4"
                    opacity=".9"
                  />

                  <circle
                    cx="24"
                    cy="21"
                    r="7"
                    fill="white"
                  />

                  <circle
                    cx="24"
                    cy="21"
                    r="4"
                    fill="#EA4335"
                  />
                </svg>
              </span>

              <span className="hidden lg:inline">Dhaka, Bangladesh</span>
            </a>


            <span className="hidden h-6 w-px bg-white/25 lg:block" />


            {/* =====================================================
      EMAIL
  ===================================================== */}
            <a
              href="mailto:mehedi.se4@gmail.com"
              aria-label="Email Mehedi Hasan"
              className="
      group inline-flex shrink-0 items-center gap-2
      whitespace-nowrap
      rounded-md
      outline-none
      transition-all duration-200 ease-out
      hover:text-white
      active:scale-[0.98]
      focus-visible:ring-2
      focus-visible:ring-white/40
      sm:inline-flex
    "
            >

              {/* Icon */}
              <span
                className="
        relative flex h-[34px] w-[34px] shrink-0
        items-center justify-center
        rounded-[9px]
        transition-all duration-200 ease-out
        group-hover:bg-white/[.13]
        group-hover:shadow-[0_4px_14px_rgba(0,0,0,.14)]
        group-active:scale-[.94]
      "
              >

                {/* Normal */}
                <Mail
                  size={16}
                  strokeWidth={2.25}
                  className="
          absolute
          transition-all duration-200 ease-out
          group-hover:scale-0
          group-hover:opacity-0
        "
                />

                {/* Hover — Mail App style */}
                <span
                  className="
          absolute flex h-[23px] w-[23px]
          items-center justify-center
          rounded-[3px]
          bg-gradient-to-br
          from-[#087ED1]
          via-[#0788D8]
          to-[#0067B8]
          shadow-[0_3px_8px_rgba(0,80,160,.28)]
          scale-0
          opacity-0
          transition-all duration-200 ease-out
          group-hover:scale-100
          group-hover:opacity-100
        "
                >
                  <svg
                    width="23"
                    height="20"
                    viewBox="0 0 48 40"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="42"
                      height="32"
                      rx="2"
                      fill="#159FE3"
                    />

                    <path
                      d="M4 8L24 23L44 8"
                      stroke="#D9F3FF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M4 35L19 22"
                      stroke="#087BC7"
                      strokeWidth="3"
                    />

                    <path
                      d="M44 35L29 22"
                      stroke="#087BC7"
                      strokeWidth="3"
                    />
                  </svg>
                </span>
              </span>

              <span className="hidden lg:inline">mehedi.se4@gmail.com</span>
            </a>


            <span className="hidden h-6 w-px bg-white/25 lg:block" />


            {/* =====================================================
      PHONE
  ===================================================== */}
            <a
              href="tel:+8801758585858"
              aria-label="Call Mehedi Hasan"
              className="
      group inline-flex shrink-0 items-center gap-2
      whitespace-nowrap
      rounded-md
      outline-none
      transition-all duration-200 ease-out
      hover:text-white
      active:scale-[0.98]
      focus-visible:ring-2
      focus-visible:ring-white/40
      md:inline-flex
    "
            >

              {/* Icon */}
              <span
                className="
        relative flex h-[30px] w-[30px] shrink-0
        items-center justify-center
        rounded-[9px]
        transition-all duration-200 ease-out
        group-hover:bg-white/[.13]
        group-hover:shadow-[0_4px_14px_rgba(0,0,0,.14)]
        group-active:scale-[.94]
      "
              >

                {/* Normal */}
                <Phone
                  size={16}
                  strokeWidth={2.25}
                  className="
          absolute
          transition-all duration-200 ease-out
          group-hover:scale-0
          group-hover:opacity-0
        "
                />

                {/* Hover — Phone App style */}
                <span
                  className="
          absolute flex h-[29px] w-[29px]
          items-center justify-center
          rounded-[7px]
          bg-gradient-to-br
          from-[#35D56F]
          via-[#20C963]
          to-[#0AAA4B]
          shadow-[0_3px_8px_rgba(0,130,65,.30)]
          scale-0
          opacity-0
          transition-all duration-200 ease-out
          group-hover:scale-100
          group-hover:opacity-100
        "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M7.2 3.8c.5-.5 1.3-.7 1.9-.3l2.5 1.7c.6.4.8 1.2.5 1.8l-1 2.1c-.2.5-.1 1 .3 1.4l2.1 2.1c.4.4.9.5 1.4.3l2.1-1c.6-.3 1.4-.1 1.8.5l1.7 2.5c.4.6.3 1.4-.3 1.9l-1.7 1.7c-.8.8-2 1.1-3.1.7-2.8-1-5.4-2.7-7.6-4.9-2.2-2.2-3.9-4.8-4.9-7.6-.4-1.1-.1-2.3.7-3.1l1.7-1.7Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </span>

              <span className="hidden lg:inline">+8801758585858</span>
            </a>

          </div>
        </div>

        {/* ================= SOCIAL ICONS ================= */}

        <div className="topbar-social-scroll flex shrink-0 items-center justify-start gap-1.5 pr-1 lg:w-auto lg:max-w-none lg:justify-end lg:gap-2 lg:overflow-visible lg:pr-0">

          {socialItems.map(({ label, href, color, icon: Icon }) =>
            label === "WeChat" ? (
              <button
                key={label}
                type="button"
                onClick={() => setShowWeChat(true)}
                aria-label={label}
                title={label}
                className={`
        group
        flex
        h-8
        w-8
        items-center
        lg:h-7
        lg:w-7
        justify-center
        rounded-full
        border
        border-white/20
        bg-white/[.12]
        text-white/95
        backdrop-blur-sm
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:scale-110
        ${color}
      `}
              >
                <Icon size={16} />
              </button>
            ) : (
              <a
                key={label}
                href={href}
                target={
                  href.startsWith("http") ? "_blank" : undefined
                }
                rel={
                  href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={label}
                title={label}
                className={`
        group
        flex
        h-8
        w-8
        shrink-0
        items-center
        lg:h-7
        lg:w-7
        justify-center
        rounded-full
        border
        border-white/20
        bg-white/[.12]
        text-white/95
        backdrop-blur-sm
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:scale-110
        ${color}
      `}
              >
                <Icon size={14} />
              </a>
            )
          )}

          {/* Divider */}

          <span className="mx-1 hidden h-7 w-px bg-white/25 lg:block" />

          {/* Language */}

          <div className="relative">
            <button
              type="button"
              aria-label={`Language: ${selectedLanguage.label}`}
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/15 bg-white/[.10] px-2 text-[11px] font-semibold text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/[.18] hover:shadow-[0_0_18px_rgba(255,255,255,.12)] lg:gap-2 lg:px-3 lg:text-xs"
            >
              <GlobeIcon size={16} />
              <span className="lg:hidden">{selectedLanguage.code}</span>
              <span className="hidden lg:inline">{selectedLanguage.label}</span>
              <ChevronDownIcon size={14} />
            </button>
            {isLanguageMenuOpen && (
              <div role="listbox" aria-label="Select language" className="absolute right-0 top-[calc(100%+8px)] z-[70] min-w-[150px] overflow-hidden rounded-lg border border-white/20 bg-[#96371F] p-1 shadow-[0_12px_30px_rgba(0,0,0,.22)]">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    role="option"
                    aria-selected={selectedLanguage.code === language.code}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setIsLanguageMenuOpen(false);
                    }}
                    className={`flex min-h-9 w-full items-center rounded-md px-3 text-left text-xs font-semibold transition hover:bg-white/15 ${selectedLanguage.code === language.code ? "bg-white/15 text-white" : "text-white/90"}`}
                  >
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================= WECHAT QR MODAL ========================= */}
      {showWeChat &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowWeChat(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Connect on WeChat"
          >
            <div
              className="relative w-full max-w-[380px] max-h-[calc(100vh-32px)] overflow-y-auto overflow-x-hidden rounded-[26px] border border-white/90 bg-white shadow-[0_30px_90px_rgba(0,0,0,.32)]"
              onClick={(event) => event.stopPropagation()}
            >
              {/* Green top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-[#07C160] via-[#19C463] to-[#079447]" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowWeChat(false)}
                aria-label="Close WeChat"
                title="Close"
                className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[20px] leading-none text-slate-500 shadow-md transition-all duration-300 hover:border-[#07C160] hover:bg-[#07C160] hover:text-white hover:shadow-[0_0_18px_rgba(7,193,96,.30)]"
              >
                ×
              </button>

              <div className="px-5 pb-5 pt-5">
                {/* Header */}
                <div className="pr-11">
                  <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#07C160]/15 bg-[#07C160]/10 px-3 py-1.5 text-xs font-bold text-[#079447]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#07C160] text-white">
                      <WeChatIcon size={12} />
                    </span>

                    WeChat
                  </div>

                  <h3 className="text-[22px] font-bold tracking-tight text-slate-900">
                    Connect with me
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    Scan the QR code to add me as a friend.
                  </p>
                </div>

                {/* QR CODE */}
                <div className="mt-4 flex justify-center rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_8px_25px_rgba(15,23,42,.10)]">
                    <img
                      src="/wechat.jpg"
                      alt="Mehedi Hasan WeChat QR Code"
                      className="block h-auto w-[190px] max-w-full rounded-xl"
                    />
                  </div>
                </div>

                {/* Scan instruction */}
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-[#07C160]/10 bg-[#07C160]/[.06] px-3 py-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#07C160] text-white shadow-sm">
                    <WeChatIcon size={17} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800">
                      Scan to connect
                    </p>

                    <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
                      Open WeChat and scan this QR code.
                    </p>
                  </div>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setShowWeChat(false)}
                  className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_10px_25px_rgba(15,23,42,.18)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

    </div>
  );
}

/* =========================================================
   LINKEDIN
========================================================= */

function LinkedInIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3.4A2.2 2.2 0 1 1 5.2 7.8a2.2 2.2 0 0 1 0-4.4ZM3.3 9h3.8v11.7H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.8 0 4.5 2.5 4.5 5.7v6.4H16.9v-5.7c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v5.8H9.4V9Z" />
    </svg>
  );
}

/* =========================================================
   GITHUB
========================================================= */

function GitHubIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .7a11.4 11.4 0 0 0-3.6 22.2c.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.7 1.2 3.4.9.1-.7.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.4 1.3a11.8 11.8 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.7 1 .7 2v3c0 .3.2.7.8.6A11.4 11.4 0 0 0 12 .7Z" />
    </svg>
  );
}


/* =========================================================
   WHATSAPP
========================================================= */

function WhatsAppIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.5 3.5A11.5 11.5 0 0 0 3 18.2L2 22l3.9-1a11.5 11.5 0 0 0 14.6-17.5Z"
        fill="currentColor"
      />

      <path
        d="M8.1 6.9c.3-.4.6-.4.9-.4.2 0 .4 0 .6.1.2.1.3.3.4.5l.9 2c.1.3.1.5-.1.8l-.6.8c-.2.2-.2.4 0 .7.5.8 1.2 1.5 2 2 .3.2.5.2.7 0l.8-.6c.2-.2.5-.2.8-.1l2 .9c.3.1.5.3.5.6.1.4.1.8-.1 1.1-.4.7-1.1 1.2-1.9 1.2-1.4 0-3.4-1-5-2.5-1.6-1.5-2.6-3.5-2.6-4.9 0-.8.5-1.5 1.2-1.9Z"
        fill="#0F172A"
      />
    </svg>
  );
}


/* =========================================================
   WECHAT
========================================================= */

function WeChatIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11.5 11.2C11.5 7.8 8.5 5 4.8 5S-2 7.8-2 11.2c0 2 1.1 3.8 2.9 4.9l-1 2.9 3.2-1.6c.6.2 1.2.3 1.7.3 3.7 0 6.7-2.8 6.7-6.5Z"
        transform="translate(2 -2)"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M21.3 14.3c0-2.9-2.7-5.2-6-5.2s-6 2.3-6 5.2 2.7 5.2 6 5.2c.7 0 1.4-.1 2-.3l2.5 1.2-.7-2.1c1.3-.9 2.2-2.3 2.2-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <circle cx="6.2" cy="9.5" r=".8" fill="currentColor" />
      <circle cx="9.5" cy="9.5" r=".8" fill="currentColor" />

      <circle cx="13.6" cy="14.2" r=".7" fill="currentColor" />
      <circle cx="17" cy="14.2" r=".7" fill="currentColor" />
    </svg>
  );
}


/* =========================================================
   GOOGLE SITES
========================================================= */
function GoogleSitesIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
    >
      <defs>
        <linearGradient
          id="googleSitesBlue"
          x1="9"
          y1="5"
          x2="39"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5B72E8" />
          <stop offset="0.5" stopColor="#5065C5" />
          <stop offset="1" stopColor="#4054AD" />
        </linearGradient>

        <linearGradient
          id="googleSitesFold"
          x1="28"
          y1="5"
          x2="41"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#35478F" />
          <stop offset="1" stopColor="#293A7A" />
        </linearGradient>
      </defs>

      {/* Normal: white logo */}
      <g className="group-hover:hidden">
        <path
          d="M9 6.5C9 5.67 9.67 5 10.5 5H27.5L40 17.5V41.5C40 42.33 39.33 43 38.5 43H9.5C8.67 43 8 42.33 8 41.5V8C8 7.17 8.33 6.5 9 6.5Z"
          fill="white"
        />

        <path
          d="M27.5 5V17.5H40L27.5 5Z"
          fill="rgba(255,255,255,0.72)"
        />

        <path
          d="M14 22H34"
          stroke="#4F61B8"
          strokeWidth="3.2"
          strokeLinecap="square"
        />

        <path
          d="M14 27H28V37H14V27Z"
          fill="#4F61B8"
        />

        <path
          d="M31 27H34V37H31V27Z"
          fill="#4F61B8"
        />
      </g>

      {/* Hover / click: natural blue logo */}
      <g className="hidden group-hover:block">
        <path
          d="M9 6.5C9 5.67 9.67 5 10.5 5H27.5L40 17.5V41.5C40 42.33 39.33 43 38.5 43H9.5C8.67 43 8 42.33 8 41.5V8C8 7.17 8.33 6.5 9 6.5Z"
          fill="url(#googleSitesBlue)"
        />

        <path
          d="M27.5 5V17.5H40L27.5 5Z"
          fill="url(#googleSitesFold)"
        />

        <path
          d="M14 22H34"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="square"
        />

        <path
          d="M14 27H28V37H14V27Z"
          fill="white"
        />

        <path
          d="M31 27H34V37H31V27Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
/* =========================================================
   GMAIL
========================================================= */
function GmailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 49.4 512 399.42"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
    >
      {/* =====================================================
          NORMAL — WHITE GMAIL LOGO
         Same Gmail geometry, only monochrome white
         ===================================================== */}
      <g
        className="
          opacity-100
          transition-opacity
          duration-300
          group-hover:opacity-0
        "
      >
        <path
          d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          fill="#fff"
        />

        <path
          d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          fill="#fff"
        />

        <path
          d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          fill="#fff"
        />

        <path
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
          fill="#fff"
        />

        <path
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
          fill="#fff"
        />
      </g>

      {/* =====================================================
          HOVER — ACTUAL GMAIL MULTI-COLOR GEOMETRY
         ===================================================== */}
      <g
        className="
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        {/* LEFT — GOOGLE BLUE */}
        <path
          d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z"
          fill="#4285F4"
        />

        {/* RIGHT — GOOGLE GREEN */}
        <path
          d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z"
          fill="#34A853"
        />

        {/* TOP-RIGHT — GOOGLE YELLOW */}
        <path
          d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z"
          fill="#FBBC04"
        />

        {/* CENTER — GMAIL RED */}
        <path
          d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z"
          fill="#EA4335"
        />

        {/* LEFT TOP — GMAIL DARK RED */}
        <path
          d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z"
          fill="#C5221F"
        />
      </g>
    </svg>
  );
}
/* =========================================================
   FACEBOOK
========================================================= */

function FacebookIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.4-.1c-2.4 0-4 1.5-4 4.1V10H8v3h2.4v8h3.1Z" />
    </svg>
  );
}


/* =========================================================
   YOUTUBE
========================================================= */

function YouTubeIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C1.9 9 1.9 12 1.9 12s0 3 .5 4.8a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.8.5-4.8s0-3-.5-4.8Z"
        fill="currentColor"
      />

      <path
        d="m10 15.5 5-3.5-5-3.5v7Z"
        fill="#0F172A"
      />
    </svg>
  );
}


/* =========================================================
   GLOBE
========================================================= */

function GlobeIcon({
  size = 16,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M3.5 12h17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      <path
        d="M12 3c2.2 2.5 3.3 5.5 3.3 9S14.2 18.5 12 21c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}


/* =========================================================
   CHEVRON
========================================================= */

function ChevronDownIcon({
  size = 14,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}