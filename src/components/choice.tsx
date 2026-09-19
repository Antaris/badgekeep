import type { ReactNode } from "react";

export function Choice({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-border bg-card px-3 py-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="mt-1 size-5 shrink-0 accent-primary"
      />
      <span className="text-base leading-snug">{children}</span>
    </label>
  );
}
