import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { motion } from "framer-motion";
import {
  CalendarDays, CloudSun, LineChart, Leaf, Calculator, Bot, Users,
  ArrowRight, Sprout, TrendingUp, Droplets, Sun, Camera, ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — KrishiMitra AI" }] }),
  component: DashboardPage,
});

const quickLinks = [
  { to: "/crop-recommendation", labelKey: "sidebar.cropRecommendation", icon: Sprout, color: "leaf", descKey: "cropRec.desc" },
  { to: "/disease-detection", labelKey: "sidebar.diseaseDetection", icon: Camera, color: "terracotta", descKey: "disease.desc" },
  { to: "/weather", labelKey: "sidebar.weather", icon: CloudSun, color: "sky", descKey: "weather.desc" },
  { to: "/market", labelKey: "sidebar.market", icon: LineChart, color: "wheat", descKey: "market.desc" },
  { to: "/calendar", labelKey: "sidebar.aiCropCalendar", icon: CalendarDays, color: "primary", descKey: "calendar.desc" },
  { to: "/lifecycle", labelKey: "sidebar.cropLifecycle", icon: Leaf, color: "leaf", descKey: "lifecycle.desc" },
  { to: "/profit", labelKey: "sidebar.profitCalculator", icon: Calculator, color: "terracotta", descKey: "profit.desc" },
  { to: "/schemes", labelKey: "sidebar.govtSchemes", icon: ShieldCheck, color: "primary", descKey: "schemes.desc" },
  { to: "/chat", labelKey: "sidebar.aiAssistant", icon: Bot, color: "soil", descKey: "chat.desc" },
  { to: "/community", labelKey: "sidebar.community", icon: Users, color: "leaf", descKey: "sidebar.community" },
] as const;

function DashboardPage() {
  const { t } = useTranslation();

  const stats = [
    { icon: Sprout, label: t("dashboard.farmHealth"), value: "92", suffix: "/100", color: "leaf" },
    { icon: TrendingUp, label: t("dashboard.wheatPrice"), value: "2,420", suffix: " +4.2%", color: "wheat" },
    { icon: Droplets, label: t("dashboard.soilMoisture"), value: "38", suffix: "%", color: "sky" },
    { icon: Sun, label: t("dashboard.todayWeather"), value: "31°", suffix: "C · Sunny", color: "terracotta" },
  ];

  return (
    <DashboardShell title={t("dashboard.welcome")}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-10 w-10 place-items-center rounded-xl bg-${s.color}/15 text-${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-display text-3xl font-semibold">
              {s.value}<span className="text-sm text-muted-foreground">{s.suffix}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">{t("dashboard.features")}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {quickLinks.map((q) => (
          <Link key={q.to} to={q.to} className="group">
            <motion.div
              whileHover={{ y: -4 }}
              className="h-full rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow group-hover:shadow-glow"
            >
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-${q.color}/15 text-${q.color}`}>
                <q.icon className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-base font-semibold">{t(q.labelKey)}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{t(q.descKey)}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
