"use client";

import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageFrame } from "@/components/page-frame";
import {
  getDeclarationByCode,
  type DeclarationRow,
} from "@/lib/declarations";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/verify")({ component: VerifyPage });

function VerifyPage() {
  const { t } = useLocale();
  const [code, setCode] = useState("");
  const [row, setRow] = useState<DeclarationRow | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const found = await getDeclarationByCode({ data: code });
      setRow(found);
    } catch {
      setRow(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageFrame>
      <div className="pb-12">
        <h1 className="mb-2 text-[1.85rem] font-extrabold tracking-tight">
          {t("verifyTitle")}
        </h1>
        <p className="mb-5 text-[1.02rem] text-muted">{t("verifyLead")}</p>

        <form
          onSubmit={onSubmit}
          className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]"
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="KW-XXXX-XXXX"
            className="w-full rounded-[var(--radius-ctl)] border border-line px-3.5 py-3.5 font-mono text-lg tracking-wide outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            autoCapitalize="characters"
          />
          <button
            type="submit"
            disabled={busy || !code.trim()}
            className="mt-3 w-full rounded-[var(--radius-ctl)] bg-green py-3.5 font-semibold text-white hover:bg-green-hover disabled:opacity-60"
          >
            {t("verifyCta")}
          </button>
        </form>

        {row === null ? (
          <p className="mt-4 text-star">{t("notFound")}</p>
        ) : row ? (
          <div className="mt-4 rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
            <p className="font-mono text-lg font-bold tracking-widest text-green">
              {row.code}
            </p>
            <p className="mt-2 text-lg font-semibold">{row.full_name}</p>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
              <dt className="text-muted">{t("sex")}</dt>
              <dd>{row.sex}</dd>
              <dt className="text-muted">{t("civilId")}</dt>
              <dd>{row.civil_id || "—"}</dd>
              <dt className="text-muted">{t("passport")}</dt>
              <dd>{row.passport_number}</dd>
              <dt className="text-muted">
                {row.direction === "arrive" ? t("portEntry") : t("portExit")}
              </dt>
              <dd>{row.port}</dd>
              <dt className="text-muted">{t("flight")}</dt>
              <dd>{row.flight_number}</dd>
              <dt className="text-muted">
                {row.direction === "arrive" ? t("dateArrival") : t("dateDeparture")}
              </dt>
              <dd>{row.travel_date}</dd>
            </dl>
            {row.risk_flag ? (
              <p className="mt-3 rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-2 text-sm font-medium text-warn">
                {t("riskNotice")}
              </p>
            ) : (
              <p className="mt-3 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-2 text-sm font-medium text-green">
                {t("lowRisk")}
              </p>
            )}
          </div>
        ) : null}

        <p className="mt-6 text-center text-sm">
          <Link to="/declare" className="text-teal-deep no-underline hover:underline">
            {t("arrivalOrDeparture")}
          </Link>
        </p>
      </div>
    </PageFrame>
  );
}
