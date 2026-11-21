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
    <section id="research" className="mx-auto max-w-[1280px] px-6 py-28 lg:px-12">
      <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
        <SectionHeading number="03" eyebrow="Research" title={<>Curiosity with a <span className="font-sans font-normal italic text-[#2563EB]">technical direction.</span></>} />
        <div>
          <p className="max-w-2xl text-[16px] leading-8 text-[#475569]">I am interested in research-oriented software engineering where intelligent systems, web technologies and reliable engineering practices meet.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {interests.map((item, index) => (
              <div key={item} className="rounded-xl border bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,.04)]">
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
