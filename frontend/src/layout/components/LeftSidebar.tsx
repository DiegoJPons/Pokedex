import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import pokeball from "../../assets/pokeball.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamsListSkeleton from "@/components/skeletons/TeamsListSkeleton";
import { useTeamStore } from "@/stores/useTeamStore";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

type TeamRow = {
  _id: string;
  name: string;
  pokemon?: {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
  }[];
};

type TeamPokemon = NonNullable<TeamRow["pokemon"]>[number];

const LeftSidebar = () => {
  const {
    teams,
    fetchTeams,
    isLoading,
    setEditingTeamId,
    editingTeamId,
    updateTeam,
    deleteTeam,
    createNewTeam,
    tempPokemonList,
    updateTempPokemonList,
  } = useTeamStore();

  const [editingTeamName, setEditingTeamName] = useState("");
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetchTeams();
    }
  }, [isSignedIn, fetchTeams]);

  const handleEditTeam = (team: TeamRow) => {
    console.log("Edit team", team);
    setEditingTeamId(team._id);
    setEditingTeamName(team.name);
  };

  const handleRemoveTempPokemon = (pokemon: TeamPokemon) => {
    const index = tempPokemonList.indexOf(pokemon);
    if (index === -1) return;

    const newList = [...tempPokemonList];
    newList.splice(index, 1);
    updateTempPokemonList(newList);
  };

  const handleConfirmEditTeam = async (teamId: string) => {
    await updateTeam(teamId, {
      name: editingTeamName,
      pokemon: tempPokemonList,
    });
    fetchTeams();
  };

  const handleDeleteTeam = async (teamId: string) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      deleteTeam(teamId);
    }
  };

  const handleCreateNewTeam = () => {
    console.log("Create new team");
    createNewTeam();
    fetchTeams();
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <nav className="glass-panel p-3">
        <Link
          to={"/"}
          className={cn(
            buttonVariants({
              variant: "ghost",
              className:
                "w-full justify-start gap-2 rounded-xl text-foreground hover:bg-primary/15 hover:text-primary",
            })
          )}
        >
          <HomeIcon className="size-5 shrink-0" />
          <span className="font-medium">Home</span>
        </Link>
      </nav>

      <div className="glass-panel flex min-h-0 flex-1 flex-col p-4">
        <div className="mb-4 flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2 px-1">
            <img src={pokeball} alt="" className="size-6 shrink-0 drop-shadow" />
            <span className="truncate font-semibold tracking-tight">Teams</span>
            {isSignedIn && (
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-xs font-mono-nums text-muted-foreground">
                {teams.length}
              </span>
            )}
          </div>
          {isSignedIn && (
            <button
              type="button"
              onClick={handleCreateNewTeam}
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition hover:scale-105 hover:bg-primary/90"
              title="Add team"
            >
              <Plus className="size-5" />
            </button>
          )}
        </div>

        {!isLoaded ? (
          <TeamsListSkeleton />
        ) : !isSignedIn ? (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-center text-sm text-muted-foreground">
            Sign in to build and save teams
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)] pr-2">
            <div className="space-y-3">
              {isLoading ? (
                <TeamsListSkeleton />
              ) : teams.length > 0 ? (
                teams.map((team) => (
                  <div
                    key={team._id}
                    className="group flex flex-col gap-2 rounded-xl border border-primary/25 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-md transition hover:border-primary/40 hover:shadow-[0_0_28px_-12px_hsl(var(--primary)/0.28)]"
                  >
                    {editingTeamId === team._id ? (
                      <input
                        type="text"
                        value={editingTeamName}
                        onChange={(e) => setEditingTeamName(e.target.value)}
                        className="w-full rounded-lg border border-primary/40 bg-background/80 px-2 py-1.5 text-base font-semibold text-foreground outline-none ring-primary/30 focus:ring-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleConfirmEditTeam(team._id);
                          else if (e.key === "Escape") setEditingTeamId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <span
                        className="break-words text-base font-semibold text-foreground"
                        onDoubleClick={() => handleEditTeam(team)}
                      >
                        {team.name}
                      </span>
                    )}

                    <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[...Array(6)].map((_, idx) => {
                          const pokemon =
                            editingTeamId === team._id
                              ? tempPokemonList[idx]
                              : team.pokemon?.[idx];

                          return (
                            <div key={idx} className="relative">
                              {pokemon ? (
                                <img
                                  src={pokemon.imageUrl}
                                  alt={pokemon.name}
                                  title={pokemon.name}
                                  className="size-10 rounded-full border border-white/20 bg-white/90 object-cover shadow-inner"
                                />
                              ) : (
                                <img
                                  src="https://i.ebayimg.com/images/g/GVsAAOSwYihgT~Yi/s-l400.jpg"
                                  alt="Empty slot"
                                  className="size-10 rounded-full border border-white/10 bg-muted/30 object-cover opacity-60"
                                />
                              )}

                              {editingTeamId === team._id && pokemon && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveTempPokemon(pokemon)
                                  }
                                  className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow"
                                  title="Remove Pokémon"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex gap-1 sm:mt-0">
                        {editingTeamId === team._id ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleConfirmEditTeam(team._id)}
                              className="rounded-lg bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingTeamId(null)}
                              className="rounded-lg bg-white/10 px-3 py-1 text-sm font-medium text-muted-foreground transition hover:bg-white/15"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleEditTeam(team)}
                              className="rounded-lg p-2 text-primary transition hover:bg-primary/15"
                              title="Edit team"
                            >
                              <Pencil className="size-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTeam(team._id)}
                              className="rounded-lg p-2 text-destructive transition hover:bg-destructive/15"
                              title="Delete team"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No teams yet</p>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
