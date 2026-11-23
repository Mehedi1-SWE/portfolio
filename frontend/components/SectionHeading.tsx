
type SectionHeadingProps = {
  number?: string;
  eyebrow?: string;
  label?: string;
  title: React.ReactNode;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="w-full min-w-0 max-w-3xl">
      <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#64748B]">
        {label ?? eyebrow ?? ""}
      </span>
      <h2 className="mt-5 text-[clamp(2rem,4vw,4rem)] font-black sm:text-[clamp(2.35rem,4vw,4rem)] leading-[1.1] tracking-[-0.035em] text-[#0F172A]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 sm:leading-8 text-[#475569] md:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
