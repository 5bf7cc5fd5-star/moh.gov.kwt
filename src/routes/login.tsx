"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { PageFrame } from "@/components/page-frame";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { t } = useLocale();

  return (
    <PageFrame>
      <div className="pb-12">
        <h1 className="mb-2 text-[1.85rem] font-extrabold tracking-tight">
          {t("loginTitle")}
        </h1>
        <p className="mb-6 text-[1.02rem] text-muted">{t("loginLead")}</p>

        <div className="rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]">
          {authEnabled ? (
            <div className="flex flex-col gap-3">
              {GROK_PROVIDERS.map((p) => (
                <button
                  key={p.providerId}
                  type="button"
                  onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
                  className="w-full rounded-[var(--radius-ctl)] border border-line px-4 py-3.5 font-semibold text-ink transition-colors hover:bg-green-soft"
                >
                  Continue with {p.label}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">{t("signedOut")}</p>
          )}
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/declare" className="text-teal-deep no-underline hover:underline">
            {t("arrivalOrDeparture")}
          </Link>
        </p>
      </div>
    </PageFrame>
  );
}
