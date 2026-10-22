import { ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-primary/12 text-primary glow-ring transition-transform group-hover:scale-105">
        <ShieldCheck className="size-5" />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-base font-bold tracking-tight">Rakshak AI</span>
          <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Cyber Guardian
          </span>
        </span>
      )}
    </Link>
  );
}
