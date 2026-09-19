import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PackFrame } from "@/components/pack-frame";

export const metadata: Metadata = {
  title: "Renewal pack",
};

export default function PackLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  return <PackFrame params={params}>{children}</PackFrame>;
}
