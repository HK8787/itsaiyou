import type { IchiniJob } from "@/data/ichini";

/**
 * 求人の例を1行で見せる。カードを3枚並べる形は使わない
 * （同じ箱が等間隔に並ぶと、テンプレートにしか見えないため）。
 */
export function IchiniJobRow({
  job,
  detailed = false,
}: {
  job: IchiniJob;
  detailed?: boolean;
}) {
  return (
    <li className="grid gap-x-10 gap-y-3 border-b border-white/[0.08] py-8 md:grid-cols-[1fr_auto]">
      <div>
        <p className="text-[0.72rem] tracking-[0.06em] text-ivory-faint">
          {job.field === "IT" ? "IT" : "IT以外"}
          <span className="mx-2">／</span>
          モデルケース
        </p>
        <h3 className="mt-2 font-mincho text-lg leading-relaxed font-bold text-ivory sm:text-xl">
          {job.title}
        </h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-ivory-dim">
          {`${job.forWhom}に。`}
        </p>
        {detailed ? (
          <ul className="mt-5 space-y-2">
            {job.points.map((point) => (
              <li
                key={point}
                className="relative pl-4 text-[0.86rem] leading-relaxed text-ivory-dim before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-2 before:bg-gold-400"
              >
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="md:text-right">
        <p className="font-mincho text-xl font-bold whitespace-nowrap text-gold-300 sm:text-2xl">
          {job.salary}
        </p>
        <p className="mt-1 text-[0.72rem] text-ivory-faint">{job.salaryNote}</p>
      </div>
    </li>
  );
}
