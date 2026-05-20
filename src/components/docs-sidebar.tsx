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
import type { Root, Folder, Item, Node } from "fumadocs-core/page-tree";

function RenderPages({
  items,
  pathname,
}: {
  items: Node[];
  pathname: string;
}) {
  const pages = items.filter((item): item is Item => item.type === "page");
  if (pages.length === 0) return null;

  return (
    <SidebarMenu className="gap-0.5">
      {pages.map((page) => (
        <SidebarMenuItem key={page.url}>
          <SidebarMenuButton
            className="ps-3.5 hover:bg-transparent active:bg-transparent"
            isActive={page.url === pathname}
            render={<Link href={page.url} />}
          >
            {page.name}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function DocsSidebar({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & { tree: Root }) {
  const pathname = usePathname();

  // Check if tree has folders or is flat
  const hasFolders = tree.children.some((item) => item.type === "folder");

  return (
    <Sidebar
      className="sticky top-(--header-height) z-30 hidden h-[calc(100svh-var(--header-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="px-4 py-2">
        <div className="h-(--top-spacing) shrink-0" />
        {hasFolders ? (
          // Render folders with nested pages (COSS-style)
          tree.children.map((item) => (
            <SidebarGroup className="gap-1" key={item.$id}>
              {item.type === "folder" && (
                <>
                  <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
                    {item.name}
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <RenderPages items={item.children} pathname={pathname} />
                  </SidebarGroupContent>
                </>
              )}
              {item.type === "page" && (
                <SidebarGroupContent>
                  <SidebarMenu className="gap-0.5">
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        className="ps-3.5 hover:bg-transparent active:bg-transparent"
                        isActive={item.url === pathname}
                        render={<Link href={item.url} />}
                      >
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          ))
        ) : (
          // Flat page list - all pages at root level
          <SidebarGroup className="gap-1">
            <SidebarGroupLabel className="h-7 px-0 text-sidebar-accent-foreground">
              Documentation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {tree.children.map((item) =>
                  item.type === "page" ? (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        className="ps-3.5 hover:bg-transparent active:bg-transparent"
                        isActive={item.url === pathname}
                        render={<Link href={item.url} />}
                      >
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : null,
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
