import type { IchiniJob } from "@/data/ichini";

export function IchiniJobCard({ job }: { job: IchiniJob }) {
  return (
    <article className="flex flex-col rounded-3xl border border-ink-200 bg-white p-6 sm:p-7">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
          {job.field}
        </span>
        <span className="text-xs text-ink-500">モデルケース</span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink-900">{job.title}</h3>
      <p className="mt-2 text-sm text-ink-600">
        <b className="text-ink-800">向いている方：</b>
        {job.forWhom}
      </p>
      <p className="mt-4 text-xl font-bold text-ink-900">{job.salary}</p>
      <p className="mt-1 text-xs text-ink-500">{job.salaryNote}</p>
      <ul className="mt-4 space-y-1.5">
        {job.points.map((point) => (
          <li key={point} className="flex gap-2 text-sm text-ink-700">
            <span className="mt-0.5 shrink-0 font-bold text-amber-600">✓</span>
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
