import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

type TeamPokemon = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
};

type Team = {
  _id: string;
  name: string;
  pokemon?: TeamPokemon[];
};

type TeamStoreState = {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
  editingTeamId: string | null;
  tempPokemonList: TeamPokemon[];
  fetchTeams: () => Promise<void>;
  setEditingTeamId: (id: string | null) => void;
  updateTempPokemonList: (pokemonList: TeamPokemon[]) => void;
  addPokemonToTempList: (pokemon: TeamPokemon) => void;
  updateTeam: (
    teamId: string,
    updatedData: { name: string; pokemon: TeamPokemon[] }
  ) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
  createNewTeam: () => Promise<void>;
};

export const useTeamStore = create<TeamStoreState>((set, get) => ({
  teams: [],
  isLoading: false,
  error: null,
  editingTeamId: null,
  tempPokemonList: [],

  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/teams");
      set({ teams: response.data.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  setEditingTeamId: (id: string | null) => {
    const team = get().teams.find((t) => t._id === id);
    set({
      editingTeamId: id,
      tempPokemonList: team?.pokemon ? [...team.pokemon] : [],
    });
  },
  updateTempPokemonList: (pokemonList: TeamPokemon[]) =>
    set({ tempPokemonList: pokemonList }),

  addPokemonToTempList: (pokemon: TeamPokemon) => {
    const { tempPokemonList } = get();
    if (tempPokemonList.length >= 6) return;
    set({ tempPokemonList: [...tempPokemonList, pokemon] });
  },

  updateTeam: async (teamId, updatedData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put(`/teams/${teamId}`, updatedData);
      const updatedTeams = get().teams.map((team) =>
        team._id === teamId ? { ...team, ...response.data } : team
      );
      set({ teams: updatedTeams, editingTeamId: null });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTeam: async (teamId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/teams/${teamId}`);
      set({ teams: get().teams.filter((team) => team._id !== teamId) });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  createNewTeam: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/teams");
      set({ teams: [...get().teams, response.data.data] });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
