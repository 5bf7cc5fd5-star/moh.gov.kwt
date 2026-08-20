"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import {
  searchDeclarations,
  type DeclarationRow,
} from "@/lib/declarations";
import { PageFrame } from "@/components/page-frame";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  const { t } = useLocale();
  const { user, isPending } = useCurrentUserState();

  if (isPending) {
    return (
      <PageFrame>
        <div className="py-16 text-center text-muted">{t("submitting")}</div>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>{user ? <AdminList /> : null}</SignedIn>
    </PageFrame>
  );
}

function AdminList() {
  const { t } = useLocale();
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<DeclarationRow[]>([]);
  const [busy, setBusy] = useState(true);

  async function load(term: string) {
    setBusy(true);
    try {
      const data = await searchDeclarations({ data: term });
      setRows(data);
    } catch {
      setRows([]);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void load("");
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void load(q);
  }

  return (
    <div className="pb-12">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-[1.6rem] font-extrabold tracking-tight">
          {t("adminTitle")}
        </h1>
        <UserButton />
      </div>
      <p className="mb-4 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-2 text-sm text-green">
        {t("reportsEmail")}
      </p>

      <form onSubmit={onSubmit} className="mb-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="min-w-0 flex-1 rounded-[var(--radius-ctl)] border border-line px-3 py-3 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
        <button
          type="submit"
          className="rounded-[var(--radius-ctl)] bg-green px-4 py-3 font-semibold text-white hover:bg-green-hover"
        >
          {t("verifyCta")}
        </button>
      </form>

      {busy ? (
        <p className="text-muted">{t("submitting")}</p>
      ) : rows.length === 0 ? (
        <p className="text-muted">{t("noResults")}</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rows.map((r) => (
            <li
              key={r.id}
              className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{r.full_name}</p>
                  <p className="font-mono text-sm text-green">{r.code}</p>
                  <p className="mt-1 text-sm text-muted">
                    {r.direction === "arrive" ? t("arriving") : t("departing")} ·{" "}
                    {r.port} · {r.travel_date}
                  </p>
                  <p className="text-sm text-muted">
                    {t("civilId")}: {r.civil_id || "—"}
                  </p>
                  <p className="text-sm text-muted">
                    {r.passport_number} · {r.flight_number}
                  </p>
                </div>
                {r.risk_flag ? (
                  <span className="shrink-0 rounded-full bg-warn-bg px-2.5 py-1 text-xs font-semibold text-warn">
                    {t("risk")}
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-green-soft px-2.5 py-1 text-xs font-semibold text-green">
                    {t("clear")}
                  </span>
                )}
              </div>
              <Link
                to="/declare/done/$code"
                params={{ code: r.code }}
                className="mt-2 inline-block text-sm font-medium text-teal-deep"
              >
                {r.code}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
