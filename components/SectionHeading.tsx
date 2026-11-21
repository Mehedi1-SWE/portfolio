
type SectionHeadingProps = {
  number?: string;
  eyebrow?: string;
  label?: string;
  title: React.ReactNode;
  description?: string;
};

export function SectionHeading({
  number,
  eyebrow,
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#64748B]">
        <span className="h-px w-6 bg-[#CBD5E1]" />
        {number && eyebrow ? `${number} / ${eyebrow}` : (label ?? eyebrow ?? "")}
      </span>
      <h2 className="mt-5 text-[clamp(2.35rem,4vw,4rem)] font-black leading-[1.1] tracking-[-0.035em] text-[#0F172A]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#475569] md:text-[17px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
