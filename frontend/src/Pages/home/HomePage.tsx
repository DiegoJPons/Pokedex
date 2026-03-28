import PokedexEntry from "./components/PokedexEntry";
import SearchBar from "@/components/ui/SearchBar";
import SearchResultsList from "@/components/ui/SearchResultsList";
import { useEffect, useRef, useState } from "react";
import PokedexEntrySkeleton from "@/components/skeletons/PokedexEntrySkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePokemonStore } from "@/stores/usePokemonStore";
import { Sparkles } from "lucide-react";

const PAGE_LIMIT = 50;

const HomePage = () => {
  const [offset, setOffset] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pokemon, isLoading, fetchAllPokemon, hasMore } = usePokemonStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollViewportRef.current || isLoading || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollViewportRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setOffset((prev) => prev + PAGE_LIMIT);
    }
  };

  useEffect(() => {
    const viewport = scrollViewportRef.current;
    if (!viewport) return;

    viewport.addEventListener("scroll", handleScroll);
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    fetchAllPokemon(offset, PAGE_LIMIT);
  }, [offset, fetchAllPokemon]);

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
    <div className="relative flex h-full min-h-0 flex-col bg-gradient-to-b from-transparent via-background/50 to-background/80">
      <div
        className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 size-56 rounded-full bg-indigo-500/10 blur-3xl"
        aria-hidden
      />

      <div
        ref={containerRef}
        className="relative z-[1] mx-auto mt-5 w-full max-w-2xl shrink-0 px-4"
      >
        <div className="glass-panel overflow-visible p-5">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/15 text-primary shadow-[0_0_20px_-8px_hsl(var(--primary)/0.35)]">
              <Sparkles className="size-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Browse Pokémon
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Search or scroll — open a card for full stats and evolutions.
              </p>
            </div>
          </div>
          <div className="w-full">
            <SearchBar
              setResults={setResults}
              setSearchInput={handleSetSearchInput}
            />
            {showDropdown && <SearchResultsList results={results} />}
          </div>
        </div>
      </div>

      <ScrollArea
        className="relative z-[1] min-h-0 flex-1 px-4 pb-6 pt-2 md:px-6"
        viewportRef={scrollViewportRef}
      >
        <div className="ml-0 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
