import Link from "next/link";
import { ModeSwitcher } from "@/components/mode-switcher";
import { GitHubLink } from "@/components/github-link";
import { SearchToggle } from "@/components/search-toggle";
import { MobileNav } from "@/components/mobile-nav";
import type { Root } from "fumadocs-core/page-tree";

export function SiteHeader({ tree }: { tree?: Root }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-sidebar/80 backdrop-blur-sm before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border/64">
      <div className="container relative flex h-(--header-height) w-full items-center justify-between gap-2 px-4 sm:px-6">
        <div className="-mt-0.5 flex shrink-0 items-center gap-1.5">
          {tree && <MobileNav tree={tree} />}
          <Link aria-label="Home" href="/" className="font-heading text-3xl font-semibold">
            honch<span className="text-muted-foreground"> docs</span>
          </Link>
        </div>
        <div className="ms-auto flex items-center gap-2">
          <SearchToggle />
          <GitHubLink />
          <ModeSwitcher />
        </div>
      </div>
    </header>
  );
}
