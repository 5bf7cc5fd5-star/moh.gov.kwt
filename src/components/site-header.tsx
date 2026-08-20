"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Menu, X, Youtube } from "lucide-react";
import { KuwaitCrest } from "@/components/kuwait-crest";
import { useLocale } from "@/lib/locale";

function KuwaitClock({ compact = false }: { compact?: boolean }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) {
    return <span className="inline-block min-h-[1em] min-w-[8rem] sm:min-w-[18rem]" />;
  }
  if (compact) {
    const datePart = now.toLocaleDateString("en-US", {
      timeZone: "Asia/Kuwait",
      month: "short",
      day: "numeric",
    });
    const timePart = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kuwait",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return (
      <time dateTime={now.toISOString()} className="tabular-nums">
        {datePart} · {timePart}
      </time>
    );
  }
  const datePart = now.toLocaleDateString("en-US", {
    timeZone: "Asia/Kuwait",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timePart = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kuwait",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <time dateTime={now.toISOString()} className="tabular-nums">
      {datePart} {timePart}
    </time>
  );
}

function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.2 3H21l-6.5 7.4L22 21h-6.2l-4.3-5.6L6.4 21H3.6l7-7.9L2 3h6.3l3.9 5.2L18.2 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5Z"
      />
    </svg>
  );
}

export function SiteHeader() {
  const { t, locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-line bg-card text-ink">
        <div className="mx-auto hidden max-w-6xl grid-cols-3 items-center px-3 py-1.5 text-[0.82rem] sm:grid">
          <div />
          <p className="text-center font-medium text-muted">
            <KuwaitClock />
          </p>
          <nav
            className="flex items-center justify-end gap-3"
            aria-label="Utility"
          >
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="font-medium text-ink hover:text-teal-deep"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
            <span className="text-line" aria-hidden="true">
              |
            </span>
            <Link
              to="/login"
              className="font-medium text-ink no-underline hover:text-teal-deep"
            >
              {t("staffLogin")}
            </Link>
            <span className="flex items-center gap-2 text-green">
              <span className="grid size-6 place-items-center rounded-full bg-green text-white">
                <XMark className="size-3" />
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-green text-white">
                <Instagram className="size-3.5" strokeWidth={2} />
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-green text-white">
                <Youtube className="size-3.5" strokeWidth={2} />
              </span>
            </span>
          </nav>
        </div>
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 text-[0.75rem] sm:hidden">
          <p className="min-w-0 truncate font-medium text-muted">
            <KuwaitClock compact />
          </p>
          <nav
            className="flex shrink-0 items-center gap-2"
            aria-label="Utility"
          >
            <button
              type="button"
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="font-medium text-ink hover:text-teal-deep"
            >
              {locale === "en" ? "العربية" : "English"}
            </button>
            <span className="text-line" aria-hidden="true">
              |
            </span>
            <Link
              to="/login"
              className="font-medium text-ink no-underline hover:text-teal-deep"
            >
              {t("staffLogin")}
            </Link>
          </nav>
        </div>
      </div>

      <div className="bg-green text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 sm:gap-4 sm:py-3">
          <button
            type="button"
            className="grid size-11 shrink-0 place-items-center rounded-md text-white hover:bg-white/10"
            aria-label={t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
          <Link
            to="/"
            className="flex min-w-0 items-center gap-3 text-white no-underline sm:gap-4"
            aria-label={t("brandLine")}
          >
            <KuwaitCrest className="size-[3.85rem] sm:size-[4.75rem]" />
            <span className="min-w-0">
              <span className="block font-display text-lg font-extrabold leading-[1.15] sm:text-xl">
                {t("mohArabic")}
              </span>
              <span className="block text-[0.95rem] font-semibold leading-[1.2] sm:text-base">
                {t("mohEnglish")}
              </span>
              <span className="mt-0.5 block text-[0.72rem] leading-snug text-white/80 sm:text-xs">
                {t("stateKuwait")} <span aria-hidden="true">|</span> {t("stateKuwaitAr")}
              </span>
            </span>
          </Link>
        </div>
      </div>

      {open ? (
        <div className="border-b border-green-2 bg-green-2 text-white">
          <nav
            className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 text-[0.98rem] font-medium"
            aria-label={t("menu")}
          >
            <Link
              to="/"
              className="rounded-md px-3 py-3 text-white no-underline hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t("home")} · {t("eServices")}
            </Link>
            <Link
              to="/declare"
              className="rounded-md px-3 py-3 text-white no-underline hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t("declarationService")}
            </Link>
            <Link
              to="/verify"
              className="rounded-md px-3 py-3 text-white no-underline hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t("verifyTitle")}
            </Link>
            <Link
              to="/login"
              className="rounded-md px-3 py-3 text-white no-underline hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {t("staffLogin")}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
