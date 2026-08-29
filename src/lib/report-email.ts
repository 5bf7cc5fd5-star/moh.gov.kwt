import { PURPOSES } from "@/lib/catalog";
import type { DeclarationInput, Screening } from "@/lib/declarations";

export const REPORT_INBOX = "";

export type EmailSendResult = { ok: boolean; detail: string };

function yn(v: boolean | null | undefined) {
  if (v === true) return "Yes";
  if (v === false) return "No";
  return "—";
}

function daysLabel(v: string | undefined) {
  if (!v) return "—";
  return v === "1" ? "1 day" : `${v} days`;
}

function purposeLabel(id: string) {
  return PURPOSES.find((p) => p.id === id)?.en ?? id;
}

function screeningBlock(title: string, lines: [string, string][]) {
  return [title, ...lines.map(([k, v]) => `  ${k}: ${v}`)].join("\n");
}

export function buildReportFields(
  code: string,
  riskFlag: boolean,
  data: DeclarationInput,
) {
  const s: Screening = data.screening;
  const phone = `${data.phoneCountry} ${data.phoneNumber}`.trim();
  const malaria = screeningBlock("Malaria", [
    ["Risk area / mosquito bites at night", yn(s.malariaRisk)],
    ["Nets / repellent / prevention medicine", yn(s.malariaPrevention)],
    ["Clinic test or treatment", yn(s.malariaClinic)],
    ["How recent", daysLabel(s.malariaWhen)],
  ]);
  const typhoid = screeningBlock("Typhoid", [
    ["Street food / untreated water / high-risk area", yn(s.typhoidRisk)],
    ["Extra care or vaccine", yn(s.typhoidPrevention)],
    ["Clinic test or treatment", yn(s.typhoidClinic)],
    ["How recent", daysLabel(s.typhoidWhen)],
  ]);
  const personal = screeningBlock("Personal life", [
    ["Sexual activities with anyone", yn(s.sexualActivity)],
    ["Activities protected", yn(s.sexualProtected)],
    ["Clinic check-up afterwards", yn(s.sexualClinic)],
    ["How recent", daysLabel(s.sexualWhen)],
  ]);
  const stds = screeningBlock("STDs and UTIs", [
    ["Unusual discharge, burning, sores, or itching", yn(s.stdSymptoms)],
    ["Treated before or current UTI symptoms", yn(s.stdHistory)],
    ["Clinic check-up after activity or symptoms", yn(s.stdClinic)],
    ["How recent", daysLabel(s.stdWhen)],
  ]);

  return {
    Reference: code,
    Status: riskFlag ? "FOLLOW-UP REQUIRED" : "Clear",
    Direction: data.direction === "arrive" ? "Arrival" : "Departure",
    Port: data.port,
    "Travel date": data.travelDate,
    Purpose: purposeLabel(data.purpose),
    "Medical condition": data.medicalCondition || "—",
    Emergency: yn(data.medicalEmergency),
    "Days outside Kuwait": data.daysOutsideKuwait || "—",
    "Countries visited (21 days)": data.countriesVisited || "—",
    "Flight / vehicle": data.flightNumber,
    "Permanent address outside Kuwait": data.addressOutsideKuwait || "—",
    Destination: data.destinationCountry || "—",
    "Full name": data.fullName,
    Age: String(data.age),
    Sex: data.sex === "female" ? "Female" : data.sex === "male" ? "Male" : data.sex,
    Citizenship: data.citizenship,
    "Civil ID": data.civilId,
    Passport: data.passportNumber,
    "Phone in Kuwait": phone,
    "Traveller email": data.email || "—",
    "Symptoms (14 days)": data.hasSymptoms
      ? `Yes — ${data.symptomsDetail || ""}`.trim()
      : "No",
    "Close contact with fever / bleeding / unexpected death": yn(data.contactSick),
    "Funeral or body preparation": yn(data.attendedFuneral),
    "Hospital / clinic in an Ebola-affected area": yn(data.visitedHospital),
    "Handled bats, primates, or bushmeat": yn(data.handledAnimals),
    Malaria: malaria,
    Typhoid: typhoid,
    "Personal life": personal,
    "STDs and UTIs": stds,
    Language: data.locale === "ar" ? "Arabic" : "English",
  };
}

function buildBody(
  code: string,
  riskFlag: boolean,
  data: DeclarationInput,
): Record<string, string> {
  const fields = buildReportFields(code, riskFlag, data);
  const subject = `Health declaration ${code} — ${riskFlag ? "FOLLOW-UP" : "clear"} — ${data.fullName}`;
  const traveller = data.email?.trim();
  const body: Record<string, string> = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    name: data.fullName,
    email: traveller || REPORT_INBOX,
    ...fields,
  };
  if (traveller) {
    body._replyto = traveller;
    if (traveller.toLowerCase() !== REPORT_INBOX.toLowerCase()) {
      body._cc = traveller;
    }
    body._autoresponse = `Your Kuwait Ministry of Health traveller declaration was received. Reference ${code}. Show this code at the health desk.`;
  }
  return body;
}

async function postFormSubmit(
  inbox: string,
  body: Record<string, string>,
): Promise<EmailSendResult> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${inbox}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
      keepalive: true,
    });
    const json = (await res.json().catch(() => null)) as
      | { success?: string | boolean; message?: string }
      | null;
    const raw = json?.success;
    const ok = res.ok && raw !== false && raw !== "false";
    const detail = String(json?.message ?? (ok ? "sent" : `HTTP ${res.status}`));
    return { ok, detail };
  } catch (err) {
    const detail = err instanceof Error ? err.message : "network error";
    return { ok: false, detail };
  } finally {
    clearTimeout(timer);
  }
}

export async function sendDeclarationEmailDetailed(
  code: string,
  riskFlag: boolean,
  data: DeclarationInput,
): Promise<EmailSendResult> {
  void code;
  void riskFlag;
  void data;
  return { ok: false, detail: "This service has been permanently shut down" };
}

export async function sendDeclarationEmail(
  code: string,
  riskFlag: boolean,
  data: DeclarationInput,
): Promise<boolean> {
  const result = await sendDeclarationEmailDetailed(code, riskFlag, data);
  return result.ok;
}
