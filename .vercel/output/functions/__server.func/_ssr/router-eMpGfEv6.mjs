import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, b as useRouter, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as __exportAll } from "./ssr.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-8jrVh4wD.mjs";
import { i as TriangleAlert, l as Menu, n as X, t as Youtube, u as Instagram } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-eMpGfEv6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-star",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold text-ink",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var LOCALES = [{
	id: "en",
	label: "English"
}, {
	id: "ar",
	label: "العربية"
}];
var en = {
	skip: "Skip to form",
	arrivalOrDeparture: "Arrival or departure",
	beforeArrive: "Before you arrive",
	beforeDepart: "Before you depart",
	introArrive: "This short form helps the Ministry of Health keep travellers and residents of Kuwait safe. It should take about {mins}. Your information is confidential.",
	introDepart: "This short form helps the Ministry of Health keep travellers and residents of Kuwait safe. It should take about {mins}. Your information is confidential.",
	twoMinutes: "2 minutes",
	yourTrip: "Your trip",
	portEntry: "Port of entry into Kuwait",
	portExit: "Port of exit from Kuwait",
	selectPort: "Select a port...",
	dateArrival: "Date of arrival",
	dateDeparture: "Date of departure",
	purpose: "Main purpose of your travel to Kuwait",
	purposeDepart: "Main purpose of your travel",
	selectPurpose: "Select a purpose...",
	medicalOnlyIf: "Only if you chose “Medical treatment” above.",
	medicalCondition: "What condition are you coming to be treated for?",
	medicalEmergency: "Is this an emergency?",
	daysIn: "Days outside Kuwait",
	daysPlaceholder: "e.g. 14",
	comingFrom: "Country/region you are coming from",
	destination: "Country/region you are going to",
	selectCountry: "Select a country...",
	flyingHint: "Flying within Kuwait? Choose Kuwait.",
	visited: "Countries/regions visited in the past 21 days (comma-separated)",
	visitedPlaceholder: "e.g. India, Egypt, UAE",
	flight: "Flight or vehicle number",
	flightPlaceholder: "e.g. KU101",
	address: "Permanent Address while outside Kuwait",
	addressPlaceholder: "Street address, city, country",
	aboutYou: "About you",
	fullName: "Full name (as on passport)",
	age: "Age (in years)",
	agePlaceholder: "e.g. 35",
	sex: "Sex",
	selectSex: "Select...",
	female: "Female",
	male: "Male",
	citizenship: "Country of citizenship (the country that issued your passport)",
	passport: "Passport number",
	civilId: "Civil ID number",
	civilIdPlaceholder: "12-digit Civil ID",
	phone: "Phone number while in Kuwait",
	phonePlaceholder: "5XXX XXXX",
	email: "Email (optional)",
	emailPlaceholder: "you@example.com",
	howYouFeel: "How you feel",
	symptoms: "In the {past14}, have you had any symptoms such as fever, cough, vomiting, or bleeding?",
	past14: "past 14 days",
	symptomsDetail: "Please list the symptoms",
	recentContact: "Recent contact",
	past21: "In the past 21 days:",
	contactSick: "Were you in close contact with anyone who had fever, bleeding, or who later died unexpectedly?",
	funeral: "Did you attend a funeral or help prepare a body for burial?",
	hospital: "Did you visit or work in a hospital/clinic in an Ebola-affected area?",
	animals: "Did you handle bats, primates, or bushmeat?",
	malariaTitle: "Malaria questionnaire",
	malariaLead: "Recent exposure and travel — in the past days/weeks:",
	malariaRisk: "Have you been in a malaria-risk area or had mosquito bites at night?",
	malariaPrevention: "If yes, did you use mosquito nets, repellent, or take prevention medicine?",
	malariaClinic: "Did you visit a hospital/clinic for a malaria test or treatment after possible exposure?",
	malariaWhen: "How recent was the possible exposure?",
	malariaNote: "Feeling fine after 30 days does not always mean you are clear. Some malaria types can appear later.",
	typhoidTitle: "Typhoid questionnaire",
	typhoidLead: "Recent food, water and travel — in the past days/weeks:",
	typhoidRisk: "Have you eaten street food, drunk untreated water, or travelled to a high-risk area?",
	typhoidPrevention: "If yes, did you take extra care with food/water or get a typhoid vaccine?",
	typhoidClinic: "Did you visit a hospital/clinic for a typhoid test or treatment after possible exposure?",
	typhoidWhen: "How recent was the possible exposure?",
	typhoidNote: "No symptoms after 30 days does not always guarantee you are safe. Typhoid can sometimes appear later.",
	personalTitle: "Personal life",
	personalLead: "In the past days:",
	sexualActivity: "Have you been involved in sexual activity with anyone?",
	sexualProtected: "If yes, was the sexual activity protected?",
	sexualClinic: "Did you visit a hospital/clinic for a check-up after the sexual activity?",
	sexualWhen: "How recent was the sexual activity?",
	sexualNote: "Please note: more than 30 days after sexual activity without any bodily changes does not guarantee safe health.",
	stdTitle: "STDs and UTIs",
	stdDischarge: "Have you had any unusual discharge, burning when urinating, sores, or itching in the genital area?",
	stdHistory: "Have you been treated for an STD or UTI in the past, or do you currently have symptoms of a UTI (pain, frequent urination, cloudy urine)?",
	stdClinic: "Did you visit a hospital/clinic for an STD or UTI check-up after sexual activity or after symptoms started?",
	stdWhen: "How recent were the symptoms or last possible exposure?",
	stdNote: "No symptoms after 30 days does not always mean everything is clear. Some STDs and UTIs can stay hidden or return.",
	recency1: "1 day",
	recency3: "3 days",
	recency6: "6 days",
	recency7: "7 days",
	recency9: "9 days",
	recency12: "12 days",
	recency14: "14 days",
	recency15: "15 days",
	recency21: "21 days",
	recency30: "30 days",
	yes: "Yes",
	no: "No",
	submit: "Submit",
	submitting: "Submitting…",
	required: "This field is required.",
	landingTitle: "Are you arriving or departing?",
	landingLead: "Choose one to begin your health declaration. It takes about {mins} and your information is confidential.",
	arriving: "Arriving",
	arrivingSub: "I am entering Kuwait",
	departing: "Departing",
	departingSub: "I am leaving Kuwait",
	returning: "Returning resident / Kuwaiti returning home",
	tourism: "Holiday / Tourism",
	business: "Business / Work",
	family: "Visiting family / friends",
	medical: "Medical treatment",
	education: "Education / Study",
	transit: "Transit",
	official: "Official / Diplomatic",
	conference: "Conference / Event",
	other: "Other",
	doneTitle: "Declaration received",
	doneLead: "Show this screen or the code below at the health desk. Save a screenshot on your phone.",
	reference: "Reference",
	showOfficials: "Present this to health officials at the port.",
	newDeclaration: "Make another declaration",
	riskNotice: "Based on your answers, please report to the health desk immediately on arrival or before boarding.",
	lowRisk: "No additional screening flagged from this form.",
	staff: "Health staff",
	verifyTitle: "Verify a declaration",
	verifyLead: "Enter the reference code from the traveller’s screen.",
	verifyCta: "Look up",
	notFound: "No declaration found for that code.",
	loginTitle: "Health staff sign in",
	loginLead: "Sign in to look up traveller declarations.",
	adminTitle: "Declarations",
	searchPlaceholder: "Search name, passport, Civil ID or code",
	risk: "Follow-up",
	clear: "Clear",
	noResults: "No matching declarations yet.",
	signedOut: "Sign in to continue",
	invalidEmail: "Enter a valid email, or leave it blank.",
	invalidAge: "Enter age in years.",
	footer: "State of Kuwait · Ministry of Health · Point of Entry Surveillance",
	confidential: "Information is used only for public health.",
	eServices: "E-SERVICES",
	mohArabic: "وزارة الصحة",
	mohEnglish: "Ministry of Health",
	stateKuwait: "State of Kuwait",
	stateKuwaitAr: "دولة الكويت",
	staffLogin: "Staff Login",
	essTitle: "Submitting Leave Requests… Is Now Easier!",
	essLead: "Submit your periodic leave request quickly and easily through the electronic system.",
	essDownload: "Download the application on:",
	ios: "iOS Devices",
	android: "Android Devices",
	scanQr: "Scan the QR code for direct download",
	pediatricTitle: "Pediatric Home Health Care service",
	pediatricLead: "We care for your children’s health, wherever you are.",
	pediatricAr: "نعتني بصحة أطفالكم أينما كنتم",
	knphsTitle: "Kuwait National Population Health Survey",
	knphsShort: "KNPHS",
	knphsLead: "Help the Ministry understand the health of people living in Kuwait. Your answers stay confidential.",
	koahsTitle: "Kuwait Older Adults Health Survey",
	koahsShort: "KOAHS",
	koahsLead: "A national survey on the health and wellbeing of older adults in Kuwait.",
	declarationService: "Traveller Health Declaration",
	declarationLead: "Complete your arrival or departure health declaration before you reach the port.",
	hearObey: "سمعاً و طاعة",
	menu: "Menu",
	close: "Close",
	home: "Home",
	clickHere: "Click here",
	serviceInfo: "About this e-service",
	backHome: "Back to e-services",
	openService: "Open service",
	brandLine: "Ministry of Health — State of Kuwait"
};
var DICTS = {
	en,
	ar: {
		...en,
		skip: "انتقل إلى النموذج",
		arrivalOrDeparture: "قدوم أو مغادرة",
		beforeArrive: "قبل وصولك",
		beforeDepart: "قبل مغادرتك",
		introArrive: "يساعدنا هذا النموذج القصير في وزارة الصحة على حماية المسافرين والمقيمين في الكويت. يستغرق حوالي {mins}. معلوماتك سرية.",
		introDepart: "يساعدنا هذا النموذج القصير في وزارة الصحة على حماية المسافرين والمقيمين في الكويت. يستغرق حوالي {mins}. معلوماتك سرية.",
		twoMinutes: "دقيقتين",
		yourTrip: "رحلتك",
		portEntry: "منفذ الدخول إلى الكويت",
		portExit: "منفذ الخروج من الكويت",
		selectPort: "اختر منفذاً...",
		dateArrival: "تاريخ الوصول",
		dateDeparture: "تاريخ المغادرة",
		purpose: "الغرض الرئيسي من سفرك إلى الكويت",
		purposeDepart: "الغرض الرئيسي من سفرك",
		selectPurpose: "اختر الغرض...",
		medicalOnlyIf: "فقط إذا اخترت «علاج طبي» أعلاه.",
		medicalCondition: "ما الحالة التي تأتي للعلاج منها؟",
		medicalEmergency: "هل هذه حالة طارئة؟",
		daysIn: "عدد الأيام خارج الكويت",
		daysPlaceholder: "مثال: 14",
		comingFrom: "البلد/المنطقة القادم منها",
		destination: "البلد/المنطقة المتجه إليها",
		selectCountry: "اختر بلداً...",
		flyingHint: "رحلة داخل الكويت؟ اختر الكويت.",
		visited: "البلدان/المناطق التي زرتها خلال 21 يوماً الماضية (مفصولة بفاصلة)",
		visitedPlaceholder: "مثال: الهند، مصر، الإمارات",
		flight: "رقم الرحلة أو المركبة",
		flightPlaceholder: "مثال: KU101",
		address: "العنوان الدائم أثناء وجودك خارج الكويت",
		addressPlaceholder: "العنوان، المدينة، الدولة",
		aboutYou: "عنك",
		fullName: "الاسم الكامل (كما في جواز السفر)",
		age: "العمر (بالسنوات)",
		agePlaceholder: "مثال: 35",
		sex: "الجنس",
		selectSex: "اختر...",
		female: "أنثى",
		male: "ذكر",
		citizenship: "بلد الجنسية (البلد الذي أصدر جواز سفرك)",
		passport: "رقم جواز السفر",
		civilId: "الرقم المدني",
		civilIdPlaceholder: "الرقم المدني المكوّن من 12 خانة",
		phone: "رقم الهاتف أثناء وجودك في الكويت",
		phonePlaceholder: "5XXX XXXX",
		email: "البريد الإلكتروني (اختياري)",
		emailPlaceholder: "you@example.com",
		howYouFeel: "حالتك الصحية",
		symptoms: "خلال {past14}، هل ظهرت عليك أعراض مثل الحمى أو السعال أو القيء أو النزيف؟",
		past14: "الأيام الـ 14 الماضية",
		symptomsDetail: "يرجى ذكر الأعراض",
		recentContact: "مخالطة حديثة",
		past21: "خلال الأيام الـ 21 الماضية:",
		contactSick: "هل خالطت عن قرب شخصاً كان يعاني من حمى أو نزيف أو توفي لاحقاً بشكل غير متوقع؟",
		funeral: "هل حضرت جنازة أو ساعدت في تجهيز جثمان؟",
		hospital: "هل زرت أو عملت في مستشفى/عيادة في منطقة موبوءة بالإيبولا؟",
		animals: "هل تعاملت مع خفافيش أو قرود أو لحوم حيوانات برية؟",
		malariaTitle: "استبيان الملاريا",
		malariaLead: "التعرض والسفر مؤخراً — خلال الأيام/الأسابيع الماضية:",
		malariaRisk: "هل كنت في منطقة موبوءة بالملاريا أو تعرضت للدغ البعوض ليلاً؟",
		malariaPrevention: "إذا نعم، هل استخدمت ناموسية أو طارداً للحشرات أو دواءً وقائياً؟",
		malariaClinic: "هل زرت مستشفى/عيادة لفحص أو علاج الملاريا بعد التعرض المحتمل؟",
		malariaWhen: "متى كان التعرض المحتمل؟",
		malariaNote: "الشعور بالتحسن بعد 30 يوماً لا يعني دائماً أنك بخير. بعض أنواع الملاريا قد تظهر لاحقاً.",
		typhoidTitle: "استبيان التيفوئيد",
		typhoidLead: "الطعام والماء والسفر مؤخراً — خلال الأيام/الأسابيع الماضية:",
		typhoidRisk: "هل تناولت طعام الشارع أو شربت ماءً غير معالج أو سافرت إلى منطقة عالية الخطورة؟",
		typhoidPrevention: "إذا نعم، هل اتخذت احتياطات إضافية للطعام/الماء أو حصلت على لقاح التيفوئيد؟",
		typhoidClinic: "هل زرت مستشفى/عيادة لفحص أو علاج التيفوئيد بعد التعرض المحتمل؟",
		typhoidWhen: "متى كان التعرض المحتمل؟",
		typhoidNote: "غياب الأعراض بعد 30 يوماً لا يضمن دائماً سلامتك. قد يظهر التيفوئيد لاحقاً.",
		personalTitle: "الحياة الشخصية",
		personalLead: "خلال الأيام الماضية:",
		sexualActivity: "هل مارست نشاطاً جنسياً مع أي شخص؟",
		sexualProtected: "إذا نعم، هل كان النشاط الجنسي محمياً؟",
		sexualClinic: "هل زرت مستشفى/عيادة للفحص بعد النشاط الجنسي؟",
		sexualWhen: "متى كان النشاط الجنسي؟",
		sexualNote: "ملاحظة: مرور أكثر من 30 يوماً على النشاط الجنسي دون تغيّر في الجسم لا يضمن سلامة الصحة.",
		stdTitle: "الأمراض المنقولة جنسياً والتهابات المسالك البولية",
		stdDischarge: "هل ظهرت إفرازات غير معتادة أو حرقان عند التبول أو تقرحات أو حكة في المنطقة التناسلية؟",
		stdHistory: "هل عولجت سابقاً من مرض منقول جنسياً أو التهاب مسالك، أو لديك حالياً أعراض التهاب مسالك (ألم، تبول متكرر، بول عكر)؟",
		stdClinic: "هل زرت مستشفى/عيادة للفحص بعد النشاط الجنسي أو بعد بدء الأعراض؟",
		stdWhen: "متى ظهرت الأعراض أو كان آخر تعرض محتمل؟",
		stdNote: "غياب الأعراض بعد 30 يوماً لا يعني دائماً أن كل شيء سليم. بعض الأمراض قد تبقى خفية أو تعود.",
		recency1: "يوم واحد",
		recency3: "3 أيام",
		recency6: "6 أيام",
		recency7: "7 أيام",
		recency9: "9 أيام",
		recency12: "12 يوماً",
		recency14: "14 يوماً",
		recency15: "15 يوماً",
		recency21: "21 يوماً",
		recency30: "30 يوماً",
		yes: "نعم",
		no: "لا",
		submit: "إرسال",
		submitting: "جاري الإرسال…",
		required: "هذا الحقل مطلوب.",
		landingTitle: "هل تصل أم تغادر؟",
		landingLead: "اختر واحدة لبدء الإقرار الصحي. يستغرق حوالي {mins} ومعلوماتك سرية.",
		arriving: "قدوم",
		arrivingSub: "أدخل إلى الكويت",
		departing: "مغادرة",
		departingSub: "أغادر الكويت",
		returning: "مقيم عائد / كويتي عائد إلى الوطن",
		tourism: "إجازة / سياحة",
		business: "أعمال / عمل",
		family: "زيارة أهل / أصدقاء",
		medical: "علاج طبي",
		education: "تعليم / دراسة",
		transit: "عبور",
		official: "رسمي / دبلوماسي",
		conference: "مؤتمر / فعالية",
		other: "أخرى",
		doneTitle: "تم استلام الإقرار",
		doneLead: "اعرض هذه الشاشة أو الرمز أدناه في مكتب الصحة. احفظ لقطة شاشة على هاتفك.",
		reference: "الرقم المرجعي",
		showOfficials: "قدّم هذا لمسؤولي الصحة في المنفذ.",
		newDeclaration: "تقديم إقرار آخر",
		riskNotice: "بناءً على إجاباتك، يرجى مراجعة مكتب الصحة فوراً عند الوصول أو قبل الصعود.",
		lowRisk: "لم يُشر هذا النموذج إلى فحص إضافي.",
		staff: "الموظفون",
		verifyTitle: "التحقق من إقرار",
		verifyLead: "أدخل الرقم المرجعي الظاهر على شاشة المسافر.",
		verifyCta: "بحث",
		notFound: "لا يوجد إقرار بهذا الرمز.",
		loginTitle: "تسجيل دخول الموظفين",
		loginLead: "سجّل الدخول للاطلاع على إقرارات المسافرين.",
		adminTitle: "الإقرارات",
		searchPlaceholder: "بحث بالاسم أو الجواز أو الرقم المدني أو الرمز",
		risk: "متابعة",
		clear: "سليم",
		noResults: "لا توجد إقرارات مطابقة بعد.",
		signedOut: "سجّل الدخول للمتابعة",
		invalidEmail: "أدخل بريداً صالحاً أو اتركه فارغاً.",
		invalidAge: "أدخل العمر بالسنوات.",
		footer: "دولة الكويت · وزارة الصحة · ترصد المنافذ",
		confidential: "تُستخدم المعلومات للصحة العامة فقط.",
		eServices: "الخدمات الإلكترونية",
		mohArabic: "وزارة الصحة",
		mohEnglish: "Ministry of Health",
		stateKuwait: "دولة الكويت",
		stateKuwaitAr: "دولة الكويت",
		staffLogin: "دخول الموظفين",
		essTitle: "تقديم طلبات الإجازة… أصبح أسهل!",
		essLead: "قدّم طلب إجازتك الدورية بسرعة وسهولة عبر النظام الإلكتروني.",
		essDownload: "حمّل التطبيق على:",
		ios: "أجهزة iOS",
		android: "أجهزة Android",
		scanQr: "امسح رمز الاستجابة السريعة للتحميل المباشر",
		pediatricTitle: "خدمة الرعاية الصحية المنزلية للأطفال",
		pediatricLead: "نعتني بصحة أطفالكم أينما كنتم.",
		pediatricAr: "نعتني بصحة أطفالكم أينما كنتم",
		knphsTitle: "المسح الصحي الوطني لسكان الكويت",
		knphsShort: "KNPHS",
		knphsLead: "ساعد الوزارة على فهم صحة المقيمين في الكويت. تبقى إجاباتك سرية.",
		koahsTitle: "مسح صحة كبار السن في الكويت",
		koahsShort: "KOAHS",
		koahsLead: "مسح وطني حول صحة ورفاه كبار السن في الكويت.",
		declarationService: "الإقرار الصحي للمسافرين",
		declarationLead: "أكمل إقرار القدوم أو المغادرة الصحي قبل وصولك إلى المنفذ.",
		hearObey: "سمعاً و طاعة",
		menu: "القائمة",
		close: "إغلاق",
		home: "الرئيسية",
		clickHere: "انقر هنا",
		serviceInfo: "عن هذه الخدمة الإلكترونية",
		backHome: "العودة إلى الخدمات الإلكترونية",
		openService: "فتح الخدمة",
		brandLine: "وزارة الصحة — دولة الكويت"
	}
};
function interpolate(template, vars) {
	return template.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
var STORAGE_KEY = "kwmoh.locale";
var Ctx = (0, import_react.createContext)(null);
function applyDocLocale(locale) {
	if (typeof document === "undefined") return;
	document.documentElement.lang = locale;
	document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
}
function LocaleProvider({ children }) {
	const [locale, setLocaleState] = (0, import_react.useState)("en");
	(0, import_react.useEffect)(() => {
		try {
			const v = window.localStorage.getItem(STORAGE_KEY);
			if (v && LOCALES.some((l) => l.id === v)) {
				const next = v;
				setLocaleState(next);
				applyDocLocale(next);
				return;
			}
		} catch {}
		applyDocLocale("en");
	}, []);
	const setLocale = (0, import_react.useCallback)((l) => {
		setLocaleState(l);
		applyDocLocale(l);
		try {
			window.localStorage.setItem(STORAGE_KEY, l);
		} catch {}
	}, []);
	const t = (0, import_react.useCallback)((key, vars) => {
		const raw = (DICTS[locale] ?? DICTS.en)[key] ?? DICTS.en[key] ?? key;
		return vars ? interpolate(raw, vars) : raw;
	}, [locale]);
	const value = (0, import_react.useMemo)(() => ({
		locale,
		setLocale,
		t
	}), [
		locale,
		setLocale,
		t
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value,
		children
	});
}
function useLocale() {
	const ctx = (0, import_react.useContext)(Ctx);
	if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
	return ctx;
}
function KuwaitCrest({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/moh/crest.png",
		alt: "",
		width: 112,
		height: 112,
		className,
		decoding: "async"
	});
}
function KuwaitClock({ compact = false }) {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const tick = () => setNow(/* @__PURE__ */ new Date());
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, []);
	if (!now) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block min-h-[1em] min-w-[8rem] sm:min-w-[18rem]" });
	if (compact) {
		const datePart = now.toLocaleDateString("en-US", {
			timeZone: "Asia/Kuwait",
			month: "short",
			day: "numeric"
		});
		const timePart = now.toLocaleTimeString("en-US", {
			timeZone: "Asia/Kuwait",
			hour: "numeric",
			minute: "2-digit",
			hour12: true
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
			dateTime: now.toISOString(),
			className: "tabular-nums",
			children: [
				datePart,
				" · ",
				timePart
			]
		});
	}
	const datePart = now.toLocaleDateString("en-US", {
		timeZone: "Asia/Kuwait",
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	const timePart = now.toLocaleTimeString("en-US", {
		timeZone: "Asia/Kuwait",
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("time", {
		dateTime: now.toISOString(),
		className: "tabular-nums",
		children: [
			datePart,
			" ",
			timePart
		]
	});
}
function XMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M18.2 3H21l-6.5 7.4L22 21h-6.2l-4.3-5.6L6.4 21H3.6l7-7.9L2 3h6.3l3.9 5.2L18.2 3Zm-1.1 16.2h1.7L7 4.7H5.2l11.9 14.5Z"
		})
	});
}
function SiteHeader() {
	const { t, locale, setLocale } = useLocale();
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-line bg-card text-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto hidden max-w-6xl grid-cols-3 items-center px-3 py-1.5 text-[0.82rem] sm:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center font-medium text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KuwaitClock, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center justify-end gap-3",
							"aria-label": "Utility",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setLocale(locale === "en" ? "ar" : "en"),
									className: "font-medium text-ink hover:text-teal-deep",
									children: locale === "en" ? "العربية" : "English"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-line",
									"aria-hidden": "true",
									children: "|"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "font-medium text-ink no-underline hover:text-teal-deep",
									children: t("staffLogin")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-green",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-6 place-items-center rounded-full bg-green text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(XMark, { className: "size-3" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-6 place-items-center rounded-full bg-green text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Instagram, {
												className: "size-3.5",
												strokeWidth: 2
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-6 place-items-center rounded-full bg-green text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Youtube, {
												className: "size-3.5",
												strokeWidth: 2
											})
										})
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 px-3 py-1.5 text-[0.75rem] sm:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "min-w-0 truncate font-medium text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KuwaitClock, { compact: true })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex shrink-0 items-center gap-2",
						"aria-label": "Utility",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setLocale(locale === "en" ? "ar" : "en"),
								className: "font-medium text-ink hover:text-teal-deep",
								children: locale === "en" ? "العربية" : "English"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-line",
								"aria-hidden": "true",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "font-medium text-ink no-underline hover:text-teal-deep",
								children: t("staffLogin")
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-green text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5 sm:gap-4 sm:py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 shrink-0 place-items-center rounded-md text-white hover:bg-white/10",
						"aria-label": t("menu"),
						"aria-expanded": open,
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-3 text-white no-underline",
						"aria-label": t("brandLine"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KuwaitCrest, { className: "size-14 shrink-0 object-contain sm:size-16" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-lg font-extrabold leading-tight sm:text-xl",
									children: t("mohArabic")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-[0.95rem] font-semibold leading-tight sm:text-base",
									children: t("mohEnglish")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-0.5 block text-[0.72rem] text-white/80 sm:text-xs",
									children: [
										t("stateKuwait"),
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"aria-hidden": "true",
											children: "|"
										}),
										" ",
										t("stateKuwaitAr")
									]
								})
							]
						})]
					})]
				})
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-green-2 bg-green-2 text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 text-[0.98rem] font-medium",
					"aria-label": t("menu"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "rounded-md px-3 py-3 text-white no-underline hover:bg-white/10",
							onClick: () => setOpen(false),
							children: [
								t("home"),
								" · ",
								t("eServices")
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/declare",
							className: "rounded-md px-3 py-3 text-white no-underline hover:bg-white/10",
							onClick: () => setOpen(false),
							children: t("declarationService")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/verify",
							className: "rounded-md px-3 py-3 text-white no-underline hover:bg-white/10",
							onClick: () => setOpen(false),
							children: t("verifyTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "rounded-md px-3 py-3 text-white no-underline hover:bg-white/10",
							onClick: () => setOpen(false),
							children: t("staffLogin")
						})
					]
				})
			}) : null
		]
	});
}
function SiteFooter() {
	const { t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-auto bg-green text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-center text-sm leading-relaxed text-white/80",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-white",
					children: t("footer")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("confidential") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pt-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/verify",
							className: "text-teal no-underline hover:underline",
							children: t("verifyTitle")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-2 text-white/30",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							className: "text-teal no-underline hover:underline",
							children: t("staff")
						})
					]
				})
			]
		})
	});
}
var styles_default = "/assets/styles-ZVMyXyJK.css";
var APP_NAME = "Ministry of Health — State of Kuwait";
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0C3344"
			},
			{
				name: "description",
				content: "State of Kuwait Ministry of Health e-services and traveller health declaration."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-page font-sans text-ink antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-h-dvh flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
					]
				}) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$8 = () => import("./routes-FwazO48j.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./admin-Db6EeHc0.mjs");
var Route$8 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./login-taNe_UNB.mjs");
var Route$7 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./verify-Dc5ptzGo.mjs");
var Route$6 = createFileRoute("/verify")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./declare-QPoar7s_.mjs");
var Route$5 = createFileRoute("/declare/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./arrive-4xQynXf-.mjs");
var Route$4 = createFileRoute("/declare/arrive")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./depart-Ch915Zso.mjs");
var Route$3 = createFileRoute("/declare/depart")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("../_slug-Bc2n45wF.mjs");
var Route$2 = createFileRoute("/services/$slug")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter = () => import("./done._code-CA9wGjr_.mjs");
var Route = createFileRoute("/declare/done/$code")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AdminRoute = Route$8.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var VerifyRoute = Route$6.update({
	id: "/verify",
	path: "/verify",
	getParentRoute: () => Route$10
});
var DeclareIndexRoute = Route$5.update({
	id: "/declare/",
	path: "/declare/",
	getParentRoute: () => Route$10
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	LoginRoute,
	VerifyRoute,
	DeclareArriveRoute: Route$4.update({
		id: "/declare/arrive",
		path: "/declare/arrive",
		getParentRoute: () => Route$10
	}),
	DeclareDepartRoute: Route$3.update({
		id: "/declare/depart",
		path: "/declare/depart",
		getParentRoute: () => Route$10
	}),
	ServicesSlugRoute: Route$2.update({
		id: "/services/$slug",
		path: "/services/$slug",
		getParentRoute: () => Route$10
	}),
	DeclareIndexRoute,
	ApiAuthSplatRoute: Route$1.update({
		id: "/api/auth/$",
		path: "/api/auth/$",
		getParentRoute: () => Route$10
	}),
	DeclareDoneCodeRoute: Route.update({
		id: "/declare/done/$code",
		path: "/declare/done/$code",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useLocale as i, Route as n, Route$2 as r, router_exports as t };
