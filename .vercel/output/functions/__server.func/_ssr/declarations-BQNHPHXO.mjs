import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-uyiM_bbb.mjs";
import { t as authMiddleware } from "./middleware-CXXzj7nW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/declarations-BQNHPHXO.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function chunk(n) {
	let s = "";
	for (let i = 0; i < n; i += 1) s += CODE_CHARS[Math.floor(Math.random() * 32)];
	return s;
}
function makeCode() {
	return `KW-${chunk(4)}-${chunk(4)}`;
}
function makeId() {
	return `d_${Date.now().toString(36)}_${chunk(8).toLowerCase()}`;
}
function isNonEmpty(v) {
	return typeof v === "string" && v.trim().length > 0;
}
function isBool(v) {
	return typeof v === "boolean";
}
function validateScreening(raw) {
	if (!isBool(raw.malariaRisk)) throw new Error("Malaria answer required");
	if (!isBool(raw.typhoidRisk)) throw new Error("Typhoid answer required");
	if (!isBool(raw.sexualActivity)) throw new Error("Personal life answer required");
	if (!isBool(raw.stdSymptoms)) throw new Error("STD/UTI answer required");
	if (!isBool(raw.stdHistory)) throw new Error("STD/UTI history required");
	if (raw.malariaRisk && !isNonEmpty(raw.malariaWhen)) throw new Error("Malaria timing required");
	if (raw.typhoidRisk && !isNonEmpty(raw.typhoidWhen)) throw new Error("Typhoid timing required");
	if (raw.sexualActivity && !isNonEmpty(raw.sexualWhen)) throw new Error("Personal life timing required");
	if ((raw.stdSymptoms || raw.stdHistory) && !isNonEmpty(raw.stdWhen)) throw new Error("STD/UTI timing required");
	return raw;
}
function validateInput(raw) {
	if (raw.direction !== "arrive" && raw.direction !== "depart") throw new Error("Invalid direction");
	if (!isNonEmpty(raw.port)) throw new Error("Port is required");
	if (!isNonEmpty(raw.travelDate)) throw new Error("Date is required");
	if (!isNonEmpty(raw.purpose)) throw new Error("Purpose is required");
	if (raw.purpose === "medical" && !isNonEmpty(raw.medicalCondition ?? "")) throw new Error("Medical condition is required");
	if (!isNonEmpty(raw.flightNumber)) throw new Error("Flight number is required");
	if (raw.direction === "arrive") {
		if (!isNonEmpty(raw.addressOutsideKuwait ?? "")) throw new Error("Address is required");
	} else if (!isNonEmpty(raw.destinationCountry ?? "")) throw new Error("Destination is required");
	if (!isNonEmpty(raw.fullName)) throw new Error("Name is required");
	if (!Number.isInteger(raw.age) || raw.age < 0 || raw.age > 120) throw new Error("Age is required");
	if (raw.sex !== "female" && raw.sex !== "male") throw new Error("Sex is required");
	if (!isNonEmpty(raw.citizenship)) throw new Error("Citizenship is required");
	if (!isNonEmpty(raw.passportNumber)) throw new Error("Passport is required");
	if (!isNonEmpty(raw.civilId)) throw new Error("Civil ID is required");
	if (!isNonEmpty(raw.phoneCountry) || !isNonEmpty(raw.phoneNumber)) throw new Error("Phone is required");
	if (typeof raw.hasSymptoms !== "boolean") throw new Error("Symptoms answer required");
	if (typeof raw.contactSick !== "boolean") throw new Error("Contact answer required");
	if (typeof raw.attendedFuneral !== "boolean") throw new Error("Funeral answer required");
	if (typeof raw.visitedHospital !== "boolean") throw new Error("Hospital answer required");
	if (typeof raw.handledAnimals !== "boolean") throw new Error("Animals answer required");
	if (raw.email && raw.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.email)) throw new Error("Invalid email");
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
		email: raw.email?.trim() || void 0,
		medicalCondition: raw.medicalCondition?.trim() || void 0,
		daysOutsideKuwait: raw.daysOutsideKuwait?.trim() || void 0,
		countriesVisited: raw.countriesVisited?.trim() || void 0,
		addressOutsideKuwait: raw.addressOutsideKuwait?.trim() || void 0,
		destinationCountry: raw.destinationCountry?.trim() || void 0,
		symptomsDetail: raw.symptomsDetail?.trim() || void 0,
		screening
	};
}
function riskFrom(data) {
	const s = data.screening;
	return data.hasSymptoms || data.contactSick || data.attendedFuneral || data.visitedHospital || data.handledAnimals || s.malariaRisk || s.typhoidRisk || s.sexualActivity && s.sexualProtected === false || s.stdSymptoms || s.stdHistory;
}
var submitDeclaration_createServerFn_handler = createServerRpc({
	id: "e9d65dfeed829914afee2eab9daaf45ba4aabc8da1aac310d7182cdd2643b575",
	name: "submitDeclaration",
	filename: "src/lib/declarations.ts"
}, (opts) => submitDeclaration.__executeServer(opts));
var submitDeclaration = createServerFn({ method: "POST" }).validator((raw) => validateInput(raw)).handler(submitDeclaration_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const riskFlag = riskFrom(data);
	let code = makeCode();
	let id = makeId();
	for (let attempt = 0; attempt < 6; attempt += 1) try {
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
		return {
			code,
			riskFlag
		};
	} catch (err) {
		const msg = err instanceof Error ? err.message : String(err);
		if (msg.toLowerCase().includes("unique") || msg.toLowerCase().includes("duplicate")) {
			code = makeCode();
			id = makeId();
			continue;
		}
		throw err;
	}
	throw new Error("Could not assign a unique code");
});
var getDeclarationByCode_createServerFn_handler = createServerRpc({
	id: "bd554b77665b2494cfc02aad9d62d82c4dc44f2afec67fd0128ea78944226324",
	name: "getDeclarationByCode",
	filename: "src/lib/declarations.ts"
}, (opts) => getDeclarationByCode.__executeServer(opts));
var getDeclarationByCode = createServerFn({ method: "GET" }).validator((code) => code.trim().toUpperCase()).handler(getDeclarationByCode_createServerFn_handler, async ({ data: code }) => {
	return (await (await getSql())`
      select * from declarations where code = ${code} limit 1
    `)[0] ?? null;
});
var searchDeclarations_createServerFn_handler = createServerRpc({
	id: "bf5c5e4e330e2e000a2703e8a8b86a64754c6b8a89be738a8868ead5d800ba99",
	name: "searchDeclarations",
	filename: "src/lib/declarations.ts"
}, (opts) => searchDeclarations.__executeServer(opts));
var searchDeclarations = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q.trim()).handler(searchDeclarations_createServerFn_handler, async ({ data: q }) => {
	const sql = await getSql();
	if (!q) return sql`
        select * from declarations order by created_at desc limit 80
      `;
	const like = `%${q}%`;
	return sql`
      select * from declarations
      where code ilike ${like}
         or full_name ilike ${like}
         or passport_number ilike ${like}
         or civil_id ilike ${like}
         or flight_number ilike ${like}
      order by created_at desc
      limit 80
    `;
});
//#endregion
export { getDeclarationByCode_createServerFn_handler, searchDeclarations_createServerFn_handler, submitDeclaration_createServerFn_handler };
