import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto grid max-w-[1280px] gap-14 px-6 py-28 lg:grid-cols-[.72fr_1.28fr] lg:px-12">
      <SectionHeading number="01" eyebrow="About" title={<>Academic mind.<br /><span className="font-sans font-normal italic text-[#2563EB]">Engineering craft.</span></>} />
      <div className="max-w-3xl text-[16px] leading-8 text-[#475569]">
        <p>My work combines a Computer Science foundation with practical full-stack development. I enjoy turning requirements into reliable interfaces, APIs and data-driven products.</p>
        <p className="mt-5">This portfolio brings together my academic work, research interests and professional experience so it can support both Master&apos;s applications and software engineering opportunities.</p>
      </div>
    </section>
  );
}
