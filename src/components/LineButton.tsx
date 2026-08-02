import { site } from "@/data/site";

function LineGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function LineButton({
  children = "LINEで無料相談する",
  size = "md",
  block = false,
  note,
}: {
  children?: string;
  size?: "md" | "lg";
  block?: boolean;
  note?: string;
}) {
  const sizing =
    size === "lg"
      ? "px-8 py-4.5 text-lg gap-3"
      : "px-6 py-3.5 text-base gap-2.5";

  return (
    <div className={block ? "w-full" : "inline-block"}>
      <a
        href={site.contact.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-full bg-[#06c755] font-bold text-white shadow-lg shadow-[#06c755]/25 transition hover:brightness-95 active:scale-[0.99] ${sizing} ${
          block ? "w-full" : ""
        }`}
      >
        <LineGlyph className="h-6 w-6 shrink-0" />
        <span>{children}</span>
      </a>
      {note ? (
        <p className="mt-2.5 text-center text-xs text-ink-500">{note}</p>
      ) : null}
    </div>
  );
}

export function GhostLink({
  href,
  children,
  tone = "dark",
}: {
  href: string;
  children: string;
  tone?: "dark" | "light";
}) {
  const colors =
    tone === "light"
      ? "border-white/35 text-white hover:bg-white/10"
      : "border-ink-300 text-ink-700 hover:bg-ink-50";

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-base font-bold transition ${colors}`}
    >
      {children}
    </a>
  );
}
