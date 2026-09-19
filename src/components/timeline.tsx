import { buildTimeline } from "@/lib/timeline";
import { formatShortDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function Timeline({ expiryDate }: { expiryDate: string }) {
  const points = buildTimeline(expiryDate);

  return (
    <ol className="space-y-3">
      {points.map((point) => (
        <li
          key={point.id}
          className={cn(
            "rounded-xl border p-4",
            point.status === "current" && "border-primary bg-primary/6",
            point.status === "passed" && "border-border bg-muted/50",
            point.status === "upcoming" && "border-border bg-card",
          )}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-medium text-foreground">{point.label}</p>
            <p className="text-sm text-muted-foreground">{formatShortDate(point.date)}</p>
          </div>
          <p className="mt-1 text-sm text-foreground/80">{point.hint}</p>
          <p className="mt-2 text-xs font-medium tracking-wide uppercase">
            <span className="sr-only">Status: </span>
            {point.status === "current"
              ? "Current window"
              : point.status === "passed"
                ? "This date has passed"
                : "Upcoming"}
          </p>
        </li>
      ))}
    </ol>
  );
}
