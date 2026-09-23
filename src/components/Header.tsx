"use client";

import Link from "next/link";
import { useState } from "react";
import { navigation, site } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-xl font-bold tracking-tight text-ink-900">
            {site.name}
          </span>
          <span className="hidden text-xs text-ink-500 sm:inline">
            {site.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-600 transition hover:text-flame-600"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.contact.lineUrl}
            className="rounded-full bg-[#06c755] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-95"
          >
            LINEで無料相談
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="global-nav"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-700 lg:hidden"
        >
          <span className="sr-only">メニューを開く</span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="global-nav"
          className="border-t border-ink-100 bg-white px-5 py-4 lg:hidden"
        >
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-ink-100 py-3.5 font-medium text-ink-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.lineUrl}
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-[#06c755] py-3.5 text-center font-bold text-white"
          >
            LINEで無料相談
          </a>
          <Link
            href="/entry/"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center text-sm text-ink-500 underline underline-offset-4"
          >
            フォームから送る
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
