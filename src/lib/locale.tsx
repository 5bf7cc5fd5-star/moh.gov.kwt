"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DICTS,
  interpolate,
  LOCALES,
  type Locale,
  type Msg,
} from "@/lib/i18n";

const STORAGE_KEY = "kwmoh.locale";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: Msg, vars?: Record<string, string>) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);

function applyDocLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(STORAGE_KEY);
      if (v && LOCALES.some((l) => l.id === v)) {
        const next = v as Locale;
        setLocaleState(next);
        applyDocLocale(next);
        return;
      }
    } catch {
      /* ignore */
    }
    applyDocLocale("en");
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    applyDocLocale(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: Msg, vars?: Record<string, string>) => {
      const dict = DICTS[locale] ?? DICTS.en;
      const raw = dict[key] ?? DICTS.en[key] ?? key;
      return vars ? interpolate(raw, vars) : raw;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
