import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as useLocale, n as Route } from "./router-eMpGfEv6.mjs";
import { t as PageFrame } from "./page-frame-JDRg5P8U.mjs";
import { t as getDeclarationByCode } from "./declarations-C9b48liR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/done._code-CA9wGjr_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QrCode({ value, label }) {
	const [svg, setSvg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		import("../_libs/qrcode.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then(async (QRCode) => {
			const markup = await QRCode.toString(value, {
				type: "svg",
				margin: 1,
				width: 220,
				color: {
					dark: "#0c3344",
					light: "#ffffff"
				},
				errorCorrectionLevel: "M"
			});
			if (!cancelled) setSvg(markup);
		});
		return () => {
			cancelled = true;
		};
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "size-[220px] rounded-xl bg-card p-2",
			"aria-label": label,
			dangerouslySetInnerHTML: svg ? { __html: svg } : void 0
		})
	});
}
function DonePage() {
	const { code } = Route.useParams();
	const { t } = useLocale();
	const [row, setRow] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		let live = true;
		getDeclarationByCode({ data: code }).then((r) => {
			if (live) setRow(r);
		}).catch(() => {
			if (live) setRow(null);
		});
		return () => {
			live = false;
		};
	}, [code]);
	if (row === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-16 text-center text-muted",
		children: t("submitting")
	}) });
	if (!row) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-2 text-2xl font-extrabold",
			children: t("notFound")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/declare",
			className: "font-medium text-teal-deep",
			children: t("newDeclaration")
		})]
	}) });
	const qrValue = `KWMH|${row.code}|${row.full_name}|${row.direction}|${row.travel_date}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-wide text-green",
					children: "KWMH"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-2xl font-extrabold tracking-tight text-ink",
					children: t("doneTitle")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[1.02rem] leading-relaxed text-muted",
					children: t("doneLead")
				}),
				row.risk_flag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-[var(--radius-ctl)] bg-warn-bg px-3 py-3 text-sm font-medium text-warn",
					children: t("riskNotice")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 rounded-[var(--radius-ctl)] bg-green-soft px-3 py-3 text-sm font-medium text-green",
					children: t("lowRisk")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
						value: qrValue,
						label: t("reference")
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: t("reference")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-2xl font-bold tracking-[0.18em] text-green",
							children: row.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-lg font-semibold text-ink",
							children: row.full_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								row.direction === "arrive" ? t("arriving") : t("departing"),
								" ·",
								" ",
								row.port,
								" · ",
								row.travel_date
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								t("civilId"),
								": ",
								row.civil_id || "—"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted",
							children: [
								row.passport_number,
								" · ",
								row.flight_number
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-center text-sm text-muted",
					children: t("showOfficials")
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/declare",
				className: "inline-flex rounded-[var(--radius-ctl)] bg-green px-5 py-3 font-semibold text-white no-underline hover:bg-green-hover",
				children: t("newDeclaration")
			})
		})]
	}) });
}
//#endregion
export { DonePage as component };
