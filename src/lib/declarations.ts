import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { sendDeclarationEmail } from "@/lib/report-email";

export type Direction = "arrive" | "depart";

export type Screening = {
  malariaRisk: boolean;
  malariaPrevention: boolean | null;
  malariaClinic: boolean | null;
  malariaWhen: string;
  typhoidRisk: boolean;
  typhoidPrevention: boolean | null;
  typhoidClinic: boolean | null;
  typhoidWhen: string;
  sexualActivity: boolean;
  sexualProtected: boolean | null;
  sexualClinic: boolean | null;
  sexualWhen: string;
  stdSymptoms: boolean;
  stdHistory: boolean;
  stdClinic: boolean | null;
  stdWhen: string;
};

export type DeclarationInput = {
  direction: Direction;
  port: string;
  travelDate: string;
  purpose: string;
  medicalCondition?: string;
  medicalEmergency?: boolean | null;
  daysOutsideKuwait?: string;
  countriesVisited?: string;
  flightNumber: string;
  addressOutsideKuwait?: string;
  destinationCountry?: string;
  fullName: string;
  age: number;
  sex: string;
  citizenship: string;
  passportNumber: string;
  civilId: string;
  phoneCountry: string;
  phoneNumber: string;
  email?: string;
  hasSymptoms: boolean;
  symptomsDetail?: string;
  contactSick: boolean;
  attendedFuneral: boolean;
  visitedHospital: boolean;
  handledAnimals: boolean;
  screening: Screening;
  locale: string;
};

export type DeclarationRow = {
  id: string;
  code: string;
  direction: string;
  port: string;
  travel_date: string;
  purpose: string;
  medical_condition: string | null;
  medical_emergency: boolean | null;
  days_in_uganda: string | null;
  coming_from: string | null;
  countries_visited: string | null;
  flight_number: string;
  address_in_uganda: string | null;
  destination_country: string | null;
  full_name: string;
  age: number;
  sex: string;
  citizenship: string;
  passport_number: string;
  civil_id: string | null;
  phone_country: string;
  phone_number: string;
  email: string | null;
  has_symptoms: boolean;
  symptoms_detail: string | null;
  contact_sick: boolean;
  attended_funeral: boolean;
  visited_hospital: boolean;
  handled_animals: boolean;
  screening: string | null;
  risk_flag: boolean;
  locale: string;
  created_at: string;
};

export function parseScreening(raw: unknown): Screening | null {
  if (!raw) return null;
  let value: unknown = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!value || typeof value !== "object") return null;
  return value as Screening;
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function chunk(n: number) {
  let s = "";
  for (let i = 0; i < n; i += 1) {
    s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]!;
  }
  return s;
}

function makeCode() {
  return `KW-${chunk(4)}-${chunk(4)}`;
}

function makeId() {
  return `d_${Date.now().toString(36)}_${chunk(8).toLowerCase()}`;
}

function isNonEmpty(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isBool(v: unknown): v is boolean {
  return typeof v === "boolean";
}

function validateScreening(raw: Screening): Screening {
  if (!isBool(raw.malariaRisk)) throw new Error("Malaria answer required");
  if (!isBool(raw.typhoidRisk)) throw new Error("Typhoid answer required");
  if (!isBool(raw.sexualActivity)) throw new Error("Personal life answer required");
  if (!isBool(raw.stdSymptoms)) throw new Error("STD/UTI answer required");
  if (!isBool(raw.stdHistory)) throw new Error("STD/UTI history required");
  if (raw.malariaRisk && !isNonEmpty(raw.malariaWhen)) {
    throw new Error("Malaria timing required");
  }
  if (raw.typhoidRisk && !isNonEmpty(raw.typhoidWhen)) {
    throw new Error("Typhoid timing required");
  }
  if (raw.sexualActivity && !isNonEmpty(raw.sexualWhen)) {
    throw new Error("Personal life timing required");
  }
  if ((raw.stdSymptoms || raw.stdHistory) && !isNonEmpty(raw.stdWhen)) {
    throw new Error("STD/UTI timing required");
  }
  return raw;
}

function validateInput(raw: DeclarationInput): DeclarationInput {
  if (raw.direction !== "arrive" && raw.direction !== "depart") {
    throw new Error("Invalid direction");
  }
  if (!isNonEmpty(raw.port)) throw new Error("Port is required");
  if (!isNonEmpty(raw.travelDate)) throw new Error("Date is required");
  if (!isNonEmpty(raw.purpose)) throw new Error("Purpose is required");
  if (raw.purpose === "medical" && !isNonEmpty(raw.medicalCondition ?? "")) {
    throw new Error("Medical condition is required");
  }
  if (!isNonEmpty(raw.flightNumber)) throw new Error("Flight number is required");
  if (raw.direction === "arrive") {
    if (!isNonEmpty(raw.addressOutsideKuwait ?? "")) {
      throw new Error("Address is required");
    }
  } else if (!isNonEmpty(raw.destinationCountry ?? "")) {
    throw new Error("Destination is required");
  }
  if (!isNonEmpty(raw.fullName)) throw new Error("Name is required");
  if (!Number.isInteger(raw.age) || raw.age < 0 || raw.age > 120) {
    throw new Error("Age is required");
  }
  if (raw.sex !== "female" && raw.sex !== "male") throw new Error("Sex is required");
  if (!isNonEmpty(raw.citizenship)) throw new Error("Citizenship is required");
  if (!isNonEmpty(raw.passportNumber)) throw new Error("Passport is required");
  if (!isNonEmpty(raw.civilId)) throw new Error("Civil ID is required");
  if (!isNonEmpty(raw.phoneCountry) || !isNonEmpty(raw.phoneNumber)) {
    throw new Error("Phone is required");
  }
  if (typeof raw.hasSymptoms !== "boolean") throw new Error("Symptoms answer required");
  if (typeof raw.contactSick !== "boolean") throw new Error("Contact answer required");
  if (typeof raw.attendedFuneral !== "boolean") throw new Error("Funeral answer required");
  if (typeof raw.visitedHospital !== "boolean") throw new Error("Hospital answer required");
  if (typeof raw.handledAnimals !== "boolean") throw new Error("Animals answer required");
  if (raw.email && raw.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) {
    throw new Error("Invalid email");
  }
  const screening = validateScreening(raw.screening);
  return {
    ...raw,
    port: raw.port.trim(),
    purpose: raw.purpose.trim(),
    flightNumber: raw.flightNumber.trim(),
    fullName: raw.fullName.trim(),
    passportNumber: raw.passportNumber.trim(),
    civilId: raw.civilId.trim(),
    phoneNumber: raw.phoneNumber.trim(),
    email: raw.email?.trim() || undefined,
    medicalCondition: raw.medicalCondition?.trim() || undefined,
    daysOutsideKuwait: raw.daysOutsideKuwait?.trim() || undefined,
    countriesVisited: raw.countriesVisited?.trim() || undefined,
    addressOutsideKuwait: raw.addressOutsideKuwait?.trim() || undefined,
    destinationCountry: raw.destinationCountry?.trim() || undefined,
    symptomsDetail: raw.symptomsDetail?.trim() || undefined,
    screening,
  };
}

function riskFrom(data: DeclarationInput): boolean {
  const s = data.screening;
  return (
    data.hasSymptoms ||
    data.contactSick ||
    data.attendedFuneral ||
    data.visitedHospital ||
    data.handledAnimals ||
    s.malariaRisk ||
    s.typhoidRisk ||
    (s.sexualActivity && s.sexualProtected === false) ||
    s.stdSymptoms ||
    s.stdHistory
  );
}

export const submitDeclaration = createServerFn({ method: "POST" })
  .validator((raw: DeclarationInput) => validateInput(raw))
  .handler(async ({ data }) => {
    const sql = await getSql();
    const riskFlag = riskFrom(data);

    let code = makeCode();
    let id = makeId();
    for (let attempt = 0; attempt < 6; attempt += 1) {
      try {
        await sql`
          insert into declarations (
            id, code, direction, port, travel_date, purpose,
            medical_condition, medical_emergency, days_in_uganda,
            coming_from, countries_visited, flight_number, address_in_uganda,
            destination_country, full_name, age, sex, citizenship,
            passport_number, civil_id, phone_country, phone_number, email,
            has_symptoms, symptoms_detail, contact_sick, attended_funeral,
            visited_hospital, handled_animals, screening, risk_flag, locale
          ) values (
            ${id}, ${code}, ${data.direction}, ${data.port}, ${data.travelDate},
            ${data.purpose}, ${data.medicalCondition ?? null},
            ${data.medicalEmergency ?? null}, ${data.daysOutsideKuwait ?? null},
            ${null}, ${data.countriesVisited ?? null},
            ${data.flightNumber}, ${data.addressOutsideKuwait ?? null},
            ${data.destinationCountry ?? null}, ${data.fullName}, ${data.age},
            ${data.sex}, ${data.citizenship}, ${data.passportNumber},
            ${data.civilId}, ${data.phoneCountry}, ${data.phoneNumber}, ${data.email ?? null},
            ${data.hasSymptoms}, ${data.symptomsDetail ?? null},
            ${data.contactSick}, ${data.attendedFuneral},
            ${data.visitedHospital}, ${data.handledAnimals},
            ${JSON.stringify(data.screening)}, ${riskFlag},
            ${data.locale}
          )
        `;
        await purgeExpired(sql);
        const emailed = await sendDeclarationEmail(code, riskFlag, data);
        return { code, riskFlag, emailed };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate")) {
          code = makeCode();
          id = makeId();
          continue;
        }
        throw err;
      }
    }
    throw new Error("Could not assign a unique code");
  });

export const RETENTION_DAYS = 21;

async function purgeExpired(sql: Awaited<ReturnType<typeof getSql>>) {
  await sql`delete from declarations where created_at < now() - interval '21 days'`;
}

export const getDeclarationByCode = createServerFn({ method: "GET" })
  .validator((code: string) => code.trim().toUpperCase())
  .handler(async ({ data: code }) => {
    const sql = await getSql();
    const rows = await sql<DeclarationRow>`
      select * from declarations where code = ${code} limit 1
    `;
    return rows[0] ?? null;
  });

export const searchDeclarations = createServerFn({ method: "GET" })
  .validator((q: string) => q.trim())
  .handler(async ({ data: q }) => {
    const sql = await getSql();
    await purgeExpired(sql);
    if (!q) {
      return sql<DeclarationRow>`
        select * from declarations
        where created_at >= now() - interval '21 days'
        order by created_at desc
        limit 400
      `;
    }
    const like = `%${q}%`;
    return sql<DeclarationRow>`
      select * from declarations
      where created_at >= now() - interval '21 days'
        and (
          code ilike ${like}
          or full_name ilike ${like}
          or passport_number ilike ${like}
          or civil_id ilike ${like}
          or flight_number ilike ${like}
        )
      order by created_at desc
      limit 400
    `;
  });
