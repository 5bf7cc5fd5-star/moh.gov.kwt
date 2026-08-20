import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CXXzj7nW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/declarations-C9b48liR.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
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
var submitDeclaration = createServerFn({ method: "POST" }).validator((raw) => validateInput(raw)).handler(createSsrRpc("e9d65dfeed829914afee2eab9daaf45ba4aabc8da1aac310d7182cdd2643b575"));
var getDeclarationByCode = createServerFn({ method: "GET" }).validator((code) => code.trim().toUpperCase()).handler(createSsrRpc("bd554b77665b2494cfc02aad9d62d82c4dc44f2afec67fd0128ea78944226324"));
var searchDeclarations = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((q) => q.trim()).handler(createSsrRpc("bf5c5e4e330e2e000a2703e8a8b86a64754c6b8a89be738a8868ead5d800ba99"));
//#endregion
export { searchDeclarations as n, submitDeclaration as r, getDeclarationByCode as t };
