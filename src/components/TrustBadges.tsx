type TrustBadgesProps = {
  badges: string[];
};

export function TrustBadges({badges}: TrustBadgesProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {badges.map((badge) => (
        <div
          key={badge}
          className="rounded-2xl border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-ink)]"
        >
          {badge}
        </div>
      ))}
    </div>
  );
}
