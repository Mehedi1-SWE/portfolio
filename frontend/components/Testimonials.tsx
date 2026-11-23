import SectionHeading from "./SectionHeading";

type TestimonialRecord = {
  _id: string;
  name: string;
  profession: string;
  profileImage?: string;
  message: string;
  rating?: number;
};

const fallbackData: TestimonialRecord[] = [
  { _id: "testimonial-1", name: "Awlad Hossain", profession: "Businessman", message: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.", rating: 5 },
  { _id: "testimonial-2", name: "Awlad Hossain", profession: "Businessman", message: "A thoughtful developer who communicates clearly and focuses on practical, user-friendly solutions.", rating: 5 },
];

async function getTestimonials(): Promise<TestimonialRecord[]> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${apiBaseUrl}/api/testimonials`, { cache: "no-store" });
    if (!response.ok) throw new Error("Unable to load testimonials.");
    const testimonials = await response.json();
    return Array.isArray(testimonials) ? testimonials : [];
  } catch (error) {
    console.error("Testimonials API request failed:", error);
    return [];
  }
}

export default async function Testimonials() {
  const data = await getTestimonials();

  return <section className="bg-[#F8F8F8] py-24"><div className="portfolio-container"><SectionHeading label="Testimonials" title="Professional feedback" description="Comments from people who have worked with me."/><div className="mt-16 grid gap-6 lg:grid-cols-2">{data.map((item)=><article key={item._id} className="card min-h-[349px] p-[50px]"><div className="flex items-start justify-between gap-5"><div className="flex items-center gap-5"><div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#151515] font-bold text-[#FF3811]">{item.name.split(/\\s+/).map((part)=>part[0]).slice(0,2).join("").toUpperCase()}</div><div><h3 className="text-xl font-bold text-[#444]">{item.name}</h3><p className="mt-2 text-base font-semibold text-[#737373]">{item.profession}</p></div></div><div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#FF3811] text-2xl font-bold text-white">“</div></div><p className="mt-10 leading-[30px] text-[#737373]">{item.message}</p><div className="mt-8 text-[24px] text-[#FF912C]">{"★".repeat(Math.max(0, Math.min(5, item.rating ?? 5)))}</div></article>)}</div></div></section>;
}
