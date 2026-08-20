import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-frame-JDRg5P8U.js
var import_jsx_runtime = require_jsx_runtime();
function PageFrame({ children, narrow = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full flex-1 px-4 py-6", narrow ? "max-w-xl" : "max-w-5xl"),
		children
	});
}
//#endregion
export { PageFrame as t };
