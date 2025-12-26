import { useParams, useNavigate } from "react-router-dom";
import { ArrowBigLeftIcon, ArrowBigRightIcon } from "lucide-react"; // arrow icons
import { type Pokemon, usePokemonStore } from "@/stores/usePokemonStore";
import { useEffect, useState } from "react";
import Type from "../home/components/TypeBadge";
import { MarsIcon, VenusIcon } from "lucide-react";
import EvolutionLine from "./components/EvolutionLine";

const EntryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchPokemon } = usePokemonStore();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    fetchPokemon(Number(id))
      .then((data) => setPokemon(data))
      .catch((err) => {
        console.error("Failed to fetch Pokémon:", err);
        setPokemon(null);
      })
      .finally(() => setIsLoading(false));
  }, [id, fetchPokemon]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const currentId = Number(id);
  const maxPokemonId = 1025; // adjust based on how many Pokémon you support
  const hasPrev = currentId > 1;
  const hasNext = currentId < maxPokemonId;

  return (
    <div className="flex flex-col p-6 gap-8">
      {isLoading ? (
        <div>Loading...</div>
      ) : !pokemon ? (
        <div>Pokémon not found.</div>
      ) : (
        <>
          <div className="flex gap-8">
            {/* Left side */}
            <div className="border-4 border-cyan-400/50 bg bg-blue-100 rounded-lg shadow p-6 flex flex-col items-center gap-4 w-1/3">
              <span className="text-lg text-gray-600">#{pokemon.id}</span>
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
              <h1 className="text-2xl font-bold">{capitalize(pokemon.name)}</h1>
            </div>

            {/* Right side */}
            <div className="border-4 border-cyan-400/50 bg-blue-100 rounded-lg shadow p-6 flex flex-col gap-4 w-2/3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Height:</span>{" "}
                  {pokemon.height} m
                </div>
                <div>
                  <span className="font-semibold">Weight:</span>{" "}
                  {pokemon.weight} kg
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <span className="font-semibold">Gender:</span>
                  {pokemon.gender === "Male" && (
                    <MarsIcon className="w-5 h-5 text-blue-500" />
                  )}
                  {pokemon.gender === "Female" && (
                    <VenusIcon className="w-5 h-5 text-pink-500" />
                  )}
                  {pokemon.gender === "Both" && (
                    <>
                      <MarsIcon className="w-6 h-6 text-blue-500" />
                      <VenusIcon className="w-6 h-6 text-pink-500" />
                    </>
                  )}
                </div>
                <div className="mt-5">
                  <span className="font-semibold">Abilities:</span>{" "}
                  {pokemon.abilities.join(", ")}
                </div>
              </div>

              <div className="flex gap-2 mt-10">
                <span className="font-semibold">Types:</span>
                {pokemon.types.map((type) => (
                  <Type key={type} type={type} />
                ))}
              </div>

              <div className="flex gap-2 mt-10">
                <span className="font-semibold">Weaknesses:</span>
                {(pokemon.weaknesses || []).map((weak) => (
                  <Type key={weak} type={weak} />
                ))}
              </div>
            </div>
          </div>

          {/* Evolution Line */}
          <div className="border-4 border-cyan-400/50 bg bg-blue-100 rounded-lg shadow p-6 flex flex-col items-center gap-4 w-full">
            <span className="text-xl font-bold">Evolution Line</span>
            <EvolutionLine evolutions={pokemon.evolutions || []} />
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 items-center mt-2 w-full">
            {hasPrev ? (
              <button
                onClick={() => navigate(`/pokemon/${currentId - 1}`)}
                className="border-4 border-cyan-400/50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:scale-105 transition-transform"
              >
                <ArrowBigLeftIcon /> Previous
              </button>
            ) : (
              <div /> // keeps spacing when prev doesn't show
            )}

            {hasNext && (
              <button
                onClick={() => navigate(`/pokemon/${currentId + 1}`)}
                className="border-4 border-cyan-400/50 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:scale-105 transition-transform"
              >
                Next <ArrowBigRightIcon />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EntryPage;
