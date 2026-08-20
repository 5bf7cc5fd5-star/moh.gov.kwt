"use client";

import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { PageFrame } from "@/components/page-frame";
import { TextInput } from "@/components/form-controls";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState("k_hmed@yahoo.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function finish() {
    await navigate({ to: "/admin" });
  }

  async function onSignIn(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const { error: err } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/admin",
      });
      if (err) throw new Error(err.message || t("loginFailed"));
      await finish();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
      setBusy(false);
    }
  }

  async function onCreate() {
    setError("");
    setBusy(true);
    try {
      const { error: err } = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: "Health staff",
        callbackURL: "/admin",
      });
      if (err) throw new Error(err.message || t("loginFailed"));
      await finish();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
      setBusy(false);
    }
  }

  return (
    <PageFrame>
      <div className="pb-12">
        <h1 className="mb-2 text-[1.85rem] font-extrabold tracking-tight">
          {t("loginTitle")}
        </h1>
        <p className="mb-6 text-[1.02rem] text-muted">{t("loginLead")}</p>

        <div className="rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]">
          {authEnabled ? (
            <div className="flex flex-col gap-4">
              <form onSubmit={onSignIn} className="flex flex-col gap-3">
                <TextInput
                  label={t("staffEmail")}
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  label={t("staffPassword")}
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  hint={t("staffPasswordHint")}
                />
                {error ? (
                  <p className="text-sm text-star" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-[var(--radius-ctl)] bg-green px-4 py-3.5 font-semibold text-white disabled:opacity-60"
                >
                  {busy ? t("submitting") : t("staffSignIn")}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => void onCreate()}
                  className="w-full rounded-[var(--radius-ctl)] border border-line px-4 py-3.5 font-semibold text-ink hover:bg-green-soft disabled:opacity-60"
                >
                  {t("staffCreate")}
                </button>
              </form>

              <p className="text-center text-xs text-muted">{t("orContinue")}</p>

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
            </div>
          ) : (
            <p className="text-sm text-muted">{t("signedOut")}</p>
          )}
        </div>

        <p className="mt-4 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-2 text-sm text-green">
          {t("reportsEmail")}
        </p>

        <p className="mt-6 text-center text-sm">
          <Link to="/declare" className="text-teal-deep no-underline hover:underline">
            {t("arrivalOrDeparture")}
          </Link>
        </p>
      </div>
    </PageFrame>
  );
}
