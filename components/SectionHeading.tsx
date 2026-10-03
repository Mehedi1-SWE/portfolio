export default function SectionHeading({
    label,
    title,
    description,
}: {
    label: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mx-auto max-w-[780px] text-center">
            <div className="section-label">{label}</div>
            <h2 className="section-title mt-5">{title}</h2>
            <p className="section-description mx-auto mt-7 max-w-[680px]">{description}</p>
        </div>
    );
}
