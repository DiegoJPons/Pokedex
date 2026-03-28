type TypeProps = {
  type: string;
  className?: string;
};

const typeColors: Record<string, string> = {
  normal: "bg-gray-400 text-white",
  fire: "bg-red-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-gray-900",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-gray-900",
  fighting: "bg-orange-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-600 text-white",
  flying: "bg-indigo-300 text-gray-900",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-gray-900",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-purple-700 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-gray-900",
};

/** Left border accent for cards keyed by primary type */
export const typeAccentBorder: Record<string, string> = {
  normal: "border-l-gray-400",
  fire: "border-l-red-500",
  water: "border-l-blue-500",
  electric: "border-l-yellow-400",
  grass: "border-l-green-500",
  ice: "border-l-cyan-400",
  fighting: "border-l-orange-700",
  poison: "border-l-purple-500",
  ground: "border-l-yellow-600",
  flying: "border-l-indigo-400",
  psychic: "border-l-pink-500",
  bug: "border-l-lime-500",
  rock: "border-l-yellow-700",
  ghost: "border-l-purple-700",
  dragon: "border-l-indigo-600",
  dark: "border-l-gray-700",
  steel: "border-l-slate-400",
  fairy: "border-l-pink-300",
};

const TypeBadge = ({ type, className }: TypeProps) => {
  const colorClass = typeColors[type.toLowerCase()] || "bg-gray-300 text-black";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-xs shadow-sm ring-1 ring-black/5 ${colorClass} ${className ?? ""}`}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
