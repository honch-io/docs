"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { Root, Node } from "fumadocs-core/page-tree";

function RenderNodes({
  items,
  pathname,
}: {
  items: Node[];
  pathname: string;
}) {
  return (
    <SidebarMenu className="gap-0.5">
      {items.map((item) => {
        if (item.type === "page") {
          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                className="ps-3.5 hover:bg-transparent active:bg-transparent"
                isActive={item.url === pathname}
                render={<Link href={item.url} />}
              >
                {item.name}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }
        if (item.type === "folder") {
          return (
            <SidebarMenuItem key={item.$id}>
              <RenderNodes items={item.children} pathname={pathname} />
            </SidebarMenuItem>
          );
        }
        return null;
      })}
    </SidebarMenu>
  );
}

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: Root }) {
  const pathname = usePathname();

  // Group children by separator. Each separator starts a new section.
  // Pages/folders before the first separator go into an untitled group.
  const sections: { label: string | null; items: Node[] }[] = [];
  let current: { label: string | null; items: Node[] } = { label: null, items: [] };

  for (const item of tree.children) {
    if (item.type === "separator") {
      if (current.items.length > 0 || current.label) {
        sections.push(current);
      }
      current = { label: item.name, items: [] };
    } else {
      current.items.push(item);
    }
  }
  if (current.items.length > 0 || current.label) {
    sections.push(current);
  }

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="px-4 py-2">
        <div className="h-(--top-spacing) shrink-0" />
        {sections.map((section, i) => (
          <SidebarGroup className="gap-1" key={section.label ?? i}>
            {section.label && (
              <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <RenderNodes items={section.items} pathname={pathname} />
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
