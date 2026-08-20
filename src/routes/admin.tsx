"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { PURPOSES } from "@/lib/catalog";
import {
  parseScreening,
  searchDeclarations,
  type DeclarationRow,
  type Screening,
} from "@/lib/declarations";
import { PageFrame } from "@/components/page-frame";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function yn(v: boolean | null | undefined) {
  if (v === true) return "Yes";
  if (v === false) return "No";
  return "—";
}

function days(v: string | null | undefined) {
  if (!v) return "—";
  return v === "1" ? "1 day" : `${v} days`;
}

function purposeLabel(id: string) {
  return PURPOSES.find((p) => p.id === id)?.en ?? id;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-line/70 py-2 last:border-0">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap text-[0.98rem] text-ink">{value || "—"}</p>
    </div>
  );
}

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
  const [openId, setOpenId] = useState<string | null>(null);

  async function load(term: string) {
    setBusy(true);
    try {
      const data = await searchDeclarations({ data: term });
      setRows(data);
      if (data.length === 1) setOpenId(data[0]!.id);
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
        <ul className="flex flex-col gap-3">
          {rows.map((r) => (
            <DeclarationCard
              key={r.id}
              row={r}
              open={openId === r.id}
              onToggle={() => setOpenId((id) => (id === r.id ? null : r.id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function DeclarationCard({
  row,
  open,
  onToggle,
}: {
  row: DeclarationRow;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useLocale();
  const s: Screening | null = parseScreening(row.screening);
  const phone = `${row.phone_country} ${row.phone_number}`.trim();

  return (
    <li className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div>
          <p className="font-semibold">{row.full_name}</p>
          <p className="font-mono text-sm text-green">{row.code}</p>
          <p className="mt-1 text-sm text-muted">
            {row.direction === "arrive" ? t("arriving") : t("departing")} · {row.port} ·{" "}
            {row.travel_date}
          </p>
          <p className="text-sm text-muted">
            {t("civilId")}: {row.civil_id || "—"} · {row.passport_number}
          </p>
        </div>
        {row.risk_flag ? (
          <span className="shrink-0 rounded-full bg-warn-bg px-2.5 py-1 text-xs font-semibold text-warn">
            {t("risk")}
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-green-soft px-2.5 py-1 text-xs font-semibold text-green">
            {t("clear")}
          </span>
        )}
      </button>

      {open ? (
        <div className="mt-4 border-t border-line pt-3">
          <p className="mb-2 text-sm font-bold text-green">{t("aboutYou")}</p>
          <Field label={t("fullName")} value={row.full_name} />
          <Field label={t("age")} value={String(row.age)} />
          <Field
            label={t("sex")}
            value={row.sex === "female" ? t("female") : row.sex === "male" ? t("male") : row.sex}
          />
          <Field label={t("citizenship")} value={row.citizenship} />
          <Field label={t("civilId")} value={row.civil_id || "—"} />
          <Field label={t("passport")} value={row.passport_number} />
          <Field label={t("phone")} value={phone} />
          <Field label={t("email")} value={row.email || "—"} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("yourTrip")}</p>
          <Field
            label={t("arrivalOrDeparture")}
            value={row.direction === "arrive" ? t("arriving") : t("departing")}
          />
          <Field
            label={row.direction === "arrive" ? t("portEntry") : t("portExit")}
            value={row.port}
          />
          <Field
            label={row.direction === "arrive" ? t("dateArrival") : t("dateDeparture")}
            value={row.travel_date}
          />
          <Field label={t("purpose")} value={purposeLabel(row.purpose)} />
          <Field label={t("medicalCondition")} value={row.medical_condition || "—"} />
          <Field label={t("medicalEmergency")} value={yn(row.medical_emergency)} />
          <Field label={t("daysIn")} value={row.days_in_uganda || "—"} />
          <Field label={t("visited")} value={row.countries_visited || "—"} />
          <Field label={t("flight")} value={row.flight_number} />
          <Field label={t("address")} value={row.address_in_uganda || "—"} />
          <Field label={t("destination")} value={row.destination_country || "—"} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("howYouFeel")}</p>
          <Field
            label={t("symptoms")}
            value={row.has_symptoms ? `Yes — ${row.symptoms_detail || ""}` : "No"}
          />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("recentContact")}</p>
          <Field label={t("contactSick")} value={yn(row.contact_sick)} />
          <Field label={t("funeral")} value={yn(row.attended_funeral)} />
          <Field label={t("hospital")} value={yn(row.visited_hospital)} />
          <Field label={t("animals")} value={yn(row.handled_animals)} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("malariaTitle")}</p>
          <Field label={t("malariaRisk")} value={yn(s?.malariaRisk)} />
          <Field label={t("malariaPrevention")} value={yn(s?.malariaPrevention)} />
          <Field label={t("malariaClinic")} value={yn(s?.malariaClinic)} />
          <Field label={t("malariaWhen")} value={days(s?.malariaWhen)} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("typhoidTitle")}</p>
          <Field label={t("typhoidRisk")} value={yn(s?.typhoidRisk)} />
          <Field label={t("typhoidPrevention")} value={yn(s?.typhoidPrevention)} />
          <Field label={t("typhoidClinic")} value={yn(s?.typhoidClinic)} />
          <Field label={t("typhoidWhen")} value={days(s?.typhoidWhen)} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("personalTitle")}</p>
          <Field label={t("sexualActivity")} value={yn(s?.sexualActivity)} />
          <Field label={t("sexualProtected")} value={yn(s?.sexualProtected)} />
          <Field label={t("sexualClinic")} value={yn(s?.sexualClinic)} />
          <Field label={t("sexualWhen")} value={days(s?.sexualWhen)} />

          <p className="mb-2 mt-5 text-sm font-bold text-green">{t("stdTitle")}</p>
          <Field label={t("stdDischarge")} value={yn(s?.stdSymptoms)} />
          <Field label={t("stdHistory")} value={yn(s?.stdHistory)} />
          <Field label={t("stdClinic")} value={yn(s?.stdClinic)} />
          <Field label={t("stdWhen")} value={days(s?.stdWhen)} />
        </div>
      ) : (
        <p className="mt-2 text-sm font-medium text-teal-deep">{t("viewAnswers")}</p>
      )}
    </li>
  );
}
