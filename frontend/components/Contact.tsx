"use client";

import { FormEvent, useState } from "react";
import { Github, Mail, Send } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    setIsSubmitting(true);
    setStatus(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
      if (!apiBaseUrl) throw new Error("Contact service is not configured yet. Please try again later.");
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send your message right now.");
      }

      form.reset();
      setStatus({ type: "success", message: "Your message has been sent successfully. Thank you for reaching out!" });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to send your message right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-24 lg:px-12 lg:py-32">
      <div className="hero-orb absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/[.06] blur-[110px]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#64748B]">07 / Contact</span>
        <h2 className="mt-5 text-[clamp(34px,8.5vw,88px)] font-black sm:text-[clamp(40px,8.5vw,88px)] leading-[1.05] tracking-[-.04em] text-[#0F172A]">Let&apos;s build the <span className="font-normal italic text-[#2563EB]">next thing.</span></h2>
        <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-8 text-[#475569] sm:mt-7">Open to software engineering opportunities, academic collaboration and Master&apos;s-level research conversations.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
          <a href="mailto:mehedi.se4@gmail.com" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,.18)] sm:w-auto transition hover:-translate-y-0.5 hover:bg-[#1D4ED8]">Email me <Mail size={15} /></a>
          <a href="https://github.com/Mehedi1-SWE" target="_blank" rel="noreferrer" className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white/90 px-5 text-sm font-bold text-[#0F172A] shadow-sm sm:w-auto transition hover:-translate-y-0.5 hover:border-[#CBD5E1]">GitHub <Github size={15} /></a>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 rounded-2xl border border-[#E2E8F0] bg-white/90 p-5 text-left shadow-[0_20px_60px_rgba(15,23,42,.06)] sm:mt-14 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#334155]">
              Your name
              <input name="name" type="text" required maxLength={100} autoComplete="name" placeholder="Enter your name" className="mt-2 min-h-12 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 text-sm font-normal text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10" />
            </label>
            <label className="block text-sm font-semibold text-[#334155]">
              Email address
              <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" className="mt-2 min-h-12 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 text-sm font-normal text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10" />
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-[#334155]">
            Subject
            <input name="subject" type="text" required maxLength={160} placeholder="What would you like to discuss?" className="mt-2 min-h-12 w-full rounded-xl border border-[#CBD5E1] bg-white px-4 text-sm font-normal text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10" />
          </label>
          <label className="mt-5 block text-sm font-semibold text-[#334155]">
            Message
            <textarea name="message" required maxLength={3000} rows={6} placeholder="Write your message here..." className="mt-2 w-full resize-y rounded-xl border border-[#CBD5E1] bg-white px-4 py-3 text-sm font-normal leading-6 text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:ring-4 focus:ring-[#2563EB]/10" />
          </label>
          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label>Leave this field empty<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
          </div>
          {status && (
            <p role="status" aria-live="polite" className={`mt-5 rounded-xl px-4 py-3 text-sm ${status.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
              {status.message}
            </p>
          )}
          <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(37,99,235,.18)] transition hover:-translate-y-0.5 hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
            {isSubmitting ? "Sending..." : "Send message"} <Send size={15} />
          </button>
        </form>
      </div>
    </section>
  );
}
