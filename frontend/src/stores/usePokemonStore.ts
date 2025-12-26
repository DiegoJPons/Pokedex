import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";

export type Evolution = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

export type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  gender?: string;
  weaknesses?: string[];
  evolutions?: Evolution[];
};

type State = {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchPokemon: (id: number) => Promise<Pokemon>;
  fetchAllPokemon: (offset: number, limit: number) => Promise<void>;
};

export const usePokemonStore = create<State>((set) => ({
  pokemon: [],
  isLoading: false,
  error: null,
  hasMore: true,

  fetchPokemon: async (id: number) => {
    const res = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`
    );
    const data = res.data;

    const types = data.types.map((t: any) => t.type.name);
    const abilities = data.abilities.map((a: any) => a.ability.name);
    const height = data.height / 10;
    const weight = data.weight / 10;

    // Fetch species for gender info
    const speciesRes = await axiosInstance.get(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const genderRate = speciesRes.data.gender_rate;
    let gender: string;
    if (genderRate === -1) gender = "Genderless";
    else if (genderRate === 0) gender = "Male";
    else if (genderRate === 8) gender = "Female";
    else gender = "Both";

    // Fetch weaknesses from types
    let weaknesses: string[] = [];
    for (const typeName of types) {
      const typeRes = await axiosInstance.get(
        `https://pokeapi.co/api/v2/type/${typeName}`
      );
      const doubleDamageFrom =
        typeRes.data.damage_relations.double_damage_from.map(
          (t: any) => t.name
        );
      weaknesses.push(...doubleDamageFrom);
    }
    weaknesses = Array.from(new Set(weaknesses)); // remove duplicates

    // Fetch evolution chain
    const evolutionChainUrl = speciesRes.data.evolution_chain.url;
    const evolutionRes = await axiosInstance.get(evolutionChainUrl);
    const chain = evolutionRes.data.chain;

    const evolutions: Evolution[] = [];

    const traverseChain = async (node: any) => {
      const evoId = Number(node.species.url.split("/").slice(-2, -1)[0]);

      // Fetch the types for this evolution
      const evoRes = await axiosInstance.get(
        `https://pokeapi.co/api/v2/pokemon/${evoId}`
      );
      const evoTypes = evoRes.data.types.map((t: any) => t.type.name);

      evolutions.push({
        id: evoId,
        name: node.species.name,
        imageUrl:
          evoRes.data.sprites.other["official-artwork"].front_default ||
          evoRes.data.sprites.front_default,
        types: evoTypes,
      });

      if (node.evolves_to && node.evolves_to.length > 0) {
        for (const nextNode of node.evolves_to) {
          await traverseChain(nextNode);
        }
      }
    };

    await traverseChain(chain);

    return {
      id: data.id,
      name: data.name,
      imageUrl:
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default,
      types,
      height,
      weight,
      abilities,
      gender,
      weaknesses,
      evolutions,
    };
  },
  fetchAllPokemon: async (offset: number, limit: number) => {
    set({ isLoading: true, error: null });
    try {
      console.log("Fetching offset:", offset);
      const response = await axiosInstance.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      const detailedData = await Promise.all(
        response.data.results.map(async (pokemon: any) => {
          const res = await axiosInstance.get(pokemon.url);
          return {
            id: res.data.id,
            name: res.data.name,
            imageUrl:
              res.data.sprites.other["official-artwork"].front_default ||
              res.data.sprites.front_default,
            types: res.data.types.map((t: any) => t.type.name),
          };
        })
      );

      console.log("Fetched batch size:", response.data.results.length);

      // If batch size < limit, no more data to fetch
      const newHasMore = response.data.results.length === limit;

      set((state) => ({
        pokemon:
          offset === 0 ? detailedData : [...state.pokemon, ...detailedData],
        isLoading: false,
        hasMore: newHasMore,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message ?? "Failed to fetch Pokémon",
      });
      set({ isLoading: false });
    }
  },
}));
