import Type, { typeAccentBorder } from "./TypeBadge";
import { useNavigate } from "react-router-dom";
import { useTeamStore } from "@/stores/useTeamStore";
import { UserPlus } from "lucide-react";

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
    e.stopPropagation();
    addPokemonToTempList({ id, name, imageUrl, types });
  };

  const primary = types[0]?.toLowerCase() ?? "normal";
  const accentClass =
    typeAccentBorder[primary] ?? "border-l-cyan-500/60";

  return (
    <div className="p-1">
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate(`/pokemon/${id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate(`/pokemon/${id}`);
          }
        }}
        className={`group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4 shadow-lg backdrop-blur-sm transition duration-300 ease-out border-l-4 ${accentClass} hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_0_28px_-10px_hsl(var(--primary)/0.3)]`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

        <span className="absolute left-3 top-2.5 font-mono-nums text-xs font-medium text-muted-foreground">
          #{String(id).padStart(4, "0")}
        </span>

        {editingTeamId && (
          <button
            type="button"
            onClick={handleAddPokemon}
            className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:bg-primary/90"
          >
            <UserPlus className="size-3.5" />
            Add
          </button>
        )}

        <div className="relative mt-6 flex size-28 items-center justify-center rounded-2xl bg-gradient-to-b from-white/10 to-transparent ring-1 ring-white/10">
          <div className="absolute inset-2 rounded-xl bg-[radial-gradient(circle_at_50%_70%,hsl(187_92%_48%/0.12),transparent_65%)]" />
          <img
            src={imageUrl}
            alt=""
            className="relative z-[1] size-24 object-contain drop-shadow-lg transition duration-300 group-hover:scale-110"
          />
        </div>

        <div className="mt-3 text-center font-semibold capitalize tracking-tight text-foreground">
          {name}
        </div>

        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {types.map((type) => (
            <Type key={type} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokedexEntry;
