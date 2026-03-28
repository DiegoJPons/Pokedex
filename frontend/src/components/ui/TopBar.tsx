import { SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOAuthButtons from "../SignInOAuthButtons.tsx";
import pokedex from "../../assets/pokedex.png";

const TopBar = () => {
  return (
    <header className="relative z-10 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-primary/30 bg-gradient-to-r from-primary/10 via-transparent to-cyan-500/5 px-5 shadow-[0_0_32px_-12px_hsl(var(--primary)/0.35)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_12px_0_hsl(var(--primary)/0.45)]" />
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 rounded-xl bg-primary/25 blur-lg" />
          <img
            src={pokedex}
            alt=""
            className="relative size-9 drop-shadow-[0_0_12px_hsl(187_92%_48%/0.5)]"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Pokédex
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Regional database
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "ring-2 ring-primary/40 shadow-md",
            },
          }}
        />
      </div>
    </header>
  );
};

export default TopBar;
