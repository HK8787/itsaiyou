import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageHero } from "@/components/PageHero";
import { faqCategories, faqs } from "@/data/faq";

export const metadata: Metadata = {
  title: "よくある質問",
  description:
    "費用はかかるのか、高卒でもITエンジニアになれるのか、転職回数が多いと不利なのか。IT未経験からの転職相談でよくいただく質問にお答えします。",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="よくある質問"
        lead="相談前に多くいただく質問をまとめました。ここにない疑問は、LINEで直接聞いていただくのがいちばん早いです。"
      />

      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <nav className="flex flex-wrap gap-2.5">
            {faqCategories.map((category) => (
              <a
                key={category}
                href={`#${encodeURIComponent(category)}`}
                className="rounded-full border border-ink-200 px-4 py-2 text-sm font-medium text-ink-700 transition hover:border-flame-300 hover:text-flame-600"
              >
                {category}
              </a>
            ))}
          </nav>

          {faqCategories.map((category) => (
            <div
              key={category}
              id={encodeURIComponent(category)}
              className="mt-14 scroll-mt-24"
            >
              <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
                {category}
              </h2>
              <div className="mt-6">
                <FaqList
                  items={faqs.filter((item) => item.category === category)}
                />
              </div>
            </div>
          ))}
        </Container>
      </section>

      <CtaBand
        title="疑問が残っているなら、そのまま聞いてください"
        lead="「こんなこと聞いていいのかな」という内容ほど、実は多くの人が同じところで止まっています。"
      />
    </>
  );
}
