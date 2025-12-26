import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useTeamStore = create((set) => ({
  teams: [],
  isLoading: false,
  error: null,

  fetchTeams: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/teams");
      set({ teams: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
