"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  ClipboardList,
  LayoutDashboard,
  Menu,
  PlaneLanding,
  PlaneTakeoff,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KuwaitCrest } from "@/components/kuwait-crest";
import { PURPOSES } from "@/lib/catalog";
import {
  parseScreening,
  searchDeclarations,
  type DeclarationRow,
  type Screening,
} from "@/lib/declarations";
import { useLocale } from "@/lib/locale";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type Period = "day" | "week" | "month";
type Tab = "general" | "followup" | "all";

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

function createdAt(row: DeclarationRow) {
  const d = new Date(row.created_at);
  return Number.isNaN(d.getTime()) ? new Date(row.travel_date) : d;
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
  return <AdminConsole />;
}

function AdminConsole() {
  const { t } = useLocale();
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<DeclarationRow[]>([]);
  const [busy, setBusy] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>("day");
  const [tab, setTab] = useState<Tab>("general");
  const [navOpen, setNavOpen] = useState(false);

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

  function onSearch(e: FormEvent) {
    e.preventDefault();
    void load(q);
  }

  const now = new Date();
  const windowStart =
    period === "day"
      ? new Date(now.getTime() - 24 * 60 * 60 * 1000)
      : period === "week"
        ? new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        : new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000);

  const inWindow = rows.filter((r) => createdAt(r) >= windowStart);
  const followUp = inWindow.filter((r) => r.risk_flag);
  const clearRows = inWindow.filter((r) => !r.risk_flag);
  const arrivals = inWindow.filter((r) => r.direction === "arrive");
  const departures = inWindow.filter((r) => r.direction === "depart");

  const chart = useMemo(() => {
    const buckets = new Map<string, number>();
    const points = period === "day" ? 12 : period === "week" ? 7 : 21;
    const step = period === "day" ? 2 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    for (let i = points - 1; i >= 0; i -= 1) {
      const t0 = new Date(now.getTime() - i * step);
      const key =
        period === "day"
          ? t0.toLocaleTimeString("en-US", { hour: "numeric", timeZone: "Asia/Kuwait" })
          : t0.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Kuwait" });
      buckets.set(key, 0);
    }
    for (const row of inWindow) {
      const d = createdAt(row);
      const key =
        period === "day"
          ? d.toLocaleTimeString("en-US", { hour: "numeric", timeZone: "Asia/Kuwait" })
          : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", timeZone: "Asia/Kuwait" });
      if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    return [...buckets.entries()].map(([label, count]) => ({ label, count }));
  }, [inWindow, period, now]);

  const list =
    tab === "followup" ? followUp : tab === "all" ? inWindow : inWindow;
  const welcome = "Kawesali Ahmed";

  return (
    <div className="flex min-h-dvh bg-page">
      {navOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
          aria-label={t("close")}
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e border-line bg-card transition-transform lg:static lg:translate-x-0 ${
          navOpen ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-4">
          <KuwaitCrest />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("mohEnglish")}</p>
            <p className="text-sm font-bold text-green">{t("adminConsole")}</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          <SideLink
            active={tab === "general"}
            icon={<LayoutDashboard className="size-4" />}
            label={t("dashGeneral")}
            onClick={() => {
              setTab("general");
              setNavOpen(false);
            }}
          />
          <SideLink
            active={tab === "all"}
            icon={<ClipboardList className="size-4" />}
            label={t("adminTitle")}
            onClick={() => {
              setTab("all");
              setNavOpen(false);
            }}
          />
          <SideLink
            active={tab === "followup"}
            icon={<AlertTriangle className="size-4" />}
            label={t("risk")}
            onClick={() => {
              setTab("followup");
              setNavOpen(false);
            }}
          />
        </nav>
        <p className="px-4 pb-4 text-xs leading-relaxed text-muted">{t("dashRetention")}</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-line bg-card px-4 py-3">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-line lg:hidden"
            onClick={() => setNavOpen(true)}
            aria-label={t("menu")}
          >
            <Menu className="size-5" />
          </button>
          <form onSubmit={onSearch} className="flex min-w-0 flex-1 items-center gap-2">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-md border border-line bg-page py-2.5 ps-9 pe-3 text-sm outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <button
              type="submit"
              className="hidden rounded-md bg-green px-4 py-2.5 text-sm font-semibold text-white sm:inline"
            >
              {t("verifyCta")}
            </button>
          </form>
          <Bell className="hidden size-5 text-muted sm:block" />
          <span className="text-sm font-semibold text-ink">Kawesali Ahmed</span>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-ink">
                {t("dashWelcome")}, {welcome}
              </h1>
              <p className="mt-1 text-sm text-muted">{t("dashLead")}</p>
            </div>
            <div className="flex rounded-md border border-line bg-card p-1">
              {(["day", "week", "month"] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`rounded px-3 py-1.5 text-sm font-semibold ${
                    period === p ? "bg-green text-white" : "text-muted"
                  }`}
                >
                  {p === "day" ? t("dashDay") : p === "week" ? t("dashWeek") : t("dashMonth")}
                </button>
              ))}
            </div>
          </div>

          <p className="mb-4 rounded-md bg-green-soft px-3 py-2 text-sm text-green">
            {t("dashRetention")}
          </p>

          <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title={t("adminTitle")}
              value={String(inWindow.length)}
              hrefLabel={t("dashViewReport")}
              data={chart}
              onOpen={() => setTab("all")}
            />
            <StatCard
              title={t("risk")}
              value={String(followUp.length)}
              hrefLabel={t("dashViewReport")}
              data={chart}
              warn
              onOpen={() => setTab("followup")}
            />
            <StatCard
              title={t("clear")}
              value={String(clearRows.length)}
              hrefLabel={t("dashViewReport")}
              data={chart}
              onOpen={() => setTab("all")}
            />
            <StatCard
              title={t("arriving")}
              value={String(arrivals.length)}
              icon={<PlaneLanding className="size-4" />}
              data={chart}
            />
            <StatCard
              title={t("departing")}
              value={String(departures.length)}
              icon={<PlaneTakeoff className="size-4" />}
              data={chart}
            />
            <StatCard
              title={t("dashClearRate")}
              value={inWindow.length ? `${Math.round((clearRows.length / inWindow.length) * 100)}%` : "—"}
              icon={<ShieldCheck className="size-4" />}
              data={chart}
            />
          </div>

          <section className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold">
                {tab === "followup" ? t("risk") : t("adminTitle")}
              </h2>
              <p className="text-sm text-muted">
                {list.length} · {t("dashRetentionShort")}
              </p>
            </div>

            {busy ? (
              <p className="text-muted">{t("submitting")}</p>
            ) : list.length === 0 ? (
              <p className="text-muted">{t("noResults")}</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {list.map((r) => (
                  <DeclarationCard
                    key={r.id}
                    row={r}
                    open={openId === r.id}
                    onToggle={() => setOpenId((id) => (id === r.id ? null : r.id))}
                  />
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

function SideLink({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold ${
        active ? "bg-green-soft text-green" : "text-ink hover:bg-page"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  title,
  value,
  hrefLabel,
  data,
  warn,
  icon,
  onOpen,
}: {
  title: string;
  value: string;
  hrefLabel?: string;
  data: { label: string; count: number }[];
  warn?: boolean;
  icon?: React.ReactNode;
  onOpen?: () => void;
}) {
  return (
    <article className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-muted">{title}</p>
        {hrefLabel ? (
          <button type="button" onClick={onOpen} className="text-xs font-semibold text-teal-deep">
            {hrefLabel}
          </button>
        ) : (
          <span className="text-muted">{icon}</span>
        )}
      </div>
      <p className={`text-3xl font-extrabold tabular-nums ${warn ? "text-warn" : "text-ink"}`}>
        {value}
      </p>
      <div className="mt-3 h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip
              formatter={(v: number) => [v, ""]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={warn ? "#8a5a00" : "#0c3344"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
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
    <li className="rounded-[var(--radius-ctl)] border border-line p-4">
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
