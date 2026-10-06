import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import type { Block } from "@/data/guides";
import { guideBySlug, guides } from "@/data/guides";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};

  return { title: guide.title, description: guide.lead };
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-14 border-l-4 border-flame-500 pl-4 text-xl font-bold text-ink-900 sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mt-10 text-lg font-bold text-ink-900">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mt-5 leading-[1.95] text-ink-700">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-ink-700">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-400"
                aria-hidden
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3.5 text-ink-700">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <aside
          key={index}
          className="mt-9 rounded-3xl border-2 border-flame-200 bg-flame-50 p-6 sm:p-7"
        >
          <p className="font-bold text-ink-900">{block.title}</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
            {block.text}
          </p>
        </aside>
      );
    case "qa":
      return (
        <div
          key={index}
          className="mt-6 rounded-2xl border border-ink-200 bg-white p-6"
        >
          <p className="flex gap-3 font-bold text-ink-900">
            <span className="text-flame-500">Q.</span>
            {block.q}
          </p>
          <p className="mt-3 flex gap-3 text-[0.95rem] leading-relaxed text-ink-600">
            <span className="font-bold text-ink-300">A.</span>
            {block.a}
          </p>
        </div>
      );
  }
}

export default async function GuideDetailPage({ params }: Params) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const others = guides.filter((item) => item.slug !== guide.slug);

  return (
    <>
      <PageHero eyebrow={guide.tag} title={guide.title} lead={guide.lead} />

      <article className="py-14 sm:py-20">
        <Container size="narrow">
          <nav className="text-sm text-ink-500">
            <Link href="/guide/" className="hover:text-flame-600">
              未経験ガイド
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-700">約{guide.readingMinutes}分</span>
          </nav>

          <div className="mt-8">
            {guide.blocks.map((block, index) => renderBlock(block, index))}
          </div>

          <div className="mt-16 border-t border-ink-100 pt-12">
            <h2 className="text-lg font-bold text-ink-900">
              あわせて読みたい
            </h2>
            <ul className="mt-5 space-y-3">
              {others.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/guide/${item.slug}/`}
                    className="block rounded-2xl border border-ink-200 px-5 py-4 transition hover:border-flame-300"
                  >
                    <span className="text-xs font-bold text-flame-600">
                      {item.tag}
                    </span>
                    <span className="mt-1 block font-bold text-ink-800">
                      {item.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </article>

      <CtaBand
        title="「自分の場合はどうなのか」を聞いてください"
        lead="記事は一般論です。あなたの経歴・住んでいる地域・生活状況に当てはめると、答えは変わります。"
      />
    </>
  );
}
