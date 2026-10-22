import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Rakshak AI account and security" },
      {
        name: "description",
        content: "Manage your Rakshak AI profile, alert preferences and account security options.",
      },
      { property: "og:title", content: "Settings — Rakshak AI" },
      { property: "og:description", content: "Profile, alerts and security preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  { id: "alerts", label: "Threat alerts", hint: "Notify me when a new scam campaign targets my region." },
  { id: "weekly", label: "Weekly security digest", hint: "A summary of my scans and risk score." },
  { id: "mfa", label: "Two-factor authentication", hint: "Require a second step at sign in." },
];

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Profile, alerts and account security">
      <div className="grid max-w-4xl gap-5">
        <section className="surface-panel p-6">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Organisation</Label>
              <Input id="org" placeholder="Optional" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile</Label>
              <Input id="phone" placeholder="+91" />
            </div>
          </div>
          <Button className="mt-5">Save profile</Button>
        </section>

        <section className="surface-panel p-6">
          <h2 className="text-base font-semibold">Preferences</h2>
          <div className="mt-4 space-y-4">
            {toggles.map((t, i) => (
              <div key={t.id}>
                {i > 0 && <Separator className="mb-4" />}
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <Label htmlFor={t.id}>{t.label}</Label>
                    <p className="mt-1 text-xs text-muted-foreground">{t.hint}</p>
                  </div>
                  <Switch id={t.id} defaultChecked={t.id !== "mfa"} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
