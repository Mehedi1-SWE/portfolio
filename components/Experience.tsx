import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const timeline = [
  { date: "2026 — PRESENT", title: "MERN Stack Developer Intern", organization: "Goinnovior Limited", description: "Developing web applications with MongoDB, Express.js, React.js and Node.js; building responsive interfaces with React and Tailwind CSS; assisting with APIs, testing and deployment.", icon: BriefcaseBusiness },
  { date: "2025 — 2026", title: "IT & Support", organization: "MRS Engineering", description: "Provided technical support and troubleshooting while helping maintain reliable technology operations.", icon: BriefcaseBusiness },
  { date: "2019 — 2024", title: "B.Sc. in Computer Science & Engineering", organization: "Daffodil International University", description: "Computer Science and Engineering · CGPA 3.58 / 4.00.", icon: GraduationCap },
];

export function Experience() {
  return (
    <section id="experience" className="border-y border-[#DDD7CD] bg-[#F2EFE9] px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading number="04" eyebrow="Career & education" title={<>Professional experience.<br /><span className="font-sans font-normal italic text-[#9B3D27]">Academic foundation.</span></>} />
        <div className="mt-14 divide-y divide-[#D9D2C8] border-y border-[#D9D2C8]">
          {timeline.map(({ date, title, organization, description, icon: Icon }) => (
            <article key={`${date}-${title}`} className="grid gap-5 py-8 md:grid-cols-[170px_1fr]">
              <span className="font-sans text-sm font-semibold text-[#5F5A53]">{date}</span>
              <div className="relative">
                <div className="flex items-start gap-3"><Icon size={18} className="mt-1 shrink-0 text-[#9B3D27]" /><div><h3 className="text-xl font-semibold text-[#202020]">{title}</h3><p className="mt-1 text-sm font-bold uppercase tracking-[.12em] text-[#9B3D27]">{organization}</p></div></div>
                <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#5B564F]">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
