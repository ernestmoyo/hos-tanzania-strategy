import { useEffect, useState } from "react";

const LINKS = [
  ["thesis", "Thesis"],
  ["stakeholders", "01 · Map"],
  ["relationship", "02 · Trust"],
  ["pilot", "03 · Pilot"],
  ["crisis", "04 · Crisis"],
  ["lab", "Data Lab"],
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald/15 text-emerald ring-1 ring-emerald/40">
            <span className="display text-sm font-bold">EM</span>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-fg sm:block">
            Ernest Moyo
            <span className="ml-2 font-normal text-fg-dim">· HOS Tanzania</span>
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="mono rounded-md px-2.5 py-1.5 text-xs text-fg-dim transition hover:bg-surface hover:text-emerald"
            >
              {label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="mono rounded-md border border-emerald/40 bg-emerald/10 px-3 py-1.5 text-xs text-emerald transition hover:bg-emerald/20"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
