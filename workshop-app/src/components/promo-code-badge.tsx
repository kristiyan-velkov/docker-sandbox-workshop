"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type PromoCodeBadgeProps = {
  code: string;
  discount: string;
};

export function PromoCodeBadge({ code, discount }: PromoCodeBadgeProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[13px] font-semibold uppercase tracking-wide text-indigo-700">
          Workshop offer · {discount} off
        </p>
        <p className="mt-1 font-mono text-[28px] font-semibold tracking-wider text-foreground">
          {code}
        </p>
        <p className="mt-2 text-[14px] text-muted-foreground">
          Use at checkout on kristiyanvelkov.com
        </p>
      </div>
      <Button type="button" variant="secondary" onClick={copyCode} className="shrink-0">
        {copied ? (
          <>
            <Check className="size-4" />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-4" />
            Copy code
          </>
        )}
      </Button>
    </div>
  );
}
