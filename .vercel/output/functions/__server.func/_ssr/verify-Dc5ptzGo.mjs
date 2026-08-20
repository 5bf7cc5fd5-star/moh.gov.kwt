import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocale } from "./router-eMpGfEv6.mjs";
import { t as PageFrame } from "./page-frame-JDRg5P8U.mjs";
import { t as getDeclarationByCode } from "./declarations-C9b48liR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify-Dc5ptzGo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VerifyPage() {
	const { t } = useLocale();
	const [code, setCode] = (0, import_react.useState)("");
	const [row, setRow] = (0, import_react.useState)(void 0);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const found = await getDeclarationByCode({ data: code });
			setRow(found);
		} catch {
			setRow(null);
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-2 text-[1.85rem] font-extrabold tracking-tight",
				children: t("verifyTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-[1.02rem] text-muted",
				children: t("verifyLead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: code,
					onChange: (e) => setCode(e.target.value.toUpperCase()),
					placeholder: "KW-XXXX-XXXX",
					className: "w-full rounded-[var(--radius-ctl)] border border-line px-3.5 py-3.5 font-mono text-lg tracking-wide outline-none focus:border-teal focus:ring-2 focus:ring-teal/20",
					autoCapitalize: "characters"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy || !code.trim(),
					className: "mt-3 w-full rounded-[var(--radius-ctl)] bg-green py-3.5 font-semibold text-white hover:bg-green-hover disabled:opacity-60",
					children: t("verifyCta")
				})]
			}),
			row === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-star",
				children: t("notFound")
			}) : row ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-[var(--radius-card)] bg-card p-4 shadow-[var(--shadow-card)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-lg font-bold tracking-widest text-green",
						children: row.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-lg font-semibold",
						children: row.full_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t("sex")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.sex }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t("civilId")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.civil_id || "—" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t("passport")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.passport_number }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: row.direction === "arrive" ? t("portEntry") : t("portExit")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.port }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t("flight")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.flight_number }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: row.direction === "arrive" ? t("dateArrival") : t("dateDeparture")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: row.travel_date })
						]
					}),
					row.risk_flag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-2 text-sm font-medium text-warn",
						children: t("riskNotice")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-2 text-sm font-medium text-green",
						children: t("lowRisk")
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/declare",
					className: "text-teal-deep no-underline hover:underline",
					children: t("arrivalOrDeparture")
				})
			})
		]
	}) });
}
//#endregion
export { VerifyPage as component };
