import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { Sql } from "@/lib/db";
import type { DeclarationRow } from "@/lib/declarations";
import type { MemberRow } from "@/lib/members";

const RETENTION_MS = 21 * 24 * 60 * 60 * 1000;

type StoreFile = {
  savedAt: string;
  declarations: DeclarationRow[];
  members: MemberRow[];
  credits: Array<{
    id: string;
    member_id: string;
    amount: string;
    note: string | null;
    batch_id: string | null;
    kind: string;
    created_at: string;
  }>;
};

function storePaths() {
  return [
    join(process.cwd(), "data", "app-store.json"),
    join("/tmp", "moh-app-store.json"),
  ];
}

async function writeAtomic(path: string, text: string) {
  await mkdir(dirname(path), { recursive: true });
  const tmp = `${path}.${process.pid}.tmp`;
  await writeFile(tmp, text, "utf8");
  await rename(tmp, path);
}

export async function readStoreFile(): Promise<StoreFile | null> {
  for (const path of storePaths()) {
    try {
      const text = await readFile(path, "utf8");
      const parsed = JSON.parse(text) as StoreFile;
      if (parsed && Array.isArray(parsed.declarations)) return parsed;
    } catch {
      /* try next path */
    }
  }
  return null;
}

export async function snapshotAppStore(sql: Sql) {
  try {
    const declarations = await sql<DeclarationRow>`
      select * from declarations order by created_at desc
    `;
    const members = await sql<MemberRow>`
      select
        id, full_name, email, phone, civil_id, passport_number,
        balance::text as balance, created_at
      from members
      order by created_at desc
    `;
    const credits = await sql<{ id: string; member_id: string; amount: string; note: string | null; batch_id: string | null; kind: string; created_at: string }>`
      select
        id, member_id, amount::text as amount, note, batch_id, kind, created_at
      from credit_ledger
      order by created_at desc
    `;
    const payload: StoreFile = {
      savedAt: new Date().toISOString(),
      declarations,
      members,
      credits,
    };
    const text = JSON.stringify(payload);
    for (const path of storePaths()) {
      try {
        await writeAtomic(path, text);
      } catch (err) {
        console.error("[backup] snapshot write failed", path, err);
      }
    }
  } catch (err) {
    console.error("[backup] snapshot failed", err);
  }
}

function stillKept(iso: string | null | undefined) {
  if (!iso) return true;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return true;
  return Date.now() - t <= RETENTION_MS;
}

export async function restoreDeclarationsFromBackup(sql: Sql) {
  const store = await readStoreFile();
  if (!store) return;

  for (const row of store.declarations) {
    if (!row?.id || !row.code || !stillKept(row.created_at)) continue;
    const screening =
      typeof row.screening === "string"
        ? row.screening
        : JSON.stringify(row.screening ?? {});
    try {
      await sql`
        insert into declarations (
          id, code, direction, port, travel_date, purpose,
          medical_condition, medical_emergency, days_in_uganda,
          coming_from, countries_visited, flight_number, address_in_uganda,
          destination_country, full_name, age, sex, citizenship,
          passport_number, civil_id, phone_country, phone_number, email,
          has_symptoms, symptoms_detail, contact_sick, attended_funeral,
          visited_hospital, handled_animals, screening, risk_flag, locale,
          created_at
        ) values (
          ${row.id}, ${row.code}, ${row.direction}, ${row.port}, ${row.travel_date},
          ${row.purpose}, ${row.medical_condition}, ${row.medical_emergency},
          ${row.days_in_uganda}, ${row.coming_from}, ${row.countries_visited},
          ${row.flight_number}, ${row.address_in_uganda}, ${row.destination_country},
          ${row.full_name}, ${Number(row.age)}, ${row.sex}, ${row.citizenship},
          ${row.passport_number}, ${row.civil_id}, ${row.phone_country},
          ${row.phone_number}, ${row.email}, ${row.has_symptoms},
          ${row.symptoms_detail}, ${row.contact_sick}, ${row.attended_funeral},
          ${row.visited_hospital}, ${row.handled_animals}, ${screening},
          ${row.risk_flag}, ${row.locale}, ${row.created_at}
        )
        on conflict (id) do nothing
      `;
    } catch (err) {
      console.error("[backup] declaration restore skipped", row.code, err);
    }
  }

  for (const row of store.members ?? []) {
    if (!row?.id) continue;
    try {
      await sql`
        insert into members (
          id, full_name, email, phone, civil_id, passport_number, balance, created_at
        ) values (
          ${row.id}, ${row.full_name}, ${row.email}, ${row.phone},
          ${row.civil_id}, ${row.passport_number}, ${Number(row.balance) || 0},
          ${row.created_at}
        )
        on conflict (id) do nothing
      `;
    } catch (err) {
      console.error("[backup] member restore skipped", row.id, err);
    }
  }

  for (const row of store.credits ?? []) {
    if (!row?.id) continue;
    try {
      await sql`
        insert into credit_ledger (
          id, member_id, amount, note, batch_id, kind, created_at
        ) values (
          ${row.id}, ${row.member_id}, ${Number(row.amount) || 0}, ${row.note},
          ${row.batch_id}, ${row.kind || "single"}, ${row.created_at}
        )
        on conflict (id) do nothing
      `;
    } catch (err) {
      console.error("[backup] credit restore skipped", row.id, err);
    }
  }
}

/** @deprecated kept so older callers still compile */
export async function appendDeclarationBackup(row: DeclarationRow) {
  const existing = (await readStoreFile()) ?? {
    savedAt: new Date().toISOString(),
    declarations: [],
    members: [],
    credits: [],
  };
  existing.declarations = [
    row,
    ...existing.declarations.filter((r) => r.id !== row.id),
  ];
  const text = JSON.stringify(existing);
  for (const path of storePaths()) {
    try {
      await writeAtomic(path, text);
    } catch (err) {
      console.error("[backup] append write failed", path, err);
    }
  }
}
