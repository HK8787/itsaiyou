import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width =
    size === "narrow"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-7xl"
        : "max-w-6xl";

  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-ink-900";
  const leadColor = tone === "light" ? "text-ink-100" : "text-ink-600";

  return (
    <div className={`${alignment} max-w-3xl`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold tracking-[0.2em] text-flame-600 uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-2xl leading-snug font-bold sm:text-3xl md:text-[2.1rem] ${titleColor} text-balance-ja`}
      >
        {title}
      </h2>
      {lead ? (
        <p className={`mt-5 text-[0.98rem] sm:text-base ${leadColor}`}>{lead}</p>
      ) : null}
    </div>
  );
}
