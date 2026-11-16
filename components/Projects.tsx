import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const projects = [
  {
    title: "Genius Car",
    category: "Insurance / Web Platform",
    description: "A modern insurance web experience built with reusable Next.js components, responsive layouts and service-focused user flows.",
    stack: ["Next.js", "React", "Tailwind CSS"],
    demo: "https://genius-car.vercel.app",
    github: "https://github.com/Mehedi1-SWE/Genius-Car.git",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1280px] px-6 py-28 lg:px-12">
      <SectionHeading number="05" eyebrow="Professional projects" title={<>Selected <span className="font-sans font-normal italic text-[#9B3D27]">work.</span></>} />

      <div className="mt-14 space-y-5">
        {projects.map((project) => (
          <article key={project.title} className="group grid overflow-hidden rounded-2xl border border-[#DED7CE] bg-white shadow-[0_14px_44px_rgba(54,39,29,.055)] transition hover:-translate-y-1.5 hover:shadow-[0_26px_72px_rgba(54,39,29,.12)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative min-h-[360px] overflow-hidden bg-[radial-gradient(circle_at_72%_20%,rgba(155,61,39,.13),transparent_18rem),linear-gradient(135deg,#F0E8DF,#FAF8F4)] p-8 md:p-10">
              <div className="relative mx-auto mt-6 max-w-xl rounded-xl border border-[#D9D2C8] bg-white shadow-[0_20px_50px_rgba(38,31,24,.10)] transition duration-500 group-hover:scale-[1.015]">
                <div className="flex h-9 items-center gap-1 border-b border-[#E5E0D8] px-3"><i className="block h-1.5 w-1.5 rounded-full bg-[#C5BEB4]" /><i className="block h-1.5 w-1.5 rounded-full bg-[#C5BEB4]" /><i className="block h-1.5 w-1.5 rounded-full bg-[#C5BEB4]" /></div>
                <div className="p-8">
                  <span className="text-[8px] font-bold uppercase tracking-[.15em] text-[#5F5A53]">Insurance platform</span>
                  <p className="mt-5 text-4xl font-black tracking-[-.07em] text-[#202020]">Genius <span className="text-[#9B3D27]">Car.</span></p>
                  <div className="mt-7 h-2 w-3/4 rounded-full bg-[#EEEAE3]" /><div className="mt-2 h-2 w-1/2 rounded-full bg-[#F2EFE9]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12">
              <span className="text-sm font-bold uppercase tracking-[.16em] text-[#9B3D27]">{project.category}</span>
              <h3 className="mt-4 text-4xl font-bold leading-[1.2] tracking-[-.025em] text-[#202020]">{project.title}</h3>
              <p className="mt-5 text-[16px] leading-7 text-[#5B564F]">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="inline-flex items-center rounded-full border border-[#D4CCC1] bg-[#F8F6F2] px-3.5 py-2 text-sm font-bold tracking-[.025em] text-[#3F3933] transition hover:-translate-y-0.5 hover:border-[#BCA99A] hover:bg-white">{item}</span>)}</div>
              <div className="mt-9 flex flex-wrap gap-5">
                <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[.09em] text-[#9B3D27] transition hover:translate-x-1 hover:text-[#7F2F20]">Live Demo <ExternalLink size={14} /></a>
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-[.09em] text-[#5B564F] transition hover:translate-x-1 hover:text-[#7F2F20]">GitHub <Github size={14} /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
