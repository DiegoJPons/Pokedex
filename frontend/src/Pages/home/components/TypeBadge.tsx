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

const TypeBadge = ({ type, className }: TypeProps) => {
  const colorClass = typeColors[type.toLowerCase()] || "bg-gray-300 text-black";

  return (
    <span
      className={`px-3 py-1 rounded-full font-semibold text-sm shadow ${colorClass} ${className}`}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
