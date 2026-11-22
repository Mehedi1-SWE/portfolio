import type { Metadata } from "next";
import AdminDashboard from "./ui";
export const metadata: Metadata = { title: "Admin Dashboard | Mehedi Hasan", robots: { index: false, follow: false } };
export default function AdminPage() { return <AdminDashboard />; }
