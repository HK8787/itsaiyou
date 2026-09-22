import { Container } from "@/components/Container";

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-deep py-16 sm:py-20">
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />
      <div
        className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-flame-500/20 blur-3xl"
        aria-hidden
      />
      <Container className="relative">
        <p className="text-sm font-bold tracking-[0.25em] text-flame-200 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl leading-tight font-bold text-white sm:text-4xl text-balance-ja">
          {title}
        </h1>
        {lead ? (
          <p className="mt-6 max-w-2xl leading-relaxed text-ink-100">{lead}</p>
        ) : null}
      </Container>
    </section>
  );
}
