import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const LandingNavbar = () => {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 px-4 py-3 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-xs font-bold tracking-wide text-foreground">
          FT
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide">FINTRACK</p>
          <p className="text-xs text-muted-foreground">Money clarity, every day</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default LandingNavbar;
