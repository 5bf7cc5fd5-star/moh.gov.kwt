"use client";

import { Link } from "@tanstack/react-router";
import { useLocale } from "@/lib/locale";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="mt-auto bg-green text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-center text-sm leading-relaxed text-white/80">
        <p className="font-semibold text-white">{t("footer")}</p>
        <p>{t("confidential")}</p>
        <p className="pt-1">
          <Link to="/verify" className="text-teal no-underline hover:underline">
            {t("verifyTitle")}
          </Link>
          <span className="mx-2 text-white/30">·</span>
          <Link to="/login" className="text-teal no-underline hover:underline">
            {t("staff")}
          </Link>
        </p>
      </div>
    </footer>
  );
}
