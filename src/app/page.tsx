import Link from "next/link";
import { Container, SectionHeading } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Diagnosis } from "@/components/Diagnosis";
import { FaqList } from "@/components/FaqList";
import { LineButton } from "@/components/LineButton";
import { courses } from "@/data/courses";
import { faqs } from "@/data/faq";
import { guides } from "@/data/guides";
import { jobs } from "@/data/jobs";

const worries = [
  "高卒だから、募集要項の「大卒以上」で毎回止まる",
  "専門を出たけど、結局まったく違う仕事をしている",
  "パソコンなんてスマホしか触ってこなかった",
  "エンジニアって、頭がいい人の職業だと思っている",
  "転職を繰り返していて、次こそ失敗できない",
  "気になってはいるけど、何から始めればいいのか分からない",
];

const promises = [
  {
    title: "費用は一切かかりません",
    body: "相談から入社まで、あなたの負担はゼロ円です。職業紹介の費用は採用した企業側が負担する仕組みのため、求職者から手数料をいただくことはありません（職業安定法により原則禁止されています）。",
  },
  {
    title: "無理に勧めません",
    body: "話を伺った結果、今はITより別の道のほうがいいと思えば、正直にそう言います。入社後すぐ辞めてしまうのは、お互いにとって損だからです。判断材料を増やすつもりで使ってください。",
  },
  {
    title: "しんどい部分も先に話します",
    body: "初年度に年収が下がる可能性、夜勤のある求人、入社後も勉強が続くこと。都合の悪い話を後出しされるのがいちばん困るはずなので、最初に共有します。",
  },
];

const steps = [
  {
    no: "01",
    title: "LINEで友だち追加",
    body: "所要1分。この時点では何も決めなくて大丈夫です。",
  },
  {
    no: "02",
    title: "現状のヒアリング",
    body: "13項目の簡単な質問にお答えいただきます。フォームからでもLINEからでもOK。",
  },
  {
    no: "03",
    title: "方向性のすり合わせ",
    body: "生活費・学習時間・勤務地などの条件から、現実的なルートを一緒に絞り込みます。",
  },
  {
    no: "04",
    title: "提携エージェントへおつなぎ",
    body: "求人紹介と選考は、許可を受けた提携先が担当。面接対策はこちらでも並走します。",
  },
];

const accentBg: Record<string, string> = {
  sky: "from-sky-500 to-sky-600",
  violet: "from-violet-500 to-violet-600",
  emerald: "from-emerald-500 to-emerald-600",
};

export default function HomePage() {
  return (
    <>
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div
          className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-flame-500/25 blur-3xl"
          aria-hidden
        />
        <Container className="relative py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-white/25 px-4 py-1.5 text-xs font-bold tracking-wide text-flame-200 sm:text-sm">
              学歴不問・IT未経験専門のキャリア相談窓口
            </p>

            <h1 className="mt-7 text-3xl leading-[1.35] font-bold text-white sm:text-4xl md:text-[3.1rem] md:leading-[1.3] text-balance-ja">
              「自分なんて、IT業界とは
              <br className="hidden sm:block" />
              無縁だ」と思っている人へ。
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-100 sm:text-lg">
              高卒でも、専門卒でも、フリーターでも、まったくの異業種からでも、
              ITの現場に入っていった人を私たちは何人も見てきました。
              必要なのは学歴ではなく、
              <strong className="text-white">最初の一歩をどう設計するか</strong>
              だけです。
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <LineButton size="lg">LINEで無料相談する</LineButton>
              <Link
                href="#diagnosis"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 px-7 py-4 font-bold text-white transition hover:bg-white/10"
              >
                30秒で適性をみる
              </Link>
            </div>

            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
              {[
                { value: "0円", label: "相談・紹介の費用" },
                { value: "学歴不問", label: "扱う求人の中心" },
                { value: "3ルート", label: "未経験からの入口" },
                { value: "何度でも", label: "相談の回数制限" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-bold text-flame-300 sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-200 sm:text-sm">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* 共感パート */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Worries"
            title={
              <>
                ひとつでも当てはまるなら、
                <br className="hidden sm:block" />
                読む価値はあります
              </>
            }
            lead="ここに並んでいるのは、実際に相談を受けてきた中でよく出てくる言葉です。全部、乗り越えられる範囲の話です。"
          />

          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {worries.map((worry) => (
              <li
                key={worry}
                className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50 px-5 py-4"
              >
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-flame-400"
                  aria-hidden
                />
                <span className="text-[0.95rem] text-ink-700">{worry}</span>
              </li>
            ))}
          </ul>

          <div className="mx-auto mt-12 max-w-3xl rounded-3xl border-2 border-flame-200 bg-flame-50 p-7 sm:p-9">
            <p className="text-lg leading-relaxed font-bold text-ink-900 sm:text-xl">
              IT業界は、入ってしまえば「何年やったか」の世界です。
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">
              最終学歴が効いてくるのは、入口のほんの一瞬だけ。
              実務経験が1年、2年と積み上がるにつれて、経歴書の中で学歴の欄はどんどん小さくなっていきます。
              だからこそ、入口の設計がすべてです。
              どのルートから入るかで、その後の数年がまるごと変わります。
            </p>
          </div>
        </Container>
      </section>

      {/* 診断 */}
      <section id="diagnosis" className="scroll-mt-20 bg-ink-50 py-20 sm:py-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Diagnosis"
            title="30秒でわかる、あなたの入口診断"
            lead="4つの質問に答えるだけ。生活費・性格・学習時間・勤務条件から、現実的に狙えるルートを提案します。"
          />
          <div className="mt-11">
            <Diagnosis />
          </div>
        </Container>
      </section>

      {/* 3つのルート */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Routes"
            title="未経験からの入口は、大きく3つ"
            lead="どれが優れているという話ではありません。今の生活と性格に合うものを選ぶのが、いちばん失敗しない選び方です。"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5"
              >
                <div
                  className={`bg-gradient-to-br px-7 py-6 text-white ${accentBg[course.accent]}`}
                >
                  <p className="text-xs font-bold tracking-[0.25em] opacity-80">
                    ROUTE {course.no}
                  </p>
                  <h3 className="mt-2 text-xl font-bold">{course.name}</h3>
                  <p className="mt-2 text-sm opacity-95">{course.catch}</p>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <dl className="space-y-3 text-sm">
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 font-bold text-ink-500">
                        デビューまで
                      </dt>
                      <dd className="flex-1 text-ink-700">
                        {course.duration}
                      </dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 font-bold text-ink-500">
                        学習費用
                      </dt>
                      <dd className="flex-1 text-ink-700">{course.cost}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 font-bold text-ink-500">
                        想定年収
                      </dt>
                      <dd className="flex-1 text-ink-700">
                        {course.startSalary}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-6 flex-1 text-sm leading-relaxed text-ink-600">
                    {course.summary}
                  </p>

                  <Link
                    href={`/courses/#${course.slug}`}
                    className="mt-7 inline-flex items-center gap-1.5 font-bold text-flame-600 hover:gap-2.5"
                  >
                    このルートを詳しく見る
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* 3つの約束 */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Promise"
            title="この窓口が、先に約束しておくこと"
            lead="転職支援には不透明なイメージがつきものです。だから最初に、こちらの立場と方針をはっきりさせておきます。"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promises.map((promise, index) => (
              <div
                key={promise.title}
                className="rounded-3xl border border-ink-200 bg-white p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-flame-100 text-lg font-bold text-flame-600">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">
                  {promise.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {promise.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl rounded-2xl border border-ink-200 bg-white p-6 text-sm leading-relaxed text-ink-600">
            なお当窓口は職業紹介事業者ではありません。キャリアの初期相談と情報提供を行い、
            方向性が固まった段階で、厚生労働大臣の許可を受けた提携先（有料職業紹介事業者）へおつなぎします。
            求人紹介・面接調整・雇用条件の提示はすべて提携先が行います。
            <Link
              href="/about/"
              className="ml-1 font-bold text-flame-600 underline"
            >
              詳しい仕組みを見る
            </Link>
          </p>
        </Container>
      </section>

      {/* 流れ */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Flow"
            title="相談から入社までの流れ"
            lead="最初のアクションはLINEの友だち追加だけ。そこから先は、あなたのペースで進めて大丈夫です。"
          />

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li
                key={step.no}
                className="relative rounded-3xl border border-ink-200 bg-white p-7"
              >
                <span className="text-3xl font-bold text-ink-100">
                  {step.no}
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ガイド */}
      <section className="bg-ink-900 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Guide"
              align="left"
              tone="light"
              title="相談する前に、読んでおいてほしいこと"
              lead="面接で聞かれること、職種の違い、しんどい部分。知っているだけで結果が変わる情報をまとめました。"
            />
            <Link
              href="/guide/"
              className="rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              ガイドをすべて見る
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {guides.slice(0, 3).map((guide) => (
              <Link
                key={guide.slug}
                href={`/guide/${guide.slug}/`}
                className="group flex flex-col rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition hover:bg-white/10"
              >
                <p className="text-xs font-bold tracking-widest text-flame-300">
                  {guide.tag}
                </p>
                <h3 className="mt-3 text-lg leading-snug font-bold text-white">
                  {guide.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-200">
                  {guide.lead}
                </p>
                <p className="mt-5 text-sm font-bold text-flame-300 group-hover:underline">
                  読む（約{guide.readingMinutes}分）→
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 求人例 */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Jobs"
              align="left"
              title="こんな求人を扱っています"
              lead="未経験歓迎求人の条件傾向をまとめたモデルケースです。実際の募集要項は面談時に個別にご案内します。"
            />
            <Link
              href="/jobs/"
              className="rounded-full border border-ink-300 px-6 py-3 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
            >
              求人の例をすべて見る
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <Link
                key={job.slug}
                href={`/jobs/${job.slug}/`}
                className="flex flex-col rounded-3xl border border-ink-200 bg-white p-7 transition hover:border-flame-300 hover:shadow-lg hover:shadow-ink-900/5"
              >
                <div className="flex flex-wrap gap-1.5">
                  {job.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-flame-50 px-3 py-1 text-xs font-bold text-flame-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-lg leading-snug font-bold text-ink-900">
                  {job.title}
                </h3>
                <p className="mt-2 text-sm text-ink-500">{job.companyType}</p>
                <dl className="mt-5 flex-1 space-y-1.5 text-sm text-ink-600">
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-ink-400">勤務地</dt>
                    <dd>{job.area}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-ink-400">給与</dt>
                    <dd className="font-bold text-ink-800">{job.salary}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-ink-400">休日</dt>
                    <dd>{job.holidays}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm font-bold text-flame-600">
                  詳しく見る →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-ink-50 py-20 sm:py-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="FAQ"
            title="よくある質問"
            lead="相談前に多く寄せられる質問をまとめました。ここにない疑問はLINEで直接お聞きください。"
          />
          <div className="mt-11">
            <FaqList items={faqs.slice(0, 6)} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq/"
              className="font-bold text-flame-600 hover:underline"
            >
              よくある質問をすべて見る →
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
