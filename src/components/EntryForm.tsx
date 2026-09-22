"use client";

import { useState } from "react";
import { prefectures, site } from "@/data/site";

/**
 * 提携先の事前ヒアリング13項目をそのまま入力できるフォーム。
 *
 * 送信の挙動：
 *  - NEXT_PUBLIC_FORM_ENDPOINT が設定されていれば、そのURLへPOSTします。
 *  - 未設定の場合は送信を行わず、LINEに貼り付けられる整形済みテキストを生成します。
 * どちらの場合も、入力内容をこのサイトのサーバーに保存することはありません。
 */

type FormState = {
  name: string;
  age: string;
  education: string;
  desiredPrefecture: string;
  desiredMonth: string;
  employmentStatus: string;
  lastEmploymentType: string;
  tenure: string;
  jobChangeCount: string;
  residence: string;
  reason: string;
  desiredIndustry: string;
  isJobTypeMandatory: string;
  contact: string;
  note: string;
};

const initialState: FormState = {
  name: "",
  age: "",
  education: "",
  desiredPrefecture: "",
  desiredMonth: "",
  employmentStatus: "",
  lastEmploymentType: "",
  tenure: "",
  jobChangeCount: "",
  residence: "",
  reason: "",
  desiredIndustry: "",
  isJobTypeMandatory: "",
  contact: "",
  note: "",
};

const educations = [
  "中学校卒業",
  "高校卒業",
  "高校中退",
  "専門学校卒業",
  "専門学校中退",
  "短期大学卒業",
  "高等専門学校卒業",
  "大学卒業",
  "大学中退",
  "大学院卒業",
  "その他",
];

const employmentTypes = [
  "正社員",
  "契約社員",
  "派遣社員",
  "アルバイト・パート",
  "業務委託・個人事業主",
  "就業経験なし",
];

const industries = [
  "インフラエンジニア（サーバー・ネットワーク）",
  "WEBエンジニア（開発）",
  "Salesforceエンジニア",
  "ヘルプデスク・ITサポート",
  "まだ決まっていない／相談して決めたい",
];

/** 必須項目（ヒアリング13項目のうち、空欄だと話が進まないもの） */
const requiredFields: (keyof FormState)[] = [
  "name",
  "age",
  "education",
  "desiredPrefecture",
  "desiredMonth",
  "employmentStatus",
  "lastEmploymentType",
  "jobChangeCount",
  "residence",
  "reason",
  "desiredIndustry",
  "isJobTypeMandatory",
];

const labels: Record<keyof FormState, string> = {
  name: "氏名",
  age: "年齢",
  education: "最終学歴",
  desiredPrefecture: "入社希望都道府県",
  desiredMonth: "入社希望月",
  employmentStatus: "在職中／離職中",
  lastEmploymentType: "直近の雇用形態",
  tenure: "直近企業の在籍年数",
  jobChangeCount: "転職回数",
  residence: "現在居住の都道府県",
  reason: "転職理由",
  desiredIndustry: "希望業種・職種",
  isJobTypeMandatory: "希望職種は絶対条件か",
  contact: "連絡先（任意）",
  note: "その他伝えたいこと（任意）",
};

function buildMessage(form: FormState) {
  const lines = [
    "【キャリア相談の事前ヒアリング】",
    "",
    `1. 氏名：${form.name}`,
    `2. 年齢：${form.age}歳`,
    `3. 最終学歴：${form.education}`,
    `4. 入社希望都道府県：${form.desiredPrefecture}`,
    `5. 入社希望月：${form.desiredMonth}`,
    `6. 在職中／離職中：${form.employmentStatus}`,
    `7. 直近の雇用形態：${form.lastEmploymentType}`,
    `8. 直近企業の在籍年数：${form.tenure || "（就業経験なし）"}`,
    `9. 転職回数：${form.jobChangeCount}`,
    `10. 現在居住の都道府県：${form.residence}`,
    `11. 転職理由：${form.reason}`,
    `12. 希望業種：${form.desiredIndustry}`,
    `13. 希望職種は絶対条件か：${form.isJobTypeMandatory}`,
  ];

  if (form.contact) lines.push("", `連絡先：${form.contact}`);
  if (form.note) lines.push("", `その他：${form.note}`);

  return lines.join("\n");
}

export function EntryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<(keyof FormState)[]>([]);
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<
    "idle" | "sending" | "sent" | "failed"
  >("idle");
  const [copied, setCopied] = useState(false);

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => prev.filter((item) => item !== key));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const missing = requiredFields.filter((key) => !form[key].trim());
    if (missing.length > 0) {
      setErrors(missing);
      document
        .getElementById(`field-${missing[0]}`)
        ?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }

    const text = buildMessage(form);
    setMessage(text);

    if (site.formEndpoint) {
      setSendState("sending");
      try {
        await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, formatted: text }),
        });
        setSendState("sent");
      } catch {
        setSendState("failed");
      }
    }

    window.setTimeout(() => {
      document
        .getElementById("entry-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const errorFor = (key: keyof FormState) =>
    errors.includes(key) ? (
      <p className="mt-1.5 text-sm font-medium text-flame-700">
        {labels[key]}を入力してください
      </p>
    ) : null;

  const fieldClass = (key: keyof FormState) =>
    `w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:border-flame-500 ${
      errors.includes(key) ? "border-flame-500 bg-flame-50" : "border-ink-200"
    }`;

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} noValidate className="space-y-7">
        <Field id="name" label="1. 氏名" required error={errorFor("name")}>
          <input
            type="text"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="山田 太郎"
            autoComplete="name"
            className={fieldClass("name")}
          />
        </Field>

        <Field id="age" label="2. 年齢" required error={errorFor("age")}>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              min={15}
              max={70}
              value={form.age}
              onChange={(event) => update("age", event.target.value)}
              placeholder="24"
              className={`${fieldClass("age")} max-w-32`}
            />
            <span className="text-ink-600">歳</span>
          </div>
        </Field>

        <Field
          id="education"
          label="3. 最終学歴"
          required
          hint="学歴不問の求人が中心です。正直にお選びください。"
          error={errorFor("education")}
        >
          <select
            value={form.education}
            onChange={(event) => update("education", event.target.value)}
            className={fieldClass("education")}
          >
            <option value="">選択してください</option>
            {educations.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="desiredPrefecture"
          label="4. 入社希望都道府県"
          required
          error={errorFor("desiredPrefecture")}
        >
          <select
            value={form.desiredPrefecture}
            onChange={(event) =>
              update("desiredPrefecture", event.target.value)
            }
            className={fieldClass("desiredPrefecture")}
          >
            <option value="">選択してください</option>
            {prefectures.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
            <option value="こだわらない">こだわらない</option>
          </select>
        </Field>

        <Field
          id="desiredMonth"
          label="5. 入社希望月"
          required
          hint="「できるだけ早く」でも構いません。"
          error={errorFor("desiredMonth")}
        >
          <input
            type="text"
            value={form.desiredMonth}
            onChange={(event) => update("desiredMonth", event.target.value)}
            placeholder="例）2026年11月／できるだけ早く"
            className={fieldClass("desiredMonth")}
          />
        </Field>

        <Field
          id="employmentStatus"
          label="6. 在職中か離職中か"
          required
          error={errorFor("employmentStatus")}
        >
          <RadioRow
            name="employmentStatus"
            value={form.employmentStatus}
            options={["在職中", "離職中"]}
            onChange={(value) => update("employmentStatus", value)}
          />
        </Field>

        <Field
          id="lastEmploymentType"
          label="7. 直近の雇用形態"
          required
          error={errorFor("lastEmploymentType")}
        >
          <select
            value={form.lastEmploymentType}
            onChange={(event) =>
              update("lastEmploymentType", event.target.value)
            }
            className={fieldClass("lastEmploymentType")}
          >
            <option value="">選択してください</option>
            {employmentTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="tenure"
          label="8. 直近企業の在籍年数"
          hint="就業経験がない場合は空欄で構いません。"
        >
          <input
            type="text"
            value={form.tenure}
            onChange={(event) => update("tenure", event.target.value)}
            placeholder="例）2年3ヶ月"
            className={fieldClass("tenure")}
          />
        </Field>

        <Field
          id="jobChangeCount"
          label="9. 転職回数"
          required
          hint="回数が多くても紹介できない、ということはありません。"
          error={errorFor("jobChangeCount")}
        >
          <select
            value={form.jobChangeCount}
            onChange={(event) => update("jobChangeCount", event.target.value)}
            className={fieldClass("jobChangeCount")}
          >
            <option value="">選択してください</option>
            {["0回", "1回", "2回", "3回", "4回", "5回以上"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="residence"
          label="10. 現在居住の都道府県"
          required
          error={errorFor("residence")}
        >
          <select
            value={form.residence}
            onChange={(event) => update("residence", event.target.value)}
            className={fieldClass("residence")}
          >
            <option value="">選択してください</option>
            {prefectures.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="reason"
          label="11. 転職理由"
          required
          hint="簡単で構いません。一言でも大丈夫です。"
          error={errorFor("reason")}
        >
          <textarea
            value={form.reason}
            onChange={(event) => update("reason", event.target.value)}
            rows={4}
            placeholder="例）体力勝負の仕事ではなく、スキルを積み上げて長く働ける仕事に移りたい"
            className={fieldClass("reason")}
          />
        </Field>

        <Field
          id="desiredIndustry"
          label="12. 希望業種・職種"
          required
          hint="決まっていなければ「相談したい」で構いません。"
          error={errorFor("desiredIndustry")}
        >
          <select
            value={form.desiredIndustry}
            onChange={(event) => update("desiredIndustry", event.target.value)}
            className={fieldClass("desiredIndustry")}
          >
            <option value="">選択してください</option>
            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id="isJobTypeMandatory"
          label="13. 希望職種は絶対条件ですか"
          required
          hint="「条件次第で検討できる」と答えられると、紹介できる求人の幅が広がります。"
          error={errorFor("isJobTypeMandatory")}
        >
          <RadioRow
            name="isJobTypeMandatory"
            value={form.isJobTypeMandatory}
            options={["絶対条件", "条件次第で検討できる", "こだわらない"]}
            onChange={(value) => update("isJobTypeMandatory", value)}
          />
        </Field>

        <div className="rounded-2xl bg-ink-50 p-6">
          <p className="mb-5 text-sm font-bold text-ink-800">
            任意項目（あるとやり取りがスムーズです）
          </p>

          <div className="space-y-6">
            <Field id="contact" label="連絡先（LINE名・メールアドレスなど）">
              <input
                type="text"
                value={form.contact}
                onChange={(event) => update("contact", event.target.value)}
                placeholder="例）LINE名：タロウ"
                className={fieldClass("contact")}
              />
            </Field>

            <Field id="note" label="その他、伝えておきたいこと">
              <textarea
                value={form.note}
                onChange={(event) => update("note", event.target.value)}
                rows={3}
                placeholder="例）夜勤は難しい／扶養家族がいる／学習中の資格がある など"
                className={fieldClass("note")}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-2xl border border-ink-200 p-5 text-sm leading-relaxed text-ink-600">
          入力内容は
          <strong className="text-ink-800">
            このサイトのサーバーには保存されません
          </strong>
          。送信ボタンを押すと、LINEでそのまま送れる形に整形して表示します。
          お預かりした情報は、提携先の職業紹介事業者へおつなぎする目的にのみ使用します。
          詳細は
          <a href="/privacy/" className="text-flame-600 underline">
            プライバシーポリシー
          </a>
          をご確認ください。
        </div>

        {errors.length > 0 ? (
          <p
            role="alert"
            className="rounded-xl bg-flame-50 px-5 py-4 text-sm font-medium text-flame-700"
          >
            未入力の項目が {errors.length} 件あります。ご確認ください。
          </p>
        ) : null}

        <button
          type="submit"
          disabled={sendState === "sending"}
          className="w-full rounded-full bg-flame-500 py-4.5 text-lg font-bold text-white shadow-lg shadow-flame-500/25 transition hover:bg-flame-600 disabled:opacity-60"
        >
          {sendState === "sending" ? "送信中…" : "入力内容をまとめる"}
        </button>
      </form>

      {message ? (
        <section
          id="entry-result"
          className="scroll-mt-24 rounded-3xl border-2 border-flame-200 bg-flame-50 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-ink-900">
            この内容をLINEで送ってください
          </h2>
          <p className="mt-2.5 text-sm text-ink-600">
            下のテキストをコピーして、LINEに貼り付けて送信するだけで完了です。
            {sendState === "sent"
              ? "（担当者への送信も完了しました）"
              : sendState === "failed"
                ? "（自動送信に失敗したため、お手数ですがLINEでお送りください）"
                : ""}
          </p>

          <pre className="mt-5 overflow-x-auto rounded-2xl bg-white p-5 text-sm leading-relaxed whitespace-pre-wrap text-ink-800">
            {message}
          </pre>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copy}
              className="flex-1 rounded-full border border-ink-300 bg-white py-3.5 font-bold text-ink-700 transition hover:bg-ink-50"
            >
              {copied ? "コピーしました" : "テキストをコピー"}
            </button>
            <a
              href={site.contact.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full bg-[#06c755] py-3.5 text-center font-bold text-white transition hover:brightness-95"
            >
              LINEを開いて送る
            </a>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={`field-${id}`} className="scroll-mt-24">
      <label className="mb-2 flex flex-wrap items-center gap-2 font-bold text-ink-800">
        {label}
        {required ? (
          <span className="rounded bg-flame-100 px-2 py-0.5 text-xs font-bold text-flame-700">
            必須
          </span>
        ) : (
          <span className="rounded bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-500">
            任意
          </span>
        )}
      </label>
      {hint ? <p className="mb-2.5 text-sm text-ink-500">{hint}</p> : null}
      {children}
      {error}
    </div>
  );
}

function RadioRow({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((option) => {
        const active = value === option;
        return (
          <label
            key={option}
            className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              active
                ? "border-flame-500 bg-flame-500 text-white"
                : "border-ink-200 text-ink-700 hover:border-flame-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={active}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        );
      })}
    </div>
  );
}
