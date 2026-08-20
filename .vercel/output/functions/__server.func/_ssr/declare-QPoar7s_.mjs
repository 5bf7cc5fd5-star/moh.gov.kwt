import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PlaneLanding, p as ChevronRight, s as PlaneTakeoff } from "../_libs/lucide-react.mjs";
import { i as useLocale } from "./router-eMpGfEv6.mjs";
import { t as PageFrame } from "./page-frame-JDRg5P8U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/declare-QPoar7s_.js
var import_jsx_runtime = require_jsx_runtime();
function LandingChoice() {
	const { t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-4 inline-flex items-center gap-1 text-[0.98rem] font-medium text-teal-deep no-underline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "←"
					}),
					" ",
					t("home")
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-2 text-[1.85rem] font-extrabold leading-tight tracking-tight text-ink",
				children: t("landingTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-[1.02rem] leading-relaxed text-muted",
				children: t("landingLead", { mins: t("twoMinutes") }).split(t("twoMinutes")).map((part, i, arr) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [part, i < arr.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "font-semibold text-ink",
					children: t("twoMinutes")
				}) : null] }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceCard, {
					to: "/declare/arrive",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaneLanding, {
						className: "size-6",
						strokeWidth: 1.75
					}),
					title: t("arriving"),
					subtitle: t("arrivingSub")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceCard, {
					to: "/declare/depart",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaneTakeoff, {
						className: "size-6",
						strokeWidth: 1.75
					}),
					title: t("departing"),
					subtitle: t("departingSub")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-center text-sm leading-relaxed text-muted",
				children: [
					t("footer"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					t("confidential")
				]
			})
		]
	});
}
function ChoiceCard({ to, icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex items-center gap-4 rounded-[var(--radius-card)] bg-card p-4 text-ink no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-12 shrink-0 place-items-center rounded-full bg-green-soft text-green",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-lg font-bold tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-[0.98rem] text-muted",
					children: subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 shrink-0 text-muted rtl:rotate-180" })
		]
	});
}
function DeclareHome() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingChoice, {}) });
}
//#endregion
export { DeclareHome as component };
