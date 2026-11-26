import { BookOpen, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { AcademicCredentials } from "./AcademicCredentials";

type AcademicItem = {
  _id: string;
  category: "academic-project" | "coursework";
  title: string;
  course?: string;
  description?: string;
  technologies?: string[];
  outcome?: string;
  sortOrder?: number;
};

const fallbackProjects = [
  { _id: "project-1", category: "academic-project" as const, course: "Artificial Intelligence / Machine Learning", title: "Dental Disease Prediction System", description: "An academic machine-learning project exploring dental disease prediction through a model-supported, user-facing application.", technologies: ["Python", "Machine Learning", "React"], outcome: "99% model accuracy" },
  { _id: "project-2", category: "academic-project" as const, course: "Web Engineering / Full-Stack Development", title: "E-Commerce Web Application", description: "A full-stack academic application featuring user authentication, product management workflows and payment integration.", technologies: ["MongoDB", "Express", "React", "Node.js"], outcome: "Full-stack implementation" },
];

const fallbackCoursework = [
  { _id: "course-1", category: "coursework" as const, title: "Data Structures & Algorithms", description: "Algorithmic problem solving, data structures and computational thinking." },
  { _id: "course-2", category: "coursework" as const, title: "Database Management", description: "Database design, queries, data modelling and application integration." },
  { _id: "course-3", category: "coursework" as const, title: "Software Engineering", description: "Software lifecycle, engineering practices and collaborative development." },
  { _id: "course-4", category: "coursework" as const, title: "Artificial Intelligence", description: "Machine learning concepts, modelling and applied prediction workflows." },
];

async function getAcademicItems(): Promise<AcademicItem[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  try {
    const response = await fetch(`${apiBaseUrl}/api/academic`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load academic projects and coursework.");
    const records = await response.json();
    return Array.isArray(records) ? records.filter((item) => item.category === "academic-project" || item.category === "coursework") : [];
  } catch (error) {
    console.error("Academic projects API request failed:", error);
    return [];
  }
}

export async function Academic() {
  const records = await getAcademicItems();
  const academicProjects = records.filter((item) => item.category === "academic-project").length ? records.filter((item) => item.category === "academic-project") : fallbackProjects;
  const coursework = records.filter((item) => item.category === "coursework").length ? records.filter((item) => item.category === "coursework") : fallbackCoursework;

  return (
    <section id="academic" className="border-y border-[#E2E8F0] bg-[#F1F5F9] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading eyebrow="Academic profile" title={<>A strong <span>foundation.</span></>} description="A summary of my Computer Science education, selected academic projects and relevant coursework." />

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">
          {academicProjects.map((project, index) => (
            <article key={project._id} className="relative min-h-0 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFFCC] p-5 shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] sm:p-7 md:min-h-[420px] md:p-9">
              <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                <span className="text-sm font-bold tracking-[.15em] text-[#2563EB]">{String(index + 1).padStart(2, "0")}</span>
                <span className="min-w-0 max-w-[85%] text-right text-xs font-bold uppercase tracking-[.1em] text-[#64748B] sm:text-sm sm:tracking-[.12em]">{project.course || "Academic Project"}</span>
              </div>
              <h3 className="mt-8 max-w-xl text-3xl font-bold leading-[1.2] tracking-[-.025em] text-[#0F172A] sm:mt-12 md:text-4xl">{project.title}</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#475569]">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {(project.technologies || []).map((item) => <span key={item} className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-sm font-bold tracking-[.025em] text-[#334155] transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white">{item}</span>)}
              </div>
              <div className="mt-8 flex flex-col items-start gap-2 border-t border-[#E2E8F0] pt-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <span className="text-sm font-bold uppercase tracking-[.15em] text-[#64748B]">Outcome</span>
                <span className="text-sm font-semibold text-[#2563EB]">{project.outcome || "Academic project"}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="flex items-center gap-3 text-[15px] font-semibold uppercase tracking-[.10em] text-[#64748B]"><GraduationCap size={16} strokeWidth={1.8} className="text-[#2563EB]" /> Coursework</div>
          <div className="mt-5 grid gap-4 sm:mt-7 md:grid-cols-2 lg:grid-cols-4">
            {coursework.map((item, index) => (
              <article key={item._id} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] sm:p-6">
                <span className="text-sm font-bold tracking-[.14em] text-[#2563EB]">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-.025em] text-[#0F172A] sm:mt-7">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-6 text-[#475569]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        <AcademicCredentials />

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[.16em] text-[#64748B]"><BookOpen size={15} className="text-[#2563EB]" /> B.Sc. in Computer Science & Engineering · CGPA 3.58 / 4.00</div>
      </div>
    </section>
  );
}
