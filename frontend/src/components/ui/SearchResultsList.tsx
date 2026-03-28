import SearchResult from "./SearchResult.tsx";

const SearchResults = ({ results }: { results: any }) => {
  if (!results.length) return null;
  return (
    <div className="mt-2 max-h-[min(320px,50vh)] w-full overflow-y-auto rounded-2xl border border-primary/30 bg-popover/95 py-1 shadow-[0_0_40px_-12px_hsl(var(--primary)/0.35),0_25px_50px_-12px_rgb(0_0_0/0.4)] backdrop-blur-xl">
      {results.map((result: any, id: number) => {
        return <SearchResult key={result.id ?? id} result={result} />;
      })}
      <div className="px-3 py-2 text-center text-xs text-muted-foreground">
        End of results
      </div>
    </div>
  );
};

export default SearchResults;
