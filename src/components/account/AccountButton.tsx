import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CircleUserRound, LogOut, Loader2, Settings } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, displayName } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Session-aware account control. Shows nothing while the session is
 * resolving, an account menu when signed in. Handles full sign-out
 * hygiene: cancel in-flight queries, clear the cache, sign out, then
 * replace-navigate to /auth so Back never restores protected state.
 */
export function AccountButton({ withName = false }: { withName?: boolean }) {
  const { session, user, loading } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [signingOut, setSigningOut] = useState(false);

  if (loading || !user) return null;

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await supabase.auth.signOut();
      await navigate({ to: "/auth", replace: true });
      toast.success("Signed out of Rakshak AI");
    } catch {
      toast.error("Could not sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  const name = displayName(user);
  const email = session?.user.email ?? "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {withName ? (
          <Button variant="outline" size="sm" className="gap-2" disabled={signingOut}>
            <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 font-mono text-[10px] font-semibold text-primary">
              {initials || "AI"}
            </span>
            <span className="max-w-32 truncate">{name}</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" aria-label="Account" disabled={signingOut}>
            <CircleUserRound className="size-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <p className="truncate text-sm font-medium">{name}</p>
          {email !== name && (
            <p className="truncate text-xs text-muted-foreground">{email}</p>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={(e) => {
            e.preventDefault();
            void handleSignOut();
          }}
        >
          {signingOut ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
