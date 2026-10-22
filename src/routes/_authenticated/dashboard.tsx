import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ShieldCheck, ScanLine, AlertTriangle, Activity, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Rakshak AI security overview" },
      {
        name: "description",
        content:
          "Your security score, recent scans, risk trends and live threat alerts in one Rakshak AI overview.",
      },
      { property: "og:title", content: "Dashboard — Rakshak AI security overview" },
      {
        property: "og:description",
        content: "Security score, scan activity and threat alerts at a glance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const trend = [
  { day: "Mon", scans: 18, threats: 3 },
  { day: "Tue", scans: 26, threats: 6 },
  { day: "Wed", scans: 21, threats: 2 },
  { day: "Thu", scans: 34, threats: 9 },
  { day: "Fri", scans: 29, threats: 5 },
  { day: "Sat", scans: 41, threats: 12 },
  { day: "Sun", scans: 24, threats: 4 },
];

const mix = [
  { name: "Phishing URLs", value: 46, color: "var(--color-chart-1)" },
  { name: "QR scams", value: 22, color: "var(--color-chart-2)" },
  { name: "Fraud SMS", value: 18, color: "var(--color-chart-3)" },
  { name: "Fake apps", value: 14, color: "var(--color-chart-4)" },
];

const recent = [
  { target: "sbi-rewards-claim.in", type: "URL", verdict: "Malicious", score: 94 },
  { target: "qr-upi-payment.png", type: "QR", verdict: "Suspicious", score: 61 },
  { target: "IRCTC refund SMS", type: "SMS", verdict: "Malicious", score: 88 },
  { target: "loanmitra-fast.apk", type: "APK", verdict: "Suspicious", score: 57 },
  { target: "indiapost-track.co", type: "URL", verdict: "Safe", score: 12 },
];

const alerts = [
  { title: "UPI 'collect request' wave", detail: "Spike across Maharashtra and Gujarat", level: "High" },
  { title: "Fake electricity bill SMS", detail: "Impersonating state discoms", level: "Medium" },
  { title: "Cloned courier tracking sites", detail: "142 new domains in 24h", level: "High" },
];

function verdictTone(verdict: string) {
  if (verdict === "Malicious") return "bg-destructive/15 text-destructive";
  if (verdict === "Suspicious") return "bg-warning/15 text-warning";
  return "bg-success/15 text-success";
}

function DashboardPage() {
  return (
    <AppShell
      title="Security overview"
      subtitle="Your protection status for the last 7 days"
      actions={
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link to="/scan">
            New scan <ArrowRight className="size-4" />
          </Link>
        </Button>
      }
    >
      <div className="grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={ShieldCheck} label="Security score" value="82/100" hint="Good standing" />
          <StatCard icon={ScanLine} label="Scans this week" value="193" hint="+18% vs last week" />
          <StatCard icon={AlertTriangle} label="Threats blocked" value="41" hint="12 high severity" />
          <StatCard icon={Activity} label="Avg. analysis time" value="3.4s" hint="Across all agents" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <section className="surface-panel p-6 lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-semibold">Scan and threat activity</h2>
              <Badge variant="outline">7 days</Badge>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="scansFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="threatsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "0.6rem",
                      color: "var(--color-popover-foreground)",
                    }}
                  />
                  <Area type="monotone" dataKey="scans" stroke="var(--color-chart-1)" fill="url(#scansFill)" strokeWidth={2} />
                  <Area type="monotone" dataKey="threats" stroke="var(--color-chart-3)" fill="url(#threatsFill)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="surface-panel p-6">
            <h2 className="text-base font-semibold">Threat mix</h2>
            <div className="mt-2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mix} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3} stroke="none">
                    {mix.map((m) => (
                      <Cell key={m.name} fill={m.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-2 space-y-2 text-sm">
              {mix.map((m) => (
                <li key={m.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: m.color }} />
                    {m.name}
                  </span>
                  <span>{m.value}%</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <section className="surface-panel overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b border-border/70 p-5">
              <h2 className="text-base font-semibold">Recent scans</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/reports">View reports</Link>
              </Button>
            </div>
            <ul className="divide-y divide-border/70">
              {recent.map((r) => (
                <li key={r.target} className="flex items-center justify-between gap-4 px-5 py-3.5">
                  <div className="min-w-0">
                    <p className="truncate font-mono text-sm">{r.target}</p>
                    <p className="text-xs text-muted-foreground">{r.type} scan</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="hidden w-28 sm:block">
                      <Progress value={r.score} />
                    </span>
                    <span className={`rounded-md px-2 py-1 text-xs font-medium ${verdictTone(r.verdict)}`}>
                      {r.verdict}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="surface-panel p-6">
            <h2 className="text-base font-semibold">Live threat alerts</h2>
            <ul className="mt-4 space-y-4">
              {alerts.map((a) => (
                <li key={a.title} className="rounded-lg border border-border/70 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium">{a.title}</p>
                    <Badge variant={a.level === "High" ? "destructive" : "secondary"}>{a.level}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="surface-panel p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-3 font-display text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}
