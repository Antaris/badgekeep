export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="5" width="26" height="22" rx="6" fill="currentColor" opacity="0.12" />
      <path
        d="M8 12.5h16M8 17h10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="22.5" cy="20.5" r="4.2" fill="currentColor" />
      <path
        d="M21.1 20.5l.9.9 1.9-2"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <LogoMark className="size-8 text-primary" />
      <span className="font-heading text-xl tracking-tight">BadgeKeep</span>
    </span>
  );
}
