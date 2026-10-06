import type { IchiniJob } from "@/data/ichini";

/** 求人の例。高級店のお品書きのように、余白と罫線だけで見せる */
export function IchiniJobCard({ job }: { job: IchiniJob }) {
  return (
    <article className="group relative flex flex-col border border-hairline bg-noir-900/60 p-7 transition duration-500 hover:border-gold-400/50 sm:p-8">
      <span
        aria-hidden
        className="absolute top-0 left-8 h-px w-12 bg-gold-400 transition-all duration-500 group-hover:w-24"
      />
      <div className="flex items-center justify-between">
        <span className="font-display text-[0.7rem] tracking-salon text-gold-300 uppercase">
          {job.field === "IT" ? "Technology" : "Industry"}
        </span>
        <span className="text-[0.68rem] tracking-[0.1em] whitespace-nowrap text-ivory-faint">
          モデルケース
        </span>
      </div>
      <h3 className="mt-5 font-mincho text-lg leading-relaxed font-bold text-ivory text-balance-ja">
        {job.title}
      </h3>
      <p className="mt-3 text-[0.82rem] leading-relaxed text-ivory-dim">
        {job.forWhom}
      </p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-[0.7rem] tracking-[0.2em] text-ivory-faint">
          年収
        </span>
        <span className="h-px flex-1 translate-y-[-0.25rem] border-b border-dotted border-gold-400/40" />
        <span className="text-gold-foil font-mincho text-xl font-bold">
          {job.salary.replace(/^年収/, "")}
        </span>
      </div>
      <p className="mt-2 text-right text-[0.7rem] text-ivory-faint">
        {job.salaryNote}
      </p>

      <ul className="mt-6 space-y-2.5 border-t border-hairline pt-6">
        {job.points.map((point) => (
          <li
            key={point}
            className="flex gap-3 text-[0.84rem] leading-relaxed text-ivory-dim"
          >
            <span
              aria-hidden
              className="mt-[0.6rem] h-1 w-1 shrink-0 rotate-45 bg-gold-400"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}
