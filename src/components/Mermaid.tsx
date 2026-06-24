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
      background: "#0b1011",
      primaryColor: "#111a1c",
      primaryBorderColor: "#233032",
      primaryTextColor: "#eaf1ef",
      lineColor: "#3a5a52",
      secondaryColor: "#162123",
      tertiaryColor: "#0f1718",
      fontSize: "14px",
      clusterBkg: "#0d1415",
      clusterBorder: "#233032",
      edgeLabelBackground: "#0b1011",
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
