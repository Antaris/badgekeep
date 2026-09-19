import { ActionLink } from "@/components/ui/action";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl">Page not found</h1>
      <p className="mt-3 text-foreground/80">
        That address is not part of this BadgeKeep prototype.
      </p>
      <div className="mt-6">
        <ActionLink href="/">Back home</ActionLink>
      </div>
    </div>
  );
}
