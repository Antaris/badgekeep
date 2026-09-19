import type { ReactNode } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { SkipLink } from "./skip-link";
import { TrustBanner } from "./trust-banner";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <SkipLink />
      <TrustBanner />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
