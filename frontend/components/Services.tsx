import SectionHeading from "./SectionHeading";

const data = [
  ["Full-Stack Development", "End-to-end web application development, connecting responsive interfaces, backend services and databases."],
  ["Frontend Development", "Responsive, accessible user interfaces built with Next.js, React, TypeScript and Tailwind CSS."],
  ["Backend & APIs", "REST API development, request validation, database integration and server-side application logic."],
  ["MongoDB Solutions", "Document-based data modelling and database integration with MongoDB and Mongoose."],
  ["API Integration", "Reliable integration between frontend applications, backend services and third-party APIs."],
  ["Machine Learning", "Academic and project-based machine-learning solutions for data-driven prediction and experimentation."],
];

export default function Services() {
  return (
    <section className="py-24">
      <div className="portfolio-container">
        <SectionHeading
          label="Services"
          title="What I Can Do"
          description="Development capabilities focused on practical requirements, maintainable code and user-friendly web experiences."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.map(([title, description]) => (
            <article key={title} className="card p-7 hover:-translate-y-1 hover:border-[#FF3811]">
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-4 leading-7 text-[#475569]">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}