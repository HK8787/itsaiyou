import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/data/courses";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "求人の例",
  description:
    "学歴不問・未経験歓迎のIT求人にはどんな条件のものがあるのか。給与・休日・研修体制・応募条件のモデルケースを職種別にまとめました。",
};

export default function JobsPage() {
  return (
    <>
      <PageHero
        eyebrow="Jobs"
        title="こんな求人を扱っています"
        lead="実際にご紹介できる求人のイメージを、条件の傾向としてまとめました。ここに載っていない求人も多数あるため、条件が合わない場合もまずご相談ください。"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6 text-sm leading-relaxed text-ink-600">
            <p className="font-bold text-ink-800">
              掲載内容についての大切なお知らせ
            </p>
            <p className="mt-2">
              このページに掲載しているのは、特定企業の求人票ではありません。
              未経験歓迎求人に多い条件の傾向をまとめたモデルケースです。
              実際の企業名・正式な募集要項・雇用条件は、面談時に提携先の職業紹介事業者から個別にご案内します。
            </p>
          </div>

          {/* 職種別に一覧 */}
          {courses.map((course) => {
            const list = jobs.filter((job) => job.courseSlug === course.slug);
            if (list.length === 0) return null;

            return (
              <div key={course.slug} className="mt-14">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-xl font-bold text-ink-900 sm:text-2xl">
                    {course.name}の求人例
                  </h2>
                  <Link
                    href={`/courses/#${course.slug}`}
                    className="text-sm font-bold text-flame-600 hover:underline"
                  >
                    このルートの詳細 →
                  </Link>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {list.map((job) => (
                    <Link
                      key={job.slug}
                      href={`/jobs/${job.slug}/`}
                      className="flex flex-col rounded-3xl border border-ink-200 bg-white p-7 transition hover:border-flame-300 hover:shadow-lg hover:shadow-ink-900/5"
                    >
                      <div className="flex flex-wrap gap-1.5">
                        {job.tags.map((tag) => (
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
                      <p className="mt-2 text-sm text-ink-500">
                        {job.companyType}
                      </p>

                      <dl className="mt-5 flex-1 space-y-1.5 text-sm text-ink-600">
                        <div className="flex gap-2">
                          <dt className="w-16 shrink-0 text-ink-400">勤務地</dt>
                          <dd>{job.area}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-16 shrink-0 text-ink-400">給与</dt>
                          <dd className="font-bold text-ink-800">
                            {job.salary}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-16 shrink-0 text-ink-400">
                            雇用形態
                          </dt>
                          <dd>{job.employment}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="w-16 shrink-0 text-ink-400">休日</dt>
                          <dd>{job.holidays}</dd>
                        </div>
                      </dl>

                      <p className="mt-5 text-sm font-bold text-flame-600">
                        詳しく見る →
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <CtaBand
        title="条件に合う求人があるか、聞いてみませんか"
        lead="勤務地・給与・休日の希望を教えていただければ、実際に紹介できる求人があるかをお調べします。"
      />
    </>
  );
}
