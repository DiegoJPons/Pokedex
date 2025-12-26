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
      setResults([]); // Clear results when input is empty
      return;
    }
    fetchData(value);
  };

  return (
    <div className="bg-white w-full h-10 rounded-md px-[15px] shadow-md flex items-center">
      <div className="text-[royalblue] text-xl mr-2">
        <FaSearch />
      </div>
      <input
        className="bg-transparent w-full h-full ml-1 text-xl focus:outline-none"
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => {
          if (input.trim() !== "") {
            // Show dropdown when input gains focus and has text
            setSearchInput(input);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
