"use client";
import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";

type CVItem = { type: string; label: string; secureUrl?: string };

const defaults = [
  { type: "professional", label: "Professional CV" },
  { type: "academic", label: "Academic CV" },
  { type: "europass", label: "Europass CV" },
];

export function CVDownloadButtons() {
  const [cvs, setCvs] = useState<CVItem[]>([]);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_URL;
    if (!api) return;

    fetch(api.replace(/\/$/, "") + "/api/cvs", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load CVs.");
        return response.json();
      })
      .then((data) => setCvs(data.cvs || []))
      .catch(() => setCvs([]));
  }, []);

  return (
    <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-5">
      {defaults.map((item, index) => {
        const cv = cvs.find((entry) => entry.type === item.type);
        const href = cv?.secureUrl;

        return (
          <a
            key={item.type}
            href={href || "#"}
            target={href ? "_blank" : undefined}
            rel={href ? "noreferrer" : undefined}
            aria-disabled={!href}
            onClick={(event) => {
              if (!href) event.preventDefault();
            }}
            className={
              item.type === "europass"
                ? "group inline-flex h-[52px] w-full sm:w-[180px] shrink-0 items-center justify-between rounded-[12px] border border-[#CEC6BB] bg-white px-3 text-[#292521] shadow-[0_4px_12px_rgba(60,45,35,.06)] transition hover:-translate-y-0.5"
                : index === 0
                  ? "group inline-flex h-[52px] w-full shrink-0 sm:w-[185px] items-center justify-between rounded-[12px] bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-3 text-white shadow-[0_10px_24px_rgba(37,99,235,.16)] transition hover:-translate-y-0.5"
                  : "group inline-flex h-[52px] w-full shrink-0 sm:w-[180px] items-center justify-between rounded-[12px] border border-[#CBD5E1] bg-white px-3 text-[#0F172A] shadow-[0_4px_12px_rgba(15,23,42,.06)] transition hover:-translate-y-0.5"
            }
          >
            {item.type === "europass" ? (
              <>
                <span className="flex items-center gap-2">
                  <span className="flex h-[28px] w-[38px] shrink-0 items-center justify-center rounded-[2px] bg-[#0757B8]">
                    <svg width="25" height="21" viewBox="0 0 72 60" xmlns="http://www.w3.org/2000/svg">
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
              </>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <FileText
                    size={20}
                    strokeWidth={2.2}
                    className={index === 0 ? "shrink-0" : "shrink-0 text-[#2563EB]"}
                  />
                  <span className="whitespace-nowrap text-[14px] font-bold">{item.label}</span>
                </span>
                <Download
                  size={18}
                  strokeWidth={2.2}
                  className={index === 0 ? "shrink-0" : "shrink-0 text-[#2563EB]"}
                />
              </>
            )}
          </a>
        );
      })}
    </div>
  );
}
