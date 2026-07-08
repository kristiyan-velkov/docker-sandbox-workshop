import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type DocLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export function DocLink({ href, children, className, showIcon = true }: DocLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-indigo-600 no-underline transition hover:text-indigo-700 hover:underline",
        className
      )}
    >
      {children}
      {showIcon ? <ExternalLink className="size-3.5 shrink-0 opacity-70" /> : null}
    </Link>
  );
}
