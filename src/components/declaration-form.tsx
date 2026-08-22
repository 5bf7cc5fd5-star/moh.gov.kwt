"use client";

import { useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { COUNTRIES, COUNTRY_NAMES, PORTS, PURPOSES } from "@/lib/catalog";
import {
  submitDeclaration,
  type DeclarationInput,
  type Direction,
} from "@/lib/declarations";
import { sendDeclarationEmailDetailed } from "@/lib/report-email";
import { useLocale } from "@/lib/locale";
import type { Msg } from "@/lib/i18n";
import {
  ChoicePills,
  DateInput,
  FormNote,
  SectionCard,
  SelectInput,
  TextInput,
  YesNo,
} from "@/components/form-controls";

type Errors = Partial<Record<string, string>>;

function todayIso() {
  const n = new Date();
  const y = n.getFullYear();
  const m = String(n.getMonth() + 1).padStart(2, "0");
  const d = String(n.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function Rich({
  template,
  vars,
}: {
  template: string;
  vars: Record<string, string>;
}) {
  const parts = template.split(/\{(\w+)\}/g);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          const val = vars[part] ?? "";
          return (
            <strong key={i} className="font-semibold text-ink">
              {val}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const EXPOSURE = ["1", "3", "7", "14", "21", "30"] as const;
const SEX_WHEN = ["1", "3", "6", "9", "12", "15"] as const;

export function DeclarationForm({ direction }: { direction: Direction }) {
  const { t, locale } = useLocale();
  const navigate = useNavigate();
  const arrive = direction === "arrive";

  const [port, setPort] = useState("");
  const [travelDate, setTravelDate] = useState(todayIso);
  const [purpose, setPurpose] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [medicalEmergency, setMedicalEmergency] = useState<boolean | null>(null);
  const [daysOutsideKuwait, setDaysOutsideKuwait] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [countriesVisited, setCountriesVisited] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [addressOutsideKuwait, setAddressOutsideKuwait] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [civilId, setCivilId] = useState("");
  const [phoneCountry, setPhoneCountry] = useState("Kuwait (+965)");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [hasSymptoms, setHasSymptoms] = useState<boolean | null>(null);
  const [symptomsDetail, setSymptomsDetail] = useState("");
  const [contactSick, setContactSick] = useState<boolean | null>(null);
  const [attendedFuneral, setAttendedFuneral] = useState<boolean | null>(null);
  const [visitedHospital, setVisitedHospital] = useState<boolean | null>(null);
  const [handledAnimals, setHandledAnimals] = useState<boolean | null>(null);

  const [malariaRisk, setMalariaRisk] = useState<boolean | null>(null);
  const [malariaPrevention, setMalariaPrevention] = useState<boolean | null>(null);
  const [malariaClinic, setMalariaClinic] = useState<boolean | null>(null);
  const [malariaWhen, setMalariaWhen] = useState("");
  const [typhoidRisk, setTyphoidRisk] = useState<boolean | null>(null);
  const [typhoidPrevention, setTyphoidPrevention] = useState<boolean | null>(null);
  const [typhoidClinic, setTyphoidClinic] = useState<boolean | null>(null);
  const [typhoidWhen, setTyphoidWhen] = useState("");
  const [sexualActivity, setSexualActivity] = useState<boolean | null>(null);
  const [sexualProtected, setSexualProtected] = useState<boolean | null>(null);
  const [sexualClinic, setSexualClinic] = useState<boolean | null>(null);
  const [sexualWhen, setSexualWhen] = useState("");
  const [stdSymptoms, setStdSymptoms] = useState<boolean | null>(null);
  const [stdHistory, setStdHistory] = useState<boolean | null>(null);
  const [stdClinic, setStdClinic] = useState<boolean | null>(null);
  const [stdWhen, setStdWhen] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const req = t("required");

  const phoneOptions = useMemo(
    () => COUNTRIES.map((c) => `${c.name} (${c.dial})`),
    [],
  );

  const exposureOpts = EXPOSURE.map((id) => ({
    id,
    label: t(`recency${id}` as Msg),
  }));
  const sexWhenOpts = SEX_WHEN.map((id) => ({
    id,
    label: t(`recency${id}` as Msg),
  }));

  function validate(): Errors {
    const e: Errors = {};
    if (!port) e.port = req;
    if (!travelDate) e.travelDate = req;
    if (!purpose) e.purpose = req;
    if (purpose === "medical" && !medicalCondition.trim()) {
      e.medicalCondition = req;
    }
    if (purpose === "medical" && medicalEmergency === null) {
      e.medicalEmergency = req;
    }
    if (!arrive && !destinationCountry) e.destinationCountry = req;
    if (!flightNumber.trim()) e.flightNumber = req;
    if (arrive && !addressOutsideKuwait.trim()) e.addressOutsideKuwait = req;
    if (!fullName.trim()) e.fullName = req;
    const ageNum = Number(age);
    if (!age.trim() || !Number.isFinite(ageNum) || ageNum < 0 || ageNum > 120) {
      e.age = t("invalidAge");
    }
    if (!sex) e.sex = req;
    if (!citizenship) e.citizenship = req;
    if (!passportNumber.trim()) e.passportNumber = req;
    if (!civilId.trim()) e.civilId = req;
    if (!phoneNumber.trim()) e.phoneNumber = req;
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = t("invalidEmail");
    }
    if (hasSymptoms === null) e.hasSymptoms = req;
    if (hasSymptoms && !symptomsDetail.trim()) e.symptomsDetail = req;
    if (contactSick === null) e.contactSick = req;
    if (attendedFuneral === null) e.attendedFuneral = req;
    if (visitedHospital === null) e.visitedHospital = req;
    if (handledAnimals === null) e.handledAnimals = req;
    if (malariaRisk === null) e.malariaRisk = req;
    if (malariaRisk) {
      if (malariaPrevention === null) e.malariaPrevention = req;
      if (malariaClinic === null) e.malariaClinic = req;
      if (!malariaWhen) e.malariaWhen = req;
    }
    if (typhoidRisk === null) e.typhoidRisk = req;
    if (typhoidRisk) {
      if (typhoidPrevention === null) e.typhoidPrevention = req;
      if (typhoidClinic === null) e.typhoidClinic = req;
      if (!typhoidWhen) e.typhoidWhen = req;
    }
    if (sexualActivity === null) e.sexualActivity = req;
    if (sexualActivity) {
      if (sexualProtected === null) e.sexualProtected = req;
      if (sexualClinic === null) e.sexualClinic = req;
      if (!sexualWhen) e.sexualWhen = req;
    }
    if (stdSymptoms === null) e.stdSymptoms = req;
    if (stdHistory === null) e.stdHistory = req;
    if (stdClinic === null) e.stdClinic = req;
    if (stdSymptoms || stdHistory) {
      if (!stdWhen) e.stdWhen = req;
    }
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const next = validate();
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document
        .querySelector(`[data-field="${first}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const payload: DeclarationInput = {
      direction,
      port,
      travelDate,
      purpose,
      medicalCondition: purpose === "medical" ? medicalCondition : undefined,
      medicalEmergency: purpose === "medical" ? medicalEmergency : null,
      daysOutsideKuwait: daysOutsideKuwait || undefined,
      countriesVisited: countriesVisited || undefined,
      flightNumber,
      addressOutsideKuwait: arrive ? addressOutsideKuwait : undefined,
      destinationCountry: arrive ? undefined : destinationCountry,
      fullName,
      age: Number(age),
      sex,
      citizenship,
      passportNumber,
      civilId,
      phoneCountry,
      phoneNumber,
      email: email || undefined,
      hasSymptoms: Boolean(hasSymptoms),
      symptomsDetail: hasSymptoms ? symptomsDetail : undefined,
      contactSick: Boolean(contactSick),
      attendedFuneral: Boolean(attendedFuneral),
      visitedHospital: Boolean(visitedHospital),
      handledAnimals: Boolean(handledAnimals),
      screening: {
        malariaRisk: Boolean(malariaRisk),
        malariaPrevention: malariaRisk ? malariaPrevention : null,
        malariaClinic: malariaRisk ? malariaClinic : null,
        malariaWhen: malariaRisk ? malariaWhen : "",
        typhoidRisk: Boolean(typhoidRisk),
        typhoidPrevention: typhoidRisk ? typhoidPrevention : null,
        typhoidClinic: typhoidRisk ? typhoidClinic : null,
        typhoidWhen: typhoidRisk ? typhoidWhen : "",
        sexualActivity: Boolean(sexualActivity),
        sexualProtected: sexualActivity ? sexualProtected : null,
        sexualClinic: sexualActivity ? sexualClinic : null,
        sexualWhen: sexualActivity ? sexualWhen : "",
        stdSymptoms: Boolean(stdSymptoms),
        stdHistory: Boolean(stdHistory),
        stdClinic: stdClinic,
        stdWhen: stdSymptoms || stdHistory ? stdWhen : "",
      },
      locale,
    };
    setBusy(true);
    try {
      const result = await submitDeclaration({ data: payload });
      let emailed = result.emailed;
      let emailDetail = emailed ? "sent" : "";
      if (!emailed) {
        const retry = await sendDeclarationEmailDetailed(
          result.code,
          result.riskFlag,
          payload,
        );
        emailed = retry.ok;
        emailDetail = retry.detail;
      }
      await navigate({
        to: "/declare/done/$code",
        params: { code: result.code },
        search: { emailed: emailed ? "1" : "0", why: emailDetail },
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not submit.");
      setBusy(false);
    }
  }

  const introKey = arrive ? "introArrive" : "introDepart";

  return (
    <form id="decl" onSubmit={onSubmit} className="pb-28">
      <a
        href="#decl"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-40 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        {t("skip")}
      </a>

      <Link
        to="/declare"
        className="mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline"
      >
        <span aria-hidden="true">←</span> {t("arrivalOrDeparture")}
      </Link>

      <h1 className="mb-2 text-[1.85rem] font-extrabold leading-tight tracking-tight text-ink">
        {arrive ? t("beforeArrive") : t("beforeDepart")}
      </h1>
      <p className="mb-3 text-[1.02rem] leading-relaxed text-muted">
        <Rich
          template={t(introKey, { mins: "{mins}" })}
          vars={{ mins: t("twoMinutes") }}
        />
      </p>
      <p className="mb-3 text-[1.02rem] leading-relaxed text-muted">
        {t("introHonesty")}
      </p>
      <p className="mb-5 text-[1.02rem] leading-relaxed text-muted">
        {t("introPrivacy")}
      </p>

      <div className="flex flex-col gap-3">
        <SectionCard n={1} title={t("yourTrip")}>
          <div data-field="port">
            <SelectInput
              label={arrive ? t("portEntry") : t("portExit")}
              required
              value={port}
              error={errors.port}
              onChange={(e) => setPort(e.target.value)}
            >
              <option value="">{t("selectPort")}</option>
              {PORTS.map((g) => (
                <optgroup key={g.group} label={g.group}>
                  {g.items.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </optgroup>
              ))}
            </SelectInput>
          </div>

          <div data-field="travelDate">
            <DateInput
              label={arrive ? t("dateArrival") : t("dateDeparture")}
              required
              value={travelDate}
              error={errors.travelDate}
              onChange={setTravelDate}
            />
          </div>

          <div data-field="purpose">
            <SelectInput
              label={arrive ? t("purpose") : t("purposeDepart")}
              required
              value={purpose}
              error={errors.purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option value="">{t("selectPurpose")}</option>
              {PURPOSES.map((p) => (
                <option key={p.id} value={p.id}>
                  {t(p.id as Msg)}
                </option>
              ))}
            </SelectInput>
          </div>

          {purpose === "medical" ? (
            <>
              <p className="text-sm text-muted">{t("medicalOnlyIf")}</p>
              <div data-field="medicalCondition">
                <TextInput
                  label={t("medicalCondition")}
                  required
                  value={medicalCondition}
                  error={errors.medicalCondition}
                  onChange={(e) => setMedicalCondition(e.target.value)}
                />
              </div>
              <div data-field="medicalEmergency">
                <YesNo
                  label={t("medicalEmergency")}
                  required
                  value={medicalEmergency}
                  onChange={setMedicalEmergency}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.medicalEmergency}
                />
              </div>
            </>
          ) : null}

          <div data-field="daysOutsideKuwait">
            <TextInput
              label={t("daysIn")}
              inputMode="numeric"
              placeholder={t("daysPlaceholder")}
              value={daysOutsideKuwait}
              onChange={(e) => setDaysOutsideKuwait(e.target.value)}
              className="max-w-[11rem]"
            />
          </div>

          {!arrive ? (
            <div data-field="destinationCountry">
              <SelectInput
                label={t("destination")}
                required
                value={destinationCountry}
                error={errors.destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
              >
                <option value="">{t("selectCountry")}</option>
                {COUNTRY_NAMES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectInput>
            </div>
          ) : null}

          {arrive ? (
            <div data-field="countriesVisited">
              <TextInput
                label={t("visited")}
                placeholder={t("visitedPlaceholder")}
                value={countriesVisited}
                onChange={(e) => setCountriesVisited(e.target.value)}
              />
            </div>
          ) : null}

          <div data-field="flightNumber">
            <TextInput
              label={t("flight")}
              required
              placeholder={t("flightPlaceholder")}
              value={flightNumber}
              error={errors.flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              autoCapitalize="characters"
            />
          </div>

          {arrive ? (
            <div data-field="addressOutsideKuwait">
              <TextInput
                label={t("address")}
                required
                placeholder={t("addressPlaceholder")}
                value={addressOutsideKuwait}
                error={errors.addressOutsideKuwait}
                onChange={(e) => setAddressOutsideKuwait(e.target.value)}
              />
            </div>
          ) : null}
        </SectionCard>

        <SectionCard n={2} title={t("aboutYou")}>
          <div data-field="fullName">
            <TextInput
              label={t("fullName")}
              required
              value={fullName}
              error={errors.fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div data-field="age">
            <TextInput
              label={t("age")}
              required
              inputMode="numeric"
              placeholder={t("agePlaceholder")}
              value={age}
              error={errors.age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div data-field="sex">
            <SelectInput
              label={t("sex")}
              required
              value={sex}
              error={errors.sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <option value="">{t("selectSex")}</option>
              <option value="female">{t("female")}</option>
              <option value="male">{t("male")}</option>
            </SelectInput>
          </div>
          <div data-field="citizenship">
            <SelectInput
              label={t("citizenship")}
              required
              value={citizenship}
              error={errors.citizenship}
              onChange={(e) => setCitizenship(e.target.value)}
            >
              <option value="">{t("selectCountry")}</option>
              {COUNTRY_NAMES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectInput>
          </div>
          <div data-field="civilId">
            <TextInput
              label={t("civilId")}
              required
              placeholder={t("civilIdPlaceholder")}
              value={civilId}
              error={errors.civilId}
              onChange={(e) => setCivilId(e.target.value)}
              inputMode="numeric"
            />
          </div>
          <div data-field="passportNumber">
            <TextInput
              label={t("passport")}
              required
              value={passportNumber}
              error={errors.passportNumber}
              onChange={(e) => setPassportNumber(e.target.value)}
              autoCapitalize="characters"
            />
          </div>
          <div data-field="phoneNumber">
            <SelectInput
              label={t("phone")}
              required
              value={phoneCountry}
              onChange={(e) => setPhoneCountry(e.target.value)}
            >
              {phoneOptions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </SelectInput>
            <div className="mt-2">
              <input
                className="w-full rounded-[var(--radius-ctl)] border border-line bg-card px-3.5 py-3.5 text-[1.05rem] text-ink outline-none placeholder:text-muted/80 focus:border-teal focus:ring-2 focus:ring-teal/20"
                placeholder={t("phonePlaceholder")}
                inputMode="tel"
                autoComplete="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber ? (
                <p className="mt-1.5 text-sm text-star" role="alert">
                  {errors.phoneNumber}
                </p>
              ) : null}
            </div>
          </div>
          <div data-field="email">
            <TextInput
              label={t("email")}
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              error={errors.email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
        </SectionCard>

        <SectionCard n={3} title={t("howYouFeel")}>
          <div data-field="hasSymptoms">
            <YesNo
              label={
                <Rich
                  template={t("symptoms", { past14: "{past14}" })}
                  vars={{ past14: t("past14") }}
                />
              }
              required
              value={hasSymptoms}
              onChange={setHasSymptoms}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.hasSymptoms}
            />
          </div>
          {hasSymptoms ? (
            <div data-field="symptomsDetail">
              <TextInput
                label={t("symptomsDetail")}
                required
                value={symptomsDetail}
                error={errors.symptomsDetail}
                onChange={(e) => setSymptomsDetail(e.target.value)}
              />
            </div>
          ) : null}
        </SectionCard>

        <SectionCard n={4} title={t("recentContact")}>
          <p className="text-[0.98rem] font-medium text-ink">{t("past21")}</p>
          <div data-field="contactSick">
            <YesNo
              label={t("contactSick")}
              required
              value={contactSick}
              onChange={setContactSick}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.contactSick}
            />
          </div>
          <div data-field="attendedFuneral">
            <YesNo
              label={t("funeral")}
              required
              value={attendedFuneral}
              onChange={setAttendedFuneral}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.attendedFuneral}
            />
          </div>
          <div data-field="visitedHospital">
            <YesNo
              label={t("hospital")}
              required
              value={visitedHospital}
              onChange={setVisitedHospital}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.visitedHospital}
            />
          </div>
          <div data-field="handledAnimals">
            <YesNo
              label={t("animals")}
              required
              value={handledAnimals}
              onChange={setHandledAnimals}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.handledAnimals}
            />
          </div>
        </SectionCard>

        <SectionCard n={5} title={t("malariaTitle")}>
          <p className="text-[0.98rem] font-medium text-ink">{t("malariaLead")}</p>
          <div data-field="malariaRisk">
            <YesNo
              label={t("malariaRisk")}
              required
              value={malariaRisk}
              onChange={setMalariaRisk}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.malariaRisk}
            />
          </div>
          {malariaRisk ? (
            <>
              <div data-field="malariaPrevention">
                <YesNo
                  label={t("malariaPrevention")}
                  required
                  value={malariaPrevention}
                  onChange={setMalariaPrevention}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.malariaPrevention}
                />
              </div>
              <div data-field="malariaClinic">
                <YesNo
                  label={t("malariaClinic")}
                  required
                  value={malariaClinic}
                  onChange={setMalariaClinic}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.malariaClinic}
                />
              </div>
              <div data-field="malariaWhen">
                <ChoicePills
                  label={t("malariaWhen")}
                  required
                  value={malariaWhen}
                  onChange={setMalariaWhen}
                  options={exposureOpts}
                  error={errors.malariaWhen}
                />
              </div>
            </>
          ) : null}
          <FormNote>{t("malariaNote")}</FormNote>
        </SectionCard>

        <SectionCard n={6} title={t("typhoidTitle")}>
          <p className="text-[0.98rem] font-medium text-ink">{t("typhoidLead")}</p>
          <div data-field="typhoidRisk">
            <YesNo
              label={t("typhoidRisk")}
              required
              value={typhoidRisk}
              onChange={setTyphoidRisk}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.typhoidRisk}
            />
          </div>
          {typhoidRisk ? (
            <>
              <div data-field="typhoidPrevention">
                <YesNo
                  label={t("typhoidPrevention")}
                  required
                  value={typhoidPrevention}
                  onChange={setTyphoidPrevention}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.typhoidPrevention}
                />
              </div>
              <div data-field="typhoidClinic">
                <YesNo
                  label={t("typhoidClinic")}
                  required
                  value={typhoidClinic}
                  onChange={setTyphoidClinic}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.typhoidClinic}
                />
              </div>
              <div data-field="typhoidWhen">
                <ChoicePills
                  label={t("typhoidWhen")}
                  required
                  value={typhoidWhen}
                  onChange={setTyphoidWhen}
                  options={exposureOpts}
                  error={errors.typhoidWhen}
                />
              </div>
            </>
          ) : null}
          <FormNote>{t("typhoidNote")}</FormNote>
        </SectionCard>

        <SectionCard n={7} title={t("personalTitle")}>
          <p className="text-[0.98rem] font-medium text-ink">{t("personalLead")}</p>
          <div data-field="sexualActivity">
            <YesNo
              label={t("sexualActivity")}
              required
              value={sexualActivity}
              onChange={setSexualActivity}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.sexualActivity}
            />
          </div>
          {sexualActivity ? (
            <>
              <div data-field="sexualProtected">
                <YesNo
                  label={t("sexualProtected")}
                  required
                  value={sexualProtected}
                  onChange={setSexualProtected}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.sexualProtected}
                />
              </div>
              <div data-field="sexualClinic">
                <YesNo
                  label={t("sexualClinic")}
                  required
                  value={sexualClinic}
                  onChange={setSexualClinic}
                  yesLabel={t("yes")}
                  noLabel={t("no")}
                  error={errors.sexualClinic}
                />
              </div>
              <div data-field="sexualWhen">
                <ChoicePills
                  label={t("sexualWhen")}
                  required
                  value={sexualWhen}
                  onChange={setSexualWhen}
                  options={sexWhenOpts}
                  error={errors.sexualWhen}
                />
              </div>
            </>
          ) : null}
          <FormNote>{t("sexualNote")}</FormNote>

          <h3 className="pt-2 text-lg font-bold text-ink">{t("stdTitle")}</h3>
          <FormNote>{t("stdImportant")}</FormNote>
          <div data-field="stdSymptoms">
            <YesNo
              label={t("stdDischarge")}
              required
              value={stdSymptoms}
              onChange={setStdSymptoms}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.stdSymptoms}
            />
          </div>
          <div data-field="stdHistory">
            <YesNo
              label={t("stdHistory")}
              required
              value={stdHistory}
              onChange={setStdHistory}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.stdHistory}
            />
          </div>
          <div data-field="stdClinic">
            <YesNo
              label={t("stdClinic")}
              required
              value={stdClinic}
              onChange={setStdClinic}
              yesLabel={t("yes")}
              noLabel={t("no")}
              error={errors.stdClinic}
            />
          </div>
          {stdSymptoms || stdHistory ? (
            <div data-field="stdWhen">
              <ChoicePills
                label={t("stdWhen")}
                required
                value={stdWhen}
                onChange={setStdWhen}
                options={exposureOpts}
                error={errors.stdWhen}
              />
            </div>
          ) : null}
          <FormNote>{t("stdNote")}</FormNote>
        </SectionCard>
      </div>

      {formError ? (
        <p className="mt-3 text-center text-sm text-star" role="alert">
          {formError}
        </p>
      ) : null}

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-page via-page/95 to-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6">
        <div className="pointer-events-auto mx-auto max-w-xl px-4">
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-[var(--radius-ctl)] bg-green py-3.5 text-[1.05rem] font-semibold text-white shadow-md transition-colors hover:bg-green-hover disabled:opacity-70"
          >
            {busy ? t("submitting") : t("submit")}
          </button>
        </div>
      </div>
    </form>
  );
}
