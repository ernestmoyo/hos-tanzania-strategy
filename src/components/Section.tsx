import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  kicker,
  title,
  lede,
  children,
  taskTag,
}: {
  id: string;
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  taskTag?: string;
}) {
  return (
    <section
      id={id}
      className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 md:py-28"
    >
      <Reveal>
        <div className="mb-3 flex items-center gap-3">
          <span className="eyebrow">{kicker}</span>
          {taskTag && (
            <span className="mono rounded-full border border-line bg-surface px-2.5 py-0.5 text-[0.65rem] text-fg-dim">
              {taskTag}
            </span>
          )}
        </div>
        <h2 className="display max-w-3xl text-3xl font-semibold text-fg sm:text-4xl md:text-[2.7rem]">
          {title}
        </h2>
        {lede && (
          <p className="prose-body mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {lede}
          </p>
        )}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}
