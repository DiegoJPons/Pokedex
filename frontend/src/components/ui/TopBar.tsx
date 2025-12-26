import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "../SignInOAuthButtons.tsx";
import pokedex from "../../assets/pokedex.png";

const TopBar = () => {
  return (
    <div className="h-16 rounded-lg flex items-center justify-between p-4 sticky top-0 bg-cyan-400/50 backdrop-blur-md z-10">
      <div className="flex gap-2 items-center ">
        <img src={pokedex} alt="Pokedex" className="size-8" />
        Pokedex
      </div>
      <div className="flex gap-4 items-center">
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
