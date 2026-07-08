import { CommandBlock } from "@/components/command-block";
import { DocLink } from "@/components/doc-link";
import { HomeHero } from "@/components/home-hero";
import { LinkButton } from "@/components/link-button";
import { PageShell, SectionTitle } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { sandboxDocs } from "@/lib/learning-data";
import { isolationLayers } from "@/lib/workshop-data";
import { FolderGit } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <PageShell hero={<HomeHero />}>
        <section className="mt-4">
          <SectionTitle
            eyebrow="Quick start"
            title="Install, authenticate, launch"
            description="Three commands to your first sandbox."
          />
          <CommandBlock command="brew trust docker/tap && brew install docker/tap/sbx && sbx login && sbx run claude ." />
          <p className="mt-4 text-sm text-slate-500">
            <DocLink href={sandboxDocs.getStarted}>Get started guide</DocLink>
            {" · "}
            <DocLink href={sandboxDocs.home}>Docker Sandboxes docs</DocLink>
          </p>
        </section>

        <section className="mt-20">
          <SectionTitle
            eyebrow="Security"
            title="Isolation at a glance"
            description="Why sbx keeps your host safe while agents go full YOLO."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {isolationLayers.map((layer) => (
              <div
                key={layer.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h3 className="font-bold text-slate-900">{layer.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{layer.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton variant="outline" href="https://github.com/kristiyan-velkov/docker-sandbox-workshop" target="_blank" rel="noreferrer">
              <FolderGit className="size-4" />
              GitHub repo
            </LinkButton>
          </div>
        </section>
      </PageShell>
      <SiteFooter />
    </>
  );
}
