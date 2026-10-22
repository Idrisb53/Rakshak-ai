import { createFileRoute } from "@tanstack/react-router";
import { Link2, QrCode, Globe, Smartphone, MailWarning, Upload } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/scan")({
  head: () => ({
    meta: [
      { title: "Scan Center — check links, QR codes, apps and messages" },
      {
        name: "description",
        content:
          "Submit a suspicious URL, QR image, website, APK file, email or SMS and get an explainable Rakshak AI risk verdict.",
      },
      { property: "og:title", content: "Scan Center — Rakshak AI" },
      {
        property: "og:description",
        content: "Check anything suspicious and get a clear risk verdict with next steps.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ScanPage,
});

const tabs = [
  { id: "url", label: "URL", icon: Link2 },
  { id: "qr", label: "QR code", icon: QrCode },
  { id: "website", label: "Website", icon: Globe },
  { id: "apk", label: "APK", icon: Smartphone },
  { id: "message", label: "Email / SMS", icon: MailWarning },
] as const;

const agents = [
  "Router agent",
  "Phishing agent",
  "Threat intel agent",
  "Risk assessment agent",
  "Recommendation agent",
];

function ScanPage() {
  return (
    <AppShell title="Scan Center" subtitle="Submit anything suspicious for AI analysis">
      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="surface-panel p-6">
          <Tabs defaultValue="url">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-secondary/60 p-1">
              {tabs.map((t) => (
                <TabsTrigger key={t.id} value={t.id} className="gap-2">
                  <t.icon className="size-4" />
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="url" className="mt-6 space-y-4">
              <Field label="Suspicious link">
                <Input placeholder="https://example-offer.in/claim" className="font-mono" />
              </Field>
              <SubmitRow hint="We never open the link on your device." />
            </TabsContent>

            <TabsContent value="qr" className="mt-6 space-y-4">
              <DropZone hint="Upload a QR screenshot or photo (PNG, JPG)" />
              <SubmitRow hint="We decode the QR and follow every redirect safely." />
            </TabsContent>

            <TabsContent value="website" className="mt-6 space-y-4">
              <Field label="Website address">
                <Input placeholder="example-bank-login.in" className="font-mono" />
              </Field>
              <SubmitRow hint="Checks SSL, DNS, hosting and brand impersonation." />
            </TabsContent>

            <TabsContent value="apk" className="mt-6 space-y-4">
              <DropZone hint="Upload an APK file (max 150 MB)" />
              <SubmitRow hint="Permissions, manifest and obfuscation are analysed." />
            </TabsContent>

            <TabsContent value="message" className="mt-6 space-y-4">
              <Field label="Paste the email or SMS">
                <Textarea rows={7} placeholder="Dear customer, your KYC will expire today..." />
              </Field>
              <SubmitRow hint="Sender, language and links are checked together." />
            </TabsContent>
          </Tabs>
        </section>

        <aside className="space-y-5">
          <div className="surface-panel p-6">
            <h2 className="text-base font-semibold">Analysis pipeline</h2>
            <ol className="mt-4 space-y-3">
              {agents.map((a, i) => (
                <li key={a} className="flex items-center gap-3 text-sm">
                  <span className="grid size-7 place-items-center rounded-md bg-primary/12 font-mono text-xs text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{a}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="surface-panel p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold">Scan quota</h2>
              <Badge variant="secondary">Free plan</Badge>
            </div>
            <p className="mt-3 font-display text-2xl font-bold">58 left</p>
            <p className="text-xs text-muted-foreground">Resets on the 1st of next month.</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function DropZone({ hint }: { hint: string }) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-border bg-secondary/30 px-6 py-12 text-center">
      <Upload className="size-6 text-primary" />
      <p className="mt-3 text-sm font-medium">Drop your file here</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      <Button variant="outline" size="sm" className="mt-4">
        Choose file
      </Button>
    </div>
  );
}

function SubmitRow({ hint }: { hint: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
      <p className="text-xs text-muted-foreground">{hint}</p>
      <Button className="glow-ring">Analyse now</Button>
    </div>
  );
}
