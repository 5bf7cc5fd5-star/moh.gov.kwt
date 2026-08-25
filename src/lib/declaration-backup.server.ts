import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Sql } from "@/lib/db";
import type { DeclarationRow } from "@/lib/declarations";

const RETENTION_MS = 21 * 24 * 60 * 60 * 1000;

function dataDir() {
  return join(process.cwd(), "data");
}

function backupFile() {
  return join(dataDir(), "declarations-backup.jsonl");
}

export async function appendDeclarationBackup(row: DeclarationRow) {
  try {
    await mkdir(dataDir(), { recursive: true });
    await appendFile(backupFile(), `${JSON.stringify(row)}\n`, "utf8");
  } catch (err) {
    console.error("[backup] could not write declaration file", err);
  }
}

export async function restoreDeclarationsFromBackup(sql: Sql) {
  let text = "";
  try {
    text = await readFile(backupFile(), "utf8");
  } catch {
    return;
  }
  const cutoff = Date.now() - RETENTION_MS;
  const seen = new Set<string>();
  for (const line of text.split("\n")) {
    const raw = line.trim();
    if (!raw) continue;
    let row: DeclarationRow;
    try {
      row = JSON.parse(raw) as DeclarationRow;
    } catch {
      continue;
    }
    if (!row?.id || !row.code || seen.has(row.id)) continue;
    seen.add(row.id);
    const created = new Date(row.created_at).getTime();
    if (Number.isFinite(created) && created < cutoff) continue;
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
          ${row.full_name}, ${row.age}, ${row.sex}, ${row.citizenship},
          ${row.passport_number}, ${row.civil_id}, ${row.phone_country},
          ${row.phone_number}, ${row.email}, ${row.has_symptoms},
          ${row.symptoms_detail}, ${row.contact_sick}, ${row.attended_funeral},
          ${row.visited_hospital}, ${row.handled_animals}, ${screening},
          ${row.risk_flag}, ${row.locale}, ${row.created_at}
        )
        on conflict (id) do nothing
      `;
    } catch (err) {
      console.error("[backup] restore skipped", row.code, err);
    }
  }
}
