import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { courseBySlug } from "@/data/courses";
import { jobBySlug, jobs } from "@/data/jobs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = jobBySlug(slug);
  if (!job) return {};

  return {
    title: job.title,
    description: `${job.companyType}／${job.area}／${job.salary}。${job.appeal[0]}。学歴不問・未経験歓迎求人のモデルケースです。`,
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { slug } = await params;
  const job = jobBySlug(slug);
  if (!job) notFound();

  const course = courseBySlug(job.courseSlug);
  const related = jobs.filter(
    (item) => item.courseSlug === job.courseSlug && item.slug !== job.slug,
  );

  const details: [string, string][] = [
    ["職種", job.title],
    ["事業内容・規模", job.companyType],
    ["勤務地", job.area],
    ["給与", `${job.salary}（${job.salaryNote}）`],
    ["雇用形態", job.employment],
    ["勤務時間", job.workStyle],
    ["休日・休暇", job.holidays],
    ["研修・教育", job.training],
  ];

  return (
    <>
      <PageHero eyebrow="Job model" title={job.title} lead={job.companyType} />

      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <nav className="text-sm text-ink-500">
            <Link href="/jobs/" className="hover:text-flame-600">
              求人の例
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-700">{job.title}</span>
          </nav>

          <div className="mt-6 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-flame-50 px-3.5 py-1.5 text-sm font-bold text-flame-700"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-9 rounded-2xl border border-ink-200 bg-ink-50 p-5 text-sm leading-relaxed text-ink-600">
            これは特定企業の求人票ではなく、条件の傾向をまとめたモデルケースです。
            実際の企業名・正式な募集要項は、面談時に提携先の職業紹介事業者から個別にご案内します。
          </div>

          <h2 className="mt-12 text-xl font-bold text-ink-900">募集条件</h2>
          <dl className="mt-5 divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200">
            {details.map(([label, value]) => (
              <div key={label} className="grid gap-1 p-5 sm:grid-cols-[9rem_1fr] sm:gap-4">
                <dt className="text-sm font-bold text-ink-500">{label}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-ink-800">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink-200 p-7">
              <h2 className="text-base font-bold text-ink-900">応募条件</h2>
              <ul className="mt-4 space-y-2.5">
                {job.requirements.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-ink-700">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-400"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-ink-200 p-7">
              <h2 className="text-base font-bold text-ink-900">歓迎する経験</h2>
              <ul className="mt-4 space-y-2.5">
                {job.welcome.map((item) => (
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
          </div>

          <div className="mt-6 rounded-3xl border-2 border-flame-200 bg-flame-50 p-7">
            <h2 className="text-base font-bold text-ink-900">
              この求人のポイント
            </h2>
            <ul className="mt-4 space-y-2.5">
              {job.appeal.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-700">
                  <span className="shrink-0 font-bold text-flame-600">◎</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {course ? (
            <div className="mt-12 rounded-3xl border border-ink-200 p-7">
              <p className="text-sm font-bold text-ink-500">
                このルートについて
              </p>
              <h2 className="mt-2 text-lg font-bold text-ink-900">
                {course.name}｜{course.catch}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {course.summary}
              </p>
              <Link
                href={`/courses/#${course.slug}`}
                className="mt-5 inline-flex font-bold text-flame-600 hover:underline"
              >
                ルートの詳細を見る →
              </Link>
            </div>
          ) : null}

          {related.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-lg font-bold text-ink-900">
                同じルートの他の求人例
              </h2>
              <ul className="mt-5 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/jobs/${item.slug}/`}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 px-5 py-4 transition hover:border-flame-300"
                    >
                      <span className="font-bold text-ink-800">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-sm text-ink-500">
                        {item.salary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>

      <CtaBand
        title="この条件に近い求人があるか聞いてみる"
        lead="希望勤務地と入社希望時期を教えていただければ、実際に紹介できる求人をお調べします。"
      />
    </>
  );
}
