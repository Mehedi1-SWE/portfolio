import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto grid max-w-[1280px] gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-14 lg:px-12 lg:py-28">
      <SectionHeading number="01" eyebrow="About" title={<>Software engineering.<br /><span className="font-normal italic text-[#2563EB]">Built on a strong foundation.</span></>} />
      <div className="max-w-3xl text-[16px] leading-8 text-[#475569]">
        <p>I combine my Computer Science background with hands-on full-stack development. I turn project requirements into responsive interfaces, reliable APIs and practical software solutions.</p>
        <p className="mt-5">This portfolio showcases my education, research interests, projects and professional experience for employers, university admissions teams and potential collaborators.</p>
      </div>
    </section>
  );
}
