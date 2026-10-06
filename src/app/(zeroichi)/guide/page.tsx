import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "未経験ガイド",
  description:
    "IT職種の違い、面接で必ず聞かれる質問、相談前の準備、そして入ってから分かる大変な部分。未経験からITを目指す人に先に知っておいてほしいことをまとめました。",
};

export default function GuideIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Guide"
        title="相談する前に、読んでおいてほしいこと"
        lead="全部読む必要はありません。気になるものから1つで大丈夫です。ただ「面接でよく聞かれる質問」だけは、面接前に必ず目を通してください。"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guide/${guide.slug}/`}
                  className="flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-7 transition hover:border-flame-300 hover:shadow-lg hover:shadow-ink-900/5"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-ink-900 px-3.5 py-1 text-xs font-bold text-white">
                      {guide.tag}
                    </span>
                    <span className="text-xs text-ink-500">
                      約{guide.readingMinutes}分で読めます
                    </span>
                  </div>

                  <h2 className="mt-5 text-lg leading-snug font-bold text-ink-900">
                    {guide.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                    {guide.lead}
                  </p>
                  <p className="mt-6 text-sm font-bold text-flame-600">
                    読む →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="読んだうえで、話してみませんか"
        lead="記事の内容について「自分の場合はどうなるのか」を聞いていただくのがいちばん早いです。"
      />
    </>
  );
}
