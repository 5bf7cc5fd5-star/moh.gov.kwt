import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const destDir = join(
  root,
  ".vercel/output/functions/__server.func/_libs",
);

if (!existsSync(srcDir) || !existsSync(destDir)) process.exit(0);
mkdirSync(destDir, { recursive: true });
for (const name of readdirSync(srcDir)) {
  if (!/\.(wasm|data)$/.test(name)) continue;
  copyFileSync(join(srcDir, name), join(destDir, name));
}
