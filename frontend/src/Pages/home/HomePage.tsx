import PokedexEntry from "./components/PokedexEntry";
import SearchBar from "@/components/ui/SearchBar";
import SearchResultsList from "@/components/ui/SearchResultsList";
import { useEffect, useRef, useState } from "react";
import PokedexEntrySkeleton from "@/components/skeletons/PokedexEntrySkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePokemonStore } from "@/stores/usePokemonStore";

const PAGE_LIMIT = 50;

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pokemon, isLoading, fetchAllPokemon, hasMore } = usePokemonStore();

  const containerRef = useRef<HTMLDivElement>(null);

  // Use a ref for the viewport, NOT the root ScrollArea
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  // Scroll handler attached to viewport element
  const handleScroll = () => {
    if (!scrollViewportRef.current || isLoading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollViewportRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setOffset((prev) => prev + PAGE_LIMIT);
    }
  };

  // Attach scroll listener to viewport
  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("scroll", handleScroll);
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  // Fetch Pokemon when offset changes
  useEffect(() => {
    fetchAllPokemon(offset, PAGE_LIMIT);
  }, [offset, fetchAllPokemon]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search input change handler
  const handleSetSearchInput = (value: string) => {
    setSearchInput(value);
    if (value.trim() !== "") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setResults([]);
    }
  };

  const displayedPokemon = searchInput.trim() === "" ? pokemon : results;

  return (
    <div className="flex flex-col h-full bg-[#eee]">
      {/* Search bar + results with outside click ref */}
      <div
        ref={containerRef}
        className="relative flex justify-center mt-4 px-4 max-w-2xl mx-auto w-full"
      >
        <div className="w-full max-w-2xl px-4">
          <SearchBar
            setResults={setResults}
            setSearchInput={handleSetSearchInput}
          />
          {showDropdown && <SearchResultsList results={results} />}
        </div>
      </div>

      {/* Scrollable area*/}
      <ScrollArea
        className="flex-1 overflow-y-auto px-6 pb-4 py-6"
        viewportRef={scrollViewportRef}
      >
        <div className="ml-2 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <PokedexEntrySkeleton />
          ) : (
            displayedPokemon.map((pokemon) => (
              <PokedexEntry
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
                types={pokemon.types ?? []}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HomePage;
