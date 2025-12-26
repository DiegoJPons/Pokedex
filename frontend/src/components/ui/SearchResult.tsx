import Type from "@/Pages/home/components/TypeBadge";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }: { result: any }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pokemon/${result.id}`)}
      className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
    >
      <img
        src={result.imageUrl}
        alt={result.name}
        className="w-10 h-10 object-contain mr-2"
      />
      <div className="flex flex-col">
        <span className="font-semibold capitalize">{result.name}</span>
        <div className="flex gap-1 mt-1">
          {result.types.map((type: string) => (
            <Type key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
