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
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">
        <span className="h-px w-6 bg-[#CBD5E1]" />
        {label ?? eyebrow ?? ""}
      </span>
      <h2 className="mt-5 text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-[#0F172A]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#475569]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
