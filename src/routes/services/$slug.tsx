"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { PageFrame } from "@/components/page-frame";
import { useLocale } from "@/lib/locale";
import type { Msg } from "@/lib/i18n";

const SERVICES: Record<
  string,
  { title: Msg; lead: Msg; extra?: Msg; image: string }
> = {
  ess: {
    title: "essTitle",
    lead: "essLead",
    extra: "essDownload",
    image: "/moh/slide-ess.jpg",
  },
  pediatric: {
    title: "pediatricTitle",
    lead: "pediatricLead",
    extra: "pediatricAr",
    image: "/moh/slide-pediatric.jpg",
  },
  knphs: {
    title: "knphsTitle",
    lead: "knphsLead",
    image: "/moh/slide-knphs.jpg",
  },
  koahs: {
    title: "koahsTitle",
    lead: "koahsLead",
    image: "/moh/slide-koahs.jpg",
  },
};

export const Route = createFileRoute("/services/$slug")({
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const { t } = useLocale();
  const svc = SERVICES[slug];

  if (!svc) {
    return (
      <PageFrame>
        <h1 className="text-2xl font-extrabold">{t("notFound")}</h1>
        <Link to="/" className="mt-3 inline-block font-medium text-teal-deep">
          {t("backHome")}
        </Link>
      </PageFrame>
    );
  }

  return (
    <div>
      <div className="h-40 overflow-hidden bg-green sm:h-56">
        <img
          src={svc.image}
          alt={t(svc.title)}
          className="h-full w-full object-cover"
        />
      </div>
      <PageFrame>
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline"
        >
          <span aria-hidden="true">←</span> {t("backHome")}
        </Link>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep">
          {t("eServices")}
        </p>
        <h1 className="mt-1 text-[1.85rem] font-extrabold tracking-tight text-ink">
          {t(svc.title)}
        </h1>
        <div className="mt-5 rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[1.05rem] leading-relaxed text-ink">{t(svc.lead)}</p>
          {svc.extra ? (
            <p className="mt-3 text-[1.02rem] text-muted">{t(svc.extra)}</p>
          ) : null}
          <p className="mt-4 text-sm text-muted">{t("confidential")}</p>
        </div>
        <div className="mt-6">
          <Link
            to="/declare"
            className="inline-flex rounded-[var(--radius-ctl)] bg-green px-5 py-3 font-semibold text-white no-underline hover:bg-green-hover"
          >
            {t("declarationService")}
          </Link>
        </div>
      </PageFrame>
    </div>
  );
}
