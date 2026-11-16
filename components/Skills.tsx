import { Cloud, Code2, Database, Server, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const skillGroups = [
  { number: "01", category: "Frontend Development", icon: Code2, items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { number: "02", category: "Backend Development", icon: Server, items: ["Node.js", "Express.js", "REST APIs"] },
  { number: "03", category: "Data & Cloud", icon: Database, items: ["MongoDB", "SQL", "AWS"] },
  { number: "04", category: "Engineering & DevOps", icon: Workflow, items: ["Git", "GitHub", "Docker", "DSA", "System Design"] },
];

export function Skills() {
  return (
    <section className="border-y border-[#DDD7CD] bg-[#F2EFE9] px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          number="06"
          eyebrow="Technical skills"
          title={<>The <span className="font-sans font-normal italic text-[#9B3D27]">toolkit.</span></>}
          description="A focused overview of the technologies and engineering practices I use to build reliable, modern software."
        />

        <div className="mt-12 overflow-hidden rounded-[28px] border border-[#DDD7CD] bg-white shadow-[0_14px_44px_rgba(54,39,29,.055)]">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={group.category} className={`grid gap-6 px-7 py-7 md:grid-cols-[230px_1fr] md:items-center lg:px-9 ${index !== skillGroups.length - 1 ? "border-b border-[#E4DED5]" : ""}`}>
                <div className="flex items-start gap-4">
                  <span className="pt-1 text-[11px] font-bold tracking-[.18em] text-[#9B3D27]">{group.number}</span>
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} strokeWidth={1.8} className="text-[#9B3D27]" />
                    <h3 className="text-sm font-bold tracking-[.02em] text-[#27231F]">{group.category}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="inline-flex items-center rounded-full border border-[#D8D0C5] bg-[#F8F6F2] px-3.5 py-2 text-[13px] font-semibold text-[#403A34] transition hover:-translate-y-0.5 hover:border-[#BCA99A] hover:bg-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#756E66]">
          <Cloud size={14} className="text-[#9B3D27]" />
          Practical stack · engineering fundamentals · production-ready workflows
        </div>
      </div>
    </section>
  );
}
