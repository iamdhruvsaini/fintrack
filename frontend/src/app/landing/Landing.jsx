import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import LandingNavbar from "@/components/landing-navbar";

const highlights = [
  {
    title: "Effortless Tracking",
    description: "Log income and expenses in seconds with clear categories and smart grouping.",
  },
  {
    title: "Clear Money Story",
    description: "See where your money goes every week with clean insights and focused summaries.",
  },
  {
    title: "Built For Momentum",
    description: "Stay consistent with a layout designed to make daily tracking feel lightweight.",
  },
];

const Landing = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 -top-40 h-80 w-80 rounded-full bg-muted/70 blur-3xl" />
        <div className="absolute -bottom-56 -right-32 h-96 w-96 rounded-full bg-muted/60 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.99_0_0/.5),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,oklch(0.22_0_0/.55),transparent_58%)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 pb-14 pt-6 sm:px-8 lg:px-12 lg:pt-8">
        <LandingNavbar />

        <section className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Personal Finance, Simplified
            </p>
            <h1 className="mt-5 max-w-xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Track smarter. Spend better. Build lasting wealth.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              FinTrack gives you one calm dashboard to monitor spending, understand patterns, and make better decisions with confidence.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/register">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border/70 bg-card/70 p-3">
                <p className="text-2xl font-semibold">20K+</p>
                <p className="mt-1 text-muted-foreground">Monthly records</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/70 p-3">
                <p className="text-2xl font-semibold">98%</p>
                <p className="mt-1 text-muted-foreground">Retention rate</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/70 p-3">
                <p className="text-2xl font-semibold">4.9</p>
                <p className="mt-1 text-muted-foreground">Average rating</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card/80 p-5 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-7 dark:shadow-black/30">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">This Month</p>
                <span className="rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
                  +14.2%
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold">$8,420</p>
              <p className="mt-1 text-sm text-muted-foreground">Net balance after all expenses</p>

              <div className="mt-6 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Needs</span>
                    <span>52%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[52%] rounded-full bg-foreground/85" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Wants</span>
                    <span>30%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[30%] rounded-full bg-foreground/65" />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Savings</span>
                    <span>18%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div className="h-2 w-[18%] rounded-full bg-foreground/45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur-sm"
            >
              <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Landing;