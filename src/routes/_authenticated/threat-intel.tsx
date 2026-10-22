import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/threat-intel")({
  head: () => ({
    meta: [
      { title: "Threat Intelligence — live scam trends across India" },
      {
        name: "description",
        content:
          "Look up indicators, track scam campaigns and watch regional fraud trends in the Rakshak AI threat intelligence hub.",
      },
      { property: "og:title", content: "Threat Intelligence — Rakshak AI" },
      {
        property: "og:description",
        content: "Indicator lookups, campaign tracking and regional fraud trends.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThreatIntelPage,
});

const regions = [
  { region: "MH", reports: 412 },
  { region: "DL", reports: 368 },
  { region: "KA", reports: 301 },
  { region: "UP", reports: 289 },
  { region: "TN", reports: 233 },
  { region: "GJ", reports: 197 },
  { region: "WB", reports: 164 },
];

const campaigns = [
  { name: "UPI collect-request fraud", indicators: 1284, severity: "Critical", change: "+24%" },
  { name: "Fake loan APK network", indicators: 942, severity: "High", change: "+11%" },
  { name: "Courier customs-fee SMS", indicators: 771, severity: "High", change: "+7%" },
  { name: "Electricity disconnection scam", indicators: 615, severity: "Medium", change: "-3%" },
  { name: "Cloned bank reward pages", indicators: 508, severity: "Medium", change: "+2%" },
];

function severityTone(level: string) {
  if (level === "Critical") return "bg-destructive/15 text-destructive";
  if (level === "High") return "bg-warning/15 text-warning";
  return "bg-secondary text-secondary-foreground";
}

function ThreatIntelPage() {
  return (
    <AppShell title="Threat Intelligence" subtitle="Live indicators and campaign trends">
      <div className="grid gap-5">
        <section className="surface-panel p-6">
          <h2 className="text-base font-semibold">Indicator lookup</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search a domain, IP address, file hash or UPI handle.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="e.g. 185.220.101.4 or reward-sbi.in" className="pl-9 font-mono" />
            </div>
            <Button className="glow-ring sm:w-40">Look up</Button>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="surface-panel p-6">
            <h2 className="text-base font-semibold">Reports by state (last 30 days)</h2>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regions}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="region" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "var(--color-secondary)" }}
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.6rem",
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Bar dataKey="reports" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="surface-panel overflow-hidden">
            <div className="border-b border-border/70 p-5">
              <h2 className="text-base font-semibold">Active campaigns</h2>
            </div>
            <ul className="divide-y divide-border/70">
              {campaigns.map((c) => (
                <li key={c.name} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.indicators.toLocaleString("en-IN")} indicators · {c.change} this week
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ${severityTone(c.severity)}`}>
                    {c.severity}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="surface-panel flex flex-wrap items-center gap-3 p-5 text-sm text-muted-foreground">
          <span>Feeds:</span>
          {["VirusTotal", "URLHaus", "AbuseIPDB", "AlienVault OTX", "Shodan", "Censys"].map((f) => (
            <Badge key={f} variant="outline">
              {f}
            </Badge>
          ))}
          <span className="text-xs">Connect API keys in settings to activate live feeds.</span>
        </section>
      </div>
    </AppShell>
  );
}
