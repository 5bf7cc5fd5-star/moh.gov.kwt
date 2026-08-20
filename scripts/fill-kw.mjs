import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto("http://127.0.0.1:8080/declare/arrive", { waitUntil: "networkidle" });

async function pickSelect(field, optionSubstring) {
  const sel = page.locator(`[data-field="${field}"] select`);
  const value = await sel.locator("option").evaluateAll((opts, sub) => {
    const hit = opts.find((o) => (o.textContent || "").includes(sub) && o.value);
    return hit ? hit.value : "";
  }, optionSubstring);
  if (!value) throw new Error("no option for " + field + " " + optionSubstring);
  await sel.selectOption(value);
}

async function fillText(field, value) {
  const input = page.locator(`[data-field="${field}"] input`).last();
  await input.fill(value);
}

async function clickNo(field) {
  await page.locator(`[data-field="${field}"] button[role="radio"]`).nth(1).click();
}

await pickSelect("port", "Terminal 1");
await pickSelect("purpose", "Holiday");
await fillText("daysOutsideKuwait", "10");
await fillText("countriesVisited", "India, UAE");
await fillText("flightNumber", "KU101");
await fillText("addressOutsideKuwait", "12 Palm Street, Dubai");
await fillText("fullName", "Ahmed Hassan");
await fillText("age", "36");
await pickSelect("sex", "Male");
await pickSelect("citizenship", "Kuwait");
await fillText("civilId", "280010101234");
await fillText("passportNumber", "N1234567");
await fillText("phoneNumber", "50051932");

for (const f of [
  "hasSymptoms",
  "contactSick",
  "attendedFuneral",
  "visitedHospital",
  "handledAnimals",
  "malariaRisk",
  "typhoidRisk",
  "sexualActivity",
  "stdSymptoms",
  "stdHistory",
  "stdClinic",
]) {
  await clickNo(f);
}

await page.locator('button[type="submit"]').click();
await page.waitForURL(/\/declare\/done\//, { timeout: 15000 });
const url = page.url();
const code = url.match(/done\/([^/?#]+)/)?.[1];
await page.waitForTimeout(600);
await page.screenshot({ path: "/workspace/screenshots/done-mobile.png", fullPage: true });
const body = await page.innerText("body");
console.log(JSON.stringify({ url, code, errors, hasQR: await page.locator("svg").count(), snippet: body.slice(0, 400) }, null, 2));
await browser.close();
