import { _ as Link, x as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as useLocale, r as Route$2 } from "./_ssr/router-eMpGfEv6.mjs";
import { t as PageFrame } from "./_ssr/page-frame-JDRg5P8U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-Bc2n45wF.js
var import_jsx_runtime = require_jsx_runtime();
var SERVICES = {
	ess: {
		title: "essTitle",
		lead: "essLead",
		extra: "essDownload",
		image: "/moh/slide-ess.jpg"
	},
	pediatric: {
		title: "pediatricTitle",
		lead: "pediatricLead",
		extra: "pediatricAr",
		image: "/moh/slide-pediatric.jpg"
	},
	knphs: {
		title: "knphsTitle",
		lead: "knphsLead",
		image: "/moh/slide-knphs.jpg"
	},
	koahs: {
		title: "koahsTitle",
		lead: "koahsLead",
		image: "/moh/slide-koahs.jpg"
	}
};
function ServicePage() {
	const { slug } = Route$2.useParams();
	const { t } = useLocale();
	const svc = SERVICES[slug];
	if (!svc) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-2xl font-extrabold",
		children: t("notFound")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "mt-3 inline-block font-medium text-teal-deep",
		children: t("backHome")
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 overflow-hidden bg-green sm:h-56",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: svc.image,
			alt: t(svc.title),
			className: "h-full w-full object-cover"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "←"
				}),
				" ",
				t("backHome")
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold uppercase tracking-[0.18em] text-teal-deep",
			children: t("eServices")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-[1.85rem] font-extrabold tracking-tight text-ink",
			children: t(svc.title)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[1.05rem] leading-relaxed text-ink",
					children: t(svc.lead)
				}),
				svc.extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[1.02rem] text-muted",
					children: t(svc.extra)
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: t("confidential")
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/declare",
				className: "inline-flex rounded-[var(--radius-ctl)] bg-green px-5 py-3 font-semibold text-white no-underline hover:bg-green-hover",
				children: t("declarationService")
			})
		})
	] })] });
}
//#endregion
export { ServicePage as component };
