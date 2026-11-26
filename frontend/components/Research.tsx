import { Microscope } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const interests = [
  "Applied Machine Learning",
  "AI-assisted Software Engineering",
  "Intelligent Web Applications",
  "Software Quality & Testing",
];

export function Research() {
  return (
    <section id="research" className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
        <SectionHeading eyebrow="Research" title={<>Curiosity with a <span>technical direction.</span></>} />
        <div>
          <p className="max-w-2xl text-base leading-7 text-[#475569]">My research interests focus on the intersection of intelligent systems, modern web technologies and reliable software engineering practices.</p>
          <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2">
            {interests.map((item, index) => (
              <div key={item} className="rounded-xl border bg-white p-4 shadow-[0_8px_28px_rgba(15,23,42,.04)] sm:p-5">
                <Microscope size={16} className="text-[#2563EB]" />
                <p className="mt-4 text-sm font-semibold text-[#0F172A]">0{index + 1} · {item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
