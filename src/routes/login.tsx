"use client";

import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { authClient, authEnabled } from "@/lib/auth/client";
import { PageFrame } from "@/components/page-frame";
import { TextInput } from "@/components/form-controls";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/login")({ component: Login });

const YAHOO_STAFF = "k_hmed@yahoo.com";

function isYahooMail(value: string) {
  const email = value.trim().toLowerCase();
  return /@(yahoo\.com|yahoo\.[a-z]{2,}|ymail\.com|rocketmail\.com)$/i.test(email);
}

function YahooMark() {
  return (
    <span
      className="grid size-8 place-items-center rounded-md bg-white text-lg font-black"
      style={{ color: "#6001d2" }}
      aria-hidden="true"
    >
      Y!
    </span>
  );
}

function Login() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [email, setEmail] = useState(YAHOO_STAFF);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function withYahoo(e: FormEvent) {
    e.preventDefault();
    const staffEmail = email.trim().toLowerCase();
    setError("");
    if (!isYahooMail(staffEmail)) {
      setError(t("yahooOnly"));
      return;
    }
    if (password.length < 8) {
      setError(t("staffPasswordHint"));
      return;
    }
    setBusy(true);
    try {
      const signedIn = await authClient.signIn.email({
        email: staffEmail,
        password,
        callbackURL: "/admin",
      });
      if (!signedIn.error) {
        await navigate({ to: "/admin" });
        return;
      }
      const signedUp = await authClient.signUp.email({
        email: staffEmail,
        password,
        name: "Health staff",
        callbackURL: "/admin",
      });
      if (signedUp.error) {
        throw new Error(signedIn.error.message || signedUp.error.message || t("loginFailed"));
      }
      await navigate({ to: "/admin" });
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
            <form onSubmit={(ev) => void withYahoo(ev)} className="flex flex-col gap-3">
              <TextInput
                label={t("staffEmail")}
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                hint={t("yahooOnly")}
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
                className="mt-1 flex w-full items-center justify-center gap-3 rounded-[var(--radius-ctl)] px-4 py-3.5 font-semibold text-white disabled:opacity-60"
                style={{ background: "#6001d2" }}
              >
                <YahooMark />
                {busy ? t("submitting") : t("yahooSignIn")}
              </button>
            </form>
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
