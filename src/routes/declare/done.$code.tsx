"use client";

import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode } from "@/components/qr-code";
import { PageFrame } from "@/components/page-frame";
import {
  getDeclarationByCode,
  type DeclarationRow,
} from "@/lib/declarations";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/declare/done/$code")({
  component: DonePage,
});

function DonePage() {
  const { code } = Route.useParams();
  const { t } = useLocale();
  const [row, setRow] = useState<DeclarationRow | null | undefined>(undefined);

  useEffect(() => {
    let live = true;
    getDeclarationByCode({ data: code })
      .then((r) => {
        if (live) setRow(r);
      })
      .catch(() => {
        if (live) setRow(null);
      });
    return () => {
      live = false;
    };
  }, [code]);

  if (row === undefined) {
    return (
      <PageFrame>
        <div className="py-16 text-center text-muted">{t("submitting")}</div>
      </PageFrame>
    );
  }

  if (!row) {
    return (
      <PageFrame>
        <div className="py-10">
          <h1 className="mb-2 text-2xl font-extrabold">{t("notFound")}</h1>
          <Link to="/declare" className="font-medium text-teal-deep">
            {t("newDeclaration")}
          </Link>
        </div>
      </PageFrame>
    );
  }

  const qrValue = `KWMH|${row.code}|${row.full_name}|${row.direction}|${row.travel_date}`;

  return (
    <PageFrame>
      <div className="pb-12">
        <div className="rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-green">
            KWMH
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ink">
            {t("doneTitle")}
          </h1>
          <p className="mt-2 text-[1.02rem] leading-relaxed text-muted">
            {t("doneLead")}
          </p>

          {row.risk_flag ? (
            <div className="mt-4 rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-3 text-sm font-medium text-warn">
              {t("riskNotice")}
            </div>
          ) : (
            <div className="mt-4 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-3 text-sm font-medium text-green">
              {t("lowRisk")}
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <QrCode value={qrValue} label={t("reference")} />
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-muted">{t("reference")}</p>
            <p className="mt-1 font-mono text-2xl font-bold tracking-[0.18em] text-green">
              {row.code}
            </p>
            <p className="mt-3 text-lg font-semibold text-ink">{row.full_name}</p>
            <p className="mt-1 text-sm text-muted">
              {row.direction === "arrive" ? t("arriving") : t("departing")} ·{" "}
              {row.port} · {row.travel_date}
            </p>
            <p className="mt-1 text-sm text-muted">
              {t("civilId")}: {row.civil_id || "—"}
            </p>
            <p className="mt-1 text-sm text-muted">
              {row.passport_number} · {row.flight_number}
            </p>
          </div>

          <p className="mt-5 text-center text-sm text-muted">
            {t("showOfficials")}
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            to="/declare"
            className="inline-flex rounded-[var(--radius-ctl)] bg-green px-5 py-3 font-semibold text-white no-underline hover:bg-green-hover"
          >
            {t("newDeclaration")}
          </Link>
        </div>
      </div>
    </PageFrame>
  );
}
