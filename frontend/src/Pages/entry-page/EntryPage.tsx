import { useParams, useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ArrowBigLeftIcon, ArrowBigRightIcon, Ruler, Weight } from "lucide-react";
import { type Pokemon, usePokemonStore } from "@/stores/usePokemonStore";
import { useEffect, useState } from "react";
import Type from "../home/components/TypeBadge";
import { MarsIcon, VenusIcon } from "lucide-react";
import EvolutionLine from "./components/EvolutionLine";

const StatCard = ({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
}) => (
  <div className="border-glow-sm rounded-xl px-4 py-3">
    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
      <Icon className="size-3.5 text-primary" />
      {label}
    </div>
    <div className="mt-1 font-mono-nums text-lg font-semibold text-foreground">
      {value}
      {unit && (
        <span className="ml-1 text-sm font-normal text-muted-foreground">
          {unit}
        </span>
      )}
    </div>
  </div>
);

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
  const maxPokemonId = 1025;
  const hasPrev = currentId > 1;
  const hasNext = currentId < maxPokemonId;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-4 md:p-8">
      {isLoading ? (
        <div className="relative z-[1] flex flex-col gap-6 animate-pulse">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="h-80 rounded-2xl bg-white/5 lg:w-2/5" />
            <div className="flex flex-1 flex-col gap-4">
              <div className="h-10 w-2/3 rounded-lg bg-white/5" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 rounded-xl bg-white/5" />
                <div className="h-20 rounded-xl bg-white/5" />
              </div>
              <div className="h-24 rounded-xl bg-white/5" />
            </div>
          </div>
          <div className="h-40 rounded-2xl bg-white/5" />
        </div>
      ) : !pokemon ? (
        <div className="relative z-[1] rounded-2xl border border-dashed border-primary/35 bg-white/[0.03] p-12 text-center text-muted-foreground shadow-[0_0_32px_-14px_hsl(var(--primary)/0.25)]">
          Pokémon not found.
        </div>
      ) : (
        <>
          <div className="relative z-[1] flex flex-col gap-8 lg:flex-row lg:items-stretch">
            <div className="glass-panel flex w-full flex-col items-center gap-4 p-8 lg:w-[38%]">
              <span className="font-mono-nums text-sm text-muted-foreground">
                #{String(pokemon.id).padStart(4, "0")}
              </span>
              <div className="border-glow-sm flex size-56 items-center justify-center rounded-2xl">
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="size-44 object-contain"
                />
              </div>
              <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
                {capitalize(pokemon.name)}
              </h1>
              <div className="flex flex-wrap justify-center gap-2">
                {pokemon.types.map((type) => (
                  <Type key={type} type={type} />
                ))}
              </div>
            </div>

            <div className="glass-panel flex flex-1 flex-col gap-6 p-6 md:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Profile
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <StatCard
                  icon={Ruler}
                  label="Height"
                  value={pokemon.height}
                  unit="m"
                />
                <StatCard
                  icon={Weight}
                  label="Weight"
                  value={pokemon.weight}
                  unit="kg"
                />
              </div>

              <div className="border-glow-sm rounded-xl p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Gender
                </span>
                <div className="mt-2 flex items-center gap-2">
                  {pokemon.gender === "Male" && (
                    <MarsIcon className="size-6 text-sky-400" />
                  )}
                  {pokemon.gender === "Female" && (
                    <VenusIcon className="size-6 text-pink-400" />
                  )}
                  {pokemon.gender === "Both" && (
                    <>
                      <MarsIcon className="size-6 text-sky-400" />
                      <VenusIcon className="size-6 text-pink-400" />
                    </>
                  )}
                  <span className="text-foreground">{pokemon.gender}</span>
                </div>
              </div>

              <div className="border-glow-sm rounded-xl p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Abilities
                </span>
                <p className="mt-2 text-foreground">
                  {pokemon.abilities.join(", ")}
                </p>
              </div>

              <div className="border-glow-sm rounded-xl p-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Weaknesses
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(pokemon.weaknesses || []).map((weak) => (
                    <Type key={weak} type={weak} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-[1] glass-panel flex flex-col gap-4 p-6 md:p-8">
            <h2 className="text-center text-lg font-semibold tracking-tight">
              Evolution line
            </h2>
            <EvolutionLine evolutions={pokemon.evolutions || []} />
          </div>

          <div className="relative z-[1] flex flex-wrap items-center justify-center gap-4 pb-2">
            {hasPrev ? (
              <button
                type="button"
                onClick={() => navigate(`/pokemon/${currentId - 1}`)}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/[0.06] px-5 py-2.5 font-medium text-foreground shadow-[0_0_24px_-10px_hsl(var(--primary)/0.25)] transition hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_32px_-10px_hsl(var(--primary)/0.35)]"
              >
                <ArrowBigLeftIcon className="size-5" /> Previous
              </button>
            ) : (
              <div className="min-w-[120px]" />
            )}

            {hasNext && (
              <button
                type="button"
                onClick={() => navigate(`/pokemon/${currentId + 1}`)}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/[0.06] px-5 py-2.5 font-medium text-foreground shadow-[0_0_24px_-10px_hsl(var(--primary)/0.25)] transition hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_32px_-10px_hsl(var(--primary)/0.35)]"
              >
                Next <ArrowBigRightIcon className="size-5" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EntryPage;
