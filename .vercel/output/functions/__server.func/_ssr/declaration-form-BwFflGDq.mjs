import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocale } from "./router-eMpGfEv6.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as submitDeclaration } from "./declarations-C9b48liR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/declaration-form-BwFflGDq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PORTS = [
	{
		group: "Airports",
		items: [
			"Kuwait International Airport (KWI) — Terminal 1",
			"Kuwait International Airport (KWI) — Terminal 4",
			"Kuwait International Airport — Cargo"
		]
	},
	{
		group: "Sea ports",
		items: [
			"Shuwaikh Port",
			"Shuaiba Port",
			"Doha Port (Kuwait)",
			"Abdullah Port"
		]
	},
	{
		group: "Land borders",
		items: [
			"Nuwaiseeb (Saudi Arabia)",
			"Salmi (Saudi Arabia)",
			"Abdali (Iraq)"
		]
	},
	{
		group: "Other",
		items: ["Other port of entry"]
	}
];
var PURPOSES = [
	{
		id: "returning",
		en: "Returning resident / Kuwaiti returning home"
	},
	{
		id: "tourism",
		en: "Holiday / Tourism"
	},
	{
		id: "business",
		en: "Business / Work"
	},
	{
		id: "family",
		en: "Visiting family / friends"
	},
	{
		id: "medical",
		en: "Medical treatment"
	},
	{
		id: "education",
		en: "Education / Study"
	},
	{
		id: "transit",
		en: "Transit"
	},
	{
		id: "official",
		en: "Official / Diplomatic"
	},
	{
		id: "conference",
		en: "Conference / Event"
	},
	{
		id: "other",
		en: "Other"
	}
];
var COUNTRIES = [
	{
		name: "Kuwait",
		dial: "+965"
	},
	{
		name: "Saudi Arabia",
		dial: "+966"
	},
	{
		name: "United Arab Emirates",
		dial: "+971"
	},
	{
		name: "Qatar",
		dial: "+974"
	},
	{
		name: "Bahrain",
		dial: "+973"
	},
	{
		name: "Oman",
		dial: "+968"
	},
	{
		name: "Iraq",
		dial: "+964"
	},
	{
		name: "Iran",
		dial: "+98"
	},
	{
		name: "Jordan",
		dial: "+962"
	},
	{
		name: "Lebanon",
		dial: "+961"
	},
	{
		name: "Egypt",
		dial: "+20"
	},
	{
		name: "Syria",
		dial: "+963"
	},
	{
		name: "Yemen",
		dial: "+967"
	},
	{
		name: "India",
		dial: "+91"
	},
	{
		name: "Pakistan",
		dial: "+92"
	},
	{
		name: "Bangladesh",
		dial: "+880"
	},
	{
		name: "Philippines",
		dial: "+63"
	},
	{
		name: "Sri Lanka",
		dial: "+94"
	},
	{
		name: "Nepal",
		dial: "+977"
	},
	{
		name: "China",
		dial: "+86"
	},
	{
		name: "United Kingdom",
		dial: "+44"
	},
	{
		name: "United States",
		dial: "+1"
	},
	{
		name: "Canada",
		dial: "+1"
	},
	{
		name: "France",
		dial: "+33"
	},
	{
		name: "Germany",
		dial: "+49"
	},
	{
		name: "Italy",
		dial: "+39"
	},
	{
		name: "Spain",
		dial: "+34"
	},
	{
		name: "Turkey",
		dial: "+90"
	},
	{
		name: "Uganda",
		dial: "+256"
	},
	{
		name: "Kenya",
		dial: "+254"
	},
	{
		name: "Tanzania",
		dial: "+255"
	},
	{
		name: "Ethiopia",
		dial: "+251"
	},
	{
		name: "Nigeria",
		dial: "+234"
	},
	{
		name: "South Africa",
		dial: "+27"
	},
	{
		name: "Australia",
		dial: "+61"
	},
	{
		name: "Indonesia",
		dial: "+62"
	},
	{
		name: "Malaysia",
		dial: "+60"
	},
	{
		name: "Singapore",
		dial: "+65"
	},
	{
		name: "Thailand",
		dial: "+66"
	},
	{
		name: "Vietnam",
		dial: "+84"
	},
	{
		name: "Japan",
		dial: "+81"
	},
	{
		name: "South Korea",
		dial: "+82"
	},
	{
		name: "Russia",
		dial: "+7"
	},
	{
		name: "Brazil",
		dial: "+55"
	},
	{
		name: "Morocco",
		dial: "+212"
	},
	{
		name: "Tunisia",
		dial: "+216"
	},
	{
		name: "Algeria",
		dial: "+213"
	},
	{
		name: "Sudan",
		dial: "+249"
	},
	{
		name: "Afghanistan",
		dial: "+93"
	}
];
var COUNTRY_NAMES = COUNTRIES.map((c) => c.name);
function FieldLabel({ children, required, htmlFor }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		htmlFor,
		className: "mb-1.5 block text-[0.95rem] font-medium leading-snug text-ink",
		children: [children, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-star",
			"aria-hidden": "true",
			children: [" ", "*"]
		}) : null]
	});
}
function FieldError({ message }) {
	if (!message) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1.5 text-sm text-star",
		role: "alert",
		children: message
	});
}
var controlClass = "w-full rounded-[var(--radius-ctl)] border border-line bg-card px-3.5 py-3.5 text-[1.05rem] text-ink outline-none transition-[border,box-shadow] placeholder:text-muted/80 focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:opacity-60";
function TextInput({ label, required, error, hint, className, ...props }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor: id,
			required,
			children: label
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 text-sm text-muted",
			children: hint
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			id,
			...props,
			className: cn(controlClass, error && "border-star", className)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
	] });
}
function SelectInput({ label, required, error, hint, children, className, ...props }) {
	const id = (0, import_react.useId)();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor: id,
			required,
			children: label
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-1.5 text-sm text-muted",
			children: hint
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id,
				...props,
				className: cn(controlClass, "appearance-none bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10", !props.value && "text-muted", error && "border-star", className),
				style: { backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235b6b73' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")` },
				children
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
	] });
}
function DateInput({ label, required, error, value, onChange }) {
	const id = (0, import_react.useId)();
	const pretty = formatDisplayDate(value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
			htmlFor: id,
			required,
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-[1] flex items-center justify-center text-[1.05rem] font-medium text-ink",
				children: pretty
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: "date",
				value,
				onChange: (e) => onChange(e.target.value),
				className: cn(controlClass, "relative z-0 text-center text-transparent caret-transparent [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0", error && "border-star")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
	] });
}
function formatDisplayDate(iso) {
	if (!iso) return "";
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	});
}
function YesNo({ label, required, value, onChange, yesLabel, noLabel, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-[0.98rem] font-medium leading-snug text-ink",
			children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-star",
				"aria-hidden": "true",
				children: [" ", "*"]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("grid grid-cols-2 overflow-hidden rounded-[var(--radius-ctl)] bg-yesno p-1", error && "ring-1 ring-star"),
			role: "radiogroup",
			children: [{
				v: true,
				label: yesLabel
			}, {
				v: false,
				label: noLabel
			}].map((opt) => {
				const selected = value === opt.v;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					onClick: () => onChange(opt.v),
					className: cn("min-h-11 rounded-[calc(var(--radius-ctl)-4px)] py-3 text-[1.02rem] transition-colors", selected ? "bg-card font-semibold text-ink shadow-sm" : "font-medium text-muted"),
					children: opt.label
				}, String(opt.v));
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
	] });
}
function ChoicePills({ label, required, value, onChange, options, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-2 text-[0.98rem] font-medium leading-snug text-ink",
			children: [label, required ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-star",
				"aria-hidden": "true",
				children: [" ", "*"]
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			role: "radiogroup",
			children: options.map((opt) => {
				const selected = value === opt.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					onClick: () => onChange(opt.id),
					className: cn("min-h-11 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors", selected ? "border-green bg-green text-white" : "border-line bg-card text-ink hover:border-teal", error && !selected && "border-star/40"),
					children: opt.label
				}, opt.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { message: error })
	] });
}
function FormNote({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-2.5 text-sm leading-relaxed text-warn",
		children
	});
}
function SectionCard({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)] sm:p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-8 shrink-0 place-items-center rounded-full bg-green-soft text-sm font-semibold text-green",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold tracking-tight text-ink",
				children: title
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-4",
			children
		})]
	});
}
function todayIso() {
	const n = /* @__PURE__ */ new Date();
	return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}
function Rich({ template, vars }) {
	const parts = template.split(/\{(\w+)\}/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, i) => {
		if (i % 2 === 1) {
			const val = vars[part] ?? "";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "font-semibold text-ink",
				children: val
			}, i);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	}) });
}
var EXPOSURE = [
	"1",
	"3",
	"7",
	"14",
	"21",
	"30"
];
var SEX_WHEN = [
	"1",
	"3",
	"6",
	"9",
	"12",
	"15"
];
function DeclarationForm({ direction }) {
	const { t, locale } = useLocale();
	const navigate = useNavigate();
	const arrive = direction === "arrive";
	const [port, setPort] = (0, import_react.useState)("");
	const [travelDate, setTravelDate] = (0, import_react.useState)(todayIso);
	const [purpose, setPurpose] = (0, import_react.useState)("");
	const [medicalCondition, setMedicalCondition] = (0, import_react.useState)("");
	const [medicalEmergency, setMedicalEmergency] = (0, import_react.useState)(null);
	const [daysOutsideKuwait, setDaysOutsideKuwait] = (0, import_react.useState)("");
	const [destinationCountry, setDestinationCountry] = (0, import_react.useState)("");
	const [countriesVisited, setCountriesVisited] = (0, import_react.useState)("");
	const [flightNumber, setFlightNumber] = (0, import_react.useState)("");
	const [addressOutsideKuwait, setAddressOutsideKuwait] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)("");
	const [sex, setSex] = (0, import_react.useState)("");
	const [citizenship, setCitizenship] = (0, import_react.useState)("");
	const [passportNumber, setPassportNumber] = (0, import_react.useState)("");
	const [civilId, setCivilId] = (0, import_react.useState)("");
	const [phoneCountry, setPhoneCountry] = (0, import_react.useState)("Kuwait (+965)");
	const [phoneNumber, setPhoneNumber] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [hasSymptoms, setHasSymptoms] = (0, import_react.useState)(null);
	const [symptomsDetail, setSymptomsDetail] = (0, import_react.useState)("");
	const [contactSick, setContactSick] = (0, import_react.useState)(null);
	const [attendedFuneral, setAttendedFuneral] = (0, import_react.useState)(null);
	const [visitedHospital, setVisitedHospital] = (0, import_react.useState)(null);
	const [handledAnimals, setHandledAnimals] = (0, import_react.useState)(null);
	const [malariaRisk, setMalariaRisk] = (0, import_react.useState)(null);
	const [malariaPrevention, setMalariaPrevention] = (0, import_react.useState)(null);
	const [malariaClinic, setMalariaClinic] = (0, import_react.useState)(null);
	const [malariaWhen, setMalariaWhen] = (0, import_react.useState)("");
	const [typhoidRisk, setTyphoidRisk] = (0, import_react.useState)(null);
	const [typhoidPrevention, setTyphoidPrevention] = (0, import_react.useState)(null);
	const [typhoidClinic, setTyphoidClinic] = (0, import_react.useState)(null);
	const [typhoidWhen, setTyphoidWhen] = (0, import_react.useState)("");
	const [sexualActivity, setSexualActivity] = (0, import_react.useState)(null);
	const [sexualProtected, setSexualProtected] = (0, import_react.useState)(null);
	const [sexualClinic, setSexualClinic] = (0, import_react.useState)(null);
	const [sexualWhen, setSexualWhen] = (0, import_react.useState)("");
	const [stdSymptoms, setStdSymptoms] = (0, import_react.useState)(null);
	const [stdHistory, setStdHistory] = (0, import_react.useState)(null);
	const [stdClinic, setStdClinic] = (0, import_react.useState)(null);
	const [stdWhen, setStdWhen] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const req = t("required");
	const phoneOptions = (0, import_react.useMemo)(() => COUNTRIES.map((c) => `${c.name} (${c.dial})`), []);
	const exposureOpts = EXPOSURE.map((id) => ({
		id,
		label: t(`recency${id}`)
	}));
	const sexWhenOpts = SEX_WHEN.map((id) => ({
		id,
		label: t(`recency${id}`)
	}));
	function validate() {
		const e = {};
		if (!port) e.port = req;
		if (!travelDate) e.travelDate = req;
		if (!purpose) e.purpose = req;
		if (purpose === "medical" && !medicalCondition.trim()) e.medicalCondition = req;
		if (purpose === "medical" && medicalEmergency === null) e.medicalEmergency = req;
		if (!arrive && !destinationCountry) e.destinationCountry = req;
		if (!flightNumber.trim()) e.flightNumber = req;
		if (arrive && !addressOutsideKuwait.trim()) e.addressOutsideKuwait = req;
		if (!fullName.trim()) e.fullName = req;
		const ageNum = Number(age);
		if (!age.trim() || !Number.isFinite(ageNum) || ageNum < 0 || ageNum > 120) e.age = t("invalidAge");
		if (!sex) e.sex = req;
		if (!citizenship) e.citizenship = req;
		if (!passportNumber.trim()) e.passportNumber = req;
		if (!civilId.trim()) e.civilId = req;
		if (!phoneNumber.trim()) e.phoneNumber = req;
		if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = t("invalidEmail");
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
	async function onSubmit(ev) {
		ev.preventDefault();
		const next = validate();
		setErrors(next);
		setFormError("");
		if (Object.keys(next).length) {
			const first = Object.keys(next)[0];
			document.querySelector(`[data-field="${first}"]`)?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			return;
		}
		const payload = {
			direction,
			port,
			travelDate,
			purpose,
			medicalCondition: purpose === "medical" ? medicalCondition : void 0,
			medicalEmergency: purpose === "medical" ? medicalEmergency : null,
			daysOutsideKuwait: daysOutsideKuwait || void 0,
			countriesVisited: countriesVisited || void 0,
			flightNumber,
			addressOutsideKuwait: arrive ? addressOutsideKuwait : void 0,
			destinationCountry: arrive ? void 0 : destinationCountry,
			fullName,
			age: Number(age),
			sex,
			citizenship,
			passportNumber,
			civilId,
			phoneCountry,
			phoneNumber,
			email: email || void 0,
			hasSymptoms: Boolean(hasSymptoms),
			symptomsDetail: hasSymptoms ? symptomsDetail : void 0,
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
				stdClinic,
				stdWhen: stdSymptoms || stdHistory ? stdWhen : ""
			},
			locale
		};
		setBusy(true);
		try {
			const result = await submitDeclaration({ data: payload });
			await navigate({
				to: "/declare/done/$code",
				params: { code: result.code }
			});
		} catch (err) {
			setFormError(err instanceof Error ? err.message : "Could not submit.");
			setBusy(false);
		}
	}
	const introKey = arrive ? "introArrive" : "introDepart";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		id: "decl",
		onSubmit,
		className: "pb-28",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#decl",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-40 focus:rounded-md focus:bg-card focus:px-3 focus:py-2",
				children: t("skip")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/declare",
				className: "mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "←"
					}),
					" ",
					t("arrivalOrDeparture")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-2 text-[1.85rem] font-extrabold leading-tight tracking-tight text-ink",
				children: arrive ? t("beforeArrive") : t("beforeDepart")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-[1.02rem] leading-relaxed text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, {
					template: t(introKey, { mins: "{mins}" }),
					vars: { mins: t("twoMinutes") }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 1,
						title: t("yourTrip"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "port",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									label: arrive ? t("portEntry") : t("portExit"),
									required: true,
									value: port,
									error: errors.port,
									onChange: (e) => setPort(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: t("selectPort")
									}), PORTS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
										label: g.group,
										children: g.items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: p,
											children: p
										}, p))
									}, g.group))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "travelDate",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateInput, {
									label: arrive ? t("dateArrival") : t("dateDeparture"),
									required: true,
									value: travelDate,
									error: errors.travelDate,
									onChange: setTravelDate
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "purpose",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									label: arrive ? t("purpose") : t("purposeDepart"),
									required: true,
									value: purpose,
									error: errors.purpose,
									onChange: (e) => setPurpose(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: t("selectPurpose")
									}), PURPOSES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p.id,
										children: t(p.id)
									}, p.id))]
								})
							}),
							purpose === "medical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: t("medicalOnlyIf")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "medicalCondition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
										label: t("medicalCondition"),
										required: true,
										value: medicalCondition,
										error: errors.medicalCondition,
										onChange: (e) => setMedicalCondition(e.target.value)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "medicalEmergency",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("medicalEmergency"),
										required: true,
										value: medicalEmergency,
										onChange: setMedicalEmergency,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.medicalEmergency
									})
								})
							] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "daysOutsideKuwait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("daysIn"),
									inputMode: "numeric",
									placeholder: t("daysPlaceholder"),
									value: daysOutsideKuwait,
									onChange: (e) => setDaysOutsideKuwait(e.target.value),
									className: "max-w-[11rem]"
								})
							}),
							!arrive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "destinationCountry",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									label: t("destination"),
									required: true,
									value: destinationCountry,
									error: errors.destinationCountry,
									onChange: (e) => setDestinationCountry(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: t("selectCountry")
									}), COUNTRY_NAMES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))]
								})
							}) : null,
							arrive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "countriesVisited",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("visited"),
									placeholder: t("visitedPlaceholder"),
									value: countriesVisited,
									onChange: (e) => setCountriesVisited(e.target.value)
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "flightNumber",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("flight"),
									required: true,
									placeholder: t("flightPlaceholder"),
									value: flightNumber,
									error: errors.flightNumber,
									onChange: (e) => setFlightNumber(e.target.value),
									autoCapitalize: "characters"
								})
							}),
							arrive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "addressOutsideKuwait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("address"),
									required: true,
									placeholder: t("addressPlaceholder"),
									value: addressOutsideKuwait,
									error: errors.addressOutsideKuwait,
									onChange: (e) => setAddressOutsideKuwait(e.target.value)
								})
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 2,
						title: t("aboutYou"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "fullName",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("fullName"),
									required: true,
									value: fullName,
									error: errors.fullName,
									onChange: (e) => setFullName(e.target.value),
									autoComplete: "name"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "age",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("age"),
									required: true,
									inputMode: "numeric",
									placeholder: t("agePlaceholder"),
									value: age,
									error: errors.age,
									onChange: (e) => setAge(e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "sex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									label: t("sex"),
									required: true,
									value: sex,
									error: errors.sex,
									onChange: (e) => setSex(e.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: t("selectSex")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "female",
											children: t("female")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "male",
											children: t("male")
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "citizenship",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectInput, {
									label: t("citizenship"),
									required: true,
									value: citizenship,
									error: errors.citizenship,
									onChange: (e) => setCitizenship(e.target.value),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: t("selectCountry")
									}), COUNTRY_NAMES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "civilId",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("civilId"),
									required: true,
									placeholder: t("civilIdPlaceholder"),
									value: civilId,
									error: errors.civilId,
									onChange: (e) => setCivilId(e.target.value),
									inputMode: "numeric"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "passportNumber",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("passport"),
									required: true,
									value: passportNumber,
									error: errors.passportNumber,
									onChange: (e) => setPassportNumber(e.target.value),
									autoCapitalize: "characters"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-field": "phoneNumber",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectInput, {
									label: t("phone"),
									required: true,
									value: phoneCountry,
									onChange: (e) => setPhoneCountry(e.target.value),
									children: phoneOptions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: p,
										children: p
									}, p))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "w-full rounded-[var(--radius-ctl)] border border-line bg-card px-3.5 py-3.5 text-[1.05rem] text-ink outline-none placeholder:text-muted/80 focus:border-teal focus:ring-2 focus:ring-teal/20",
										placeholder: t("phonePlaceholder"),
										inputMode: "tel",
										autoComplete: "tel",
										value: phoneNumber,
										onChange: (e) => setPhoneNumber(e.target.value)
									}), errors.phoneNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 text-sm text-star",
										role: "alert",
										children: errors.phoneNumber
									}) : null]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "email",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									label: t("email"),
									type: "email",
									placeholder: t("emailPlaceholder"),
									value: email,
									error: errors.email,
									onChange: (e) => setEmail(e.target.value),
									autoComplete: "email"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 3,
						title: t("howYouFeel"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-field": "hasSymptoms",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rich, {
									template: t("symptoms", { past14: "{past14}" }),
									vars: { past14: t("past14") }
								}),
								required: true,
								value: hasSymptoms,
								onChange: setHasSymptoms,
								yesLabel: t("yes"),
								noLabel: t("no"),
								error: errors.hasSymptoms
							})
						}), hasSymptoms ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"data-field": "symptomsDetail",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								label: t("symptomsDetail"),
								required: true,
								value: symptomsDetail,
								error: errors.symptomsDetail,
								onChange: (e) => setSymptomsDetail(e.target.value)
							})
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 4,
						title: t("recentContact"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.98rem] font-medium text-ink",
								children: t("past21")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "contactSick",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("contactSick"),
									required: true,
									value: contactSick,
									onChange: setContactSick,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.contactSick
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "attendedFuneral",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("funeral"),
									required: true,
									value: attendedFuneral,
									onChange: setAttendedFuneral,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.attendedFuneral
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "visitedHospital",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("hospital"),
									required: true,
									value: visitedHospital,
									onChange: setVisitedHospital,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.visitedHospital
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "handledAnimals",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("animals"),
									required: true,
									value: handledAnimals,
									onChange: setHandledAnimals,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.handledAnimals
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 5,
						title: t("malariaTitle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.98rem] font-medium text-ink",
								children: t("malariaLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "malariaRisk",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("malariaRisk"),
									required: true,
									value: malariaRisk,
									onChange: setMalariaRisk,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.malariaRisk
								})
							}),
							malariaRisk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "malariaPrevention",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("malariaPrevention"),
										required: true,
										value: malariaPrevention,
										onChange: setMalariaPrevention,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.malariaPrevention
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "malariaClinic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("malariaClinic"),
										required: true,
										value: malariaClinic,
										onChange: setMalariaClinic,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.malariaClinic
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "malariaWhen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoicePills, {
										label: t("malariaWhen"),
										required: true,
										value: malariaWhen,
										onChange: setMalariaWhen,
										options: exposureOpts,
										error: errors.malariaWhen
									})
								})
							] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormNote, { children: t("malariaNote") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 6,
						title: t("typhoidTitle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.98rem] font-medium text-ink",
								children: t("typhoidLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "typhoidRisk",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("typhoidRisk"),
									required: true,
									value: typhoidRisk,
									onChange: setTyphoidRisk,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.typhoidRisk
								})
							}),
							typhoidRisk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "typhoidPrevention",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("typhoidPrevention"),
										required: true,
										value: typhoidPrevention,
										onChange: setTyphoidPrevention,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.typhoidPrevention
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "typhoidClinic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("typhoidClinic"),
										required: true,
										value: typhoidClinic,
										onChange: setTyphoidClinic,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.typhoidClinic
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "typhoidWhen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoicePills, {
										label: t("typhoidWhen"),
										required: true,
										value: typhoidWhen,
										onChange: setTyphoidWhen,
										options: exposureOpts,
										error: errors.typhoidWhen
									})
								})
							] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormNote, { children: t("typhoidNote") })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						n: 7,
						title: t("personalTitle"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[0.98rem] font-medium text-ink",
								children: t("personalLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "sexualActivity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("sexualActivity"),
									required: true,
									value: sexualActivity,
									onChange: setSexualActivity,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.sexualActivity
								})
							}),
							sexualActivity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "sexualProtected",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("sexualProtected"),
										required: true,
										value: sexualProtected,
										onChange: setSexualProtected,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.sexualProtected
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "sexualClinic",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
										label: t("sexualClinic"),
										required: true,
										value: sexualClinic,
										onChange: setSexualClinic,
										yesLabel: t("yes"),
										noLabel: t("no"),
										error: errors.sexualClinic
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"data-field": "sexualWhen",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoicePills, {
										label: t("sexualWhen"),
										required: true,
										value: sexualWhen,
										onChange: setSexualWhen,
										options: sexWhenOpts,
										error: errors.sexualWhen
									})
								})
							] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormNote, { children: t("sexualNote") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "pt-2 text-lg font-bold text-ink",
								children: t("stdTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "stdSymptoms",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("stdDischarge"),
									required: true,
									value: stdSymptoms,
									onChange: setStdSymptoms,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.stdSymptoms
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "stdHistory",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("stdHistory"),
									required: true,
									value: stdHistory,
									onChange: setStdHistory,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.stdHistory
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "stdClinic",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(YesNo, {
									label: t("stdClinic"),
									required: true,
									value: stdClinic,
									onChange: setStdClinic,
									yesLabel: t("yes"),
									noLabel: t("no"),
									error: errors.stdClinic
								})
							}),
							stdSymptoms || stdHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"data-field": "stdWhen",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoicePills, {
									label: t("stdWhen"),
									required: true,
									value: stdWhen,
									onChange: setStdWhen,
									options: exposureOpts,
									error: errors.stdWhen
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormNote, { children: t("stdNote") })
						]
					})
				]
			}),
			formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-sm text-star",
				role: "alert",
				children: formError
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none fixed inset-x-0 bottom-0 z-20 bg-gradient-to-t from-page via-page/95 to-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto mx-auto max-w-xl px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: busy,
						className: "w-full rounded-[var(--radius-ctl)] bg-green py-3.5 text-[1.05rem] font-semibold text-white shadow-md transition-colors hover:bg-green-hover disabled:opacity-70",
						children: busy ? t("submitting") : t("submit")
					})
				})
			})
		]
	});
}
//#endregion
export { DeclarationForm as t };
