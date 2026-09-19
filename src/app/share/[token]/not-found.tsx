import { ActionLink } from "@/components/ui/action";

export default function ShareNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl">This share link is not valid</h1>
      <p className="mt-3 text-foreground/80">
        The token may have been copied only in part, or the short code was created
        on another computer. Ask the holder to generate the link again.
      </p>
      <div className="mt-6">
        <ActionLink href="/">Back to BadgeKeep</ActionLink>
      </div>
    </div>
  );
}
