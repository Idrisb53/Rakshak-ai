import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { AccountButton } from "@/components/account/AccountButton";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { to: "/features", label: "Platform" },
  { to: "/pricing", label: "Pricing" },
  { to: "/threat-intel", label: "Threat Intel" },
] as const;

export function SiteHeader() {
  const { loading, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {!loading &&
            (isAuthenticated ? (
              <AccountButton withName />
            ) : (
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/auth">Sign in</Link>
              </Button>
            ))}
          <Button asChild size="sm" className="glow-ring">
            <Link to="/scan">Scan now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
