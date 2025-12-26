import TypeBadge from "@/Pages/home/components/TypeBadge";
import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Evolution = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

type EvolutionLineProps = {
  evolutions: Evolution[];
};

const EvolutionLine = ({ evolutions }: EvolutionLineProps) => {
  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  if (!evolutions || evolutions.length === 0) {
    return <div>This Pokémon does not evolve.</div>;
  }

  return (
    <div className="flex flex-col mt-8 gap-4">
      <div className="flex items-center justify-center gap-16">
        {evolutions.map((p, index) => (
          <div key={p.id} className="flex items-center gap-4">
            {/* Pokémon info (wrapped in Link) */}
            <Link
              to={`/pokemon/${p.id}`}
              className="flex flex-col items-center hover:scale-105 transition-transform"
              style={{ width: "130px", height: "200px" }}
            >
              {/* Circle wrapper */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center shadow-xl hover:rotate-3 hover:scale-105 transition-transform duration-300">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-28 h-28 object-contain"
                />
              </div>

              {/* Name + ID */}
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold">{capitalize(p.name)}</span>
                <span className="text-gray-600">#{p.id}</span>
              </div>

              <div className="flex gap-2 mt-2 justify-center">
                {(p.types || []).map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </Link>

            {/* Arrow between Pokémon */}
            {index < evolutions.length - 1 && (
              <MoveRightIcon className="ml-6 w-6 h-6 text-gray-500" />
            )}
          </div>
        ))}
      </div>

      {evolutions.length === 1 && (
        <div className="text-center mt-2">This Pokémon does not evolve.</div>
      )}
    </div>
  );
};

export default EvolutionLine;
