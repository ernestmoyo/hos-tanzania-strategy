import puppeteer from "puppeteer-core";
import ffmpegPath from "ffmpeg-static";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "https://hos-tanzania-strategy.vercel.app/";
const OUT = "C:/Users/ernes/AppData/Local/Temp/tour.webm";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const b = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ["--no-sandbox", "--window-size=1366,768", "--hide-scrollbars"],
});
const p = await b.newPage();
await p.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
await p.goto(URL, { waitUntil: "networkidle0" });

// caption overlay
await p.evaluate(() => {
  const s = document.createElement("style");
  s.textContent = `
    #cap{position:fixed;left:50%;bottom:42px;transform:translateX(-50%);z-index:99999;
      background:rgba(8,11,12,.82);backdrop-filter:blur(10px);border:1px solid rgba(45,212,167,.45);
      border-radius:14px;padding:14px 26px;color:#eaf1ef;font-family:Inter,system-ui,sans-serif;
      font-size:22px;font-weight:600;letter-spacing:-.01em;max-width:80vw;text-align:center;
      opacity:0;transition:opacity .5s ease;box-shadow:0 20px 60px -20px rgba(0,0,0,.8)}
    #cap b{color:#2dd4a7}
    #cap .k{display:block;font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.18em;
      text-transform:uppercase;color:#f4b740;margin-bottom:6px;font-weight:500}`;
  document.head.appendChild(s);
  const d = document.createElement("div");
  d.id = "cap";
  document.body.appendChild(d);
  window.__cap = (k, t) => {
    d.style.opacity = "0";
    setTimeout(() => {
      d.innerHTML = `<span class="k">${k}</span>${t}`;
      d.style.opacity = "1";
    }, 350);
  };
});

const scrollTo = (sel) =>
  p.evaluate((s) => {
    const el = document.querySelector(s);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, sel);
const cap = (k, t) => p.evaluate((k, t) => window.__cap(k, t), k, t);

const recorder = await p.screencast({ path: OUT, ffmpegPath });

// ---- the tour ----
await p.evaluate(() => window.scrollTo({ top: 0 }));
await cap("Ernest Moyo", "Launching the Health Operating System in <b>Tanzania</b>");
await sleep(4200);

await cap("Operating thesis", "The moment a <b>government-owned</b> platform wins");
await scrollTo("#thesis");
await sleep(4500);

await cap("Task 1 · Stakeholder map", "Tanzania runs health on <b>two principals</b>");
await scrollTo("#stakeholders");
await sleep(5000);

await cap("Task 2 · Trust", "Make the skeptic's concerns the <b>acceptance criteria</b>");
await scrollTo("#relationship");
await sleep(4500);

await cap("Task 3 · Pilot", "An <b>offline-first</b> pilot, built on the national rails");
await scrollTo("#pilot");
await sleep(4000);

await cap("The data-science layer", "A live readiness model over <b>195 districts</b>");
await scrollTo("#model");
await sleep(3500);

// animate a slider so the choropleth + pilot picks recompute on camera
await cap("Re-weight the rubric", "Move a weight and the <b>pilots move</b>");
const dragged = await p.evaluate(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const ranges = [...document.querySelectorAll('input[type="range"]')];
  if (!ranges.length) return false;
  const el = ranges[3] || ranges[0]; // "Supervision access"
  const setter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  const ramp = async (from, to) => {
    const step = from < to ? 1 : -1;
    for (let v = from; v !== to; v += step) {
      setter.call(el, String(v));
      el.dispatchEvent(new Event("input", { bubbles: true }));
      await sleep(70);
    }
  };
  await ramp(18, 40);
  await sleep(500);
  await ramp(40, 0);
  await sleep(500);
  await ramp(0, 18);
  return true;
});
await sleep(1500);

await cap("Task 4 · Crisis", "Let the <b>Ministry</b> lead the response, not the vendor");
await scrollTo("#crisis");
await sleep(4500);

await cap("Data lab", "Four census rounds, <b>1988 to 2022</b>");
await scrollTo("#lab");
await sleep(4500);

await cap("Explore it", "hos-tanzania-strategy.vercel.app");
await scrollTo("#contact");
await sleep(4500);

await recorder.stop();
await b.close();
console.log("done; slider animated:", dragged);
