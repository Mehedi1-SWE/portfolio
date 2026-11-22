import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    title: "Genius Car",
    category: "Insurance / Web Platform",
    description: "A modern insurance web experience built with reusable Next.js components, responsive layouts and service-focused user flows.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://genius-car.vercel.app",
    github: "https://github.com/Mehedi1-SWE/Genius-Car",
  },
  {
    title: "Alliance Sourcing BD",
    category: "Full-Stack / Business Platform",
    description: "A monorepo-based business platform with a customer-facing frontend, a dedicated admin dashboard and a backend API layer.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    github: "https://github.com/Mehedi1-SWE/Alliance-Sourcing-BD",
  },
  {
    title: "Uttara Adhunik Medical College",
    category: "Medical College Website",
    description: "A college website project organized into separate frontend and backend applications, with a dedicated frontend implementation.",
    stack: ["Frontend", "Backend", "Web Development"],
    github: "https://github.com/Mehedi1-SWE/Uttara-Adhunik-Medical-College",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <SectionHeading number="05" eyebrow="Professional projects" title={<>Selected <span className="font-normal italic text-[#2563EB]">work.</span></>} />

      <div className="mt-10 space-y-5 sm:mt-14">
        {projects.map((project) => (
          <article key={project.title} className="group grid overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_14px_44px_rgba(15,23,42,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(15,23,42,.12)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[240px] overflow-hidden bg-[radial-gradient(circle_at_72%_20%,rgba(37,99,235,.13),transparent_18rem),linear-gradient(135deg,#EFF6FF,#F8FAFC)] p-4 sm:min-h-[300px] sm:p-8 md:min-h-[360px] md:p-10">
              <div className="relative mx-auto mt-4 max-w-xl rounded-xl border border-[#E2E8F0] bg-white shadow-[0_20px_50px_rgba(15,23,42,.10)] transition duration-500 group-hover:scale-[1.015] sm:mt-6">
                <div className="flex h-9 items-center gap-1 border-b border-[#E2E8F0] px-3"><i className="block h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" /><i className="block h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" /><i className="block h-1.5 w-1.5 rounded-full bg-[#CBD5E1]" /></div>
                <div className="p-4 sm:p-8">
                  <span className="text-[8px] font-bold uppercase tracking-[.15em] text-[#64748B]">{project.category}</span>
                  <p className="mt-5 text-2xl font-black tracking-[-.05em] sm:text-3xl text-[#0F172A]">{project.title}</p>
                  <div className="mt-7 h-2 w-3/4 rounded-full bg-[#E2E8F0]" /><div className="mt-2 h-2 w-1/2 rounded-full bg-[#F1F5F9]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-8 md:p-12">
              <span className="text-sm font-bold uppercase tracking-[.16em] text-[#2563EB]">{project.category}</span>
              <h3 className="mt-4 text-3xl font-bold leading-[1.2] tracking-[-.025em] text-[#0F172A] sm:text-4xl">{project.title}</h3>
              <p className="mt-5 text-[16px] leading-7 text-[#475569]">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-sm font-bold tracking-[.025em] text-[#334155] transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white">{item}</span>)}</div>
              <div className="mt-9 flex flex-wrap gap-5">
                {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[.09em] text-[#2563EB] transition hover:translate-x-1 hover:text-[#1D4ED8]">Live Demo <ExternalLink size={14} /></a> }
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[.09em] text-[#475569] transition hover:translate-x-1 hover:text-[#1D4ED8]">GitHub <Github size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
