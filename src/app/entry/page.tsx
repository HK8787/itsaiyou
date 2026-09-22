import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { EntryForm } from "@/components/EntryForm";
import { LineButton } from "@/components/LineButton";
import { PageHero } from "@/components/PageHero";
import { site } from "@/data/site";

// 静的書き出し＋サブディレクトリ配信のため、public/ の画像は
// 自分で basePath を前置する必要がある。
const basePath = process.env.BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "無料相談フォーム",
  description:
    "IT未経験からの転職相談フォーム。13項目にお答えいただくと、LINEでそのまま送れる形に整形します。相談は何度でも無料、費用の負担はありません。",
};

const points = [
  "相談は何度でも無料。費用の負担はありません",
  "転職するかどうかは、話してから決めて大丈夫です",
  "在職中でも、まだ迷っている段階でも構いません",
  "しつこい勧誘の電話をかけることはありません",
];

export default function EntryPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="無料キャリア相談"
        lead="LINEでそのまま話しかけてください。「何から聞けばいいか分からない」で大丈夫です。こちらから順番にお伺いします。"
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

          <div className="mt-9 rounded-3xl border-2 border-[#06c755]/30 bg-white p-6 sm:p-8">
            <div className="flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-9">
              <div className="w-full sm:w-auto">
                <LineButton
                  size="lg"
                  block
                  note={`返信の目安：${site.contact.replyTime}`}
                />
              </div>

              <div className="flex shrink-0 flex-col items-center">
                <Image
                  src={`${basePath}/line-qr.png`}
                  alt={`${site.name}のLINE友だち追加用QRコード`}
                  width={132}
                  height={132}
                  className="rounded-xl"
                  unoptimized
                />
                <p className="mt-2 text-xs text-ink-500">
                  パソコンの方はこちらを読み取り
                </p>
              </div>
            </div>
          </div>

          {/*
            フォームは折りたたんでおく。
            LINEを使っていない人と、先に情報を渡しておきたい人のための
            受け皿であって、全員に通ってもらう導線ではない。
            14項目を最初に見せると、迷っている段階の人ほど離脱する。
          */}
          <details className="group mt-12 rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
            <summary className="cursor-pointer list-none text-center">
              <span className="font-bold text-ink-800 underline underline-offset-4">
                LINEを使っていない方・先に内容を伝えておきたい方はこちら
              </span>
              <span className="mt-2 block text-sm text-ink-500">
                提携エージェントが事前に確認する14項目を入力して送れます（約3分）
                <span className="ml-1 inline-block group-open:hidden">▼</span>
                <span className="ml-1 hidden group-open:inline-block">▲</span>
              </span>
            </summary>

            <div className="mt-10">
              <EntryForm />
            </div>
          </details>
        </Container>
      </section>
    </>
  );
}
