import { o as __toESM } from "../_runtime.mjs";
import { V as require_react, _ as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShieldCheck, d as HeartHandshake, f as ClipboardList, g as Baby, h as CalendarCheck, m as ChevronLeft, o as Plane, p as ChevronRight, r as Users } from "../_libs/lucide-react.mjs";
import { i as useLocale } from "./router-eMpGfEv6.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-FwazO48j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HeroCarousel() {
	const { t, locale } = useLocale();
	const [i, setI] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const slides = [
		{
			src: "/moh/slide-amir.jpg",
			alt: t("hearObey")
		},
		{
			src: "/moh/slide-ess.jpg",
			alt: t("essTitle"),
			slug: "ess"
		},
		{
			src: "/moh/slide-pediatric.jpg",
			alt: t("pediatricTitle"),
			slug: "pediatric"
		},
		{
			src: "/moh/slide-knphs.jpg",
			alt: t("knphsTitle"),
			slug: "knphs"
		},
		{
			src: "/moh/slide-koahs.jpg",
			alt: t("koahsTitle"),
			slug: "koahs"
		}
	];
	const count = slides.length;
	const current = slides[i];
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || paused) return;
		const id = window.setInterval(() => {
			setI((n) => (n + 1) % count);
		}, 5500);
		return () => window.clearInterval(id);
	}, [count, paused]);
	const go = (dir) => setI((n) => (n + dir + count) % count);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-green",
		"aria-roledescription": "carousel",
		"aria-label": t("eServices"),
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-[13.5rem] w-full sm:h-[18.5rem] lg:h-[22rem]",
				children: [slides.map((s, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: s.src,
					alt: n === i ? s.alt : "",
					width: 1600,
					height: 464,
					className: cn("absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500", n === i ? "opacity-100" : "opacity-0"),
					draggable: false
				}, s.src)), current.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/services/$slug",
					params: { slug: current.slug },
					className: "absolute inset-0 z-[1]",
					"aria-label": current.alt
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute start-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-green shadow-sm hover:bg-white sm:start-4 sm:size-10",
				"aria-label": locale === "ar" ? "التالي" : "Previous",
				onClick: () => go(-1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5 rtl:rotate-180" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "absolute end-2 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-green shadow-sm hover:bg-white sm:end-4 sm:size-10",
				"aria-label": locale === "ar" ? "السابق" : "Next",
				onClick: () => go(1),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 rtl:rotate-180" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2",
				children: slides.map((s, n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": s.alt,
					"aria-current": n === i,
					onClick: () => setI(n),
					className: cn("size-2.5 rounded-full transition-colors", n === i ? "bg-teal" : "bg-white/70 hover:bg-white")
				}, s.src))
			})
		]
	});
}
function LandingHome() {
	const { t } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroCarousel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-10 sm:py-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-extrabold tracking-[0.22em] text-green sm:text-3xl",
							children: t("eServices")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto mt-3 block h-1 w-16 rounded-full bg-teal" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/declare",
						className: "mb-4 flex items-center gap-4 rounded-[var(--radius-card)] bg-green p-5 text-white no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-14 shrink-0 place-items-center rounded-full bg-white/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, {
									className: "size-7",
									strokeWidth: 1.75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-lg font-bold tracking-tight sm:text-xl",
									children: t("declarationService")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm leading-snug text-white/80 sm:text-base",
									children: t("declarationLead")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6 shrink-0 opacity-70 rtl:rotate-180" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/services/$slug",
								params: { slug: "ess" },
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: "MOH ESS",
								subtitle: t("essTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/services/$slug",
								params: { slug: "pediatric" },
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Baby, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: t("pediatricTitle"),
								subtitle: t("pediatricLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/services/$slug",
								params: { slug: "knphs" },
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: t("knphsShort"),
								subtitle: t("knphsTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/services/$slug",
								params: { slug: "koahs" },
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: t("koahsShort"),
								subtitle: t("koahsTitle")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/verify",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: t("verifyTitle"),
								subtitle: t("verifyLead")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
								to: "/login",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									className: "size-6",
									strokeWidth: 1.75
								}),
								title: t("staffLogin"),
								subtitle: t("loginLead")
							})
						]
					})
				]
			})
		})]
	});
}
function ServiceCard({ to, params, icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		params,
		className: "flex items-center gap-4 rounded-[var(--radius-card)] border border-line/80 bg-card p-4 text-ink no-underline shadow-[var(--shadow-card)] transition-transform active:scale-[0.99] sm:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-12 shrink-0 place-items-center rounded-full bg-green-soft text-green",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-base font-bold tracking-tight",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-sm leading-snug text-muted",
					children: subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 shrink-0 opacity-60 rtl:rotate-180" })
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHome, {});
}
//#endregion
export { Home as component };
