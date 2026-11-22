"use client";

import { useEffect, useState } from "react";
import { Award, BookOpenCheck, GraduationCap, Medal } from "lucide-react";

type AcademicRecord = {
  _id: string;
  category: "education" | "academic-certification" | "professional-certification" | "achievement";
  title: string;
  institution?: string;
  issuer?: string;
  result?: string;
  date?: string;
  description?: string;
  credentialUrl?: string;
  documentUrl?: string;
  expiryDate?: string;
};

const groups = [
  { id: "education", title: "Academic Education", description: "Degrees and formal academic qualifications.", icon: GraduationCap },
  { id: "academic-certification", title: "Academic Certifications", description: "Certificates earned through academic courses and institutions.", icon: BookOpenCheck },
  { id: "professional-certification", title: "Professional Certifications", description: "Industry-recognized credentials and professional training.", icon: Award },
  { id: "achievement", title: "Academic Achievements", description: "Academic awards, scholarships and recognitions.", icon: Medal },
] as const;

export function AcademicCredentials() {
  const [records, setRecords] = useState<AcademicRecord[]>([]);

  useEffect(() => {
    let active = true;
    async function loadRecords() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/academic`, { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (active) setRecords(Array.isArray(data.records) ? data.records : Array.isArray(data) ? data : []);
      } catch {
        // Keep the existing Academic section available if the API is temporarily unreachable.
      }
    }
    loadRecords();
    return () => { active = false; };
  }, []);

  const visibleGroups = groups.filter((group) => records.some((record) => record.category === group.id));
  if (visibleGroups.length === 0) return null;

  return (
    <div className="mt-14 sm:mt-20">
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.16em] text-[#64748B]"><Award size={15} className="text-[#2563EB]" /> Academic & Professional Credentials</span>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#475569]">Education, certifications and achievements managed directly from the portfolio dashboard.</p>
      </div>
      <div className="space-y-8">
        {visibleGroups.map((group) => {
          const Icon = group.icon;
          const entries = records.filter((record) => record.category === group.id);
          return (
            <section key={group.id}>
              <div className="mb-4 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB]"><Icon size={19} /></span><div><h3 className="text-xl font-bold tracking-[-.025em] text-[#0F172A]">{group.title}</h3><p className="text-sm text-[#64748B]">{group.description}</p></div></div>
              <div className="grid gap-4 md:grid-cols-2">
                {entries.map((record) => (
                  <article key={record._id} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] sm:p-6">
                    <h4 className="text-lg font-bold text-[#0F172A]">{record.title}</h4>
                    {(record.institution || record.issuer) && <p className="mt-1 text-sm font-semibold text-[#2563EB]">{record.institution || record.issuer}</p>}
                    {(record.result || record.date) && <p className="mt-3 text-sm text-[#64748B]">{[record.result, record.date].filter(Boolean).join(" · ")}</p>}
                    {record.description && <p className="mt-3 text-sm leading-6 text-[#475569]">{record.description}</p>}
                    {record.expiryDate && <p className="mt-2 text-xs text-[#64748B]">Valid until {record.expiryDate}</p>}
                    {(record.credentialUrl || record.documentUrl) && <a href={record.credentialUrl || record.documentUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-[#2563EB] hover:underline">View credential ↗</a>}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
