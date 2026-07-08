import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-indigo-100 text-indigo-800",
        primary: "bg-indigo-600 text-white",
        success: "border border-emerald-500/40 bg-emerald-600 text-white",
        secondary: "bg-slate-100 text-slate-800",
        destructive: "bg-red-100 text-red-700",
        outline: "border border-slate-200 bg-white text-slate-600",
      },
      size: {
        sm: "h-5 gap-1 px-2 text-[10px]",
        default: "h-6 gap-1.5 px-2.5 text-xs",
        lg: "h-7 gap-1.5 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export { Badge, badgeVariants };
