import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useTeamStore = create((set, get) => ({
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
      tempPokemonList: team ? [...team.pokemon] : [],
    });
  },
  updateTempPokemonList: (pokemonList: any[]) =>
    set({ tempPokemonList: pokemonList }),

  addPokemonToTempList: (pokemon: any) => {
    const { tempPokemonList } = get();
    if (tempPokemonList.length >= 6) return; // max 6 Pokémon
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
    }
  },
}));
