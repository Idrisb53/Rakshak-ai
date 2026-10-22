import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Platform — Rakshak AI threat analysis modules" },
      {
        name: "description",
        content:
          "Inside Rakshak AI: URL scanning, QR decoding, website verification, APK analysis, message fraud detection and a multi-agent risk pipeline.",
      },
      { property: "og:title", content: "Platform — Rakshak AI threat analysis modules" },
      {
        property: "og:description",
        content: "How Rakshak AI's specialised agents investigate and score every scam surface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeaturesPage,
});

const pipeline = [
  { step: "Router agent", body: "Classifies the input and dispatches it to the right specialist." },
  { step: "Specialist agents", body: "Phishing, QR, website, APK and message agents gather evidence." },
  { step: "Threat intelligence", body: "Indicators are cross-checked against live scam feeds." },
  { step: "Risk assessment", body: "Signals are weighted into a 0–100 score with confidence." },
  { step: "Recommendations", body: "Plain-language actions for citizens and analysts alike." },
  { step: "Report agent", body: "Produces technical, executive and complaint-ready summaries." },
];

const capabilities = [
  {
    group: "Detection",
    items: [
      "Homograph and typosquatting detection",
      "Domain age, WHOIS and SSL inspection",
      "Redirect chain unwrapping",
      "Brand impersonation matching",
      "Dangerous permission and API analysis",
    ],
  },
  {
    group: "Explainability",
    items: [
      "Evidence trail for every signal",
      "Confidence score alongside risk score",
      "Plain-language reasoning",
      "Severity classification",
      "Recommended next actions",
    ],
  },
  {
    group: "Enterprise",
    items: [
      "Role-based access for teams",
      "Audit logging of every scan",
      "Scan quotas and usage limits",
      "Exportable evidence packages",
      "Organisation-wide risk reporting",
    ],
  },
];

function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/70">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
            <Badge variant="outline" className="mb-5 border-primary/40 text-primary">
              Platform
            </Badge>
            <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">
              A multi-agent pipeline behind every verdict
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Each scan flows through specialised agents that gather evidence, weigh it and explain
              the outcome — so people understand the risk, not just a colour.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold">How a scan runs</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p, i) => (
              <li key={p.step} className="surface-panel p-6">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold">{p.step}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.group} className="surface-panel p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {c.group}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {c.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
