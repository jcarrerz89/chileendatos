interface BadgeProps {
  label: string;
  color?: string;
}

export function Badge({ label, color = '#2563eb' }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
      style={{
        backgroundColor: `${color}14`,
        color: color,
      }}
    >
      {label}
    </span>
  );
}
