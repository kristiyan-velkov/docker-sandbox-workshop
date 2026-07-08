"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CommandBlockProps = {
  command: string;
  label?: string;
  showCopy?: boolean;
};

export function CommandBlock({ command, label, showCopy = true }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-2">
      {label ? (
        <Badge variant="secondary" className="font-mono text-[10px] uppercase tracking-wider">
          {label}
        </Badge>
      ) : null}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-[#0d1117] shadow-sm">
        {showCopy ? (
          <div className="flex items-center justify-end border-b border-slate-800/80 px-3 py-2">
            <button
              type="button"
              onClick={copyCommand}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors",
                copied
                  ? "bg-emerald-950/60 text-emerald-300"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )}
              aria-label={copied ? "Command copied" : "Copy command"}
            >
              {copied ? (
                <>
                  <Check className="size-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>
        ) : null}
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[#e6edf3]">
          <code>{command}</code>
        </pre>
      </div>
    </div>
  );
}
