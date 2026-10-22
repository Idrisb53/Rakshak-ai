import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Link2,
  QrCode,
  Globe,
  Smartphone,
  MailWarning,
  Radar,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroImage from "@/assets/rakshak-hero.jpg";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rakshak AI — India's Personal Cyber Guardian" },
      {
        name: "description",
        content:
          "AI-powered protection from phishing links, QR scams, fake websites, malicious apps and SMS fraud. Scan, understand the risk, and act in seconds.",
      },
      { property: "og:title", content: "Rakshak AI — India's Personal Cyber Guardian" },
      {
        property: "og:description",
        content:
          "Scan links, QR codes, websites, apps and messages with AI agents that explain the risk in plain language.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const modules = [
  {
    icon: Link2,
    title: "AI URL Scanner",
    body: "Reputation, homograph and typosquatting checks with an explainable 0–100 risk score.",
  },
  {
    icon: QrCode,
    title: "QR Scam Detector",
    body: "Decode any QR image, follow the redirect chain and expose the payment scam behind it.",
  },
  {
    icon: Globe,
    title: "Website Verification",
    body: "SSL, DNS, hosting and brand impersonation signals combined into one trust score.",
  },
  {
    icon: Smartphone,
    title: "APK Analyzer",
    body: "Permission, manifest and obfuscation analysis to flag fake banking and loan apps.",
  },
  {
    icon: MailWarning,
    title: "Email & SMS Fraud",
    body: "Header, sender and language analysis that catches OTP, KYC and courier scams.",
  },
  {
    icon: Radar,
    title: "Threat Intelligence",
    body: "Live indicator lookups and national-scale scam trends in one operations view.",
  },
];

const stats = [
  { value: "1.2M+", label: "Threats analysed" },
  { value: "8", label: "AI agents in the pipeline" },
  { value: "<4s", label: "Median scan time" },
  { value: "99.9%", label: "Platform uptime" },
];

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="hero-surface relative overflow-hidden">
        <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <Badge variant="outline" className="mb-6 gap-2 border-primary/40 text-primary">
              <Sparkles className="size-3.5" />
              Multi-agent threat analysis
            </Badge>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              India's Personal <span className="text-gradient">Cyber Guardian</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Rakshak AI checks suspicious links, QR codes, websites, apps and messages, then
              explains the danger in plain language with clear next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="glow-ring">
                <Link to="/scan">
                  Run a free scan <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">View the dashboard</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-success" />
              No account needed for your first scans. Evidence stays encrypted.
            </p>
          </div>

          <div className="relative">
            <div className="surface-panel overflow-hidden p-2">
              <img
                src={heroImage}
                alt="Holographic cyber shield protecting a network map of India"
                width={1536}
                height={1024}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/40">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">One platform, every scam surface</h2>
          <p className="mt-4 text-muted-foreground">
            Specialised agents investigate each threat type and hand their findings to a risk
            assessor that produces a single, explainable verdict.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <article key={m.title} className="surface-panel group p-6 transition-colors hover:border-primary/50">
              <span className="grid size-11 place-items-center rounded-lg bg-primary/12 text-primary">
                <m.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-card/30">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="surface-panel hero-surface flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Check something suspicious now</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Paste a link, upload a QR screenshot or drop in an SMS. You will get a risk score,
                the reasoning behind it and what to do next.
              </p>
            </div>
            <Button asChild size="lg" className="glow-ring shrink-0">
              <Link to="/scan">
                Open Scan Center <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
