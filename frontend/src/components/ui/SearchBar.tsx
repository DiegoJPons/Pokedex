import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  setResults,
  setSearchInput,
}: {
  setResults: any;
  setSearchInput: (value: string) => void;
}) => {
  const [input, setInput] = useState("");

  const fetchData = async (value: string) => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1100");
    const data = await res.json();

    const filtered = data.results.filter(
      (pokemon: any) =>
        value &&
        pokemon &&
        pokemon.name &&
        pokemon.name.toLowerCase().includes(value.toLowerCase())
    );

    const detailedResults = await Promise.all(
      filtered.map(async (pokemon: any) => {
        const detailRes = await fetch(pokemon.url);
        const detailData = await detailRes.json();
        return {
          id: detailData.id,
          name: detailData.name,
          imageUrl: detailData.sprites.front_default,
          types: detailData.types.map((t: any) => t.type.name),
        };
      })
    );
    setResults(detailedResults);
  };

  const handleChange = (value: string) => {
    setInput(value);
    setSearchInput(value);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    fetchData(value);
  };

  return (
    <div className="flex h-12 w-full items-center gap-3 rounded-full border border-primary/30 bg-white/[0.06] px-4 shadow-[0_0_24px_-12px_hsl(var(--primary)/0.22)] backdrop-blur-md transition focus-within:border-primary/55 focus-within:shadow-[0_0_32px_-10px_hsl(var(--primary)/0.35)] focus-within:ring-2 focus-within:ring-primary/30">
      <span className="shrink-0 text-lg text-primary/80" aria-hidden>
        <FaSearch />
      </span>
      <input
        className="h-full w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
        placeholder="Search by name…"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          if (input.trim() !== "") {
            setSearchInput(input);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
