import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanLine,
  Radar,
  FileText,
  Settings,
  Bell,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AccountButton } from "@/components/account/AccountButton";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/scan", label: "Scan Center", icon: ScanLine },
  { to: "/threat-intel", label: "Threat Intel", icon: Radar },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/70 bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-border/70 px-5">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-primary font-medium",
              }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="m-3 rounded-xl border border-border/70 bg-card/60 p-4">
          <Badge variant="secondary" className="mb-2 text-primary">
            Free plan
          </Badge>
          <p className="text-xs text-muted-foreground">42 of 100 monthly scans used.</p>
          <Button asChild size="sm" className="mt-3 w-full">
            <Link to="/pricing">Upgrade</Link>
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">{title}</h1>
              {subtitle && (
                <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="size-4" />
              </Button>
              <AccountButton />
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-2 lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="whitespace-nowrap rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
