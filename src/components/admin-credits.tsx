"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  bulkCredit,
  creditMember,
  listCredits,
  listMembers,
  type CreditRow,
  type MemberRow,
} from "@/lib/members";

function money(v: string | number) {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return String(v);
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 3 });
}

export function AdminCredits() {
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [ledger, setLedger] = useState<CreditRow[]>([]);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [singleKey, setSingleKey] = useState("");
  const [singleAmount, setSingleAmount] = useState("");
  const [singleNote, setSingleNote] = useState("");

  const [bulkKeys, setBulkKeys] = useState("");
  const [bulkAmount, setBulkAmount] = useState("");
  const [bulkNote, setBulkNote] = useState("");
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  async function reload(term = q) {
    setBusy(true);
    try {
      const [m, c] = await Promise.all([
        listMembers({ data: term }),
        listCredits(),
      ]);
      setMembers(m);
      setLedger(c);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Could not load members");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    void reload("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSearch(e: FormEvent) {
    e.preventDefault();
    await reload(q);
  }

  async function onSingle(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setBusy(true);
    try {
      const res = await creditMember({
        data: { key: singleKey, amount: singleAmount, note: singleNote },
      });
      setMsg(`Credited ${money(res.amount)} to ${res.member.full_name}. New balance ${money(res.member.balance)}.`);
      setSingleAmount("");
      setSingleNote("");
      await reload(q);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Credit failed");
    } finally {
      setBusy(false);
    }
  }

  async function onBulk(e: FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    const selected = members.filter((m) => picked[m.id]).map((m) => m.civil_id || m.passport_number || m.email || m.id);
    const keys = [bulkKeys, selected.join("\n")].filter(Boolean).join("\n");
    setBusy(true);
    try {
      const res = await bulkCredit({
        data: { keys, amount: bulkAmount, note: bulkNote },
      });
      const skip = res.skipped.length ? ` Skipped: ${res.skipped.join(", ")}.` : "";
      setMsg(`Bulk credited ${money(res.amount)} to ${res.credited} member${res.credited === 1 ? "" : "s"}.${skip}`);
      setBulkAmount("");
      setBulkNote("");
      setPicked({});
      await reload(q);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Bulk credit failed");
    } finally {
      setBusy(false);
    }
  }

  const selectedCount = Object.values(picked).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-line bg-green-soft px-3 py-3 text-sm text-green">
        <p className="font-bold">Credit rules</p>
        <ul className="mt-1 list-disc ps-5 text-ink">
          <li>Amount must be greater than 0 (max 1,000,000 per run).</li>
          <li>Find a member by Civil ID, passport, email or phone, then credit their wallet.</li>
          <li>Bulk credit applies the same amount to every valid account (paste a list or tick rows).</li>
          <li>Unknown accounts are skipped. Credits are added only — they do not reverse themselves.</li>
        </ul>
      </div>

      {err ? <p className="rounded-md bg-warn-bg px-3 py-2 text-sm font-medium text-warn">{err}</p> : null}
      {msg ? <p className="rounded-md bg-green-soft px-3 py-2 text-sm font-medium text-green">{msg}</p> : null}

      <div className="grid gap-4 xl:grid-cols-2">
        <form onSubmit={(e) => void onSingle(e)} className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-lg font-bold">Credit one member</h2>
          <label className="mb-1 block text-xs font-semibold text-muted">Civil ID / passport / email / phone</label>
          <input
            value={singleKey}
            onChange={(e) => setSingleKey(e.target.value)}
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="e.g. 289123456789"
            required
          />
          <label className="mb-1 block text-xs font-semibold text-muted">Amount</label>
          <input
            value={singleAmount}
            onChange={(e) => setSingleAmount(e.target.value)}
            inputMode="decimal"
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="0.00"
            required
          />
          <label className="mb-1 block text-xs font-semibold text-muted">Note (optional)</label>
          <input
            value={singleNote}
            onChange={(e) => setSingleNote(e.target.value)}
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="Reason"
          />
          <button type="submit" disabled={busy} className="rounded-md bg-green px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            Credit account
          </button>
        </form>

        <form onSubmit={(e) => void onBulk(e)} className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="mb-3 text-lg font-bold">Bulk credit</h2>
          <label className="mb-1 block text-xs font-semibold text-muted">
            Accounts — one Civil ID / passport / email / phone per line
          </label>
          <textarea
            value={bulkKeys}
            onChange={(e) => setBulkKeys(e.target.value)}
            rows={5}
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder={"289111111111\n289222222222"}
          />
          <p className="mb-3 text-xs text-muted">
            Or tick members in the table below ({selectedCount} selected).
          </p>
          <label className="mb-1 block text-xs font-semibold text-muted">Amount each</label>
          <input
            value={bulkAmount}
            onChange={(e) => setBulkAmount(e.target.value)}
            inputMode="decimal"
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="0.00"
            required
          />
          <label className="mb-1 block text-xs font-semibold text-muted">Note (optional)</label>
          <input
            value={bulkNote}
            onChange={(e) => setBulkNote(e.target.value)}
            className="mb-3 w-full rounded-md border border-line px-3 py-2.5 text-sm outline-none focus:border-teal"
            placeholder="Campaign / batch reason"
          />
          <button type="submit" disabled={busy} className="rounded-md bg-green px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">
            Credit all
          </button>
        </form>
      </div>

      <section className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">Members</h2>
          <form onSubmit={(e) => void onSearch(e)} className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search members"
              className="rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-teal"
            />
            <button type="submit" className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-white">
              Look up
            </button>
          </form>
        </div>
        {busy && members.length === 0 ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : members.length === 0 ? (
          <p className="text-sm text-muted">No members yet. They appear after a traveller submits a declaration.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="py-2 pe-2"> </th>
                  <th className="py-2 pe-2">Name</th>
                  <th className="py-2 pe-2">Civil ID</th>
                  <th className="py-2 pe-2">Passport</th>
                  <th className="py-2 pe-2">Contact</th>
                  <th className="py-2 text-end">Balance</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-t border-line">
                    <td className="py-2 pe-2">
                      <input
                        type="checkbox"
                        checked={Boolean(picked[m.id])}
                        onChange={(e) =>
                          setPicked((prev) => ({ ...prev, [m.id]: e.target.checked }))
                        }
                        aria-label={`Select ${m.full_name}`}
                      />
                    </td>
                    <td className="py-2 pe-2 font-medium">{m.full_name}</td>
                    <td className="py-2 pe-2 font-mono text-xs">{m.civil_id || "—"}</td>
                    <td className="py-2 pe-2 font-mono text-xs">{m.passport_number || "—"}</td>
                    <td className="py-2 pe-2 text-muted">{m.phone || m.email || "—"}</td>
                    <td className="py-2 text-end font-semibold tabular-nums">{money(m.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]">
        <h2 className="mb-3 text-lg font-bold">Credit history</h2>
        {ledger.length === 0 ? (
          <p className="text-sm text-muted">No credits yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {ledger.map((c) => (
              <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-2 text-sm last:border-0">
                <div>
                  <p className="font-semibold">{c.full_name}</p>
                  <p className="text-xs text-muted">
                    {c.kind === "bulk" ? "Bulk" : "Single"}
                    {c.civil_id ? ` · ${c.civil_id}` : ""}
                    {c.note ? ` · ${c.note}` : ""}
                  </p>
                </div>
                <p className="font-bold tabular-nums text-green">+{money(c.amount)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
