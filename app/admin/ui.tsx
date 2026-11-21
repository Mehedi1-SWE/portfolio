"use client";

import { useCallback, useEffect, useState } from "react";
import { Activity, BriefcaseBusiness, Code2, FolderKanban, LogOut, Mail, MessageSquareQuote, Plus, RefreshCw, ShieldCheck, Trash2 } from "lucide-react";

type Message = { _id: string; name: string; email: string; subject: string; message: string; isRead?: boolean; createdAt: string };
type Section = "messages" | "projects" | "experience" | "skills" | "testimonials";
const sections: { id: Section; label: string; icon: typeof Mail; endpoint: string }[] = [
  { id: "messages", label: "Messages", icon: Mail, endpoint: "/api/admin/messages" },
  { id: "projects", label: "Projects", icon: FolderKanban, endpoint: "/api/projects" },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness, endpoint: "/api/experience" },
  { id: "skills", label: "Skills", icon: Code2, endpoint: "/api/skills" },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote, endpoint: "/api/testimonials" },
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
      <form onSubmit={login} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><ShieldCheck size={24} /></div>
        <p className="text-xs font-bold uppercase tracking-[.18em] text-blue-600">Private workspace</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Admin sign in</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Enter your admin key to manage your portfolio content and messages.</p>
        <label className="mt-7 block text-sm font-semibold">Admin API key</label>
        <input type="password" value={key} onChange={(event) => setKey(event.target.value)} required autoComplete="current-password" className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" placeholder="Enter your secret key" />
        {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
        <button className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700">Sign in securely</button>
        <a href="/" className="mt-5 block text-center text-sm font-medium text-slate-500 hover:text-blue-600">← Back to portfolio</a>
      </form>
    </main>
  );

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-600">Mehedi Hasan</p><h1 className="text-xl font-black tracking-tight">Portfolio Admin</h1></div><div className="flex items-center gap-3"><a href="/" className="hidden text-sm font-semibold text-slate-500 hover:text-blue-600 sm:block">View portfolio</a><button onClick={logout} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold hover:bg-slate-50"><LogOut size={15} /> Logout</button></div></div></header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[230px_1fr] lg:px-8">
        <aside className="rounded-2xl border border-slate-200 bg-white p-3"><p className="px-3 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-slate-400">Workspace</p><nav className="grid grid-cols-2 gap-1 lg:grid-cols-1">{sections.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => { setSection(item.id); setNotice(""); setError(""); setJson(""); setEditingId(null); }} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${section === item.id ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}><Icon size={17} />{item.label}</button>; })}</nav><div className="mt-5 rounded-xl bg-slate-50 p-3"><div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><Activity size={14} /> Database</div><p className="mt-1 text-sm font-bold text-emerald-600">Connected on request</p></div></aside>
        <section className="min-w-0"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-600">Dashboard / {current.label}</p><h2 className="mt-1 text-3xl font-black tracking-tight">{current.label}</h2><p className="mt-1 text-sm text-slate-500">{section === "messages" ? `${unread} unread messages` : `Manage your portfolio ${section}`}</p></div><button onClick={load} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold hover:bg-slate-50"><RefreshCw size={15} /> Refresh</button></div>
          {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}{notice && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{notice}</p>}
          {section === "messages" ? <div className="space-y-3">{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading messages…</p> : items.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center"><Mail className="mx-auto text-slate-300" size={30} /><p className="mt-3 font-semibold">No messages yet</p><p className="mt-1 text-sm text-slate-500">Messages sent through your contact form will appear here.</p></div> : items.map((message: Message) => <article key={message._id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{message.subject}</h3>{!message.isRead && <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">New</span>}</div><p className="mt-1 text-sm text-slate-500">{message.name} · <a className="text-blue-600 hover:underline" href={`mailto:${message.email}`}>{message.email}</a></p></div><time className="text-xs text-slate-400">{new Date(message.createdAt).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-700">{message.message}</p><div className="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button onClick={() => messageAction(message._id, "read", message.isRead)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">{message.isRead ? "Mark unread" : "Mark read"}</button><button onClick={() => messageAction(message._id, "delete")} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}</div> : <div className="grid gap-5 xl:grid-cols-[1fr_360px]"><div className="space-y-3">{loading ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">Loading…</p> : items.length === 0 ? <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">No records found.</p> : items.map((item) => <article key={item._id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{item.title || item.name || item.position || item.company}</h3><p className="mt-1 text-sm text-slate-500">{item.description || item.category || item.profession || item.startDate || item.company || ""}</p></div><span className="text-xs text-slate-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}</span></div><pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-500">{JSON.stringify(item, null, 2)}</pre><div className="mt-3 flex gap-2 border-t border-slate-100 pt-3"><button type="button" onClick={() => editItem(item)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50">Edit</button><button type="button" onClick={() => deleteItem(item._id)} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"><Trash2 size={13} /> Delete</button></div></article>)}</div><form onSubmit={saveItem} className="h-fit rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-center gap-2 font-bold"><Plus size={17} className="text-blue-600" /> {editingId ? "Edit" : "Add"} {section.slice(0, -1)}</div><p className="mt-2 text-xs leading-5 text-slate-500">Enter a JSON object matching your MongoDB model fields.</p><textarea value={json} onChange={(event) => setJson(event.target.value)} required rows={13} spellCheck={false} placeholder={section === "projects" ? '{\n  "title": "Project name",\n  "slug": "project-name",\n  "description": "Description",\n  "technologies": ["Next.js", "MongoDB"]\n}' : section === "experience" ? '{\n  "company": "Company",\n  "position": "Role",\n  "startDate": "2026",\n  "responsibilities": ["Built features"]\n}' : section === "skills" ? '{\n  "name": "Next.js",\n  "category": "Frontend",\n  "level": 90\n}' : '{\n  "name": "Person",\n  "profession": "Role",\n  "message": "Testimonial",\n  "rating": 5\n}'} className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs leading-6 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10" /><button className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700"><Plus size={15} /> {editingId ? "Save changes" : "Add record"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setJson(""); }} className="mt-2 h-10 w-full rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel editing</button>}</form></div>}
        </section>
      </div>
    </main>
  );
}
