import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/data/courses";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "未経験からの3つのルート",
  description:
    "インフラエンジニア／WEBエンジニア／Salesforceエンジニア。IT未経験から現実的に狙える3つの入口を、デビューまでの期間・費用・想定年収・向き不向きまで正直に比較します。",
};

const accentBar: Record<string, string> = {
  sky: "bg-sky-500",
  violet: "bg-violet-500",
  emerald: "bg-emerald-500",
};

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Routes"
        title="未経験からITに入る、3つのルート"
        lead="どれが優れているかではなく、今のあなたの生活と性格に合うかどうかで選んでください。向いていない人の条件も併記しています。"
      />

      {/* 比較表 */}
      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
            まずは横並びで比較する
          </h2>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-ink-200">
                  <th className="w-40 py-4 pr-4 text-left font-bold whitespace-nowrap text-ink-500">
                    比較項目
                  </th>
                  {courses.map((course) => (
                    <th
                      key={course.slug}
                      className="px-4 py-4 text-left font-bold text-ink-900"
                    >
                      {course.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {(
                  [
                    ["デビューまで", "duration"],
                    ["学習費用", "cost"],
                    ["想定スタート年収", "startSalary"],
                    ["数年後のイメージ", "future"],
                  ] as const
                ).map(([label, key]) => (
                  <tr key={key}>
                    <th className="w-40 py-5 pr-4 text-left align-top font-bold whitespace-nowrap text-ink-500">
                      {label}
                    </th>
                    {courses.map((course) => (
                      <td
                        key={course.slug}
                        className="px-4 py-5 align-top leading-relaxed text-ink-700"
                      >
                        {course[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-ink-500">
            ※ 記載の年収・期間は、未経験入社の一般的な傾向をまとめた目安です。
            実際の条件は求人ごとに異なります。
          </p>
        </Container>
      </section>

      {/* 各ルート詳細 */}
      {courses.map((course, index) => (
        <section
          key={course.slug}
          id={course.slug}
          className={`scroll-mt-20 py-16 sm:py-20 ${
            index % 2 === 0 ? "bg-ink-50" : ""
          }`}
        >
          <Container>
            <div className="flex items-center gap-4">
              <span
                className={`h-12 w-1.5 rounded-full ${accentBar[course.accent]}`}
                aria-hidden
              />
              <div>
                <p className="text-xs font-bold tracking-[0.25em] text-ink-400">
                  ROUTE {course.no}
                </p>
                <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
                  {course.name}
                </h2>
              </div>
            </div>

            <p className="mt-6 text-lg font-bold text-flame-600">
              {course.catch}
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-ink-700">
              {course.summary}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-3xl border border-ink-200 bg-white p-7">
                <h3 className="text-base font-bold text-ink-900">
                  こんな人に向いています
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {course.fitFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-700">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7">
                <h3 className="text-base font-bold text-ink-900">
                  このルートはおすすめしません
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {course.notFitFor.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-ink-700">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-flame-500"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
              <div className="rounded-3xl border border-ink-200 bg-white p-7">
                <h3 className="text-base font-bold text-ink-900">
                  デビューまでの流れ
                </h3>
                <ol className="mt-5 space-y-5">
                  {course.steps.map((step) => (
                    <li key={step.title} className="flex gap-4">
                      <span
                        className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${accentBar[course.accent]}`}
                        aria-hidden
                      />
                      <div>
                        <p className="font-bold text-ink-800">{step.title}</p>
                        <p className="mt-1 text-sm text-ink-600">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-ink-200 bg-white p-7">
                <h3 className="text-base font-bold text-ink-900">
                  身につく代表的なスキル
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-ink-100 px-3.5 py-1.5 text-xs font-medium text-ink-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-8 text-base font-bold text-ink-900">
                  このルートの求人例
                </h3>
                <ul className="mt-4 space-y-2">
                  {jobs
                    .filter((job) => job.courseSlug === course.slug)
                    .map((job) => (
                      <li key={job.slug}>
                        <Link
                          href={`/jobs/${job.slug}/`}
                          className="text-sm font-medium text-flame-600 hover:underline"
                        >
                          {job.title} →
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/entry/"
                className="inline-flex rounded-full bg-ink-900 px-7 py-3.5 font-bold text-white transition hover:bg-ink-800"
              >
                このルートについて相談する
              </Link>
            </div>
          </Container>
        </section>
      ))}

      <CtaBand
        title="迷ったままで大丈夫です"
        lead="3つのうちどれか決めてから相談する必要はありません。話しながら絞り込んでいきましょう。"
      />
    </>
  );
}
