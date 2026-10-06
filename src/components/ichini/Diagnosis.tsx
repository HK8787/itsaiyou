"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LineButton, LineIdNote } from "@/components/LineButton";

/**
 * 年収アップ診断。
 *
 * 6問に答えると「年収が上がる余地」を3段階で返し、
 * 今の職種に合わせた「上がりやすい動き方」を出す。
 *
 * ⚠️ 金額は出さない。
 *    当サイトに年収の実績データはないので、「◯万円アップ」のような
 *    数字を出すと根拠を示せない（景品表示法）。段階と動き方だけを返す。
 */

type Track = "it-up" | "it-step" | "sales" | "field" | "office";

type Choice = {
  label: string;
  hint?: string;
  score: number;
  track?: Track;
  /** 結果で使うフラグ */
  flag?: "short" | "many" | "low-pay";
};

type Question = {
  id: string;
  /** LINEに送る要約で使う短い見出し */
  label: string;
  title: string;
  note: string;
  choices: Choice[];
};

const questions: Question[] = [
  {
    id: "job",
    label: "今の仕事",
    title: "今の仕事に一番近いのは？",
    note: "職種によって、年収が上がりやすい動き方が変わります。",
    choices: [
      {
        label: "IT（開発・インフラ構築・社内SE）",
        score: 3,
        track: "it-up",
      },
      {
        label: "IT（ヘルプデスク・運用監視・テスト）",
        score: 3,
        track: "it-step",
      },
      { label: "営業・接客・販売", score: 2, track: "sales" },
      {
        label: "施工管理・設備管理・製造",
        score: 2,
        track: "field",
      },
      { label: "事務・管理部門", score: 1, track: "office" },
    ],
  },
  {
    id: "years",
    label: "経験年数",
    title: "今の職種での経験は何年ですか？",
    note: "前の会社も含めて、同じ職種なら合計で考えてください。",
    choices: [
      { label: "1年未満", score: 0, flag: "short" },
      { label: "1〜3年", score: 2 },
      { label: "3年以上", score: 3 },
    ],
  },
  {
    id: "age",
    label: "年齢",
    title: "年齢を教えてください",
    note: "年齢が上がるほど、経験の中身がより重視されます。",
    choices: [
      { label: "20代", score: 3 },
      { label: "30〜34歳", score: 2 },
      { label: "35〜39歳", score: 1 },
      { label: "40歳以上", score: 1 },
    ],
  },
  {
    id: "pay",
    label: "今の年収",
    title: "今の年収はどれくらいですか？",
    note: "今が低めの方ほど、相場に合わせるだけで上がる余地があります。",
    choices: [
      { label: "300万円未満", score: 3, flag: "low-pay" },
      { label: "300万〜400万円", score: 2 },
      { label: "400万〜500万円", score: 1 },
      { label: "500万円以上", score: 1 },
    ],
  },
  {
    id: "changes",
    label: "転職回数",
    title: "これまでの転職回数は？",
    note: "回数が多くても大丈夫です。伝え方の準備が変わるだけです。",
    choices: [
      { label: "1回", score: 2 },
      { label: "2〜3回", score: 1 },
      { label: "4回以上", score: 0, flag: "many" },
    ],
  },
  {
    id: "extra",
    label: "経験・資格",
    title: "当てはまるものはありますか？",
    note: "どちらもなくても問題ありません。",
    choices: [
      { label: "リーダー・後輩指導の経験がある", score: 2 },
      { label: "仕事に関係する資格を持っている", score: 2 },
      { label: "どちらもある", score: 3 },
      { label: "特にない", score: 0 },
    ],
  },
];

const levels = [
  {
    min: 12,
    label: "大きい",
    headline: "年収が上がる余地は「大きい」です",
    body: "今の経験は、転職市場でしっかり評価される段階にあります。経験を数字で伝えられれば、条件を上げての転職が十分に狙えます。",
  },
  {
    min: 8,
    label: "十分ある",
    headline: "年収が上がる余地は「十分ある」です",
    body: "経験の伝え方と、応募する会社の選び方次第で、条件を上げられる可能性があります。どの経験を前に出すかがポイントです。",
  },
  {
    min: 0,
    label: "組み立て次第",
    headline: "年収アップは「組み立て次第」です",
    body: "今すぐ大きく上げるより、次の転職で経験の幅を広げて、その次で上げる、という組み立てが合っているかもしれません。順番を一緒に考えましょう。",
  },
] as const;

const moves: Record<Track, { title: string; items: string[] }> = {
  "it-up": {
    title: "IT（開発・構築・社内SE）の方の動き方",
    items: [
      "規模の大きい会社や、要件定義など上流の役割へ移る",
      "SESから自社開発・社内SEへ移り、働き方と年収を両方上げる",
      "クラウドや業務システムなど、需要の高い領域の経験を前に出す",
    ],
  },
  "it-step": {
    title: "ヘルプデスク・運用監視の方の動き方",
    items: [
      "運用から構築へ。ここを上がると年収の幅が大きく広がる",
      "問い合わせ対応の経験を活かして、社内SEへ移る",
      "手順書づくりや後輩指導の経験を、リーダー候補として売り込む",
    ],
  },
  sales: {
    title: "営業・接客・販売の方の動き方",
    items: [
      "IT業界の法人営業やカスタマーサクセスへ。商材の単価が高く、相場も高め",
      "個人向けから法人向けへ移ると、条件が上がりやすい",
      "数字の実績（売上・継続率・担当数）を職務経歴書の中心に置く",
    ],
  },
  field: {
    title: "施工管理・設備・製造の方の動き方",
    items: [
      "資格を軸に、手当や役割の上がる会社へ移る",
      "規模の大きい現場・施設を担当できる会社を選ぶ",
      "現場の管理経験を活かして、ITインフラや設備系の上流へ広げる道もある",
    ],
  },
  office: {
    title: "事務・管理部門の方の動き方",
    items: [
      "一般事務より、経理・人事・労務など専門性のある方向へ寄せる",
      "同じ事務でも、IT企業など相場の高い業界へ移る",
      "Excelや社内ツールの改善経験があれば、社内SE寄りの仕事も狙える",
    ],
  },
};

export function IchiniDiagnosis() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);

  const finished = step >= questions.length;

  const result = useMemo(() => {
    if (!finished) return null;

    let total = 0;
    let track: Track = "office";
    const flags = new Set<Choice["flag"]>();
    const picked: string[] = [];

    questions.forEach((question) => {
      const index = answers[question.id];
      if (index === undefined) return;
      const choice = question.choices[index];
      total += choice.score;
      if (choice.track) track = choice.track;
      if (choice.flag) flags.add(choice.flag);
      picked.push(`■${question.label}：${choice.label}`);
    });

    // 経験1年未満は、ほかの点数が高くても「経験者」としては見られにくい。
    // 結果の見出しと補足（経験年数について）が食い違わないよう、最下段に揃える。
    const level = flags.has("short")
      ? levels[2]
      : (levels.find((item) => total >= item.min) ?? levels[2]);

    const summary = [
      "年収アップ診断の結果を送ります。",
      `結果：年収が上がる余地は「${level.label}」`,
      "",
      ...picked,
    ].join("\n");

    return { level, track, flags, summary };
  }, [answers, finished]);

  const select = (questionId: string, choiceIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceIndex }));
    setStep((prev) => prev + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
    setCopied(false);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (finished && result) {
    const move = moves[result.track];

    return (
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-9">
        <p className="text-sm font-bold tracking-widest text-amber-600">
          診断結果
        </p>
        <h3 className="mt-3 text-xl font-bold text-ink-900 sm:text-2xl">
          {result.level.headline}
        </h3>
        <p className="mt-4 text-[0.95rem] text-ink-600">{result.level.body}</p>

        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <p className="font-bold text-ink-900">{move.title}</p>
          <ul className="mt-3 space-y-2">
            {move.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-ink-700">
                <span className="mt-0.5 shrink-0 font-bold text-amber-600">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {result.flags.size > 0 ? (
          <div className="mt-5 space-y-3">
            {result.flags.has("many") ? (
              <p className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-700">
                <b className="text-ink-900">転職回数について：</b>
                回数そのものより「理由の一貫性」と「次はなぜ続けられるか」が見られます。職務経歴書での書き方を整えるだけで、書類の通り方が変わることは珍しくありません。
              </p>
            ) : null}
            {result.flags.has("low-pay") ? (
              <p className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-700">
                <b className="text-ink-900">今の年収について：</b>
                同じ経験でも、会社や業界によって相場は変わります。今の条件が相場より低めの可能性もあるので、一度比べてみる価値があります。
              </p>
            ) : null}
            {result.flags.has("short") ? (
              <p className="rounded-2xl bg-ink-50 p-4 text-sm text-ink-700">
                <b className="text-ink-900">経験年数について：</b>
                1年未満だと「経験者」としては見られにくい時期です。今の職種で経験を積むか、未経験の職種に挑戦するかで動き方が変わるので、そこから一緒に考えましょう。
              </p>
            ) : null}
          </div>
        ) : null}

        <p className="mt-5 text-xs leading-relaxed text-ink-500">
          ※ この診断は目安です。年収アップを保証するものではありません。実際の条件は、経験の内容・地域・その時期の求人によって変わります。
        </p>

        <div className="mt-8 rounded-2xl border border-ink-200 p-5">
          <p className="text-sm font-bold text-ink-900">
            この結果をLINEで送ると、話が早く進みます
          </p>
          <pre className="mt-3 max-h-48 overflow-auto rounded-xl bg-ink-50 p-4 text-xs leading-relaxed whitespace-pre-wrap text-ink-700">
            {result.summary}
          </pre>
          <button
            type="button"
            onClick={() => copy(result.summary)}
            className="mt-3 w-full rounded-full border border-ink-300 py-3 text-sm font-bold text-ink-700 transition hover:bg-ink-50"
          >
            {copied ? "コピーしました" : "結果をコピーする"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <LineButton block note="コピーした結果を、そのまま貼り付けて送れます">
            この結果をLINEで相談する
          </LineButton>
          <div className="mt-3">
            <LineIdNote />
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm">
          <Link
            href="/ichini/jobs/"
            className="text-ink-600 underline underline-offset-4"
          >
            経験者向けの求人の例を見る
          </Link>
          <button
            type="button"
            onClick={reset}
            className="text-ink-500 underline underline-offset-4"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    );
  }

  const question = questions[step];

  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-xl shadow-ink-900/5 sm:p-9">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold tracking-widest text-amber-600">
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
          className="h-full rounded-full bg-amber-500 transition-all duration-300"
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
              className="w-full rounded-2xl border border-ink-200 px-5 py-4 text-left transition hover:border-amber-400 hover:bg-amber-50"
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
