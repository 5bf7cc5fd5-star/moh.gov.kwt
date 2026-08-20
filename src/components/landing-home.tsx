"use client";

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Baby,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  HeartHandshake,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";
import { HeroCarousel } from "@/components/hero-carousel";
import { useLocale } from "@/lib/locale";

export function LandingHome() {
  const { t } = useLocale();

  return (
    <div className="bg-card">
      <HeroCarousel />

      <section className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-extrabold tracking-[0.22em] text-green sm:text-3xl">
              {t("eServices")}
            </h1>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-teal" />
          </div>

          <Link
            to="/declare"
            className="mb-4 flex items-center gap-4 rounded-[var(--radius-card)] bg-green p-5 text-white no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-6"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white/15">
              <Plane className="size-7" strokeWidth={1.75} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold tracking-tight sm:text-xl">
                {t("declarationService")}
              </span>
              <span className="mt-1 block text-sm leading-snug text-white/80 sm:text-base">
                {t("declarationLead")}
              </span>
            </span>
            <ChevronRight className="size-6 shrink-0 opacity-70 rtl:rotate-180" />
          </Link>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              to="/services/$slug"
              params={{ slug: "ess" }}
              icon={<CalendarCheck className="size-6" strokeWidth={1.75} />}
              title="MOH ESS"
              subtitle={t("essTitle")}
            />
            <ServiceCard
              to="/services/$slug"
              params={{ slug: "pediatric" }}
              icon={<Baby className="size-6" strokeWidth={1.75} />}
              title={t("pediatricTitle")}
              subtitle={t("pediatricLead")}
            />
            <ServiceCard
              to="/services/$slug"
              params={{ slug: "knphs" }}
              icon={<ClipboardList className="size-6" strokeWidth={1.75} />}
              title={t("knphsShort")}
              subtitle={t("knphsTitle")}
            />
            <ServiceCard
              to="/services/$slug"
              params={{ slug: "koahs" }}
              icon={<HeartHandshake className="size-6" strokeWidth={1.75} />}
              title={t("koahsShort")}
              subtitle={t("koahsTitle")}
            />
            <ServiceCard
              to="/verify"
              icon={<ShieldCheck className="size-6" strokeWidth={1.75} />}
              title={t("verifyTitle")}
              subtitle={t("verifyLead")}
            />
            <ServiceCard
              to="/login"
              icon={<Users className="size-6" strokeWidth={1.75} />}
              title={t("staffLogin")}
              subtitle={t("loginLead")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({
  to,
  params,
  icon,
  title,
  subtitle,
}: {
  to: "/verify" | "/login" | "/services/$slug";
  params?: { slug: string };
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      to={to}
      params={params as { slug: string }}
      className="flex items-center gap-4 rounded-[var(--radius-card)] border border-line/80 bg-card p-4 text-ink no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-green-soft text-green">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-base font-bold tracking-tight">{title}</span>
        <span className="mt-0.5 block text-sm leading-snug text-muted">
          {subtitle}
        </span>
      </span>
      <ChevronRight className="size-5 shrink-0 opacity-60 rtl:rotate-180" />
    </Link>
  );
}
