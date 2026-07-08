"use client";

import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/labs";

type LabElapsedTimerProps = {
  startedAt: string;
};

export function LabElapsedTimer({ startedAt }: LabElapsedTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = new Date(startedAt).getTime();
    const tick = () => {
      setElapsed(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  return <span className="font-mono tabular-nums">{formatDuration(elapsed)}</span>;
}
