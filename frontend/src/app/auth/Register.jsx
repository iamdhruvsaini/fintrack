import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Register = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 text-foreground">
      <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start tracking your finances with FinTrack.</p>

        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Create password" />
          </div>
          <Button className="w-full" type="button">
            Register
          </Button>
        </form>

        <p className="mt-5 text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-foreground underline">Login</Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
