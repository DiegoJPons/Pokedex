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

  const handleEditTeam = (team) => {
    console.log("Edit team", team);
    setEditingTeamId(team._id);
    setEditingTeamName(team.name);
  };

  const handleRemoveTempPokemon = (pokemon) => {
    const index = tempPokemonList.indexOf(pokemon);
    if (index === -1) return;

    const newList = [...tempPokemonList];
    newList.splice(index, 1);
    updateTempPokemonList(newList);
  };

  const handleConfirmEditTeam = async (teamId) => {
    await updateTeam(teamId, {
      name: editingTeamName,
      pokemon: tempPokemonList,
    });
    fetchTeams();
  };

  const handleDeleteTeam = async (teamId) => {
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
    <div className="flex flex-col h-full gap-2">
      {/* Navigation Menu */}
      <div className=" h-16 rounded-lg bg-cyan-400/50 p-3">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "w-full justify-start text-black hover:bg-blue-400/50",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span>Home</span>
          </Link>
        </div>
      </div>

      {/* Teams section */}
      <div className="flex-1 rounded-lg bg-cyan-400/50 p-4">
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center text-black px-2">
            <img src={pokeball} alt="Poké Ball" className="mr-2 w-5 h-5" />
            <span className="font-semibold text-lg">Teams</span>
            {isSignedIn && (
              <span className="ml-2 text-md text-gray-500">
                ({teams.length})
              </span>
            )}
          </div>
          {isSignedIn && (
            <button
              onClick={handleCreateNewTeam}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition transform hover:scale-110 shadow-md hover:shadow-lg"
              title="Add team"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        {!isLoaded ? (
          <TeamsListSkeleton />
        ) : !isSignedIn ? (
          <div className="flex items-center justify-center h-full text-black/70 text-sm">
            You must be logged in to create teams
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-4">
              {isLoading ? (
                <TeamsListSkeleton />
              ) : teams.length > 0 ? (
                teams.map((team) => (
                  <div
                    key={team._id}
                    className="group flex flex-col bg-white rounded-lg p-4 text-black shadow hover:shadow-md transition gap-2"
                  >
                    {/* Row 1: Team Name */}
                    {editingTeamId === team._id ? (
                      <input
                        type="text"
                        value={editingTeamName}
                        onChange={(e) => setEditingTeamName(e.target.value)}
                        className="font-semibold text-lg border-b border-gray-300 focus:outline-none focus:border-blue-400 w-full"
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            handleConfirmEditTeam(team._id, editingTeamName);
                          else if (e.key === "Escape") setEditingTeamId(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <span
                        className="font-semibold text-lg break-words"
                        onDoubleClick={() => handleEditTeam(team)}
                      >
                        {team.name}
                      </span>
                    )}

                    {/* Row 2: Pokémon icons + action buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                      {/* Pokémon icons */}
                      <div className="flex items-center gap-1 flex-wrap sm:flex-nowrap">
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
                                  className="w-10 h-10 rounded-full border border-gray-300 bg-white"
                                />
                              ) : (
                                <img
                                  src="https://i.ebayimg.com/images/g/GVsAAOSwYihgT~Yi/s-l400.jpg"
                                  alt="Empty slot"
                                  className="w-10 h-10 rounded-full border border-gray-300 bg-white"
                                />
                              )}

                              {/* Remove button only in editing mode */}
                              {editingTeamId === team._id && pokemon && (
                                <button
                                  onClick={() =>
                                    handleRemoveTempPokemon(pokemon)
                                  }
                                  className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition"
                                  title="Remove Pokémon"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        {editingTeamId === team._id ? (
                          <>
                            <button
                              onClick={() =>
                                handleConfirmEditTeam(team._id, editingTeamName)
                              }
                              className="px-2 py-1 rounded bg-green-100 text-green-600 hover:bg-green-200 transition text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setEditingTeamId(null)}
                              className="px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditTeam(team)}
                              className="p-0 rounded hover:bg-blue-100 text-blue-600 transition"
                              title="Edit team"
                            >
                              <Pencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeam(team._id)}
                              className="p-0 rounded hover:bg-red-100 text-red-600 transition"
                              title="Delete team"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-black/70">No teams yet</p>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
