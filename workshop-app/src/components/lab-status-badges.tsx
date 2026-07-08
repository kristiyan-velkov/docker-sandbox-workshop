import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { LabProgressStatus } from "@/lib/labs";
import { cn } from "@/lib/utils";

type ProgressCountProps = {
  completed: number;
  total: number;
  className?: string;
};

export function ProgressCountBadge({ completed, total, className }: ProgressCountProps) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-3 rounded-2xl border-2 border-indigo-300/80 bg-white px-4 py-3 shadow-md shadow-indigo-100/80",
        className
      )}
    >
      <div className="flex size-12 flex-col items-center justify-center rounded-xl bg-indigo-600 text-white">
        <span className="text-[20px] font-bold leading-none tabular-nums">{completed}</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-indigo-100">
          of {total}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-bold text-slate-900">Labs completed</p>
        <p className="text-[13px] font-medium text-indigo-700">{percent}% of workshop done</p>
      </div>
    </div>
  );
}

type LabStatusBadgeProps = {
  status: LabProgressStatus;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
};

export function LabStatusBadge({
  status,
  size = "md",
  showIcon = true,
  className,
}: LabStatusBadgeProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-[13px]";

  if (status === "completed") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-600 font-semibold text-white shadow-sm",
          sizeClasses,
          className
        )}
      >
        {showIcon ? <CheckCircle2 className={size === "sm" ? "size-3" : "size-3.5"} /> : null}
        Completed
      </span>
    );
  }

  if (status === "in_progress") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-amber-400/60 bg-amber-100 font-semibold text-amber-950",
          sizeClasses,
          className
        )}
      >
        {showIcon ? (
          <Loader2 className={cn("animate-spin", size === "sm" ? "size-3" : "size-3.5")} />
        ) : (
          <span className="size-2 animate-pulse rounded-full bg-amber-500" />
        )}
        In progress
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 font-medium text-slate-600",
        sizeClasses,
        className
      )}
    >
      {showIcon ? <Circle className={size === "sm" ? "size-3" : "size-3.5"} /> : null}
      Not started
    </span>
  );
}

type LabChecklistChipProps = {
  labNumber: number;
  status: LabProgressStatus;
};

export function LabChecklistChip({ labNumber: n, status }: LabChecklistChipProps) {
  return (
    <span
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-xl border font-mono text-[13px] font-bold tabular-nums",
        status === "completed" &&
          "border-emerald-500/50 bg-emerald-600 text-white shadow-sm",
        status === "in_progress" &&
          "border-amber-400/70 bg-amber-100 text-amber-950 ring-2 ring-amber-300/50",
        status === "not_started" && "border-slate-200 bg-white text-slate-500"
      )}
      title={
        status === "completed"
          ? `Lab ${n} completed`
          : status === "in_progress"
            ? `Lab ${n} in progress`
            : `Lab ${n} not started`
      }
    >
      {status === "completed" ? "✓" : n}
    </span>
  );
}

export function LabCompletedButton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-50 px-3 text-[13px] font-semibold text-emerald-800",
        className
      )}
    >
      <CheckCircle2 className="size-4 text-emerald-600" />
      Completed
    </span>
  );
}
