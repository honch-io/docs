"use client";

import type { Root } from "fumadocs-core/page-tree";
import { MenuIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { SidebarNav } from "@/components/docs-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetPopup, SheetTrigger } from "@/components/ui/sheet";
import {
  SidebarContext,
  type SidebarContextProps,
} from "@/components/ui/sidebar";

export function MobileNav({ tree }: { tree: Root }) {
  const [open, setOpen] = useState(false);

  const sidebarContext = useMemo<SidebarContextProps>(
    () => ({
      state: "expanded",
      open: true,
      setOpen: () => {},
      openMobile: false,
      setOpenMobile: () => {},
      isMobile: true,
      toggleSidebar: () => {},
    }),
    [],
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button size="icon-sm" variant="ghost" className="lg:hidden" />}
      >
        <MenuIcon />
        <span className="sr-only">Menu</span>
      </SheetTrigger>
      <SheetPopup side="left" showCloseButton={false}>
        <SidebarContext.Provider value={sidebarContext}>
          <div className="flex flex-col gap-2 px-4 py-4">
            <SidebarNav tree={tree} onNavigate={() => setOpen(false)} />
          </div>
        </SidebarContext.Provider>
      </SheetPopup>
    </Sheet>
  );
}
