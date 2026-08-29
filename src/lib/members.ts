import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

export type MemberRow = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  civil_id: string | null;
  passport_number: string | null;
  balance: string;
  created_at: string;
};

export type CreditRow = {
  id: string;
  member_id: string;
  amount: string;
  note: string | null;
  batch_id: string | null;
  kind: string;
  created_at: string;
  full_name: string;
  civil_id: string | null;
};

const MAX_CREDIT = 1_000_000;

function makeId() {
  return crypto.randomUUID();
}

function parseAmount(raw: string) {
  const n = Number(String(raw).replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  if (n > MAX_CREDIT) {
    throw new Error(`Amount cannot exceed ${MAX_CREDIT.toLocaleString()}`);
  }
  return Math.round(n * 1000) / 1000;
}

async function ensureStore(sql: Awaited<ReturnType<typeof getSql>>) {
  const { restoreDeclarationsFromBackup, snapshotAppStore } = await import(
    "@/lib/declaration-backup.server"
  );
  await restoreDeclarationsFromBackup(sql);
  return { snapshotAppStore };
}

async function syncMembersFromDeclarations() {
  const sql = await getSql();
  await ensureStore(sql);
  await sql`
    insert into members (id, full_name, email, phone, civil_id, passport_number, balance)
    select
      d.id,
      d.full_name,
      nullif(d.email, ''),
      nullif(trim(d.phone_country || ' ' || d.phone_number), ''),
      nullif(d.civil_id, ''),
      nullif(d.passport_number, ''),
      0
    from declarations d
    where not exists (
      select 1 from members m
      where m.id = d.id
         or (nullif(d.civil_id, '') is not null and m.civil_id = d.civil_id)
         or (nullif(d.passport_number, '') is not null and m.passport_number = d.passport_number)
    )
  `;
}

async function findMember(sql: Awaited<ReturnType<typeof getSql>>, key: string) {
  const q = key.trim();
  if (!q) return null;
  const like = q;
  const rows = await sql<MemberRow>`
    select * from members
    where id = ${like}
       or lower(coalesce(email, '')) = ${q.toLowerCase()}
       or civil_id = ${like}
       or passport_number = ${like}
       or phone = ${like}
       or replace(coalesce(phone, ''), ' ', '') = ${q.replace(/\s+/g, "")}
    limit 1
  `;
  return rows[0] ?? null;
}

export const listMembers = createServerFn({ method: "GET" })
  .validator((q: string) => q.trim())
  .handler(async ({ data: q }) => {
    const sql = await getSql();
    await syncMembersFromDeclarations();
    if (!q) {
      return sql<MemberRow>`
        select * from members order by updated_at desc limit 400
      `;
    }
    const like = `%${q}%`;
    return sql<MemberRow>`
      select * from members
      where full_name ilike ${like}
         or coalesce(email, '') ilike ${like}
         or coalesce(civil_id, '') ilike ${like}
         or coalesce(passport_number, '') ilike ${like}
         or coalesce(phone, '') ilike ${like}
      order by updated_at desc
      limit 400
    `;
  });

export const listCredits = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  await ensureStore(sql);
  return sql<CreditRow>`
    select
      c.id, c.member_id, c.amount::text as amount, c.note, c.batch_id, c.kind,
      c.created_at, m.full_name, m.civil_id
    from credit_ledger c
    join members m on m.id = c.member_id
    order by c.created_at desc
    limit 200
  `;
});

export const creditMember = createServerFn({ method: "POST" })
  .validator((raw: { key: string; amount: string; note: string }) => ({
    key: String(raw.key ?? "").trim(),
    amount: String(raw.amount ?? ""),
    note: String(raw.note ?? "").trim().slice(0, 200),
  }))
  .handler(async (): Promise<{ ok: true; member: MemberRow; amount: number }> => {
    throw new Error("This service has been permanently shut down");
  });

export const bulkCredit = createServerFn({ method: "POST" })
  .validator((raw: { keys: string; amount: string; note: string }) => ({
    keys: String(raw.keys ?? ""),
    amount: String(raw.amount ?? ""),
    note: String(raw.note ?? "").trim().slice(0, 200),
  }))
  .handler(async (): Promise<{
    ok: true;
    amount: number;
    credited: number;
    skipped: string[];
    names: string[];
    batchId: string;
  }> => {
    throw new Error("This service has been permanently shut down");
  });
