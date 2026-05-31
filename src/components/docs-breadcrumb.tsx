import { getBreadcrumbItems } from "fumadocs-core/breadcrumb";
import type { Root } from "fumadocs-core/page-tree";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function DocsBreadcrumb({ tree, url }: { tree: Root; url: string }) {
  const items = getBreadcrumbItems(url, tree, {
    includeRoot: { url: "/" },
    includePage: false,
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex min-w-0 items-center gap-1.5 text-muted-foreground text-sm"
    >
      {items.map((item, index) => (
        <span className="contents" key={item.url ?? String(item.name)}>
          {index > 0 && (
            <ChevronRight aria-hidden="true" className="size-3.5 shrink-0" />
          )}
          {item.url ? (
            <Link
              className="truncate transition-colors hover:text-foreground"
              href={item.url}
            >
              {item.name}
            </Link>
          ) : (
            <span className="truncate">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
