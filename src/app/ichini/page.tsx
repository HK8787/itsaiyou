import Link from "next/link";
import { Container } from "@/components/Container";
import { IchiniCta } from "@/components/ichini/Cta";
import { IchiniFaq } from "@/components/ichini/Faq";
import { IchiniJobRow } from "@/components/ichini/JobCard";
import {
  GoldLineButton,
  SalonLineNote,
  SectionLabel,
  TextLink,
} from "@/components/ichini/ui";
import {
  ichiniCareer,
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
    title: "LINEで状況を送る",
    body: "今の仕事、経験年数、年収、いつ頃動きたいか。分かる範囲で大丈夫です。",
  },
  {
    title: "狙える方向を整理する",
    body: "今の経験がどこで評価されそうか、どう動けば条件が上がりやすいかを一緒に考えます。",
  },
  {
    title: "提携先の担当者とつながる",
    body: "ご希望があれば、厚生労働大臣の許可を受けた提携先の担当者をご紹介します。",
  },
  {
    title: "求人・書類・面接",
    body: "条件に合う求人探しから、求人ごとの書類の調整、面接対策まで。",
  },
];

export default function IchiniHome() {
  return (
    <>
      {/* ───── ヒーロー ───── */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <Container className="relative grid gap-12 pt-20 pb-20 sm:pt-28 sm:pb-24 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-[0.82rem] tracking-[0.08em] text-gold-400">
              2回目・3回目の転職相談
            </p>
            <h1 className="mt-8 font-mincho text-[1.9rem] leading-[1.55] font-bold text-ivory sm:text-[3.6rem] sm:leading-[1.42]">
              {"二回目の転職は、"}
              <br />
              {"一回目と同じ"}
              <br className="sm:hidden" />
              {"やり方では"}
              <br />
              <span className="text-gold-300">{"上がらない。"}</span>
            </h1>
            <p className="mt-10 max-w-xl text-[0.98rem] leading-[2.05] text-ivory-dim">
              {"経験は、もう十分にあります。足りないのは、それを条件に変える伝え方です。" +
                "今の経歴でどこまで狙えるのか、どう動けば年収が上がりやすいのか。" +
                "遠回しにせず、正直にお答えします。"}
            </p>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
              <GoldLineButton size="lg">LINEで相談する（無料）</GoldLineButton>
              <TextLink href="/ichini/shindan/">
                先に、年収アップ診断をしてみる
              </TextLink>
            </div>
            <div className="mt-5">
              <SalonLineNote />
            </div>

            <p className="mt-16 text-xs leading-[1.9] text-ivory-faint">
              {"相談は何度でも無料　／　ご紹介は正社員求人のみ　／　" +
                `取り扱い求人 ${partnerSupport.jobCount}（${partnerSupport.jobCountNote}）`}
            </p>
          </div>

          {/* PCだけ、右端に縦書きの一行を置く。ページ内で唯一の「崩し」 */}
          <p
            aria-hidden
            className="hidden self-center font-mincho text-[4.2rem] leading-none font-bold tracking-[0.18em] text-white/[0.06] [writing-mode:vertical-rl] lg:block"
          >
            経験を、年収に変える。
          </p>
        </Container>
      </section>

      {/* ───── 相談に乗る人 ───── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionLabel
              label="相談に乗る人"
              title={
                <>
                  {"調理の仕事から、"}
                  <br />
                  {"一段ずつ上がってきました。"}
                </>
              }
              lead={
                "このサイトを運営している私自身、IT業界とは縁のない仕事から入り、ヘルプデスク、SAPコンサルと仕事を変えてきました。" +
                "ヘルプデスクではリーダーとして、新しく入ってくる人を受け入れる側にも立ちました。" +
                "「経験者のどこが見られるか」は、入る側と受け入れる側、両方から見てきたことです。"
              }
            />

            <ol className="border-t border-white/[0.08]">
              {ichiniCareer.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-2 border-b border-white/[0.08] py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
                >
                  <p className="text-[0.8rem] text-gold-400 sm:pt-1">
                    {item.period}
                  </p>
                  <div>
                    <p className="font-mincho text-xl font-bold text-ivory">
                      {item.title}
                    </p>
                    <p className="mt-2 text-[0.88rem] leading-[1.9] text-ivory-dim">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ───── こんな方へ ───── */}
      <section className="border-t border-white/[0.07] bg-noir-900 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr] lg:gap-20">
            <SectionLabel
              label="こんな相談が多いです"
              title={
                <>
                  {"ひとつでも当てはまれば、"}
                  <br />
                  {"話を聞くだけでも。"}
                </>
              }
            />
            <ul>
              {ichiniWorries.map((worry) => (
                <li
                  key={worry}
                  className="border-b border-white/[0.08] py-5 font-mincho text-[1.05rem] leading-relaxed text-ivory first:pt-0 sm:text-lg"
                >
                  {`「${worry}」`}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───── 一回目と二回目の違い ───── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionLabel
            label="一回目との違い"
            title="一回目は伸びしろで採られる。二回目からは、経験の中身で値段がつく。"
            lead="同じやり方で二回目の転職をすると、経験があるのに条件が上がらない、ということが起きます。"
          />

          <div className="mt-14 border-t border-white/[0.08]">
            <div className="hidden grid-cols-[8rem_1fr_1fr] gap-8 border-b border-white/[0.08] py-4 text-[0.75rem] text-ivory-faint sm:grid">
              <span />
              <span>一回目の転職</span>
              <span className="text-gold-400">二回目から</span>
            </div>
            {ichiniDifferences.map((row) => (
              <div
                key={row.label}
                className="grid gap-x-8 gap-y-2 border-b border-white/[0.08] py-6 sm:grid-cols-[8rem_1fr_1fr]"
              >
                <p className="font-mincho font-bold text-ivory">{row.label}</p>
                <p className="text-[0.88rem] leading-relaxed text-ivory-faint">
                  <span className="mr-3 text-[0.72rem] sm:hidden">一回目</span>
                  {row.first}
                </p>
                <p className="text-[0.92rem] leading-relaxed text-gold-200">
                  <span className="mr-3 text-[0.72rem] text-gold-400 sm:hidden">
                    二回目から
                  </span>
                  {row.next}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ───── 動き方 ───── */}
      <section className="border-t border-white/[0.07] bg-noir-900 py-20 sm:py-28">
        <Container>
          <SectionLabel
            label="年収が上がりやすい動き方"
            title="どこへ動くかで、上がり方は変わります。"
            lead="合う動き方は、今の職種と経験年数によって違います。"
          />
          <ol className="mt-14 border-t border-white/[0.08]">
            {ichiniPatterns.map((pattern, index) => (
              <li
                key={pattern.title}
                className="grid gap-4 border-b border-white/[0.08] py-9 md:grid-cols-[4rem_1fr_1fr] md:gap-10"
              >
                <span className="font-mincho text-3xl text-gold-400">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-mincho text-xl leading-relaxed font-bold text-ivory">
                    {pattern.title}
                  </h3>
                  <p className="mt-3 text-[0.82rem] text-gold-300">
                    {pattern.example}
                  </p>
                </div>
                <p className="text-[0.9rem] leading-[2] text-ivory-dim">
                  {pattern.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-col gap-6 border border-gold-400/40 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <p className="font-mincho text-lg font-bold text-ivory sm:text-xl">
                自分にはどれが合うか、6問で分かります。
              </p>
              <p className="mt-2 text-sm text-ivory-dim">
                年収が上がる余地と、職種ごとの動き方をお返しします。約1分です。
              </p>
            </div>
            <Link
              href="/ichini/shindan/"
              className="inline-flex shrink-0 items-center justify-between gap-8 border border-gold-400 px-6 py-3.5 text-sm font-bold text-gold-200 transition-colors duration-300 hover:bg-gold-400 hover:text-noir-950"
            >
              年収アップ診断
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </section>

      {/* ───── 求人の例 ───── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionLabel
              label="求人の例"
              title="経験者向けの求人は、たとえばこんな形です。"
            />
            <div className="shrink-0">
              <TextLink href="/ichini/jobs/">IT以外も含めて見る</TextLink>
            </div>
          </div>
          <ul className="mt-12 border-t border-white/[0.08]">
            {ichiniJobs.slice(0, 4).map((job) => (
              <IchiniJobRow key={job.slug} job={job} />
            ))}
          </ul>
          <p className="mt-6 text-xs leading-[1.9] text-ivory-faint">
            {"※ 経験者向け求人の条件傾向をまとめたモデルケースで、実在の求人票ではありません。" +
              "実際にどんな求人があるかは、地域や時期によって変わります。"}
          </p>
        </Container>
      </section>

      {/* ───── 流れ ───── */}
      <section className="border-t border-white/[0.07] bg-noir-900 py-20 sm:py-28">
        <Container>
          <SectionLabel
            label="進め方"
            title="相談から入社まで"
            lead="求人のご紹介は、入社したい月の3か月前から本格的に始まります（4月入社なら1月から）。それより前でも、方向決めや職務経歴書の準備は一緒に進められます。"
          />
          <ol className="mt-14 grid gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-noir-900 py-7 pr-6 sm:p-7">
                <p className="text-[0.75rem] text-gold-400">{`${index + 1}.`}</p>
                <p className="mt-3 font-mincho text-lg font-bold text-ivory">
                  {step.title}
                </p>
                <p className="mt-3 text-[0.86rem] leading-[1.9] text-ivory-dim">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <h3 className="font-mincho text-xl font-bold text-ivory sm:text-2xl">
                つないだ先で、やってもらえること
              </h3>
              <p className="mt-4 text-[0.88rem] leading-[1.9] text-ivory-dim">
                {`求人の紹介から先は、提携先の担当者が受け持ちます。取り扱い求人は${partnerSupport.jobCount}（${partnerSupport.jobCountNote}）。`}
              </p>
            </div>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              {partnerSupport.strengths.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-white/[0.08] py-5"
                >
                  <dt className="font-bold text-ivory">{item.title}</dt>
                  <dd className="mt-2 text-[0.84rem] leading-[1.9] text-ivory-dim">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* ───── よくある質問 ───── */}
      <section id="faq" className="scroll-mt-20 py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
            <div>
              <SectionLabel label="よくある質問" title="先に聞かれることが多いもの" />
              <p className="mt-6 text-sm leading-[1.9] text-ivory-dim">
                {"未経験からIT業界を目指す方は、姉妹サイトの"}
                <Link
                  href="/"
                  className="border-b border-ivory-faint/60 text-ivory transition hover:border-gold-300"
                >
                  {site.name}
                </Link>
                {"へ。"}
              </p>
            </div>
            <IchiniFaq items={ichiniFaq} />
          </div>
        </Container>
      </section>

      <IchiniCta />
    </>
  );
}
