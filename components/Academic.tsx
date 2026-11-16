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
    <section id="academic" className="border-y border-[#DED8CE] bg-[#F2EFE9] px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading number="02" eyebrow="Academic profile" title={<>A foundation in <span className="font-sans font-normal italic text-[#9B3D27]">Computer Science.</span></>} description="A clear academic section for university applications, research conversations and anyone who wants to understand the foundation behind the engineering work." />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {academicProjects.map((project) => (
            <article key={project.title} className="relative min-h-[420px] overflow-hidden rounded-2xl border border-[#DED7CE] bg-[#FFFDFACC] p-7 shadow-[0_14px_44px_rgba(54,39,29,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(54,39,29,.12)] md:p-9">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold tracking-[.15em] text-[#9B3D27]">{project.number}</span>
                <span className="text-right text-sm font-bold uppercase tracking-[.12em] text-[#5F5A53]">{project.course}</span>
              </div>
              <h3 className="mt-12 max-w-xl text-3xl font-bold leading-[1.2] tracking-[-.025em] text-[#202020] md:text-4xl">{project.title}</h3>
              <p className="mt-5 max-w-xl text-[16px] leading-7 text-[#5B564F]">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((item) => <span key={item} className="inline-flex items-center rounded-full border border-[#D4CCC1] bg-[#F8F6F2] px-3.5 py-2 text-sm font-bold tracking-[.025em] text-[#3F3933] transition hover:-translate-y-0.5 hover:border-[#BCA99A] hover:bg-white">{item}</span>)}
              </div>
              <div className="mt-10 flex items-end justify-between border-t border-[#E5E0D8] pt-5">
                <span className="text-sm font-bold uppercase tracking-[.15em] text-[#5F5A53]">Outcome</span>
                <span className="text-sm font-semibold text-[#9B3D27]">{project.outcome}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[.16em] text-[#5F5A53]"><GraduationCap size={15} className="text-[#9B3D27]" /> Coursework</div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {coursework.map(([number, title, description]) => (
              <article key={number} className="rounded-xl border border-[#DED7CE] bg-white p-6 shadow-[0_14px_44px_rgba(54,39,29,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(54,39,29,.12)]">
                <span className="text-sm font-bold tracking-[.14em] text-[#9B3D27]">{number}</span>
                <h3 className="mt-7 text-lg font-semibold tracking-[-.025em] text-[#202020]">{title}</h3>
                <p className="mt-3 text-[16px] leading-6 text-[#5B564F]">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3 text-sm font-bold uppercase tracking-[.16em] text-[#5F5A53]"><BookOpen size={15} className="text-[#9B3D27]" /> B.Sc. in Computer Science & Engineering · CGPA 3.58 / 4.00</div>
      </div>
    </section>
  );
}
