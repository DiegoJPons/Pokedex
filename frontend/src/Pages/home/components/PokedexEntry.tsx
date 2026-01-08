import Type from "./TypeBadge";
import { useNavigate } from "react-router-dom";
import { useTeamStore } from "@/stores/useTeamStore";

type PokedexEntryProps = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

const PokedexEntry = ({ id, name, imageUrl, types }: PokedexEntryProps) => {
  const navigate = useNavigate();
  const { editingTeamId, addPokemonToTempList } = useTeamStore();

  const handleAddPokemon = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent card click navigation if needed
    addPokemonToTempList({ id, name, imageUrl, types });
  };

  return (
    <div className="p-2">
      {" "}
      {/* Padding gives space for border to scale */}
      <div
        onClick={() => navigate(`/pokemon/${id}`)}
        className="border-4 border-cyan-400/50 relative p-4 bg-white rounded shadow flex flex-col items-center transition-transform duration-200 ease-out cursor-pointer hover:scale-105 hover:shadow-lg hover:bg-gray-50"
      >
        {/* Number at top-left */}
        <span className="absolute top-2 left-2 text-sm font-bold text-gray-600">
          #{id}
        </span>

        {/* Add to Team button */}
        {editingTeamId && (
          <button
            onClick={handleAddPokemon}
            className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition z-10"
          >
            Add to team
          </button>
        )}

        {/* Image */}
        <img src={imageUrl} alt={name} className="w-24 h-24 object-contain" />

        {/* Name */}
        <div className="mt-2 font-semibold">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>

        {/* Types */}
        <div className="flex gap-2 mt-1">
          {types.map((type) => (
            <Type key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexEntry;
