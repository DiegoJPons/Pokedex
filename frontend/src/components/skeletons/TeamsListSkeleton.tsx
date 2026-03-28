const TeamsListSkeleton = () => {
  return Array.from({ length: 7 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
      <div className="size-12 shrink-0 animate-pulse rounded-lg bg-white/10" />
      <div className="hidden min-w-0 flex-1 space-y-2 md:block">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/10" />
      </div>
    </div>
  ));
};

export default TeamsListSkeleton;
