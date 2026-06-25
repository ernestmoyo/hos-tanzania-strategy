import puppeteer from "puppeteer-core";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";const T="C:/Users/ernes/AppData/Local/Temp";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--no-sandbox"]});
const p=await b.newPage();await p.setViewport({width:1440,height:900,deviceScaleFactor:1.5});
await p.goto("http://localhost:4801/",{waitUntil:"networkidle0"});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);});
await new Promise(r=>setTimeout(r,1200));
async function s(sel,f){const el=await p.$(sel);if(!el){console.log("miss",sel);return;}await el.evaluate(n=>n.scrollIntoView({block:"center"}));await new Promise(r=>setTimeout(r,500));await el.screenshot({path:`${T}/${f}`});console.log("ok",f);}
await s("#model .card","lt_model.png");
await s("#stakeholders .mermaid-wrap","lt_flow.png");
await b.close();
