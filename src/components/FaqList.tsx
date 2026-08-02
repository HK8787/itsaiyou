"use client";

import { useState } from "react";
import type { FaqItem } from "@/data/faq";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-ink-100 overflow-hidden rounded-2xl border border-ink-200 bg-white">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              aria-expanded={open}
              className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-7"
            >
              <span className="mt-0.5 shrink-0 text-lg font-bold text-flame-500">
                Q
              </span>
              <span className="flex-1 font-bold text-ink-800">{item.q}</span>
              <svg
                viewBox="0 0 24 24"
                className={`mt-1 h-5 w-5 shrink-0 text-ink-400 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {open ? (
              <div className="flex gap-4 px-5 pb-6 sm:px-7">
                <span className="shrink-0 text-lg font-bold text-ink-300">
                  A
                </span>
                <p className="flex-1 text-[0.95rem] leading-relaxed text-ink-600">
                  {item.a}
                </p>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
