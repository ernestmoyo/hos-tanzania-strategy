import { useEffect, useId, useRef, useState } from "react";
import mermaid from "mermaid";

let initialised = false;
function initMermaid() {
  if (initialised) return;
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    fontFamily: "Inter, system-ui, sans-serif",
    theme: "base",
    themeVariables: {
      background: "#ffffff",
      primaryColor: "#f6f8fb",
      primaryBorderColor: "#cbd5e1",
      primaryTextColor: "#14181d",
      lineColor: "#7f93a6",
      secondaryColor: "#eef2f7",
      tertiaryColor: "#f6f8fb",
      fontSize: "14px",
      clusterBkg: "#f8fafc",
      clusterBorder: "#d4dee8",
      edgeLabelBackground: "#ffffff",
    },
  });
  initialised = true;
}

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "_");
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    initMermaid();
    let alive = true;
    mermaid
      .render(`m_${id}`, chart)
      .then(({ svg }) => alive && setSvg(svg))
      .catch((e) => alive && setErr(String(e?.message ?? e)));
    return () => {
      alive = false;
    };
  }, [chart, id]);

  if (err)
    return (
      <pre className="mono overflow-auto rounded-lg border border-rose/40 bg-surface p-4 text-xs text-rose">
        {err}
      </pre>
    );

  return (
    <div
      ref={ref}
      className="mermaid-wrap card overflow-x-auto p-5"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
