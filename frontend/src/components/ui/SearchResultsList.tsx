import SearchResult from "./SearchResult.tsx";

const SearchResults = ({ results }: { results: any }) => {
  if (!results.length) return null;
  return (
    <div className="w-full bg-white flex flex-col shadow-[0_0_8px_#ddd] rounded-md mt-1 max-h-[300px] overflow-y-scroll">
      {results.map((result: any, id: number) => {
        return <SearchResult key={id} result={result} />;
      })}
      <span className="p-2 text-sm text-gray-400">No more results</span>
    </div>
  );
};

export default SearchResults;
