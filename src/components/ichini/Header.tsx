"use client";

import Link from "next/link";
import { useState } from "react";
import { IchiniWordmark } from "@/components/ichini/Logo";
import { ichini, ichiniNavigation } from "@/data/ichini";
import { site } from "@/data/site";

export function IchiniHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-noir-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href={ichini.home}
          className="shrink-0"
          onClick={() => setOpen(false)}
          aria-label={`${ichini.name} トップへ`}
        >
          <IchiniWordmark compact />
        </Link>

        <nav className="hidden shrink-0 items-center gap-9 whitespace-nowrap lg:flex">
          {ichiniNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mincho text-[0.82rem] tracking-[0.14em] text-ivory-dim transition duration-300 hover:text-gold-200"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.contact.lineUrl}
            className="border border-gold-400/70 px-5 py-2.5 font-mincho text-[0.8rem] tracking-[0.14em] text-gold-200 transition duration-300 hover:bg-gold-400/10"
          >
            LINEで相談する
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="ichini-nav"
          className="flex h-11 w-11 items-center justify-center text-gold-200 lg:hidden"
        >
          <span className="sr-only">メニューを開く</span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 8h16M7 16h13" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="ichini-nav"
          className="border-t border-hairline bg-noir-950 px-6 pt-4 pb-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {ichiniNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-hairline py-4 font-mincho tracking-[0.12em] text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={site.contact.lineUrl}
            onClick={() => setOpen(false)}
            className="bg-gold-foil mt-7 block py-4 text-center font-mincho font-bold tracking-[0.14em] text-noir-950"
          >
            LINEで相談する
          </a>
        </nav>
      ) : null}
    </header>
  );
}
