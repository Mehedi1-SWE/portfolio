import { Cloud, Code2, Database, Server, Workflow } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type SkillRecord = {
  _id: string;
  name: string;
  category: string;
  level?: number;
};

const fallbackSkillGroups = [
  { number: "01", category: "Frontend Development", icon: Code2, items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { number: "02", category: "Backend Development", icon: Server, items: ["Node.js", "Express.js", "REST APIs"] },
  { number: "03", category: "Data & Cloud", icon: Database, items: ["MongoDB", "SQL", "AWS"] },
  { number: "04", category: "Engineering & DevOps", icon: Workflow, items: ["Git", "GitHub", "Docker", "DSA", "System Design"] },
];

async function getSkills(): Promise<SkillRecord[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${apiBaseUrl}/api/skills`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load skills.");
    const skills = await response.json();
    return Array.isArray(skills) ? skills : [];
  } catch (error) {
    console.error("Skills API request failed:", error);
    return [];
  }
}

export async function Skills() {
  const skills = await getSkills();

  const skillGroups = skills.length > 0
    ? Array.from(
        skills.reduce((groups, skill) => {
          const category = skill.category?.trim() || "Other";
          if (!groups.has(category)) groups.set(category, []);
          groups.get(category)?.push(skill.name);
          return groups;
        }, new Map<string, string[]>()).entries()
      ).map(([category, items], index) => ({
        number: String(index + 1).padStart(2, "0"),
        category,
        icon: /front.?end/i.test(category) ? Code2 : /back.?end/i.test(category) ? Server : /data|cloud|database/i.test(category) ? Database : Workflow,
        items,
      }))
    : fallbackSkillGroups;

  return (
    <section className="border-y border-[#E2E8F0] bg-[#F1F5F9] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading
          number="06"
          eyebrow="Technical skills"
          title={<>The <span className="font-normal italic text-[#2563EB]">toolkit.</span></>}
          description="A focused overview of the technologies and engineering practices I use to build reliable, modern software."
        />

        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#E2E8F0] bg-white shadow-[0_14px_44px_rgba(15,23,42,.055)] sm:mt-12">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={group.category} className={`grid gap-4 px-4 py-5 sm:gap-6 sm:px-7 sm:py-7 md:grid-cols-[230px_1fr] md:items-center lg:px-9 ${index !== skillGroups.length - 1 ? "border-b border-[#E2E8F0]" : ""}`}>
                <div className="flex items-start gap-4">
                  <span className="pt-1 text-[11px] font-bold tracking-[.18em] text-[#2563EB]">{group.number}</span>
                  <div className="flex items-center gap-2.5">
                    <Icon size={17} strokeWidth={1.8} className="text-[#2563EB]" />
                    <h3 className="text-sm font-bold tracking-[.02em] text-[#0F172A]">{group.category}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {group.items.map((item) => (
                    <span key={item} className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2 text-[13px] font-semibold text-[#334155] transition hover:-translate-y-0.5 hover:border-[#CBD5E1] hover:bg-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-start gap-2 text-xs font-semibold uppercase tracking-[.16em] text-[#64748B]">
          <Cloud size={14} className="text-[#2563EB]" />
          Practical stack · engineering fundamentals · production-ready workflows
        </div>
      </div>
    </section>
  );
}
