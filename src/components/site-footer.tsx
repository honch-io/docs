import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex items-center justify-between gap-4">
      <Link className="font-heading text-xl font-semibold" href="/">
        honch<span className="text-muted-foreground">.</span>
      </Link>
      <p className="text-muted-foreground text-sm">
        Product analytics for consumer hardware.
      </p>
    </footer>
  );
}
