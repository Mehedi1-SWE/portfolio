"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, BriefcaseBusiness, Code2, FolderKanban, LogOut, Mail, MessageSquareQuote, Plus, RefreshCw, ShieldCheck, Trash2, GraduationCap, UploadCloud } from "lucide-react";

type Message = { _id: string; name: string; email: string; subject: string; message: string; isRead?: boolean; createdAt: string };
type Section = "messages" | "projects" | "experience" | "skills" | "testimonials" | "academic";
const sections: { id: Section; label: string; icon: typeof Mail; endpoint: string }[] = [
  { id: "messages", label: "Messages", icon: Mail, endpoint: "/api/admin/messages" },
  { id: "projects", label: "Projects", icon: FolderKanban, endpoint: "/api/projects" },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness, endpoint: "/api/experience" },
  { id: "skills", label: "Skills", icon: Code2, endpoint: "/api/skills" },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, endpoint: "/api/testimonials" },
  { id: "academic", label: "Academic", icon: GraduationCap, endpoint: "/api/academic" },
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [academicForm, setAcademicForm] = useState({ category: "education", title: "", institution: "", issuer: "", result: "", date: "", expiryDate: "", description: "", credentialId: "", credentialUrl: "", documentUrl: "", isPublished: true, sortOrder: 0 });
  const [uploading, setUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

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
    setAuthenticated(false); setItems([]); setJson("");
  }

  async function saveAcademic(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      const response = await fetch(editingId ? `/api/academic/${editingId}` : "/api/academic", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(academicForm) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save academic record.");
      setEditingId(null); setAcademicForm({ category: "education", title: "", institution: "", issuer: "", result: "", date: "", expiryDate: "", description: "", credentialId: "", credentialUrl: "", documentUrl: "", isPublished: true, sortOrder: 0 });
      setNotice(editingId ? "Academic record updated." : "Academic record added."); load();
    } catch (err) { setError(err instanceof Error ? err.message : "Could not save academic record."); }
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

  async function saveItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setNotice("");
    try {
      const payload = JSON.parse(json);
      const endpoint = sections.find((item) => item.id === section)?.endpoint;
      const response = await fetch(editingId ? `${endpoint}/${editingId}` : endpoint || "", { method: editingId ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save item.");
      setJson(""); setEditingId(null); setNotice(editingId ? "Record updated successfully." : "New record added successfully."); load();
    } catch (err) { setError(err instanceof Error ? err.message : "Please enter valid JSON."); }
  }

  function editItem(item: any) {
    const { _id, __v, createdAt, updatedAt, ...editable } = item;
    setEditingId(_id);
    setJson(JSON.stringify(editable, null, 2));
    setError(""); setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteItem(id: string) {
    if (!window.confirm("Are you sure you want to permanently delete this record?")) return;
    setError(""); setNotice("");
    const endpoint = sections.find((item) => item.id === section)?.endpoint;
    const response = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Could not delete record."); return; }
    if (editingId === id) { setEditingId(null); setJson(""); }
    setNotice("Record deleted successfully."); load();
  }

  async function messageAction(id: string, action: "read" | "delete", isRead?: boolean) {
    const response = await fetch(`/api/admin/messages/${id}`, { method: action === "delete" ? "DELETE" : "PATCH", headers: { "Content-Type": "application/json" }, body: action === "read" ? JSON.stringify({ isRead: !isRead }) : undefined });
    if (!response.ok) { const data = await response.json(); setError(data.error || "Action failed."); return; }
    load();
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
    <main className="flex h-screen flex-col overflow-hidden bg-[#F5F7FB] font-sans text-[15px] leading-relaxed text-slate-800 antialiased">
      <header className="relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-5 shadow-sm shadow-slate-200/20 sm:px-8"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200"><Code2 size={25} strokeWidth={2.5} /></span><div><h1 className="text-lg font-extrabold leading-5 tracking-tight text-slate-900">Mehedi Hasan</h1><p className="mt-0.5 text-sm leading-4 text-slate-500">Admin Panel</p></div></div><div className="flex items-center gap-5"><a href={process.env.NEXT_PUBLIC_PORTFOLIO_URL || "http://localhost:3000/"} target="_blank" rel="noreferrer" className="hidden text-sm font-semibold text-slate-600 hover:text-blue-600 sm:block">View portfolio</a><button onClick={logout} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"><LogOut size={15} /> Logout</button></div></header>
      <div className="mx-auto grid min-h-0 w-full max-w-none flex-1 gap-6 overflow-hidden px-4 py-6 sm:px-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8">
        <aside className="hidden min-h-0 self-stretch overflow-y-auto rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm shadow-slate-200/50 lg:block"><p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p><nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">{sections.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { setSection(item.id); setNotice(""); setError(""); setJson(""); setEditingId(null); }} className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-[15px] font-semibold leading-6 transition duration-200 ${section === item.id ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}><Icon size={17} />{item.label}</button>; })}</nav><div className="mt-5 rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Activity size={14} /> Database</div><p className="mt-1 text-sm font-bold text-emerald-600">Connected on request</p></div></aside>
        <section className="min-h-0 min-w-0 overflow-y-auto overscroll-contain pb-8 pr-1"><div className="sticky top-0 z-10 -mx-1 mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200/70 bg-[#F5F7FB]/95 px-1 py-4 backdrop-blur-sm"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-600">Dashboard / {current.label}</p><h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">{current.label}</h2><p className="mt-1 text-[15px] leading-6 text-slate-600">{section === "messages" ? `${unread} unread messages` : `Manage your portfolio ${section} records.`}</p></div><div className="flex items-center gap-2"><button onClick={load} className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"><RefreshCw size={15} /> Refresh</button>{section === "academic" && <button type="button" onClick={() => document.getElementById("academic-record-form")?.scrollTo({ top: 0, behavior: "smooth" })} className="inline-flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700"><Plus size={16} /> Add Academic Record</button>}</div></div>
          {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{notice && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
          {section === "academic" ? <div className="grid min-h-0 items-start gap-5 xl:grid-cols-[minmax(400px,0.95fr)_minmax(0,1.85fr)]"><section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/30 xl:sticky xl:top-4"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div className="flex items-center gap-2.5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><GraduationCap size={19} /></span><h3 className="text-base font-bold text-slate-900">Academic Records</h3></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{items.length}</span></div><div className={`max-h-[calc(100vh-13rem)] min-h-[260px] space-y-3 overflow-y-auto p-4 ${items.length === 0 && !loading ? "flex flex-col items-center justify-center text-center" : ""}`}>{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading…</p> : items.length === 0 ? <div className="w-full max-w-[520px] rounded-2xl border border-slate-200/80 bg-white px-8 py-10 text-center shadow-sm shadow-slate-200/50"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><GraduationCap size={23} /></div><p className="mt-4 text-base font-semibold text-slate-800">No academic records yet</p><p className="mt-1 text-sm leading-6 text-slate-500">Add your first academic record to get started.</p></div> : items.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-200/30 transition hover:border-blue-200 hover:shadow-md"><div className="flex flex-wrap items-start justify-between gap-3"><div><span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">{String(item.category).replaceAll("-", " ")}</span><h3 className="mt-1 font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-500">{item.institution || item.issuer || ""} {item.date ? `· ${item.date}` : ""}</p></div><span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.isPublished === false ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>{item.isPublished === false ? "Hidden" : "Published"}</span></div>{item.documentUrl && <a href={item.documentUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">Preview attachment ↗</a>}<div className="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => editItem(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit</button><button type="button" onClick={() => deleteItem(item._id)} className="rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">Delete</button></div></article>)}</div></section><form id="academic-record-form" onSubmit={saveAcademic} className="grid max-h-[calc(100vh-8rem)] min-w-0 grid-cols-1 gap-x-5 gap-y-4 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm shadow-slate-200/40 sm:grid-cols-2 xl:sticky xl:top-4"><div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900 col-span-full"><GraduationCap size={19} className="text-blue-600" />{editingId ? "Edit academic record" : "Add academic record"}<span className="ml-auto text-xs font-medium text-slate-400">* Required</span></div><label className="block text-sm font-semibold text-slate-700 col-span-full xl:col-span-2">Category<select value={academicForm.category} onChange={(e) => setAcademicForm({...academicForm, category:e.target.value})} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"><option value="education">Academic Education</option><option value="academic-certification">Academic Certifications</option><option value="professional-certification">Professional Certifications</option><option value="achievement">Academic Achievements</option></select></label>{[["title","Title *"],["institution","Institution"],["issuer","Issuing organization"],["result","Result / Grade"],["date","Issue / Graduation date"],["expiryDate","Expiry date"],["credentialId","Credential ID"],["credentialUrl","Credential URL"]].map(([field,label]) => <label key={field} className={`block min-w-0 text-[15px] font-semibold leading-6 text-slate-700 ${field === "title" || field === "credentialUrl" ? "sm:col-span-2" : ""}`}>{label}<input required={field === "title"} type={field === "date" || field === "expiryDate" ? "date" : "text"} value={(academicForm as any)[field]} onChange={(e) => setAcademicForm({...academicForm,[field]:e.target.value})} className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-[15px] font-normal leading-6 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label>)}<label className="block text-sm font-semibold text-slate-700 col-span-full">Description<textarea rows={3} value={academicForm.description} onChange={(e) => setAcademicForm({...academicForm,description:e.target.value})} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white p-3.5 text-[15px] font-normal leading-7 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /></label><div className="space-y-2.5 md:col-span-2 xl:col-span-2"><div className="flex items-center justify-between gap-2"><p className="text-xs font-semibold text-slate-700">Certificate / Transcript</p><span className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Optional</span></div><label htmlFor="academic-file-upload" className="group relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 via-white to-slate-50 px-4 py-6 text-center shadow-sm transition duration-200 hover:border-blue-400 hover:shadow-md hover:shadow-blue-100/60"><span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-100/50 blur-2xl transition group-hover:bg-blue-200/60" /><span className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-md shadow-blue-100 ring-1 ring-blue-100 transition duration-200 group-hover:-translate-y-0.5"><UploadCloud size={22} /></span><span className="relative text-sm font-bold tracking-tight text-slate-800">Upload your certificate</span><span className="relative mt-1 text-xs leading-5 text-slate-500">Drag is not required — browse and select a file</span><span className="relative mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition group-hover:bg-blue-700"><UploadCloud size={14} /> Browse files</span><span className="relative mt-3 text-[10px] font-medium tracking-wide text-slate-400">PDF · PNG · JPG · WEBP <span className="mx-1">•</span> UP TO 10 MB</span><input id="academic-file-upload" type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" onChange={(e) => { const file = e.target.files?.[0]; setSelectedFileName(file?.name || ""); uploadAcademicFile(file); }} className="sr-only" /></label>{selectedFileName && <div className="flex min-w-0 items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm"><UploadCloud size={17} /></span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">{selectedFileName}</span><span className="mt-0.5 block text-[10px] text-slate-500">File selected for upload</span></span><span className="shrink-0 rounded-full bg-white px-2 py-1 text-[10px] font-bold text-blue-700 ring-1 ring-blue-100">Selected</span></div>}</div>{uploading && <p className="text-xs text-blue-600">Uploading file…</p>}{academicForm.documentUrl && <a href={academicForm.documentUrl} target="_blank" rel="noreferrer" className="block text-xs font-semibold text-blue-600">Preview uploaded file ↗</a>}<label className="flex items-center gap-2 text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-2"><input type="checkbox" checked={academicForm.isPublished} onChange={(e) => setAcademicForm({...academicForm,isPublished:e.target.checked})} /> Visible on public portfolio</label><button disabled={uploading} className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50 md:col-span-2 xl:col-span-2">{editingId ? "Save changes" : "Add academic record"}</button>{editingId && <button type="button" onClick={() => {setEditingId(null);setAcademicForm({category:"education",title:"",institution:"",issuer:"",result:"",date:"",expiryDate:"",description:"",credentialId:"",credentialUrl:"",documentUrl:"",isPublished:true,sortOrder:0});}} className="h-11 w-full rounded-xl border border-slate-200 text-sm font-semibold md:col-span-2 xl:col-span-2">Cancel</button>}</form></div> : section === "messages" ? <div className="space-y-3">{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading messages…</p> : items.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center"><Mail className="mx-auto text-slate-300" size={30} /><p className="mt-3 font-semibold">No messages yet</p><p className="mt-1 text-sm text-slate-500">Messages sent through your contact form will appear here.</p></div> : items.map((message: Message) => <article key={message._id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{message.subject}</h3>{!message.isRead && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">New</span>}</div><p className="mt-1 text-sm text-slate-500">{message.name} · <a className="text-blue-600 hover:underline" href={`mailto:${message.email}`}>{message.email}</a></p></div><time className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.message}</p><div className="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button onClick={() => messageAction(message._id, "read", message.isRead)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">{message.isRead ? "Mark unread" : "Mark read"}</button><button onClick={() => messageAction(message._id, "delete")} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}</div> : <div className="grid gap-5 xl:grid-cols-[1fr_360px]"><div className="space-y-3">{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading…</p> : items.length === 0 ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No records found.</p> : items.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{item.title || item.name || item.position || item.company}</h3><p className="mt-1 text-sm text-slate-500">{item.description || item.category || item.profession || item.startDate || item.company || ""}</p></div><span className="text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span></div><pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-500">{JSON.stringify(item, null, 2)}</pre><div className="mt-3 flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => editItem(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit</button><button type="button" onClick={() => deleteItem(item._id)} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}</div><form onSubmit={saveItem} className="h-fit rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 font-bold"><Plus size={17} className="text-blue-600" /> {editingId ? "Edit" : "Add"} {section === "academic" ? "Academic record" : section.slice(0, -1)}</div><p className="mt-2 text-xs leading-5 text-slate-500">Enter a JSON object matching your MongoDB model fields.</p><textarea value={json} onChange={(event) => setJson(event.target.value)} required rows={13} spellCheck={false} placeholder={section === "academic" ? "{\\n  \"category\": \"education\",\\n  \"title\": \"Degree or credential title\",\\n  \"institution\": \"Institution name\",\\n  \"result\": \"CGPA / grade (optional)\",\\n  \"date\": \"Graduation or issue date\",\\n  \"description\": \"Short details (optional)\",\\n  \"documentUrl\": \"https://... (optional)\"\\n}\\n\\nCategories: education, academic-certification, professional-certification, achievement" : section === "projects" ? '{\n  "title": "Project name",\n  "slug": "project-name",\n  "description": "Description",\n  "technologies": ["Next.js", "MongoDB"]\n}' : section === "experience" ? '{\n  "company": "Company",\n  "position": "Role",\n  "startDate": "2026",\n  "responsibilities": ["Built features"]\n}' : section === "skills" ? '{\n  "name": "Next.js",\n  "category": "Frontend",\n  "level": 90\n}' : '{\n  "name": "Person",\n  "profession": "Role",\n  "message": "Testimonial",\n  "rating": 5\n}'} className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs leading-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /><button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700"><Plus size={15} /> {editingId ? "Save changes" : "Add record"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setJson(""); }} className="mt-2 h-10 w-full rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel editing</button>}</form></div>}
        </section>
      </div>
    </main>
  );
}
