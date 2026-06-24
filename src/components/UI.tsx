import type { ReactNode } from "react";

export function Callout({
  tone = "emerald",
  title,
  children,
}: {
  tone?: "emerald" | "gold" | "rose" | "indigo";
  title?: string;
  children: ReactNode;
}) {
  const map = {
    emerald: "border-emerald/40 bg-emerald/[0.06]",
    gold: "border-gold/40 bg-gold/[0.06]",
    rose: "border-rose/40 bg-rose/[0.06]",
    indigo: "border-indigo/40 bg-indigo/[0.06]",
  } as const;
  return (
    <div className={`rounded-xl border ${map[tone]} p-5`}>
      {title && (
        <div className="mono mb-2 text-[0.7rem] uppercase tracking-wide text-fg-muted">
          {title}
        </div>
      )}
      <div className="prose-body text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function Quote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative rounded-xl border-l-2 border-emerald bg-surface/60 py-3 pl-5 pr-4 text-[0.95rem] italic leading-relaxed text-fg">
      {children}
    </blockquote>
  );
}

export function CardItem({
  badge,
  badgeTone = "emerald",
  title,
  children,
}: {
  badge?: string;
  badgeTone?: "emerald" | "gold" | "indigo" | "rose";
  title: string;
  children: ReactNode;
}) {
  const tones = {
    emerald: "text-emerald",
    gold: "text-gold",
    indigo: "text-indigo",
    rose: "text-rose",
  } as const;
  return (
    <div className="card h-full p-5">
      {badge && (
        <div className={`mono text-[0.65rem] uppercase tracking-wide ${tones[badgeTone]}`}>
          {badge}
        </div>
      )}
      <h4 className="mt-1.5 text-base font-semibold text-fg">{title}</h4>
      <div className="prose-body mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
