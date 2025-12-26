const PokedexEntrySkeleton = () => {
  return (
    <>
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="aspect-[3/2] bg-zinc-800 rounded-lg animate-pulse"
        />
      ))}
    </>
  );
};

export default PokedexEntrySkeleton;
