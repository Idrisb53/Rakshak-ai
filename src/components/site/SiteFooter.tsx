import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            AI-powered protection against phishing, QR scams, fake apps and fraud messages — built
            for India.
          </p>
        </div>
        <FooterCol
          title="Product"
          links={[
            { to: "/features", label: "Platform" },
            { to: "/scan", label: "Scan Center" },
            { to: "/reports", label: "Reports" },
          ]}
        />
        <FooterCol
          title="Intelligence"
          links={[
            { to: "/threat-intel", label: "Threat Intel" },
            { to: "/dashboard", label: "Dashboard" },
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            { to: "/pricing", label: "Pricing" },
            { to: "/settings", label: "Settings" },
          ]}
        />
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} Rakshak AI. India's Personal Cyber Guardian.</p>
          <p className="font-mono uppercase tracking-[0.2em]">Built by IDRIS4HACK</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { to: "/features" | "/scan" | "/reports" | "/threat-intel" | "/dashboard" | "/pricing" | "/settings"; label: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-foreground/80 transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
