"use client";
import { useEffect, useState } from "react";
import { Download, FileText } from "lucide-react";
type CVItem = { type: string; label: string; secureUrl?: string };
const defaults = [{type:"professional",label:"Professional CV"},{type:"academic",label:"Academic CV"},{type:"complete",label:"Complete CV"}];
export function CVDownloadButtons() {
  const [cvs,setCvs]=useState<CVItem[]>([]);
  useEffect(()=>{ const api=process.env.NEXT_PUBLIC_API_URL; if(!api)return; fetch(api.replace(/\/$/,"")+"/api/cvs",{cache:"no-store"}).then(r=>{if(!r.ok)throw new Error();return r.json();}).then(d=>setCvs(d.cvs||[])).catch(()=>setCvs([])); },[]);
  return <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-5">{defaults.map((item,index)=>{const cv=cvs.find(x=>x.type===item.type);const href=cv?.secureUrl;return <a key={item.type} href={href||"#"} target={href?"_blank":undefined} rel={href?"noreferrer":undefined} aria-disabled={!href} onClick={e=>{if(!href)e.preventDefault();}} className={index===0?"group inline-flex h-[52px] w-full shrink-0 sm:w-[185px] items-center justify-between rounded-[12px] bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-3 text-white shadow-[0_10px_24px_rgba(37,99,235,.16)] transition hover:-translate-y-0.5":"group inline-flex h-[52px] w-full shrink-0 sm:w-[180px] items-center justify-between rounded-[12px] border border-[#CBD5E1] bg-white px-3 text-[#0F172A] shadow-[0_4px_12px_rgba(15,23,42,.06)] transition hover:-translate-y-0.5"}><span className="flex items-center gap-2"><FileText size={20} strokeWidth={2.2} className={index===0?"shrink-0":"shrink-0 text-[#2563EB]"}/><span className="whitespace-nowrap text-[14px] font-bold">{item.label}</span></span><Download size={18} strokeWidth={2.2} className={index===0?"shrink-0":"shrink-0 text-[#2563EB]"}/></a>;})}</div>;
}
