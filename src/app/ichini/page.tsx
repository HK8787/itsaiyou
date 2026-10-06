import Link from "next/link";
import { Container } from "@/components/Container";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniFaq } from "@/components/ichini/Faq";
import { IchiniJobCard } from "@/components/ichini/JobCard";
import {
  CornerFrame,
  GoldLineButton,
  Ornament,
  OutlineLink,
  SalonHeading,
  SalonLineNote,
} from "@/components/ichini/ui";
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
    en: "Contact",
    title: "LINEで、今の状況をお送りください",
    body: "今のお仕事・経験年数・年収・転職したい時期など、分かる範囲で構いません。",
  },
  {
    en: "Consultation",
    title: "狙える方向を、ご一緒に整理します",
    body: "今の経験がどこで評価されそうか、年収が上がりやすい動き方はどれかを読み解きます。",
  },
  {
    en: "Introduction",
    title: "提携先の担当者とおつなぎします",
    body: "ご希望に応じて、厚生労働大臣の許可を受けた提携先の担当者をご紹介します。",
  },
  {
    en: "Placement",
    title: "求人探しから、書類・面接まで",
    body: "条件に合う求人探しから、求人ごとの書類の調整、面接対策まで進めます。",
  },
];

const credentials = [
  { value: "無料", label: "ご相談は何度でも" },
  { value: "正社員", label: "ご紹介は正社員求人のみ" },
  {
    value: partnerSupport.jobCount,
    label: `取り扱い求人（${partnerSupport.jobCountNote}）`,
  },
];

export default function IchiniHome() {
  const previewJobs = ichiniJobs.slice(0, 3);

  return (
    <>
      {/* ───── ヒーロー ───── */}
      <section className="relative isolate overflow-hidden">
        <div className="bg-grain absolute inset-0 -z-10" aria-hidden />
        {/* 上から差し込む、ほのかな金の光 */}
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 -z-10 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full bg-gold-500/[0.13] blur-[110px]"
        />
        {/* 左右の細い縦罫 */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-[6%] -z-10 hidden w-px bg-gradient-to-b from-transparent via-gold-400/25 to-transparent lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-y-0 right-[6%] -z-10 hidden w-px bg-gradient-to-b from-transparent via-gold-400/25 to-transparent lg:block"
        />

        <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center py-24 text-center sm:py-32">
          <p className="font-display text-xs tracking-salon text-gold-300 uppercase sm:text-sm">
            For Your Second Career
          </p>
          <Ornament className="mt-7" />

          <h1 className="mt-10 font-mincho text-[2rem] leading-[1.65] font-bold text-ivory sm:text-[3.4rem] sm:leading-[1.55]">
            {"積み重ねた経験に、"}
            <br />
            <span className="text-gold-foil">{"相応しい次の場所を。"}</span>
          </h1>

          <p className="mt-10 max-w-xl text-[0.95rem] leading-[2.2] text-ivory-dim sm:text-base">
            {"二度目、三度目の転職は、"}
            <br className="sm:hidden" />
            {"経験をどう語るかで条件が変わります。"}
            <br />
            {"あなたの経歴を丁寧に読み解き、"}
            <br className="sm:hidden" />
            {"年収とキャリアが上がる一手を、ご一緒に。"}
          </p>

          <div className="mt-14 flex w-full max-w-md flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row">
            <GoldLineButton size="lg">LINEで相談する（無料）</GoldLineButton>
            <OutlineLink href="/ichini/shindan/">年収アップ診断</OutlineLink>
          </div>
          <div className="mt-5">
            <SalonLineNote />
          </div>

          <dl className="mt-20 grid w-full max-w-3xl grid-cols-3 border-y border-hairline">
            {credentials.map((item, index) => (
              <div
                key={item.label}
                className={`px-2 py-6 sm:px-6 ${
                  index > 0 ? "border-l border-hairline" : ""
                }`}
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-mincho text-base font-bold text-gold-200 sm:text-xl">
                  {item.value}
                </dd>
                <dd className="mt-2 text-[0.65rem] leading-relaxed tracking-[0.06em] text-ivory-faint sm:text-xs">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───── I. こんな方へ ───── */}
      <section className="border-t border-hairline bg-noir-900 py-24 sm:py-32">
        <Container size="narrow">
          <SalonHeading
            numeral="I"
            eyebrow="For Those Who"
            title="こんな方の、ご相談をお受けしています"
          />
          <ul className="mt-16">
            {ichiniWorries.map((worry, index) => (
              <li
                key={worry}
                className="flex items-baseline gap-6 border-b border-hairline py-6 first:border-t"
              >
                <span className="font-display text-sm text-gold-400 italic">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-mincho leading-relaxed text-ivory sm:text-lg">
                  {worry}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center font-mincho text-sm tracking-[0.08em] text-ivory-dim">
            {"ひとつでも当てはまれば、お話を聞くだけでも構いません。"}
          </p>
        </Container>
      </section>

      {/* ───── II. 1回目と2回目の違い ───── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SalonHeading
            numeral="II"
            eyebrow="The Difference"
            title={
              <>
                {"一度目と二度目では、"}
                <br />
                {"見られるところが違います"}
              </>
            }
            lead="同じやり方で二度目の転職に臨むと、経験があるのに条件が上がらない、ということが起こります。"
          />

          {/* PC：3列の表 */}
          <div className="mx-auto mt-16 hidden max-w-4xl sm:block">
            <div className="grid grid-cols-[9rem_1fr_1fr] items-end pb-4">
              <span />
              <p className="px-6 font-display text-xs tracking-salon text-ivory-faint uppercase">
                First
                <span className="mt-1 block font-mincho text-xs tracking-[0.1em] normal-case">
                  一度目の転職
                </span>
              </p>
              <p className="px-6 font-display text-xs tracking-salon text-gold-300 uppercase">
                Second
                <span className="mt-1 block font-mincho text-xs tracking-[0.1em] text-gold-200 normal-case">
                  二度目以降
                </span>
              </p>
            </div>
            {ichiniDifferences.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[9rem_1fr_1fr] border-t border-hairline last:border-b"
              >
                <p className="py-6 font-mincho text-sm font-bold tracking-[0.08em] text-gold-200">
                  {row.label}
                </p>
                <p className="px-6 py-6 text-sm leading-relaxed text-ivory-faint">
                  {row.first}
                </p>
                <p className="border-l border-gold-400/30 bg-gold-400/[0.04] px-6 py-6 font-mincho text-[0.95rem] leading-relaxed font-bold text-ivory">
                  {row.next}
                </p>
              </div>
            ))}
          </div>

          {/* スマホ：項目ごとに縦に積む */}
          <dl className="mt-14 border-t border-hairline sm:hidden">
            {ichiniDifferences.map((row) => (
              <div key={row.label} className="border-b border-hairline py-7">
                <dt className="flex items-center gap-3 font-mincho text-sm font-bold tracking-[0.1em] text-gold-200">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 rotate-45 bg-gold-400"
                  />
                  {row.label}
                </dt>
                <dd className="mt-4 flex gap-4 text-[0.82rem] leading-relaxed text-ivory-faint">
                  <span className="w-16 shrink-0 font-mincho text-[0.7rem] tracking-[0.08em]">
                    一度目
                  </span>
                  {row.first}
                </dd>
                <dd className="mt-3 flex gap-4 border-l border-gold-400/50 bg-gold-400/[0.05] py-3 pr-3 pl-3 font-mincho text-[0.9rem] leading-relaxed font-bold text-ivory">
                  <span className="w-[3.25rem] shrink-0 text-[0.7rem] font-normal tracking-[0.08em] text-gold-300">
                    二度目〜
                  </span>
                  {row.next}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ───── III. 年収が上がりやすい動き方 ───── */}
      <section className="border-t border-hairline bg-noir-900 py-24 sm:py-32">
        <Container>
          <SalonHeading
            numeral="III"
            eyebrow="Three Paths"
            title="年収が上がりやすい、三つの動き方"
            lead="どれが合うかは、今の職種と経験年数によって変わります。"
          />
          <div className="mt-16 grid gap-px bg-gold-400/20 md:grid-cols-3">
            {ichiniPatterns.map((pattern, index) => (
              <article
                key={pattern.title}
                className="flex flex-col bg-noir-900 p-8 sm:p-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-5xl leading-none text-gold-400/80 italic">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xs tracking-salon text-gold-300 uppercase">
                    {pattern.en}
                  </span>
                </div>
                <h3 className="mt-8 font-mincho text-xl leading-relaxed font-bold text-ivory">
                  {pattern.title}
                </h3>
                <p className="mt-5 flex-1 text-[0.88rem] leading-loose text-ivory-dim">
                  {pattern.body}
                </p>
                <p className="mt-8 border-t border-hairline pt-5 font-mincho text-[0.8rem] leading-relaxed text-gold-200">
                  {pattern.example}
                </p>
              </article>
            ))}
          </div>

          {/* 診断への入口 */}
          <CornerFrame className="mx-auto mt-20 max-w-3xl px-6 py-14 text-center sm:px-12">
            <p className="font-display text-xs tracking-salon text-gold-300 uppercase">
              Private Assessment
            </p>
            <p className="mt-5 font-mincho text-xl leading-relaxed font-bold text-ivory sm:text-2xl">
              {"あなたに合うのは、どの道か。"}
            </p>
            <p className="mx-auto mt-5 max-w-md text-sm leading-loose text-ivory-dim">
              {"六つの質問にお答えいただくだけで、年収が上がる余地と、あなたの職種で上がりやすい動き方をお返しします。"}
            </p>
            <div className="mt-9">
              <OutlineLink href="/ichini/shindan/">
                年収アップ診断を受ける（約1分）
              </OutlineLink>
            </div>
          </CornerFrame>
        </Container>
      </section>

      {/* ───── IV. 求人の例 ───── */}
      <section className="py-24 sm:py-32">
        <Container>
          <SalonHeading
            numeral="IV"
            eyebrow="Selected Positions"
            title="経験者向け、求人の例"
            lead="経験者向け求人の条件傾向をまとめたモデルケースです。実際にどんな求人があるかは、地域や時期によって変わります。"
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {previewJobs.map((job) => (
              <IchiniJobCard key={job.slug} job={job} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <OutlineLink href="/ichini/jobs/">
              IT以外も含めて、すべての例を見る
            </OutlineLink>
          </div>
        </Container>
      </section>

      {/* ───── V. 流れとサポート ───── */}
      <section className="border-t border-hairline bg-noir-900 py-24 sm:py-32">
        <Container>
          <SalonHeading
            numeral="V"
            eyebrow="The Process"
            title="ご相談から、入社まで"
            lead="求人のご紹介は、入社をご希望の月の3か月前から本格的に始まります。それより前でも、方向決めや職務経歴書の準備はご一緒に進められます。"
          />

          <ol className="relative mx-auto mt-16 max-w-2xl">
            <span
              aria-hidden
              className="absolute top-2 bottom-2 left-[0.95rem] w-px bg-gradient-to-b from-gold-400/70 via-gold-400/30 to-transparent"
            />
            {steps.map((step, index) => (
              <li key={step.title} className="relative pb-12 pl-14 last:pb-0">
                <span className="absolute top-0 left-0 flex h-8 w-8 items-center justify-center border border-gold-400/70 bg-noir-900 font-display text-sm text-gold-200">
                  {index + 1}
                </span>
                <p className="font-display text-xs tracking-salon text-gold-300 uppercase">
                  {step.en}
                </p>
                <p className="mt-2 font-mincho text-lg leading-relaxed font-bold text-ivory">
                  {step.title}
                </p>
                <p className="mt-2 text-[0.88rem] leading-loose text-ivory-dim">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-24">
            <p className="text-center font-display text-xs tracking-salon text-gold-300 uppercase">
              Our Partner
            </p>
            <h3 className="mt-4 text-center font-mincho text-xl font-bold text-ivory sm:text-2xl">
              おつなぎした先で、お任せいただけること
            </h3>
            <Ornament className="mt-7" />
            <ul className="mt-12 grid gap-px bg-gold-400/20 sm:grid-cols-2 lg:grid-cols-3">
              {partnerSupport.strengths.map((item) => (
                <li key={item.title} className="bg-noir-900 p-7">
                  <p className="flex items-center gap-3 font-mincho font-bold text-gold-200">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400"
                    />
                    {item.title}
                  </p>
                  <p className="mt-3 text-[0.85rem] leading-loose text-ivory-dim">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-center text-[0.7rem] text-ivory-faint">
              {`※ 求人数「${partnerSupport.jobCount}」は${partnerSupport.jobCountNote}です。`}
            </p>
          </div>
        </Container>
      </section>

      {/* ───── VI. よくある質問 ───── */}
      <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
        <Container size="narrow">
          <SalonHeading numeral="VI" eyebrow="Questions" title="よくあるご質問" />
          <div className="mt-16">
            <IchiniFaq items={ichiniFaq} />
          </div>
          <p className="mt-12 text-center text-sm leading-loose text-ivory-dim">
            {"未経験からIT業界を目指す方は、姉妹サイトの"}
            <Link
              href="/"
              className="text-gold-200 underline decoration-gold-400/40 underline-offset-4"
            >
              {site.name}
            </Link>
            {"をご覧ください。"}
          </p>
        </Container>
      </section>

      <div className="border-t border-hairline">
        <IchiniCta />
      </div>
    </>
  );
}
