import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EntryForm } from "@/components/EntryForm";
import { LineButton } from "@/components/LineButton";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "無料相談フォーム",
  description:
    "IT未経験からの転職相談フォーム。13項目にお答えいただくと、LINEでそのまま送れる形に整形します。相談は何度でも無料、費用の負担はありません。",
};

const points = [
  "所要時間は約3分です",
  "入力内容は運営者にのみ送信されます",
  "相談したからといって、転職を決める必要はありません",
  "分からない項目は空欄のまま送っていただいても構いません",
];

export default function EntryPage() {
  return (
    <>
      <PageHero
        eyebrow="Entry"
        title="無料キャリア相談フォーム"
        lead="提携エージェントが事前に確認する13項目です。ここを埋めておくと初回のやり取りが一気に短くなり、その分だけ具体的な話ができます。"
      />

      <section className="py-14 sm:py-20">
        <Container size="narrow">
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-2xl bg-ink-50 px-5 py-3.5 text-sm text-ink-700"
              >
                <span className="mt-0.5 shrink-0 font-bold text-emerald-600">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-9 rounded-3xl border border-ink-200 bg-white p-6 text-center sm:p-7">
            <p className="text-sm text-ink-600">
              フォームが面倒であれば、LINEで直接お話しいただいても大丈夫です。
            </p>
            <div className="mt-4">
              <LineButton note={`返信の目安：${site.contact.replyTime}`} />
            </div>
          </div>

          <div className="mt-14">
            <EntryForm />
          </div>
        </Container>
      </section>
    </>
  );
}
