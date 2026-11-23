"use client";

import { useCallback, useEffect, useState } from "react";
import CVManagement from "./CVManagement";
import { Activity, BriefcaseBusiness, Bell, CheckCircle2, ChevronDown, Code2, FolderKanban, Mail, MessageSquareQuote, Plus, RefreshCw, ShieldCheck, Trash2, GraduationCap, UploadCloud, CalendarDays, X, FileText } from "lucide-react";

type Message = { _id: string; name: string; email: string; subject: string; message: string; isRead?: boolean; createdAt: string; replies?: { message: string; sentAt: string }[] };
type Section = "messages" | "projects" | "experience" | "skills" | "testimonials" | "academic" | "cv";
const sections: { id: Section; label: string; icon: typeof Mail; endpoint: string }[] = [
  { id: "messages", label: "Messages", icon: Mail, endpoint: "/api/admin/messages" },
  { id: "projects", label: "Projects", icon: FolderKanban, endpoint: "/api/projects" },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness, endpoint: "/api/experience" },
  { id: "skills", label: "Skills", icon: Code2, endpoint: "/api/skills" },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, endpoint: "/api/testimonials" },
  { id: "academic", label: "Academic", icon: GraduationCap, endpoint: "/api/academic" },
  { id: "cv", label: "CV Management", icon: FileText, endpoint: "/api/cv" },
];

export default function AdminDashboard() {
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [section, setSection] = useState<Section>("messages");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [json, setJson] = useState("");
  const [recordForm, setRecordForm] = useState<Record<string, string | boolean>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [academicForm, setAcademicForm] = useState({ category: "education", title: "", institution: "", course: "", technologies: "", outcome: "", issuer: "", result: "", date: "", expiryDate: "", description: "", credentialId: "", credentialUrl: "", documentUrl: "", isPublished: true, sortOrder: 0 });
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [sendingReplyId, setSendingReplyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const endpoint = sections.find((item) => item.id === section)?.endpoint || "/api/admin/messages";
      const response = await fetch(endpoint, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load data.");
      setItems(section === "messages" ? data.messages || [] : Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      if (section === "messages") setAuthenticated(false);
    } finally { setLoading(false); }
  }, [section]);

  useEffect(() => { if (authenticated) load(); }, [authenticated, load]);

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Login failed."); return; }
    setAuthenticated(true); setKey("");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false); setItems([]); setJson(""); setRecordForm(emptyRecordForm());
  }

  async function saveAcademic(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      const response = await fetch(editingId ? `/api/academic/${editingId}` : "/api/academic", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({...academicForm, technologies: academicForm.technologies.split(",").map((value) => value.trim()).filter(Boolean)}) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save academic record.");
      setEditingId(null); setAcademicForm({ category: "education", title: "", institution: "", course: "", technologies: "", outcome: "", issuer: "", result: "", date: "", expiryDate: "", description: "", credentialId: "", credentialUrl: "", documentUrl: "", isPublished: true, sortOrder: 0 });
      setNotice(editingId ? "Academic record updated." : "Academic record added."); load();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save academic record."); }
  }

  function editAcademic(item: any) {
    setEditingId(item._id);
    setAcademicForm({
      category: item.category || "education",
      title: item.title || "",
      institution: item.institution || "",
      course: item.course || "",
      technologies: Array.isArray(item.technologies) ? item.technologies.join(", ") : "",
      outcome: item.outcome || "",
      issuer: item.issuer || "",
      result: item.result || "",
      date: item.date ? String(item.date).slice(0, 10) : "",
      expiryDate: item.expiryDate ? String(item.expiryDate).slice(0, 10) : "",
      description: item.description || "",
      credentialId: item.credentialId || "",
      credentialUrl: item.credentialUrl || "",
      documentUrl: item.documentUrl || "",
      isPublished: item.isPublished !== false,
      sortOrder: Number(item.sortOrder || 0),
    });
    setSelectedFileName(item.documentUrl ? String(item.documentUrl).split("/").pop()?.split("?")[0] || "" : "");
    setError("");
    setNotice("");
    document.getElementById("academic-record-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function uploadAcademicFile(file?: File) {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError("File must be 10 MB or smaller."); return; }
    if (!["application/pdf", "image/png", "image/jpeg", "image/webp"].includes(file.type)) { setError("Only PDF, PNG, JPG and WEBP files are supported."); return; }
    setUploading(true); setError("");
    try {
      const form = new FormData(); form.append("file", file);
      const response = await fetch("/api/academic/upload", { method: "POST", body: form });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      setAcademicForm((current) => ({ ...current, documentUrl: data.url }));
      setNotice("File uploaded successfully.");
    } catch (err) { setError(err instanceof Error ? err.message : "Upload failed."); }
    finally { setUploading(false); }
  }

  function emptyRecordForm(target: Section = section) {
    if (target === "projects") return { title: "", slug: "", description: "", image: "", technologies: "", githubUrl: "", liveUrl: "", featured: false };
    if (target === "experience") return { company: "", position: "", startDate: "", endDate: "", location: "", responsibilities: "" };
    if (target === "skills") return { name: "", category: "", level: "80" };
    return { name: "", profession: "", profileImage: "", message: "", rating: "5" };
  }

  function updateRecordField(name: string, value: string | boolean) {
    setRecordForm((current) => ({ ...current, [name]: value }));
  }

  async function saveItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      const payload: Record<string, unknown> = { ...recordForm };
      if (section === "projects") payload.technologies = String(recordForm.technologies || "").split(",").map((value) => value.trim()).filter(Boolean);
      if (section === "experience") payload.responsibilities = String(recordForm.responsibilities || "").split("\n").map((value) => value.trim()).filter(Boolean);
      if (section === "skills") payload.level = Number(recordForm.level);
      if (section === "testimonials") payload.rating = Number(recordForm.rating);
      const endpoint = sections.find((item) => item.id === section)?.endpoint;
      const response = await fetch(editingId ? `${endpoint}/${editingId}` : endpoint || "", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save item.");
      setRecordForm(emptyRecordForm()); setEditingId(null); setNotice(editingId ? "Record updated successfully." : "New record added successfully."); await load();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save record."); }
  }

  function editItem(item: any) {
    const editable: Record<string, string | boolean> = { ...item };
    delete editable._id; delete editable.__v; delete editable.createdAt; delete editable.updatedAt;
    if (section === "projects") editable.technologies = Array.isArray(item.technologies) ? item.technologies.join(", ") : "";
    if (section === "experience") editable.responsibilities = Array.isArray(item.responsibilities) ? item.responsibilities.join("\n") : "";
    for (const [name, value] of Object.entries(emptyRecordForm())) if (editable[name] === undefined) editable[name] = value;
    setEditingId(item._id);
    setRecordForm(editable);
    setError(""); setNotice("");
    document.getElementById("record-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function deleteItem(id: string) {
    if (!window.confirm("Are you sure you want to permanently delete this record?")) return;
    setError(""); setNotice("");
    const endpoint = sections.find((item) => item.id === section)?.endpoint;
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not delete record."); return; }
    if (editingId === id) { setEditingId(null); setJson(""); setRecordForm(emptyRecordForm()); }
    setNotice("Record deleted successfully."); load();
  }

  async function messageAction(id: string, action: "read" | "delete", isRead?: boolean) {
    const response = await fetch(`/api/admin/messages/${id}`, { method: action === "delete" ? "DELETE" : "PATCH", headers: { "Content-Type": "application/json" }, body: action === "read" ? JSON.stringify({ isRead: !isRead }) : undefined });
    if (!response.ok) { const data = await response.json(); setError(data.error || "Action failed."); return; }
    load();
  }

  async function sendReply(messageId: string) {
    const reply = (replyDrafts[messageId] || "").trim();
    if (!reply || sendingReplyId) return;
    setSendingReplyId(messageId); setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reply }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not send reply.");
      setReplyDrafts((current) => ({ ...current, [messageId]: "" }));
      setNotice("Reply sent to " + (items.find((item) => item._id === messageId)?.email || "visitor") + ".");
      await load();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not send reply."); }
    finally { setSendingReplyId(null); }
  }

  const current = sections.find((item) => item.id === section)!;
  const unread = items.filter((item) => !item.isRead).length;

  if (!authenticated) return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12 text-[#0F172A]">
      <form onSubmit={login} className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-9 shadow-2xl shadow-slate-200/70">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><ShieldCheck size={24} /></div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Private workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Admin sign in</h1>
        <p className="mt-2 text-[15px] leading-7 text-slate-600">Enter your admin key to manage your portfolio content and messages.</p>
        <label className="mt-7 block text-sm font-semibold">Admin API key</label>
        <input type="password" value={key} onChange={(event) => setKey(event.target.value)} required autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Enter your secret key" />
        {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700">Sign in securely</button>
        <a href="/" className="mt-5 block text-center text-sm font-medium text-slate-500 hover:text-blue-600">← Back to portfolio</a>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#F5F7FB] font-sans text-[15px] leading-relaxed text-slate-800 antialiased">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white px-5 shadow-sm shadow-slate-200/20 sm:px-8"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200"><Code2 size={25} strokeWidth={2.5} /></span><div><h1 className="text-lg font-extrabold leading-5 tracking-tight text-slate-900">Mehedi Hasan</h1><p className="mt-0.5 text-sm leading-4 text-slate-500">Admin Panel</p></div></div><div className="flex items-center gap-5"><button type="button" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-50"><Bell size={21} /><span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" /></button><button onClick={logout} className="flex items-center gap-3 rounded-full pl-1 pr-1 text-left transition hover:bg-slate-50"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">MH</span><span className="hidden sm:block"><span className="block text-sm font-bold leading-5 text-slate-900">Mehedi Hasan</span><span className="block text-xs leading-4 text-slate-500">Admin</span></span><ChevronDown size={17} className="ml-1 text-slate-700" /></button></div></header>
      <nav aria-label="Admin sections" className="sticky top-16 z-20 flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        {sections.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" aria-current={section === item.id ? "page" : undefined} onClick={() => { setSection(item.id); setNotice(""); setError(""); setJson(""); setEditingId(null); setRecordForm(emptyRecordForm(item.id)); }} className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${section === item.id ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={16} />{item.label}</button>; })}
      </nav>
      <div className="mx-auto grid w-full max-w-none gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[265px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden self-start rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm shadow-slate-200/50 lg:sticky lg:top-20 lg:block"><p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p><nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">{sections.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { setSection(item.id); setNotice(""); setError(""); setJson(""); setEditingId(null); setRecordForm(emptyRecordForm(item.id)); }} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] font-semibold leading-6 transition duration-200 ${section === item.id ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}><Icon size={17} />{item.label}</button>; })}</nav><div className="mt-5 rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Activity size={14} /> Database</div><p className="mt-1 text-sm font-bold text-emerald-600">Connected on request</p></div></aside>
        <section className="min-w-0 pb-8 pr-1"><div className="sticky top-16 z-20 -mx-1 mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/70 bg-[#F5F7FB]/95 px-1 py-4 backdrop-blur-sm"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-600">Dashboard / {current.label}</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{current.label}</h2><p className="mt-1 text-[15px] leading-6 text-slate-600">{section === "messages" ? `${unread} unread messages` : `Manage your portfolio ${section} records.`}</p></div><div className="flex items-center gap-2"><button onClick={load} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><RefreshCw size={15} /> Refresh</button>{section === "academic" && <button type="button" onClick={() => document.getElementById("academic-record-form")?.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"><Plus size={16} /> Add Academic Record</button>}</div></div>
          {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{notice && <div role="status" className="mb-5 flex min-h-[61px] items-center gap-4 rounded-2xl border border-emerald-200 bg-[#E8FAF1] px-5 py-3.5 text-[15px] font-bold text-[#075B2B]"><CheckCircle2 size={27} className="shrink-0 fill-emerald-600 text-white" /> <span className="flex-1">{notice}</span><button type="button" aria-label="Dismiss notification" onClick={() => setNotice("")} className="rounded-md p-1 text-slate-900 transition hover:bg-emerald-100"><X size={19} /></button></div>}
          {section === "cv" ? <CVManagement /> : section === "academic" ? <div className="grid items-start gap-5 xl:grid-cols-[minmax(400px,0.52fr)_minmax(0,1fr)]"><section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 xl:sticky xl:top-4"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><GraduationCap size={19} /></span><h3 className="text-base font-bold text-slate-900">Academic Records</h3></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{items.length}</span></div><div className={`min-h-[260px] space-y-3 p-4 ${items.length === 0 && !loading ? "flex flex-col items-center justify-center text-center" : ""}`}>{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading…</p> : items.length === 0 ? <div className="w-full max-w-[520px] rounded-2xl border border-slate-200/80 bg-white px-8 py-10 text-center shadow-sm shadow-slate-200/50"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><GraduationCap size={23} /></div><p className="mt-4 text-base font-semibold text-slate-800">No academic records yet</p><p className="mt-1 text-sm leading-6 text-slate-500">Add your first academic record to get started.</p></div> : items.map((item) => <article key={item._id} className="relative rounded-2xl border border-[#78A8FF] bg-white p-4 pl-5 shadow-sm shadow-blue-100/50 transition hover:shadow-md before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[5px] before:rounded-l-2xl before:bg-blue-600"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{String(item.category).replaceAll("-", " ")}</span><h3 className="mt-1 font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.institution || item.issuer || ""}</p>{item.date && <p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><CalendarDays size={17} className="shrink-0" />{item.date}</p>}</div><span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.isPublished === false ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{item.isPublished === false ? "Hidden" : "Published"}</span></div>{item.documentUrl && <a href={item.documentUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">Preview attachment ↗</a>}<div className="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => editAcademic(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit</button><button type="button" onClick={() => deleteItem(item._id)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button></div></article>)}</div></section><form id="academic-record-form" onSubmit={saveAcademic} className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/40 sm:grid-cols-2">
<div className="col-span-full flex items-center gap-3 border-b border-slate-100 pb-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-blue-500 text-blue-600"><Plus size={21} /></span><h3 className="text-lg font-bold tracking-tight text-slate-900">{editingId ? "Edit Academic Record" : "Add Academic Record"}</h3><span className="ml-auto text-xs font-medium text-slate-400">* Required</span></div>
<label className="block min-w-0 text-[15px] font-semibold text-slate-800">Title <span className="text-red-500">*</span><input required value={academicForm.title} onChange={(e) => setAcademicForm({...academicForm,title:e.target.value})} placeholder="e.g. Academic Certification" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[15px] font-normal outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-[15px] font-semibold text-slate-800">Status <span className="text-red-500">*</span><select value={academicForm.isPublished ? "published" : "hidden"} onChange={(e) => setAcademicForm({...academicForm,isPublished:e.target.value === "published"})} className="mt-1.5 h-11 w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 text-[15px] font-semibold text-emerald-800 outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10"><option value="published">Published</option><option value="hidden">Hidden</option></select></label>
<label className="col-span-full block min-w-0 text-[15px] font-semibold text-slate-800">Institution / Organization <span className="text-red-500">*</span><input required value={academicForm.institution} onChange={(e) => setAcademicForm({...academicForm,institution:e.target.value})} placeholder="e.g. Daffodil International University" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[15px] font-normal outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-[15px] font-semibold text-slate-800">Date <span className="text-red-500">*</span><input required type="date" value={academicForm.date} onChange={(e) => setAcademicForm({...academicForm,date:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[15px] font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<div className="min-w-0"><div className="mb-1.5 text-[15px] font-semibold text-slate-800">Attachment <span className="font-normal text-slate-500">(Optional)</span></div><label htmlFor="academic-file-upload" className="flex h-11 min-w-0 cursor-pointer items-center gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-700 transition hover:border-blue-300"><UploadCloud size={18} className="shrink-0 text-slate-700" /><span className="shrink-0 font-semibold">Choose File</span><span className="truncate text-slate-500">{selectedFileName || "No file chosen"}</span><input id="academic-file-upload" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" onChange={(e) => { const file = e.target.files?.[0]; setSelectedFileName(file?.name || ""); uploadAcademicFile(file); }} className="sr-only" /></label><p className="mt-1 text-[11px] text-slate-400">PDF, PNG, JPG, WEBP · Up to 10 MB</p></div>
<label className="col-span-full block min-w-0 text-[15px] font-semibold text-slate-800">Description <span className="font-normal text-slate-500">(Optional)</span><textarea rows={3} value={academicForm.description} onChange={(e) => setAcademicForm({...academicForm,description:e.target.value})} placeholder="Add a short description..." className="mt-1.5 w-full resize-y rounded-xl border border-slate-200 bg-white p-3.5 text-[15px] font-normal leading-6 outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<div className="col-span-full grid grid-cols-1 gap-4 sm:grid-cols-2">
<label className="block min-w-0 text-sm font-semibold text-slate-700">Category<select value={academicForm.category} onChange={(e) => setAcademicForm({...academicForm,category:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"><option value="education">Academic Education</option><option value="academic-certification">Academic Certifications</option><option value="professional-certification">Professional Certifications</option><option value="achievement">Academic Achievements</option><option value="academic-project">Academic Projects</option><option value="coursework">Coursework</option></select></label>
<label className="block min-w-0 text-sm font-semibold text-slate-700">Course / Subject<input value={academicForm.course} onChange={(e) => setAcademicForm({...academicForm,course:e.target.value})} placeholder="e.g. Web Engineering" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label><label className="block min-w-0 text-sm font-semibold text-slate-700">Technologies <span className="font-normal text-slate-400">(comma separated)</span><input value={academicForm.technologies} onChange={(e) => setAcademicForm({...academicForm,technologies:e.target.value})} placeholder="React, Node.js, MongoDB" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label><label className="block min-w-0 text-sm font-semibold text-slate-700">Outcome<input value={academicForm.outcome} onChange={(e) => setAcademicForm({...academicForm,outcome:e.target.value})} placeholder="Project outcome" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label><label className="block min-w-0 text-sm font-semibold text-slate-700">Issuing Organization<input value={academicForm.issuer} onChange={(e) => setAcademicForm({...academicForm,issuer:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-sm font-semibold text-slate-700">Result / Grade<input value={academicForm.result} onChange={(e) => setAcademicForm({...academicForm,result:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-sm font-semibold text-slate-700">Expiry Date<input type="date" value={academicForm.expiryDate} onChange={(e) => setAcademicForm({...academicForm,expiryDate:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-sm font-semibold text-slate-700">Credential ID<input value={academicForm.credentialId} onChange={(e) => setAcademicForm({...academicForm,credentialId:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
<label className="block min-w-0 text-sm font-semibold text-slate-700">Credential URL<input value={academicForm.credentialUrl} onChange={(e) => setAcademicForm({...academicForm,credentialUrl:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>
</div>
<div className="col-span-full flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-4"><div className="flex items-center gap-3"><button type="button" onClick={() => {setEditingId(null);setSelectedFileName("");setAcademicForm({category:"education",title:"",institution:"",course:"",technologies:"",outcome:"",issuer:"",result:"",date:"",expiryDate:"",description:"",credentialId:"",credentialUrl:"",documentUrl:"",isPublished:true,sortOrder:0});}} className="h-11 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button disabled={uploading} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-7 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"><span>✓</span> {editingId ? "Save Changes" : "Save Record"}</button></div></div>
{uploading && <p className="col-span-full text-xs text-blue-600">Uploading file…</p>}{academicForm.documentUrl && <a href={academicForm.documentUrl} target="_blank" rel="noreferrer" className="col-span-full text-xs font-semibold text-blue-600">Preview uploaded file ↗</a>}
</form></div> : section === "messages" ? <div className="space-y-3">{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading messages…</p> : items.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center"><Mail className="mx-auto text-slate-300" size={30} /><p className="mt-3 font-semibold">No messages yet</p><p className="mt-1 text-sm text-slate-500">Messages sent through your contact form will appear here.</p></div> : items.map((message: Message) => <article key={message._id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{message.subject}</h3>{!message.isRead && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">New</span>}</div><p className="mt-1 text-sm text-slate-500">{message.name} · <a className="text-blue-600 hover:underline" href={`mailto:${message.email}`}>{message.email}</a></p></div><time className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.message}</p>{message.replies?.length ? <div className="mt-4 space-y-2 border-l-2 border-emerald-200 pl-3">{message.replies.map((reply, index) => <div key={index} className="rounded-xl bg-emerald-50 p-3"><p className="text-xs font-bold text-emerald-700">Your reply · {new Date(reply.sentAt).toLocaleString()}</p><p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{reply.message}</p></div>)}</div> : null}<div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3"><label className="block text-xs font-bold text-slate-700" htmlFor={`reply-${message._id}`}>Reply to {message.name}</label><textarea id={`reply-${message._id}`} rows={3} maxLength={5000} value={replyDrafts[message._id] || ""} onChange={(event) => setReplyDrafts((current) => ({ ...current, [message._id]: event.target.value }))} placeholder="Write your reply..." className="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 text-sm font-normal outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /><button type="button" disabled={!String(replyDrafts[message._id] || "").trim() || sendingReplyId === message._id} onClick={() => sendReply(message._id)} className="mt-2 inline-flex h-9 items-center justify-center rounded-lg bg-blue-600 px-4 text-xs font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">{sendingReplyId === message._id ? "Sending..." : "Send email reply"}</button></div><div className="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button onClick={() => messageAction(message._id, "read", message.isRead)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">{message.isRead ? "Mark unread" : "Mark read"}</button><button onClick={() => messageAction(message._id, "delete")} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}</div> : <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-3">
              {loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading…</p> : items.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center"><FolderKanban className="mx-auto text-slate-300" size={30} /><p className="mt-3 font-semibold">No {section} records yet</p><p className="mt-1 text-sm text-slate-500">Add your first record using the form.</p></div> : items.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="font-bold text-slate-900">{item.title || item.name || item.position || item.company}</h3><p className="mt-1 text-sm text-slate-500">{item.company || item.profession || item.category || item.startDate || item.description || ""}</p>{section === "projects" && <p className="mt-2 text-xs text-slate-500">{Array.isArray(item.technologies) ? item.technologies.join(" · ") : ""}</p>}{section === "skills" && <p className="mt-2 text-xs text-slate-500">Level: {item.level ?? 0}%</p>}{section === "testimonials" && <p className="mt-2 text-xs text-amber-600">Rating: {"★".repeat(Math.max(0, Math.min(5, Number(item.rating || 0))))}</p>}{section === "experience" && <p className="mt-2 text-xs text-slate-500">{item.startDate} – {item.endDate || "Present"}{item.location ? ` · ${item.location}` : ""}</p>}</div><span className="shrink-0 text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span></div><div className="mt-3 flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => editItem(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit</button><button type="button" onClick={() => deleteItem(item._id)} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}
            </div>
            <form id="record-form" onSubmit={saveItem} className="h-fit scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 font-bold"><Plus size={17} className="text-blue-600" /> {editingId ? "Edit" : "Add"} {section === "testimonials" ? "Testimonial" : section === "experience" ? "Experience" : section.slice(0, -1)}</div>
              <p className="mt-1 text-xs text-slate-500">Complete the fields below and save your record.</p>
              {section === "projects" && <div className="mt-4 space-y-3">
                <label className="block text-sm font-semibold">Project title *<input required value={String(recordForm.title || "")} onChange={(e) => updateRecordField("title", e.target.value)} placeholder="Project name" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Slug *<input required value={String(recordForm.slug || "")} onChange={(e) => updateRecordField("slug", e.target.value)} placeholder="project-name" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Description *<textarea required rows={3} value={String(recordForm.description || "")} onChange={(e) => updateRecordField("description", e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Image URL<input value={String(recordForm.image || "")} onChange={(e) => updateRecordField("image", e.target.value)} placeholder="https://..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Technologies <span className="font-normal text-slate-400">(comma separated)</span><input value={String(recordForm.technologies || "")} onChange={(e) => updateRecordField("technologies", e.target.value)} placeholder="Next.js, TypeScript, MongoDB" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">GitHub URL<input value={String(recordForm.githubUrl || "")} onChange={(e) => updateRecordField("githubUrl", e.target.value)} placeholder="https://github.com/..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Live URL<input value={String(recordForm.liveUrl || "")} onChange={(e) => updateRecordField("liveUrl", e.target.value)} placeholder="https://..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={Boolean(recordForm.featured)} onChange={(e) => updateRecordField("featured", e.target.checked)} className="h-4 w-4" /> Featured project</label>
              </div>}
              {section === "experience" && <div className="mt-4 space-y-3">
                <label className="block text-sm font-semibold">Company *<input required value={String(recordForm.company || "")} onChange={(e) => updateRecordField("company", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Position *<input required value={String(recordForm.position || "")} onChange={(e) => updateRecordField("position", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Start date *<input required value={String(recordForm.startDate || "")} onChange={(e) => updateRecordField("startDate", e.target.value)} placeholder="June 2026" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">End date<input value={String(recordForm.endDate || "")} onChange={(e) => updateRecordField("endDate", e.target.value)} placeholder="Present" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Location<input value={String(recordForm.location || "")} onChange={(e) => updateRecordField("location", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Responsibilities <span className="font-normal text-slate-400">(one per line)</span><textarea rows={4} value={String(recordForm.responsibilities || "")} onChange={(e) => updateRecordField("responsibilities", e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-blue-500" /></label>
              </div>}
              {section === "skills" && <div className="mt-4 space-y-3">
                <label className="block text-sm font-semibold">Skill name *<input required value={String(recordForm.name || "")} onChange={(e) => updateRecordField("name", e.target.value)} placeholder="Next.js" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Category *<input required value={String(recordForm.category || "")} onChange={(e) => updateRecordField("category", e.target.value)} placeholder="Frontend" className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Proficiency: {String(recordForm.level || "0")}%<input type="range" min="0" max="100" value={String(recordForm.level || "0")} onChange={(e) => updateRecordField("level", e.target.value)} className="mt-2 w-full" /></label>
              </div>}
              {section === "testimonials" && <div className="mt-4 space-y-3">
                <label className="block text-sm font-semibold">Name *<input required value={String(recordForm.name || "")} onChange={(e) => updateRecordField("name", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Profession *<input required value={String(recordForm.profession || "")} onChange={(e) => updateRecordField("profession", e.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Profile image URL<input value={String(recordForm.profileImage || "")} onChange={(e) => updateRecordField("profileImage", e.target.value)} placeholder="https://..." className="mt-1.5 h-10 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Message *<textarea required rows={4} value={String(recordForm.message || "")} onChange={(e) => updateRecordField("message", e.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 font-normal outline-none focus:border-blue-500" /></label>
                <label className="block text-sm font-semibold">Rating: {String(recordForm.rating || "5")} / 5<input type="range" min="1" max="5" value={String(recordForm.rating || "5")} onChange={(e) => updateRecordField("rating", e.target.value)} className="mt-2 w-full" /></label>
              </div>}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4"><button className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700"><Plus size={15} /> {editingId ? "Save changes" : "Add record"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setRecordForm(emptyRecordForm()); }} className="h-10 w-full rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel editing</button>}</div>
            </form>
          </div>}
        </section>
      </div>
    </main>
  );
}
