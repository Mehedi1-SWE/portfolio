import { BookOpen, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const academicProjects = [
  { number: "01", course: "Artificial Intelligence / Machine Learning", title: "Dental Disease Prediction System", description: "An academic machine-learning project focused on disease prediction with a user-facing interface for interacting with the model.", stack: ["Python", "Machine Learning", "React"], outcome: "99% model accuracy" },
  { number: "02", course: "Web Engineering / Full-Stack Development", title: "E-Commerce Web Application", description: "A full-stack academic application with authentication, product workflows and payment integration.", stack: ["MongoDB", "Express", "React", "Node.js"], outcome: "Full-stack implementation" },
];

const coursework = [
  ["01", "Data Structures & Algorithms", "Algorithmic problem solving, data structures and computational thinking."],
  ["02", "Database Management", "Database design, queries, data modelling and application integration."],
  ["03", "Software Engineering", "Software lifecycle, engineering practices and collaborative development."],
  ["04", "Artificial Intelligence", "Machine learning concepts, modelling and applied prediction workflows."],
];

export function Academic() {
  return (
    <section id="academic" className="border-y border-[#E2E8F0] bg-[#F1F5F9] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading number="02" eyebrow="Academic profile" title={<>A foundation in <span className="font-normal italic text-[#2563EB]">Computer Science.</span></>} description="A clear academic section for university applications, research conversations and anyone who wants to understand the foundation behind the engineering work." />

        <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-2">
          {academicProjects.map((project) => (
            <article key={project.title} className="relative min-h-0 overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#FFFFFFCC] p-5 shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] sm:p-7 md:min-h-[420px] md:p-9">
              <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
                <span className="text-sm font-bold tracking-[.15em] text-[#2563EB]">{project.number}</span>
                <span className="min-w-0 max-w-[85%] text-right text-xs font-bold uppercase tracking-[.1em] text-[#64748B] sm:text-sm sm:tracking-[.12em]">{project.course}</span>
              </div>
              <h3 className="mt-8 max-w-xl text-3xl font-bold leading-[1.2] tracking-[-.025em] text-[#0F172A] sm:mt-12 md:text-4xl">{project.title}</h3>
              <p className="mt-5 max-w-xl text-[16px] leading-7 text-[#475569]">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => <span key={item} className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-sm font-bold tracking-[.025em] text-[#334155] transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white">{item}</span>)}
              </div>
              <div className="mt-8 flex flex-col items-start gap-2 border-t border-[#E2E8F0] pt-5 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <span className="text-sm font-bold uppercase tracking-[.15em] text-[#64748B]">Outcome</span>
                <span className="text-sm font-semibold text-[#2563EB]">{project.outcome}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[.16em] text-[#64748B]"><GraduationCap size={15} className="text-[#2563EB]" /> Coursework</div>
          <div className="mt-5 grid gap-4 sm:mt-7 md:grid-cols-2 lg:grid-cols-4">
            {coursework.map(([number, title, description]) => (
              <article key={number} className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] sm:p-6">
                <span className="text-sm font-bold tracking-[.14em] text-[#2563EB]">{number}</span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-.025em] text-[#0F172A] sm:mt-7">{title}</h3>
                <p className="mt-3 text-[16px] leading-6 text-[#475569]">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[.16em] text-[#64748B]"><BookOpen size={15} className="text-[#2563EB]" /> B.Sc. in Computer Science & Engineering · CGPA 3.58 / 4.00</div>
      </div>
    </section>
  );
}
