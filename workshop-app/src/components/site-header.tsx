import { Container, ExternalLink } from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/components/link-button";
import { platformUrl } from "@/lib/site-config";

const localNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-600 shadow-sm">
            <Container className="size-4 text-white" />
          </div>
          <div className="min-w-0 leading-tight">
            <span className="text-sm font-bold text-slate-900">Docker Sandbox</span>
            <span className="hidden text-sm font-bold text-indigo-600 sm:inline"> Workshop</span>
          </div>
        </Link>

        <nav className="ml-auto flex items-center gap-0.5 overflow-x-auto sm:gap-1">
          {localNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-md px-2 py-1.5 text-sm text-slate-600 no-underline transition-colors hover:bg-slate-50 hover:text-slate-900 sm:px-2.5"
            >
              {link.label}
            </Link>
          ))}
          <LinkButton href={platformUrl("/labs")} variant="ghost" size="sm" className="ml-1 h-9 px-2.5">
            Labs
          </LinkButton>
          <LinkButton href={platformUrl()} size="sm" className="ml-0.5 h-9 px-3">
            <ExternalLink className="size-4" />
            <span className="hidden sm:inline">Platform</span>
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
