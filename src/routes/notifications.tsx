import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { CloudRain, Bug, FileText, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — KrishiMitra AI" }] }),
  component: NotifPage,
});

const items = [
  { icon: CloudRain, color: "sky", category: "Weather", title: "Heavy rain alert for your district", time: "2 hours ago", body: "80–100 mm rainfall expected Wed–Thu. Postpone fertilizer and check drainage." },
  { icon: Bug, color: "terracotta", category: "Disease", title: "Yellow rust risk rising for wheat", time: "5 hours ago", body: "Cool humid conditions favor yellow rust. Scout fields for orange-yellow pustules." },
  { icon: FileText, color: "leaf", category: "Scheme", title: "PM-KISAN 17th installment released", time: "1 day ago", body: "₹2,000 will be credited to eligible farmer bank accounts this week." },
  { icon: TrendingUp, color: "wheat", category: "Market", title: "Wheat price up 4.2% at Latur mandi", time: "1 day ago", body: "Now ₹2,420/qtl. Expected to peak around ₹2,520 next Friday." },
];

function NotifPage() {
  return (
    <DashboardShell title="Notifications">
      <div className="space-y-3">
        {items.map((n, i) => (
          <div key={i} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-${n.color}/15 text-${n.color}`}>
              <n.icon className="h-5 w-5"/>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{n.category}</span>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              <h3 className="mt-1 font-display text-base font-semibold">{n.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
