import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { PageShell } from "@/components/page-shell";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BadgeKeep — Blue Badge renewal pack",
    template: "%s · BadgeKeep",
  },
  description:
    "An independent Blue Badge renewal pack for holders and carers: England checklists, photo guide, 12-week timeline, and a carer share link. Not GOV.UK. Not your council.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${sourceSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
