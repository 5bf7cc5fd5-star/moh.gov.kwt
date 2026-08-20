import { _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-8jrVh4wD.mjs";
import { i as useLocale } from "./router-eMpGfEv6.mjs";
import { t as PageFrame } from "./page-frame-JDRg5P8U.mjs";
import { r as signIn } from "./client-sGid3STf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-taNe_UNB.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mb-2 text-[1.85rem] font-extrabold tracking-tight",
				children: t("loginTitle")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-6 text-[1.02rem] text-muted",
				children: t("loginLead")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-card)] bg-card p-5 shadow-[var(--shadow-card)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-3",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL: "/admin" }),
						className: "w-full rounded-[var(--radius-ctl)] border border-line px-4 py-3.5 font-semibold text-ink transition-colors hover:bg-green-soft",
						children: ["Continue with ", p.label]
					}, p.providerId))
				})
			}),
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
export { Login as component };
