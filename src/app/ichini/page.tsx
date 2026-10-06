import Link from "next/link";
import { Container, SectionHeading } from "@/components/Container";
import { FaqList } from "@/components/FaqList";
import { LineButton, LineIdNote } from "@/components/LineButton";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniJobCard } from "@/components/ichini/JobCard";
import {
  ichiniDifferences,
  ichiniFaq,
  ichiniJobs,
  ichiniPatterns,
  ichiniWorries,
} from "@/data/ichini";
import { site } from "@/data/site";
import { partnerSupport } from "@/data/support";

const steps = [
  {
    title: "LINEで今の状況を送る",
    body: "今の仕事・経験年数・年収・転職したい時期など、分かる範囲で大丈夫です。",
  },
  {
    title: "狙える方向を一緒に整理",
    body: "今の経験がどこで評価されそうか、年収が上がりやすい動き方はどれかを整理します。",
  },
  {
    title: "提携先の担当者とつながる",
    body: "ご希望に応じて、厚生労働大臣の許可を受けた提携先の担当者をご紹介します。",
  },
  {
    title: "求人探し・書類・面接",
    body: "条件に合う求人探しから、求人ごとの書類の調整、面接対策まで進めます。",
  },
];

export default function IchiniHome() {
  const previewJobs = ichiniJobs.slice(0, 3);

  return (
    <>
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
        <div
          className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl"
          aria-hidden
        />
        <Container className="relative">
          <p className="inline-block rounded-full border border-amber-300/40 px-4 py-1.5 text-sm font-bold text-amber-200">
            2回目・3回目の転職をする方へ
          </p>
          <h1 className="mt-6 max-w-3xl text-3xl leading-tight font-bold text-white sm:text-5xl sm:leading-tight text-balance-ja">
            {"その経験は、もう武器になっている。"}
            <br />
            <span className="text-amber-300">
              {"次は、年収とキャリアを上げる転職を。"}
            </span>
          </h1>
          <p className="mt-7 max-w-2xl leading-relaxed text-ink-200">
            {"1回目の転職は「やる気」で決まっても、2回目からは「経験をどう伝えるか」で条件が変わります。" +
              "今の経験がどこで評価されるのか、どう動けば年収が上がりやすいのかを、一緒に整理しましょう。"}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <LineButton size="lg">LINEで無料相談する</LineButton>
            <Link
              href="/ichini/shindan/"
              className="inline-flex items-center justify-center rounded-full border border-white/35 px-7 py-4 font-bold text-white transition hover:bg-white/10"
            >
              年収アップ診断（約1分）
            </Link>
          </div>
          <div className="mt-4 max-w-md sm:text-left">
            <LineIdNote tone="light" />
          </div>

          <ul className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              { value: "無料", label: "相談は何度でも" },
              { value: "正社員", label: "紹介は正社員求人のみ" },
              {
                value: partnerSupport.jobCount,
                label: `取り扱い求人（${partnerSupport.jobCountNote}）`,
              },
            ].map((item) => (
              <li
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <p className="text-lg font-bold text-white">{item.value}</p>
                <p className="mt-0.5 text-xs text-ink-300">{item.label}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* こんな方へ */}
      <section className="py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading
            accent="amber"
            eyebrow="For you"
            title="こんな方の相談を受けています"
          />
          <ul className="mt-10 space-y-3">
            {ichiniWorries.map((worry) => (
              <li
                key={worry}
                className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-white px-5 py-4"
              >
                <span className="mt-0.5 shrink-0 font-bold text-amber-600">
                  ✓
                </span>
                <span className="text-ink-700">{worry}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-ink-500">
            {"ひとつでも当てはまれば、話を聞くだけでも大丈夫です。"}
          </p>
        </Container>
      </section>

      {/* 1回目と2回目の違い */}
      <section className="bg-ink-50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            accent="amber"
            eyebrow="Difference"
            title="1回目と2回目以降では、見られるところが違います"
            lead="同じやり方で2回目の転職をすると、経験があるのに条件が上がらない、ということが起きます。"
          />
          <div className="mt-12 overflow-hidden rounded-3xl border border-ink-200 bg-white">
            <div className="grid grid-cols-[6rem_1fr_1fr] border-b border-ink-200 bg-ink-900 text-sm font-bold text-white sm:grid-cols-[9rem_1fr_1fr]">
              <p className="px-4 py-3" />
              <p className="px-4 py-3 text-ink-300">1回目の転職</p>
              <p className="px-4 py-3 text-amber-300">2回目以降</p>
            </div>
            {ichiniDifferences.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6rem_1fr_1fr] border-b border-ink-100 text-sm last:border-b-0 sm:grid-cols-[9rem_1fr_1fr]"
              >
                <p className="bg-ink-50 px-3 py-4 font-bold text-ink-800 sm:px-4">
                  {row.label}
                </p>
                <p className="px-3 py-4 text-ink-500 sm:px-4">{row.first}</p>
                <p className="px-3 py-4 font-bold text-ink-800 sm:px-4">{row.next}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 年収が上がりやすい動き方 */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            accent="amber"
            eyebrow="Patterns"
            title="年収が上がりやすい、3つの動き方"
            lead="どれが合うかは、今の職種と経験年数で変わります。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {ichiniPatterns.map((pattern, index) => (
              <article
                key={pattern.title}
                className="flex flex-col rounded-3xl border border-ink-200 bg-white p-6 sm:p-7"
              >
                <p className="text-sm font-bold text-amber-600">
                  {`パターン ${index + 1}`}
                </p>
                <h3 className="mt-2 text-lg font-bold text-ink-900">
                  {pattern.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
                  {pattern.body}
                </p>
                <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold text-amber-900">
                  {pattern.example}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-ink-900 p-7 text-center sm:p-10">
            <p className="text-lg font-bold text-white sm:text-xl">
              {"自分はどれが合う？ 6つの質問で分かります"}
            </p>
            <p className="mt-3 text-sm text-ink-300">
              {"年収が上がる余地と、あなたの職種で上がりやすい動き方をお返しします。"}
            </p>
            <Link
              href="/ichini/shindan/"
              className="mt-7 inline-block rounded-full bg-amber-400 px-8 py-4 font-bold text-ink-900 transition hover:bg-amber-300"
            >
              年収アップ診断をはじめる
            </Link>
          </div>
        </Container>
      </section>

      {/* 求人の例 */}
      <section className="bg-ink-50 py-16 sm:py-24">
        <Container>
          <SectionHeading
            accent="amber"
            eyebrow="Jobs"
            title="経験者向け 求人の例"
            lead="経験者向け求人の条件傾向をまとめたモデルケースです。実際にどんな求人があるかは、地域や時期によって変わります。"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {previewJobs.map((job) => (
              <IchiniJobCard key={job.slug} job={job} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/ichini/jobs/"
              className="inline-block rounded-full border border-ink-300 bg-white px-7 py-3.5 font-bold text-ink-700 transition hover:bg-ink-50"
            >
              IT以外も含めて、すべての例を見る
            </Link>
          </div>
        </Container>
      </section>

      {/* 流れとサポート */}
      <section className="py-16 sm:py-24">
        <Container>
          <SectionHeading
            accent="amber"
            eyebrow="Flow"
            title="相談から入社までの流れ"
            lead="求人のご紹介は、入社したい月の3か月前から本格的に始まります。それより前でも、方向決めや職務経歴書の準備は一緒に進められます。"
          />
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-3xl border border-ink-200 bg-white p-6"
              >
                <p className="text-sm font-bold text-amber-600">
                  {`STEP 0${index + 1}`}
                </p>
                <p className="mt-2 font-bold text-ink-900">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14">
            <h3 className="text-center text-xl font-bold text-ink-900">
              おつなぎした先で、やってもらえること
            </h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partnerSupport.strengths.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border border-ink-200 bg-white p-5"
                >
                  <p className="font-bold text-ink-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center text-xs text-ink-500">
              {`※ 求人数「${partnerSupport.jobCount}」は${partnerSupport.jobCountNote}です。`}
            </p>
          </div>
        </Container>
      </section>

      {/* よくある質問 */}
      <section id="faq" className="scroll-mt-20 bg-ink-50 py-16 sm:py-24">
        <Container size="narrow">
          <SectionHeading accent="amber" eyebrow="FAQ" title="よくある質問" />
          <div className="mt-10">
            <FaqList items={ichiniFaq} />
          </div>
          <p className="mt-8 text-center text-sm text-ink-600">
            {"未経験からIT業界を目指す方は、姉妹サイトの"}
            <Link
              href="/"
              className="font-bold text-ink-900 underline underline-offset-4"
            >
              {site.name}
            </Link>
            {"をご覧ください。"}
          </p>
        </Container>
      </section>

      <IchiniCta />
    </>
  );
}
