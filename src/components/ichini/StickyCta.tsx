"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * スマホ向けの追従CTA。フッターに余白(pb-28)を確保しているので重なりません。
 *
 * 最初の画面ではヒーローに同じボタンがあるので出さない。
 * 画面の7割ほどスクロールしたところで、下からすっと出す。
 * 入口から金のボタンが二重に並ぶと、落ち着いた空気が崩れるため。
 */
export function IchiniStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] bg-noir-950/90 p-3 backdrop-blur-md transition-transform duration-500 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-md">
        <a
          href={site.contact.lineUrl}
          tabIndex={visible ? 0 : -1}
          className="block bg-gold-400 py-3.5 text-center font-bold tracking-[0.06em] text-noir-950"
        >
          LINEで相談する（無料）
        </a>
      </div>
    </div>
  );
}
