"use client";

import { useSearchContext } from "fumadocs-ui/contexts/search";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

export function SearchToggle() {
  const { setOpenSearch } = useSearchContext();
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes("MAC"));
  }, []);

  return (
    <button
      className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-lg border border-input bg-popover px-2.5 text-muted-foreground shadow-xs/5 transition-colors hover:bg-accent/50"
      onClick={() => setOpenSearch(true)}
      type="button"
    >
      <SearchIcon className="size-4 shrink-0" />
      <KbdGroup className="hidden gap-1 sm:inline-flex">
        <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
        <Kbd className="aspect-square">K</Kbd>
      </KbdGroup>
    </button>
  );
}
