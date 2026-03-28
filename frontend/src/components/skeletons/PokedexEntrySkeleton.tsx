const PokedexEntrySkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="p-1">
          <div className="aspect-[4/5] animate-pulse rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />
        </div>
      ))}
    </>
  );
};

export default PokedexEntrySkeleton;
