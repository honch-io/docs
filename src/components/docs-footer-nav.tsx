import type { Node, Root } from "fumadocs-core/page-tree";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type TreePage = Extract<Node, { type: "page" }>;

function collectPages(nodes: Node[], pages: TreePage[]) {
  for (const node of nodes) {
    if (node.type === "folder") {
      if (node.index) {
        pages.push(node.index);
      }
      collectPages(node.children, pages);
      continue;
    }

    if (node.type === "page" && !node.external) {
      pages.push(node);
    }
  }
}

function getFooterItems(tree: Root, url: string) {
  const pages: TreePage[] = [];
  collectPages(tree.children, pages);

  const index = pages.findIndex((page) => page.url === url);
  if (index === -1) {
    return {};
  }

  return {
    previous: pages[index - 1],
    next: pages[index + 1],
  };
}

function FooterLink({
  item,
  direction,
}: {
  item: TreePage;
  direction: "previous" | "next";
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <Link
      className={cn(
        "flex min-w-0 flex-col gap-1.5 rounded-lg border border-input bg-popover p-4 text-sm shadow-xs/5 transition-colors hover:bg-accent/50",
        direction === "next" && "items-end text-end",
      )}
      href={item.url}
    >
      <span
        className={cn(
          "inline-flex min-w-0 items-center gap-1.5 font-medium",
          direction === "next" && "flex-row-reverse",
        )}
      >
        <Icon aria-hidden="true" className="size-4 shrink-0" />
        <span className="truncate">{item.name}</span>
      </span>
      <span className="max-w-full truncate text-muted-foreground">
        {item.description ??
          (direction === "previous" ? "Previous page" : "Next page")}
      </span>
    </Link>
  );
}

export function DocsFooterNav({ tree, url }: { tree: Root; url: string }) {
  const { previous, next } = getFooterItems(tree, url);

  if (!previous && !next) {
    return null;
  }

  return (
    <nav
      aria-label="Page navigation"
      className="grid gap-3 border-t pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <FooterLink direction="previous" item={previous} />
      ) : (
        <div aria-hidden="true" />
      )}
      {next ? <FooterLink direction="next" item={next} /> : null}
    </nav>
  );
}
