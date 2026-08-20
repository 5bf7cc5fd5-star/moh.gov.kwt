"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

type Slide = {
  src: string;
  alt: string;
  slug?: "ess" | "pediatric" | "knphs" | "koahs";
};

export function HeroCarousel() {
  const { t, locale } = useLocale();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides: Slide[] = [
    { src: "/moh/slide-amir.jpg", alt: t("hearObey") },
    { src: "/moh/slide-ess.jpg", alt: t("essTitle"), slug: "ess" },
    {
      src: "/moh/slide-pediatric.jpg",
      alt: t("pediatricTitle"),
      slug: "pediatric",
    },
    { src: "/moh/slide-knphs.jpg", alt: t("knphsTitle"), slug: "knphs" },
    { src: "/moh/slide-koahs.jpg", alt: t("koahsTitle"), slug: "koahs" },
  ];
  const count = slides.length;
  const current = slides[i]!;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const id = window.setInterval(() => {
      setI((n) => (n + 1) % count);
    }, 5500);
    return () => window.clearInterval(id);
  }, [count, paused]);

  const go = (dir: number) => setI((n) => (n + dir + count) % count);

  return (
    <section
      className="relative overflow-hidden bg-green"
      aria-roledescription="carousel"
      aria-label={t("eServices")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[13.5rem] w-full sm:h-[18.5rem] lg:h-[22rem]">
        {slides.map((s, n) => (
          <img
            key={s.src}
            src={s.src}
            alt={n === i ? s.alt : ""}
            width={1600}
            height={464}
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500",
              n === i ? "opacity-100" : "opacity-0",
            )}
            draggable={false}
          />
        ))}
        {current.slug ? (
          <Link
            to="/services/$slug"
            params={{ slug: current.slug }}
            className="absolute inset-0 z-[1]"
            aria-label={current.alt}
          />
        ) : null}
      </div>

      <button
        type="button"
        className="absolute start-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-green shadow-sm hover:bg-white sm:start-4 sm:size-10"
        aria-label={locale === "ar" ? "التالي" : "Previous"}
        onClick={() => go(-1)}
      >
        <ChevronLeft className="size-5 rtl:rotate-180" />
      </button>
      <button
        type="button"
        className="absolute end-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-green shadow-sm hover:bg-white sm:end-4 sm:size-10"
        aria-label={locale === "ar" ? "السابق" : "Next"}
        onClick={() => go(1)}
      >
        <ChevronRight className="size-5 rtl:rotate-180" />
      </button>

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            aria-label={s.alt}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={cn(
              "size-2.5 rounded-full transition-colors",
              n === i ? "bg-teal" : "bg-white/70 hover:bg-white",
            )}
          />
        ))}
      </div>
    </section>
  );
}
