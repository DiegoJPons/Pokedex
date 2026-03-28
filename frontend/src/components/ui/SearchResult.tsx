import Type from "@/Pages/home/components/TypeBadge";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }: { result: any }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/pokemon/${result.id}`)}
      className="flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-left transition last:border-b-0 hover:bg-white/[0.06]"
    >
      <img
        src={result.imageUrl}
        alt=""
        className="size-11 shrink-0 rounded-xl bg-white/10 object-contain p-0.5"
      />
      <div className="min-w-0 flex-1">
        <span className="block truncate font-semibold capitalize text-foreground">
          {result.name}
        </span>
        <div className="mt-1 flex flex-wrap gap-1">
          {result.types.map((type: string) => (
            <Type key={type} type={type} />
          ))}
        </div>
      </div>
    </button>
  );
};

export default SearchResult;
