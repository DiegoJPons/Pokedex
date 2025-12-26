import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import pokeball from "../../assets/pokeball.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamsListSkeleton from "@/components/skeletons/TeamsListSkeleton";
import { useTeamStore } from "@/stores/useTeamStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { teams, fetchTeams, isLoading } = useTeamStore();

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  console.log({ teams });

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-black px-2">
            <img src={pokeball} alt="Poké Ball" className="mr-2 size-5" />
            <span>Teams</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <TeamsListSkeleton />
            ) : teams.length > 0 ? (
              teams.map((team) => (
                <div key={team._id} className="bg-white rounded p-2 text-black">
                  {team.name}
                </div>
              ))
            ) : (
              <p className="text-sm text-black/70">No teams yet</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
