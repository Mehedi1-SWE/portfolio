"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, ExternalLink, FileText, Link2, RefreshCw, Save, Trash2, UploadCloud } from "lucide-react";

type CVItem = { _id?: string; slug: "professional" | "academic" | "europass"; title: string; sourceType: "upload" | "url"; url: string; publicId?: string; downloadName: string; isActive: boolean; sortOrder: number };
const categories: CVItem["slug"][] = ["professional", "academic", "europass"];
const labels: Record<CVItem["slug"], string> = { professional: "Professional CV", academic: "Academic CV", europass: "Europass CV" };
const empty = (slug: CVItem["slug"], index: number): CVItem => ({ slug, title: labels[slug], sourceType: "url", url: "", publicId: "", downloadName: `Mehedi-Hasan-${slug}-CV.pdf`, isActive: true, sortOrder: index + 1 });

export default function CVManagement() {
  const [items, setItems] = useState<CVItem[]>(categories.map(empty));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/cv", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load CV settings.");
      setItems(categories.map((slug, index) => data.find((item: CVItem) => item.slug === slug) || empty(slug, index)));
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load CV settings."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  function update(slug: CVItem["slug"], patch: Partial<CVItem>) {
    setItems((current) => current.map((item) => item.slug === slug ? { ...item, ...patch } : item));
  }

  async function upload(slug: CVItem["slug"], file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf" || file.size <= 0 || file.size > 10 * 1024 * 1024) {
      setError("Please select a valid PDF file up to 10 MB."); return;
    }
    setUploading(slug); setError(""); setNotice("");
    try {
      const form = new FormData(); form.append("file", file); form.append("folder", "cv");
      const response = await fetch("/api/academic/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "CV upload failed.");
      update(slug, { sourceType: "upload", url: data.url, publicId: data.publicId || "", downloadName: file.name });
      setNotice(`${labels[slug]} uploaded. Save changes to publish it.`);
    } catch (err) { setError(err instanceof Error ? err.message : "CV upload failed."); }
    finally { setUploading(null); }
  }

  async function save(item: CVItem) {
    setSaving(item.slug); setError(""); setNotice("");
    try {
      const response = await fetch("/api/cv", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save CV.");
      setItems((current) => current.map((entry) => entry.slug === item.slug ? data : entry));
      setNotice(`${item.title} settings saved successfully.`);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save CV."); }
    finally { setSaving(null); }
  }

  function remove(slug: CVItem["slug"]) {
    update(slug, { url: "", publicId: "", isActive: false, sourceType: "url" });
    setNotice(`${labels[slug]} cleared. Save changes to confirm.`);
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5">
        <div><h3 className="text-lg font-bold text-slate-900">CV Library</h3><p className="mt-1 text-sm text-slate-500">Manage the three CV downloads shown on your public portfolio.</p></div>
        <button type="button" onClick={load} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"><RefreshCw size={15}/> Refresh</button>
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{notice}</p>}
      {loading ? <p className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading CV settings…</p> : <div className="grid gap-5 xl:grid-cols-3">
        {items.map((item) => <article key={item.slug} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><FileText size={20}/></span><div><h4 className="font-bold text-slate-900">{labels[item.slug]}</h4><p className="text-xs text-slate-500">CV category: {item.slug}</p></div></div>
          <label className="block text-sm font-semibold text-slate-700">Display title<input value={item.title} maxLength={80} onChange={(e) => update(item.slug, { title: e.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500"/></label>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="mb-2 text-sm font-bold text-slate-800">Upload PDF to Cloudinary</p>
            <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:border-blue-300"><UploadCloud size={16}/>{uploading === item.slug ? "Uploading…" : "Choose PDF"}<input type="file" accept="application/pdf,.pdf" disabled={uploading === item.slug} onChange={(e) => { upload(item.slug, e.target.files?.[0]); e.currentTarget.value = ""; }} className="sr-only"/></label>
            <p className="mt-1.5 text-[11px] text-slate-500">PDF only · Maximum 10 MB</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500"><Link2 size={14}/> Or use an external PDF link</div>
          <label className="block text-sm font-semibold text-slate-700">Source type<select value={item.sourceType} onChange={(e) => update(item.slug, { sourceType: e.target.value as CVItem["sourceType"] })} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none focus:border-blue-500"><option value="upload">Cloudinary upload</option><option value="url">External URL (Drive / Dropbox / OneDrive / direct link)</option></select></label>
          <label className="block text-sm font-semibold text-slate-700">PDF URL<input value={item.url} onChange={(e) => update(item.slug, { url: e.target.value, sourceType: "url", publicId: "" })} placeholder="https://… or /professional-cv.pdf" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500"/></label>
          <label className="block text-sm font-semibold text-slate-700">Download filename<input value={item.downloadName} maxLength={120} onChange={(e) => update(item.slug, { downloadName: e.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500"/></label>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={item.isActive} onChange={(e) => update(item.slug, { isActive: e.target.checked })} className="h-4 w-4"/> Show on public portfolio</label>
          {item.url && <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3"><a href={item.url} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-blue-700 hover:bg-blue-50"><ExternalLink size={13}/> Preview</a><a href={item.url} download={item.downloadName} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Download size={13}/> Download</a><button type="button" onClick={() => remove(item.slug)} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-100 px-3 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13}/> Remove</button></div>}
          <button type="button" disabled={saving === item.slug || uploading === item.slug || !item.title.trim()} onClick={() => save(item)} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"><Save size={15}/>{saving === item.slug ? "Saving…" : "Save changes"}</button>
        </article>)}
      </div>}
    </section>
  );
}
