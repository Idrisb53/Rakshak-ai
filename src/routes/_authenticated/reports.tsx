import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Scale } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({
    meta: [
      { title: "Reports — evidence packages and complaint summaries" },
      {
        name: "description",
        content:
          "Download technical, executive and citizen reports from your Rakshak AI scans, plus cybercrime complaint summaries.",
      },
      { property: "og:title", content: "Reports — Rakshak AI" },
      {
        property: "og:description",
        content: "Technical, executive and complaint-ready reports from every scan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const reports = [
  { id: "RPT-10482", subject: "sbi-rewards-claim.in", type: "Technical", severity: "Critical", date: "14 Sep 2026" },
  { id: "RPT-10479", subject: "loanmitra-fast.apk", type: "Technical", severity: "High", date: "13 Sep 2026" },
  { id: "RPT-10471", subject: "Weekly exposure summary", type: "Executive", severity: "Medium", date: "12 Sep 2026" },
  { id: "RPT-10466", subject: "IRCTC refund SMS", type: "Citizen", severity: "High", date: "11 Sep 2026" },
  { id: "RPT-10458", subject: "qr-upi-payment.png", type: "Citizen", severity: "Medium", date: "10 Sep 2026" },
];

function severityTone(level: string) {
  if (level === "Critical") return "bg-destructive/15 text-destructive";
  if (level === "High") return "bg-warning/15 text-warning";
  return "bg-secondary text-secondary-foreground";
}

function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="Evidence packages, summaries and complaint drafts"
      actions={
        <Button size="sm" variant="outline" className="hidden sm:inline-flex">
          <Download className="size-4" /> Export all
        </Button>
      }
    >
      <div className="grid gap-5">
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            icon={FileText}
            title="Technical report"
            body="Full signal breakdown, indicators and agent reasoning for analysts."
          />
          <Card
            icon={FileText}
            title="Executive summary"
            body="Risk posture, exposure and trends for leadership review."
          />
          <Card
            icon={Scale}
            title="Complaint summary"
            body="A cybercrime-portal-ready narrative with an evidence package."
          />
        </div>

        <section className="surface-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border/70 p-5">
            <h2 className="text-base font-semibold">Generated reports</h2>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Download</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="max-w-56 truncate">{r.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{r.type}</TableCell>
                    <TableCell>
                      <span className={`rounded-md px-2 py-1 text-xs font-medium ${severityTone(r.severity)}`}>
                        {r.severity}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{r.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Card({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof FileText;
  title: string;
  body: string;
}) {
  return (
    <div className="surface-panel p-6">
      <span className="grid size-10 place-items-center rounded-lg bg-primary/12 text-primary">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
