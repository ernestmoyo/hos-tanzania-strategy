import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const SITE = "https://hos-tanzania-strategy.vercel.app/";
const IMG = "C:/Users/ernes/Documents/Projects/sandhealthcare_int/wordbuild/img";
const MAPHTML =
  "file:///C:/Users/ernes/Documents/Projects/sandhealthcare_int/wordbuild/stakeholder-map.html";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--force-device-scale-factor=2", "--high-dpi-support=1"],
});

async function shot(page, sel, file, pad = 0) {
  const el = await page.$(sel);
  if (!el) {
    console.log("MISSING", sel);
    return;
  }
  await el.evaluate((n) => n.scrollIntoView({ block: "center" }));
  await sleep(700);
  await el.screenshot({ path: `${IMG}/${file}`, ...(pad ? {} : {}) });
  console.log("shot", file);
}

// 1) standalone stakeholder map
const m = await b.newPage();
await m.setViewport({ width: 1220, height: 1700, deviceScaleFactor: 2 });
await m.goto(MAPHTML, { waitUntil: "networkidle0" });
await sleep(400);
await shot(m, ".sheet", "stakeholder-map.png");
await m.close();

// 2) live platform visuals
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await p.goto(SITE, { waitUntil: "networkidle0" });
// trigger all reveal animations + map load
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await sleep(1200);

await shot(p, "#model .card", "readiness-model.png");
await shot(p, "#stakeholders .mermaid-wrap", "flow-stakeholders.png");
await shot(p, "#crisis .mermaid-wrap", "flow-crisis.png");
// offline-first flow is the first mermaid inside #pilot
const offline = await p.$$("#pilot .mermaid-wrap");
if (offline[0]) {
  await offline[0].evaluate((n) => n.scrollIntoView({ block: "center" }));
  await sleep(600);
  await offline[0].screenshot({ path: `${IMG}/flow-offline.png` });
  console.log("shot flow-offline.png");
}
// population chart (first card in lab)
await shot(p, "#lab .card", "population.png");

await b.close();
console.log("capture done");
