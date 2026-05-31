import "./global.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { appName } from "@/lib/shared";
import { source } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: `${appName} Documentation`,
    template: `${appName} - %s`,
  },
  description: `${appName} documentation and API reference.`,
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className="relative bg-sidebar font-sans text-foreground antialiased"
        suppressHydrationWarning
      >
        <RootProvider
          dir="ltr"
          search={{
            links: [
              ["Quickstart", "/quickstart"],
              ["SDK concepts", "/concepts"],
              ["FAQ", "/faq"],
            ],
            options: {
              api: "/api/search",
            },
            preload: true,
          }}
          theme={{
            attribute: "class",
            defaultTheme: "system",
            disableTransitionOnChange: true,
            enableSystem: true,
            storageKey: "honch-docs-theme",
          }}
        >
          <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
            {/* Decorative border lines */}
            <div
              aria-hidden="true"
              className="container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:-left-3 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:-right-3 after:w-px after:bg-border/64"
            />
            {/* Decorative diamond markers at header border */}
            <div
              aria-hidden="true"
              className="container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:-left-[11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:-right-[11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5 dark:after:bg-clip-border dark:before:bg-clip-border"
            />
            <SiteHeader tree={source.getPageTree()} />
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
