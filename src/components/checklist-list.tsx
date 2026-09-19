"use client";

import { groupHeading, itemsForPathway, type ChecklistItem } from "@/lib/checklists";
import type { Pathway } from "@/lib/types";

export function ChecklistList({
  pathway,
  progress,
  onToggle,
  readOnly = false,
}: {
  pathway: Pathway;
  progress: Record<string, boolean>;
  onToggle?: (key: string, done: boolean) => void;
  readOnly?: boolean;
}) {
  const items = itemsForPathway(pathway);
  const groups = ["common", "automatic", "assessed"] as const;
  const visible = groups
    .map((group) => ({ group, items: items.filter((item) => item.group === group) }))
    .filter((entry) => entry.items.length > 0);

  return (
    <div className="space-y-8">
      {visible.map((entry) => (
        <section key={entry.group} aria-labelledby={`group-${entry.group}`}>
          <h2 id={`group-${entry.group}`} className="font-heading text-xl text-foreground">
            {groupHeading(entry.group)}
          </h2>
          <ul className="mt-4 space-y-3">
            {entry.items.map((item) => (
              <ChecklistRow
                key={item.key}
                item={item}
                checked={Boolean(progress[item.key])}
                readOnly={readOnly}
                onToggle={onToggle}
              />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function ChecklistRow({
  item,
  checked,
  readOnly,
  onToggle,
}: {
  item: ChecklistItem;
  checked: boolean;
  readOnly: boolean;
  onToggle?: (key: string, done: boolean) => void;
}) {
  const id = `item-${item.key}`;
  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="flex gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={readOnly}
          className="mt-1 size-6 shrink-0 accent-primary"
          onChange={(event) => onToggle?.(item.key, event.target.checked)}
          aria-describedby={`${id}-help`}
        />
        <div className="min-w-0">
          <label htmlFor={id} className="text-base font-medium leading-snug">
            {item.title}
          </label>
          <p id={`${id}-help`} className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {item.body}
          </p>
        </div>
      </div>
    </li>
  );
}
