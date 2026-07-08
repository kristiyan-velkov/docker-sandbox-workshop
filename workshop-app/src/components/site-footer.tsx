import { Container, ExternalLink, FolderGit } from "lucide-react";
import Link from "next/link";
import { author } from "@/lib/author-data";
import { sandboxDocs } from "@/lib/learning-data";
import { platformUrl } from "@/lib/site-config";
import { workshop } from "@/lib/workshop-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-600 shadow-md shadow-indigo-200">
                <Container className="size-5 text-white" />
              </div>
              <div>
                <p className="text-base font-bold text-slate-900">
                  Docker Sandbox Workshop
                </p>
                <p className="text-sm text-slate-400">
                  Hands-on Docker Sandboxes workshop
                </p>
              </div>
            </div>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-500">
              Run AI coding agents safely in isolated microVMs with the sbx CLI.
              Labs, registration, and progress live on the hosted platform.
            </p>
            <div className="flex flex-wrap gap-2">
              <FooterLink href={platformUrl("/labs")} external>
                Labs
              </FooterLink>
              <FooterLink href={platformUrl()} external>
                Platform
              </FooterLink>
              <FooterLink href={workshop.githubRepoUrl} external>
                <FolderGit className="size-3.5" />
                GitHub
              </FooterLink>
              <FooterLink href={sandboxDocs.home} external>
                <ExternalLink className="size-3.5" />
                Docker docs
              </FooterLink>
            </div>
          </div>

          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-slate-400">
              About the author
            </p>
            <p className="text-base font-bold text-slate-900">{author.name}</p>
            <p className="mt-1 text-sm text-slate-500">{author.title}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Docker Captain, Cursor Ambassador, and DevRel at Zerops.
              workshops, books, and production-ready developer tooling.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <FooterLink href={author.profileUrl} external>
                BulgariTech profile
              </FooterLink>
              <FooterLink href="/about">About page</FooterLink>
              <FooterLink href={author.booksUrl} external>
                Books · {author.promoCode}
              </FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Kristiyan Velkov · Docker Sandbox
            Workshop
          </p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 no-underline shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
