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
    return (
      <p className="text-center text-sm text-muted-foreground">
        This Pokémon does not evolve.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {evolutions.map((p, index) => (
          <div key={p.id} className="flex items-center gap-4">
            <Link
              to={`/pokemon/${p.id}`}
              className="group flex w-[140px] flex-col items-center rounded-2xl border border-transparent p-2 transition hover:border-primary/35 hover:bg-white/[0.04] hover:shadow-[0_0_24px_-10px_hsl(var(--primary)/0.28)]"
            >
              <div className="border-glow-sm flex size-32 items-center justify-center rounded-full transition duration-300 group-hover:scale-[1.03]">
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="size-28 object-contain"
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="font-semibold capitalize text-foreground">
                  {capitalize(p.name)}
                </span>
                <span className="font-mono-nums text-xs text-muted-foreground">
                  #{p.id}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {(p.types || []).map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            </Link>

            {index < evolutions.length - 1 && (
              <MoveRightIcon className="hidden size-7 shrink-0 text-primary/60 sm:block" />
            )}
          </div>
        ))}
      </div>

      {evolutions.length === 1 && (
        <p className="text-center text-sm text-muted-foreground">
          No further evolutions in this line.
        </p>
      )}
    </div>
  );
};

export default EvolutionLine;
