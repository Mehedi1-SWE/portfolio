import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type ExperienceRecord = {
  _id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  location?: string;
  responsibilities?: string[];
};

const fallbackExperience: ExperienceRecord[] = [
  { _id: "goinnovior", company: "Goinnovior Limited", position: "MERN Stack Developer Intern", startDate: "2026", endDate: "Present", responsibilities: ["Contributing to full-stack web application development using MongoDB, Express.js, React.js and Node.js", "Building responsive interfaces with React and Tailwind CSS, and supporting API integration, testing and deployment workflows"] },
  { _id: "mrs-engineering", company: "MRS Engineering", position: "IT & Support", startDate: "2025", endDate: "2026", responsibilities: ["Provided technical support and troubleshooting while helping maintain reliable technology operations"] },
];

const academicFoundation = {
  date: "2019 — 2024",
  title: "B.Sc. in Computer Science & Engineering",
  organization: "Daffodil International University",
  description: "Computer Science and Engineering · CGPA 3.58 / 4.00.",
};

async function getExperience(): Promise<ExperienceRecord[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\\/$/, "") || "http://localhost:3001";

  try {
    const response = await fetch(`${apiBaseUrl}/api/experience`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load experience.");
    const experiences = await response.json();
    return Array.isArray(experiences) && experiences.length > 0 ? experiences : fallbackExperience;
  } catch (error) {
    console.error("Experience API request failed:", error);
    return fallbackExperience;
  }
}

export async function Experience() {
  const experiences = await getExperience();

  const timeline = [
    ...experiences.map((item) => ({
      date: `${item.startDate} — ${item.endDate || "PRESENT"}`.toUpperCase(),
      title: item.position,
      organization: item.company,
      description: (item.responsibilities || []).join(". ") + (item.location ? ` · ${item.location}` : ""),
      icon: BriefcaseBusiness,
      id: item._id,
    })),
    { ...academicFoundation, icon: GraduationCap, id: "academic-foundation" },
  ];

  return (
    <section id="experience" className="border-y border-[#E2E8F0] bg-[#F1F5F9] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1280px]">
        <SectionHeading number="04" eyebrow="Career & education" title={<>Professional experience.<br /><span className="font-normal italic text-[#2563EB]">Academic foundation.</span></>} />
        <div className="mt-10 divide-y divide-[#E2E8F0] border-y border-[#E2E8F0] sm:mt-14">
          {timeline.map(({ date, title, organization, description, icon: Icon, id }) => (
            <article key={id} className="grid gap-3 py-6 sm:gap-5 sm:py-8 md:grid-cols-[170px_1fr]">
              <span className="font-sans text-sm font-semibold text-[#64748B]">{date}</span>
              <div className="relative min-w-0">
                <div className="flex min-w-0 items-start gap-3"><Icon size={18} className="mt-1 shrink-0 text-[#2563EB]" /><div className="min-w-0"><h3 className="text-xl font-semibold text-[#0F172A]">{title}</h3><p className="mt-1 text-sm font-bold uppercase tracking-[.12em] text-[#2563EB]">{organization}</p></div></div>
                <p className="mt-4 max-w-3xl text-[16px] leading-7 text-[#475569]">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
