import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { source, getPageMarkdownUrl } from "@/lib/source";
import { getMDXComponents } from "@/components/mdx";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { Card, CardFrame, CardPanel } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DocsTableOfContents } from "@/components/docs-toc";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const doc = page.data;
  const MDX = doc.body;

  return (
    <div className="flex items-stretch xl:w-full" data-slot="docs">
      <div className="relative flex w-full min-w-0 flex-1 flex-col lg:mt-8 lg:mr-4 lg:mb-8">
        <CardFrame className="border-sidebar-border shadow-lg/5 max-lg:border-none dark:bg-background">
          <Card className="max-lg:rounded-none! dark:bg-background max-lg:[clip-path:none]!">
            <CardPanel className="px-4 py-6 sm:px-6 lg:p-8">
              <div className="mx-auto w-full max-w-3xl">
                <div className="flex min-w-0 flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h1 className="scroll-m-20 font-heading font-semibold text-3xl xl:text-4xl">
                      {doc.title}
                    </h1>
                    {doc.description && (
                      <p className="text-muted-foreground sm:text-lg">
                        {doc.description}
                      </p>
                    )}
                    <div className="flex flex-row gap-2 items-center border-b pb-6 mt-2">
                      <MarkdownCopyButton markdownUrl={getPageMarkdownUrl(page).url} />
                      <ViewOptionsPopover
                        markdownUrl={getPageMarkdownUrl(page).url}
                      />
                    </div>
                  </div>
                  <div className="w-full flex-1 prose prose-neutral dark:prose-invert max-w-none">
                    <MDX
                      components={getMDXComponents({
                        a: createRelativeLink(source, page),
                      })}
                    />
                  </div>
                </div>
              </div>
            </CardPanel>
          </Card>
          <div className="px-4 py-6 lg:rounded-b-2xl lg:px-8">
            <SiteFooter />
          </div>
        </CardFrame>
      </div>
      <div className="sticky top-(--header-height) z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-72 flex-col overflow-hidden overscroll-none xl:flex">
        <ScrollArea
          className="**:data-[slot=scroll-area-scrollbar]:hidden"
          scrollFade
        >
          <div className="flex min-h-0 flex-col gap-2 py-2">
            <div className="h-(--top-spacing) shrink-0" />
            {doc.toc?.length ? <DocsTableOfContents toc={doc.toc} /> : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
