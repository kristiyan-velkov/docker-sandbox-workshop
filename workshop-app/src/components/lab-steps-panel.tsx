"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Clock, Lightbulb, ListTodo, Lock, Terminal } from "lucide-react";
import { CommandBlock } from "@/components/command-block";
import { LabElapsedTimer } from "@/components/lab-elapsed-timer";
import type { LabProgressStatus } from "@/lib/labs";
import { cn } from "@/lib/utils";

const UNLOCK_DELAY_SECONDS = 60;

type LabStep = {
  label: string;
  task: string;
  command: string;
};

type LabStepsPanelProps = {
  labTask: string;
  hints: readonly string[];
  steps: readonly LabStep[];
  status: LabProgressStatus;
  startedAt: string | null;
  showTracker: boolean;
  sectionOpen: boolean;
};

function splitLabTask(task: string): { body: string; success: string | null } {
  const match = task.match(/\sDone when (.+)$/i);
  if (!match) return { body: task, success: null };
  return {
    body: task.slice(0, match.index).trim(),
    success: match[1].trim(),
  };
}

function parseNumberedTaskItems(body: string): string[] | null {
  const lines = body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const items: string[] = [];
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+(.+)$/);
    if (!match) return null;
    items.push(match[1]);
  }

  return items;
}

function splitStepTask(task: string): { action: string; expect: string | null } {
  const match = task.match(/^(.+?)\sExpect (.+)$/i);
  if (!match) return { action: task, expect: null };
  return { action: match[1].trim(), expect: match[2].trim() };
}

function secondsUntilUnlock(anchor: string, nowMs = Date.now()): number {
  const elapsed = Math.floor((nowMs - new Date(anchor).getTime()) / 1000);
  return Math.max(0, UNLOCK_DELAY_SECONDS - elapsed);
}

export function LabStepsPanel({
  labTask,
  hints,
  steps,
  status,
  startedAt,
  showTracker,
  sectionOpen,
}: LabStepsPanelProps) {
  const [now, setNow] = useState(() => Date.now());
  const [openedAt, setOpenedAt] = useState<number | null>(null);

  useEffect(() => {
    if (sectionOpen && openedAt === null) {
      setOpenedAt(Date.now());
    }
  }, [sectionOpen, openedAt]);

  const unlockAnchor = showTracker ? startedAt : openedAt ? new Date(openedAt).toISOString() : null;
  const remaining =
    status === "completed"
      ? 0
      : unlockAnchor
        ? secondsUntilUnlock(unlockAnchor, now)
        : showTracker
          ? UNLOCK_DELAY_SECONDS
          : sectionOpen && openedAt
            ? Math.max(0, UNLOCK_DELAY_SECONDS - Math.floor((now - openedAt) / 1000))
            : UNLOCK_DELAY_SECONDS;

  const commandsUnlocked =
    status === "completed" ||
    (unlockAnchor !== null && secondsUntilUnlock(unlockAnchor, now) === 0);

  useEffect(() => {
    if (commandsUnlocked) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [commandsUnlocked]);

  const { body: taskBody, success: taskSuccess } = splitLabTask(labTask);
  const numberedItems = parseNumberedTaskItems(taskBody);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-indigo-200/80 bg-indigo-50/80 p-5">
        <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-indigo-800">
          <ListTodo className="size-4" />
          Task
        </div>
        {numberedItems ? (
          <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-[15px] leading-relaxed text-slate-800 marker:font-semibold marker:text-indigo-800">
            {numberedItems.map((item, index) => (
              <li key={index} className="pl-1">
                {item}
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-3 text-[15px] leading-relaxed text-slate-800">{taskBody}</p>
        )}
        {taskSuccess ? (
          <p className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-[14px] leading-relaxed text-emerald-950">
            <span className="font-bold">Done when:</span> {taskSuccess}
          </p>
        ) : null}
      </section>

      {hints.length > 0 ? (
        <section className="rounded-2xl border border-amber-300/70 bg-amber-50/90 p-5">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-amber-950">
            <Lightbulb className="size-4 text-amber-600" />
            Hints
          </div>
          <ul className="mt-3 list-inside list-disc space-y-2 pl-1">
            {hints.map((hint) => (
              <li key={hint} className="text-[14px] leading-relaxed text-amber-950/90">
                {hint}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {!commandsUnlocked ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/80 px-5 py-6 text-center">
          <Lock className="mx-auto size-8 text-slate-400" />
          <p className="mt-3 text-[15px] font-semibold text-slate-800">Commands locked</p>
          <p className="mt-1 text-[14px] text-slate-600">
            {showTracker && status === "not_started"
              ? "Press Play to start the lab timer — commands unlock 1 minute later."
              : showTracker && status === "in_progress" && startedAt
                ? (
                    <>
                      Try the task first. Commands unlock in{" "}
                      <span className="font-mono font-bold text-indigo-700">
                        {remaining}s
                      </span>
                      {" "}(elapsed{" "}
                      <LabElapsedTimer startedAt={startedAt} />)
                    </>
                  )
                : sectionOpen
                  ? `Explore the task and hints. Commands unlock in ${remaining}s.`
                  : "Expand this section to begin the 1-minute countdown."}
          </p>
          {(status === "in_progress" && startedAt) || (sectionOpen && openedAt && !commandsUnlocked) ? (
            <div className="mx-auto mt-4 h-2 max-w-xs overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-1000"
                style={{
                  width: `${Math.min(100, ((UNLOCK_DELAY_SECONDS - remaining) / UNLOCK_DELAY_SECONDS) * 100)}%`,
                }}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-700">
            <Terminal className="size-4 text-indigo-600" />
            Commands
            {status === "completed" ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Unlocked
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-800">
                <Clock className="size-3" />
                Ready
              </span>
            )}
          </div>
          {steps.map((step) => {
            const { action, expect } = splitStepTask(step.task);
            return (
            <div
              key={step.label}
              className="space-y-3 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm"
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-700">
                  Step · {step.label}
                </p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">Task:</span> {action}
                </p>
                {expect ? (
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                    <span className="font-semibold text-emerald-800">Expect:</span> {expect}
                  </p>
                ) : null}
              </div>
              <CommandBlock command={step.command} />
            </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export function LabStepsDetails({
  labTask,
  hints,
  steps,
  status,
  startedAt,
  showTracker,
  defaultOpen,
  isActive,
  accentClass,
  folder,
  stepCount,
}: {
  labTask: string;
  hints: readonly string[];
  steps: readonly LabStep[];
  status: LabProgressStatus;
  startedAt: string | null;
  showTracker: boolean;
  defaultOpen: boolean;
  isActive: boolean;
  accentClass: string;
  folder: string;
  stepCount: number;
}) {
  const [open, setOpen] = useState(defaultOpen || isActive);

  return (
    <details
      className="group"
      open={open}
      onToggle={(event) => setOpen((event.currentTarget as HTMLDetailsElement).open)}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between gap-3 border-b border-slate-200/80 bg-white px-6 py-3 text-[14px] font-medium text-slate-700 marker:content-none [&::-webkit-details-marker]:hidden"
        )}
      >
        <span className={accentClass}>
          {stepCount} step{stepCount === 1 ? "" : "s"} · Task + Hints · {folder}/
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="bg-slate-50/40 px-6 py-6">
        <LabStepsPanel
          labTask={labTask}
          hints={hints}
          steps={steps}
          status={status}
          startedAt={startedAt}
          showTracker={showTracker}
          sectionOpen={open}
        />
      </div>
    </details>
  );
}
