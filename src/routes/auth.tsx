import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in or create account — Rakshak AI" },
      {
        name: "description",
        content:
          "Sign in to Rakshak AI to access your security dashboard, scan center, threat intelligence and reports.",
      },
      { property: "og:title", content: "Sign in — Rakshak AI" },
      {
        property: "og:description",
        content: "Access your Rakshak AI security dashboard and scan history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/dashboard", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back to Rakshak AI");
  }

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          full_name: String(form.get("full_name") ?? ""),
          organisation: String(form.get("organisation") ?? ""),
          mobile: String(form.get("mobile") ?? ""),
        },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      setPendingConfirm(true);
      toast.success("Check your inbox to confirm your email address.");
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hero-surface grid-backdrop hidden flex-col justify-between p-10 lg:flex">
        <Logo />
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-semibold leading-tight">
            Your personal <span className="text-gradient">cyber guardian</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Create an account to keep your scans, threat alerts and reports in one secure
            workspace protected by government-grade controls.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            {[
              "Scan history tied to your account",
              "Personal security score and trends",
              "Downloadable technical and complaint reports",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-4 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="font-mono text-xs text-muted-foreground">Built by IDRIS4HACK</p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 lg:hidden">
            <Logo />
          </div>

          {pendingConfirm ? (
            <div className="surface-panel rounded-2xl p-8 text-center">
              <ShieldCheck className="mx-auto size-8 text-primary" />
              <h1 className="mt-4 font-display text-xl font-semibold">Confirm your email</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                We sent you a confirmation link. Click it to activate your Rakshak AI account,
                then come back and sign in.
              </p>
              <Button className="mt-6 w-full" onClick={() => setPendingConfirm(false)}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <div className="surface-panel rounded-2xl p-6 sm:p-8">
              <h1 className="font-display text-2xl font-semibold">Welcome to Rakshak AI</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in or create an account to open your security workspace.
              </p>

              <Button
                type="button"
                variant="outline"
                className="mt-6 w-full"
                disabled={busy}
                onClick={handleGoogle}
              >
                Continue with Google
              </Button>

              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or use email
                <span className="h-px flex-1 bg-border" />
              </div>

              <Tabs defaultValue="signin">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign in</TabsTrigger>
                  <TabsTrigger value="signup">Create account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form className="mt-5 space-y-4" onSubmit={handleSignIn}>
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" name="email" type="email" required autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-password">Password</Label>
                      <Input
                        id="signin-password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                      />
                    </div>
                    <Button type="submit" className="w-full glow-ring" disabled={busy}>
                      {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
                      Sign in
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form className="mt-5 space-y-4" onSubmit={handleSignUp}>
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full name</Label>
                      <Input id="signup-name" name="full_name" required autoComplete="name" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="signup-org">Organisation</Label>
                        <Input id="signup-org" name="organisation" placeholder="Optional" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-mobile">Mobile</Label>
                        <Input id="signup-mobile" name="mobile" placeholder="+91" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" name="email" type="email" required autoComplete="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                      />
                    </div>
                    <Button type="submit" className="w-full glow-ring" disabled={busy}>
                      {busy && <Loader2 className="mr-2 size-4 animate-spin" />}
                      Create account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
