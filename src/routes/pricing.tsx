import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Rakshak AI plans for citizens and teams" },
      {
        name: "description",
        content:
          "Free scans for citizens, Pro for power users, Business for teams and Enterprise for government-scale deployments.",
      },
      { property: "og:title", content: "Pricing — Rakshak AI plans" },
      {
        property: "og:description",
        content: "Simple plans from free citizen scanning to enterprise threat operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "₹0",
    note: "for every citizen",
    features: ["100 scans / month", "URL, QR and SMS checks", "Plain-language verdicts", "Scan history"],
  },
  {
    name: "Pro",
    price: "₹399",
    note: "per month",
    featured: true,
    features: [
      "2,000 scans / month",
      "APK and website verification",
      "PDF reports",
      "Priority analysis queue",
    ],
  },
  {
    name: "Business",
    price: "₹2,999",
    note: "per month",
    features: ["25 team members", "Org dashboard & roles", "Threat intel feeds", "API access"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "talk to us",
    features: ["Unlimited scans", "SSO and audit exports", "Dedicated intel analyst", "On-prem option"],
  },
];

function PricingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="hero-surface">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold sm:text-5xl">Protection that scales with you</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free. Upgrade when you need deeper analysis, team visibility or reporting.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`surface-panel flex flex-col p-6 ${plan.featured ? "glow-ring border-primary/60" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{plan.name}</h2>
                  {plan.featured && <Badge className="text-xs">Popular</Badge>}
                </div>
                <p className="mt-4 font-display text-3xl font-bold">{plan.price}</p>
                <p className="text-xs text-muted-foreground">{plan.note}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={plan.featured ? "default" : "outline"}
                  className="mt-6 w-full"
                >
                  <Link to="/scan">{plan.name === "Enterprise" ? "Contact sales" : "Get started"}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
