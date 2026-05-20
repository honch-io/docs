"use client";

import { SearchIcon } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";

export function SearchToggle() {
  const { setOpenSearch } = useSearchContext();

  return (
    <button
      className="inline-flex h-8 w-full items-center gap-2 rounded-lg border border-input bg-popover px-3 text-sm text-muted-foreground shadow-xs/5 transition-colors hover:bg-accent/50 sm:w-56"
      onClick={() => setOpenSearch(true)}
      type="button"
    >
      <SearchIcon className="size-3.5 shrink-0" />
      <span className="flex-1 text-left text-xs">Search documentation...</span>
      <kbd className="pointer-events-none hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
