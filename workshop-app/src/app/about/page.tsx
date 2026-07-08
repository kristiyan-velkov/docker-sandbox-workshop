import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { LinkButton } from "@/components/link-button";
import { PromoCodeBadge } from "@/components/promo-code-badge";
import { PageHero, PageShell, SectionTitle } from "@/components/page-shell";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { author } from "@/lib/author-data";

export const metadata = {
  title: "About the author",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <PageShell
        hero={
          <PageHero
            eyebrow={<Badge variant="secondary">Workshop host</Badge>}
            title="About the author"
            description="Kristiyan Velkov — Docker Captain, Cursor Ambassador, DevRel at Zerops."
            actions={
              <>
                <LinkButton
                  href={author.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="size-4" />
                  bulgaritech.com/me
                </LinkButton>
                <LinkButton
                  href={author.zeropsUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  Zerops
                  <ExternalLink className="size-4" />
                </LinkButton>
              </>
            }
          />
        }
      >
        <section className="grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/60">
              <Image
                src={author.photo}
                alt={author.name}
                width={280}
                height={350}
                className="aspect-[4/5] w-full max-w-[280px] object-cover object-top"
                priority
              />
            </div>
            <a
              href="https://www.bulgaritech.com"
              target="_blank"
              rel="noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={author.logo} alt="BulgariTech" className="h-8 w-auto" />
            </a>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {author.name}
              </h2>
              <p className="mt-3 text-base font-medium leading-relaxed text-indigo-600">
                {author.title}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-500">
                {author.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {author.highlights.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <LinkButton
                href={author.profileUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                BulgariTech profile
                <ExternalLink className="size-4" />
              </LinkButton>
              <LinkButton
                href={author.zeropsUrl}
                target="_blank"
                rel="noreferrer"
                variant="outline"
              >
                DevRel at Zerops
                <ExternalLink className="size-4" />
              </LinkButton>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <SectionTitle
            eyebrow="Published author"
            title="Books"
            description="Practical guides on React, Docker, TypeScript, and technical interviews."
          />
          <PromoCodeBadge
            code={author.promoCode}
            discount={author.promoDiscount}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {author.books.map((book) => (
              <Card
                key={book.title}
                className="overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative aspect-[3/4] w-full shrink-0 bg-slate-100 sm:w-36">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 144px"
                    />
                  </div>
                  <CardHeader className="flex flex-col justify-center p-5">
                    <CardTitle className="text-base leading-snug">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm leading-relaxed">
                      {book.description}
                    </CardDescription>
                  </CardHeader>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <LinkButton
              href={author.booksUrl}
              target="_blank"
              rel="noreferrer"
              size="lg"
            >
              Shop books at kristiyanvelkov.com
              <ExternalLink className="size-4" />
            </LinkButton>
            <p className="mt-3 text-sm text-slate-500">
              Use code{" "}
              <span className="font-mono font-semibold text-slate-900">
                {author.promoCode}
              </span>{" "}
              for {author.promoDiscount} off at checkout.
            </p>
          </div>
        </section>
      </PageShell>
      <SiteFooter />
    </>
  );
}
