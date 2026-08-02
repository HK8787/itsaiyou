"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LineButton } from "@/components/LineButton";
import { courses } from "@/data/courses";

type CourseSlug = "infra" | "web" | "salesforce";

type Choice = {
  label: string;
  hint?: string;
  /** 各ルートへの加点 */
  score: Partial<Record<CourseSlug, number>>;
};

type Question = {
  id: string;
  title: string;
  note: string;
  choices: Choice[];
};

const questions: Question[] = [
  {
    id: "money",
    title: "いつから働き始めたいですか？",
    note: "生活費の余裕がどれくらいあるかで、現実的なルートが変わります。",
    choices: [
      {
        label: "できるだけ早く。収入を止めたくない",
        hint: "貯金に余裕がない／すぐに働きたい",
        score: { infra: 3 },
      },
      {
        label: "3〜6ヶ月は準備期間にあてられる",
        hint: "在職中、または実家住まいなどで少し余裕がある",
        score: { web: 3, salesforce: 1 },
      },
      {
        label: "半年以上かけてでも、条件のいい所へ行きたい",
        hint: "腰を据えて資格から取りにいける",
        score: { salesforce: 3, web: 1 },
      },
    ],
  },
  {
    id: "style",
    title: "仕事の内容として、どちらが近いですか？",
    note: "どちらが優れているという話ではなく、性格との相性の問題です。",
    choices: [
      {
        label: "動いているものを守る・支える方が向いていそう",
        hint: "トラブル対応、確認作業、手順を守るのが得意",
        score: { infra: 3 },
      },
      {
        label: "自分の手で何かを作る方が向いていそう",
        hint: "モノづくり、目に見える成果物が欲しい",
        score: { web: 3 },
      },
      {
        label: "仕組みを整えて、業務を良くする方が向いていそう",
        hint: "効率化や、人と業務の間をつなぐ役割",
        score: { salesforce: 3 },
      },
    ],
  },
  {
    id: "study",
    title: "平日、学習にどれくらい時間を使えますか？",
    note: "入社後も学び続ける業界なので、正直に答えてください。",
    choices: [
      {
        label: "1日30分〜1時間くらい",
        score: { infra: 2 },
      },
      {
        label: "1日1〜2時間は確保できる",
        score: { web: 2, salesforce: 1 },
      },
      {
        label: "1日2時間以上、本気で時間を作れる",
        score: { salesforce: 2, web: 1 },
      },
    ],
  },
  {
    id: "night",
    title: "夜勤・シフト勤務についてはどうですか？",
    note: "インフラ系の求人には夜勤を含むものが一定数あります。",
    choices: [
      {
        label: "条件次第では受け入れられる",
        hint: "手当がつくならむしろ歓迎",
        score: { infra: 3 },
      },
      { label: "できれば避けたい", score: { web: 1, salesforce: 1 } },
      {
        label: "絶対に無理。日勤・土日祝休みが条件",
        score: { web: 2, salesforce: 2 },
      },
    ],
  },
];

const accentRing: Record<string, string> = {
  sky: "border-sky-300 bg-sky-50",
  violet: "border-violet-300 bg-violet-50",
  emerald: "border-emerald-300 bg-emerald-50",
};

export function Diagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const finished = step >= questions.length;

  const result = useMemo(() => {
    if (!finished) return null;

    const totals: Record<CourseSlug, number> = {
      infra: 0,
      web: 0,
      salesforce: 0,
    };

    questions.forEach((question) => {
      const index = answers[question.id];
      if (index === undefined) return;
      const choice = question.choices[index];
      (Object.keys(choice.score) as CourseSlug[]).forEach((key) => {
        totals[key] += choice.score[key] ?? 0;
      });
    });

    const ranked = (Object.keys(totals) as CourseSlug[]).sort(
      (a, b) => totals[b] - totals[a],
    );

    return {
      best: courses.find((course) => course.slug === ranked[0])!,
      second: courses.find((course) => course.slug === ranked[1])!,
      totals,
    };
  }, [answers, finished]);

  const select = (questionId: string, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  if (finished && result) {
    const max = Math.max(...Object.values(result.totals), 1);

    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-9">
        <p className="text-sm font-bold tracking-widest text-flame-600">
          診断結果
        </p>
        <h3 className="mt-3 text-xl font-bold text-ink-900 sm:text-2xl">
          あなたに近いのは
          <span className="text-flame-600">「{result.best.name}」</span>
          ルートです
        </h3>
        <p className="mt-4 text-[0.95rem] text-ink-600">
          {result.best.catch}。{result.best.summary}
        </p>

        <div className="mt-7 space-y-3">
          {courses.map((course) => {
            const value = result.totals[course.slug as CourseSlug];
            return (
              <div key={course.slug}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span
                    className={
                      course.slug === result.best.slug
                        ? "font-bold text-ink-900"
                        : "text-ink-600"
                    }
                  >
                    {course.name}
                  </span>
                  <span className="text-ink-500">{value} pt</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className={
                      course.slug === result.best.slug
                        ? "h-full rounded-full bg-flame-500"
                        : "h-full rounded-full bg-ink-300"
                    }
                    style={{ width: `${Math.round((value / max) * 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-7 rounded-2xl border p-5 ${accentRing[result.best.accent]}`}
        >
          <p className="text-sm font-bold text-ink-800">
            次点は「{result.second.name}」でした
          </p>
          <p className="mt-2 text-sm text-ink-700">
            差が小さい場合、どちらを選んでも大きく外れることはありません。
            最終的には勤務地・給与・学習期間といった現実的な条件で決めるのが確実です。
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href={`/courses/#${result.best.slug}`}
            className="flex-1 rounded-full bg-ink-900 py-3.5 text-center font-bold text-white transition hover:bg-ink-800"
          >
            {result.best.short}ルートを詳しく見る
          </Link>
          <Link
            href="/entry/"
            className="flex-1 rounded-full border border-ink-300 py-3.5 text-center font-bold text-ink-700 transition hover:bg-ink-50"
          >
            この結果を相談する
          </Link>
        </div>

        <div className="mt-6 text-center">
          <LineButton note="診断結果を見ながら、LINEで直接ご相談いただけます" />
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-6 w-full text-sm text-ink-500 underline underline-offset-4"
        >
          もう一度診断する
        </button>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-9">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold tracking-widest text-flame-600">
          Q{step + 1} / {questions.length}
        </p>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => prev - 1)}
            className="text-sm text-ink-500 underline underline-offset-4"
          >
            前に戻る
          </button>
        ) : null}
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-ink-100">
        <div
          className="h-full rounded-full bg-flame-500 transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="mt-6 text-lg font-bold text-ink-900 sm:text-xl">
        {question.title}
      </h3>
      <p className="mt-2 text-sm text-ink-500">{question.note}</p>

      <ul className="mt-6 space-y-3">
        {question.choices.map((choice, index) => (
          <li key={choice.label}>
            <button
              type="button"
              onClick={() => select(question.id, index)}
              className="w-full rounded-2xl border border-ink-200 px-5 py-4 text-left transition hover:border-flame-400 hover:bg-flame-50"
            >
              <span className="block font-bold text-ink-800">
                {choice.label}
              </span>
              {choice.hint ? (
                <span className="mt-1 block text-sm text-ink-500">
                  {choice.hint}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
