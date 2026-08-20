"use client";

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, PlaneLanding, PlaneTakeoff } from "lucide-react";
import { useLocale } from "@/lib/locale";

export function LandingChoice() {
  const { t } = useLocale();

  return (
    <div className="pb-10">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline"
      >
        <span aria-hidden="true">←</span> {t("home")}
      </Link>
      <h1 className="mb-2 text-[1.85rem] font-extrabold leading-tight tracking-tight text-ink">
        {t("landingTitle")}
      </h1>
      <p className="mb-6 text-[1.02rem] leading-relaxed text-muted">
        {t("landingLead", { mins: t("twoMinutes") })
          .split(t("twoMinutes"))
          .map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 ? (
                <strong className="font-semibold text-ink">
                  {t("twoMinutes")}
                </strong>
              ) : null}
            </span>
          ))}
      </p>

      <div className="flex flex-col gap-3">
        <ChoiceCard
          to="/declare/arrive"
          icon={<PlaneLanding className="size-6" strokeWidth={1.75} />}
          title={t("arriving")}
          subtitle={t("arrivingSub")}
        />
        <ChoiceCard
          to="/declare/depart"
          icon={<PlaneTakeoff className="size-6" strokeWidth={1.75} />}
          title={t("departing")}
          subtitle={t("departingSub")}
        />
      </div>

      <p className="mt-8 text-center text-sm leading-relaxed text-muted">
        {t("footer")}
        <br />
        {t("confidential")}
      </p>
    </div>
  );
}

function ChoiceCard({
  to,
  icon,
  title,
  subtitle,
}: {
  to: "/declare/arrive" | "/declare/depart";
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-[var(--radius-card)] bg-card p-4 text-ink no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-green-soft text-green">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold tracking-tight">{title}</span>
        <span className="mt-0.5 block text-[0.98rem] text-muted">
          {subtitle}
        </span>
      </span>
      <ChevronRight className="size-5 shrink-0 text-muted rtl:rotate-180" />
    </Link>
  );
}
