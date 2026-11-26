import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto grid max-w-[1280px] gap-8 px-4 py-16 sm:gap-10 sm:px-6 sm:py-20 lg:grid-cols-[.72fr_1.28fr] lg:gap-14 lg:px-12 lg:py-28">
      <SectionHeading eyebrow="About" title={<>Academic mind.<br /><span>Engineering craft.</span></>} />
      <div className="max-w-3xl text-[16px] leading-8 text-[#475569]">
        <p>I am a Computer Science graduate focused on full-stack web development. I use modern technologies to build responsive user interfaces, REST APIs and database-driven applications.</p>
        <p className="mt-5">My academic background and practical development experience have helped me build a strong foundation in software engineering, problem-solving and modern web technologies.</p>
      </div>
    </section>
  );
}
