import type { ReactNode } from "react";

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #4f46e5 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/4 rounded-full bg-indigo-100/80 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-violet-100/60 blur-[100px]" />
    </div>
  );
}
