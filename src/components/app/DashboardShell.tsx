import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, CalendarDays, CloudSun, LineChart, Leaf,
  Calculator, Bot, Users, Bell, Settings as SettingsIcon, Sprout, Menu, X, LogOut, Loader2, BookOpen,
  Camera, ShieldCheck,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const nav = [
  { to: "/dashboard", labelKey: "sidebar.dashboard", icon: LayoutDashboard },
  { to: "/crop-recommendation", labelKey: "sidebar.cropRecommendation", icon: Sprout },
  { to: "/disease-detection", labelKey: "sidebar.diseaseDetection", icon: Camera },
  { to: "/calendar", labelKey: "sidebar.aiCropCalendar", icon: CalendarDays },
  { to: "/planting-guide", labelKey: "sidebar.plantingGuide", icon: BookOpen },
  { to: "/weather", labelKey: "sidebar.weather", icon: CloudSun },
  { to: "/market", labelKey: "sidebar.market", icon: LineChart },
  { to: "/lifecycle", labelKey: "sidebar.cropLifecycle", icon: Leaf },
  { to: "/profit", labelKey: "sidebar.profitCalculator", icon: Calculator },
  { to: "/schemes", labelKey: "sidebar.govtSchemes", icon: ShieldCheck },
  { to: "/chat", labelKey: "sidebar.aiAssistant", icon: Bot },
  { to: "/community", labelKey: "sidebar.community", icon: Users },
  { to: "/notifications", labelKey: "sidebar.notifications", icon: Bell },
  { to: "/settings", labelKey: "sidebar.settings", icon: SettingsIcon },
] as const;

export function DashboardShell({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const { user, ready, signOut } = useAuth();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/auth", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="min-h-screen grid place-items-center bg-secondary/30">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const initial = (user.email ?? "F").charAt(0).toUpperCase();
  const displayName = (user.user_metadata?.full_name as string) || user.email || "Farmer";

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar (mobile) */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-card/90 backdrop-blur border-b border-border px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-leaf text-primary-foreground">
            <Sprout className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-semibold">{t("nav.title")}</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-9 w-9 place-items-center rounded-lg border border-border"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar desktop */}
        <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-20 border-r border-border bg-card/60 backdrop-blur">
          <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-border">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-leaf text-primary-foreground shadow-glow">
              <Sprout className="h-5 w-5" />
            </span>
            <div className="leading-none">
              <div className="font-display text-lg font-semibold">{t("nav.title")}</div>
              <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{t("nav.subtitle")}</div>
            </div>
          </Link>
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {nav.map((n) => {
              const active = loc.pathname === n.to || loc.pathname.startsWith(n.to + "/");
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-gradient-leaf text-primary-foreground shadow-soft"
                      : "text-foreground/75 hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" />
                  {t(n.labelKey)}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-3 rounded-xl p-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-leaf text-primary-foreground font-semibold">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{displayName}</div>
                <div className="truncate text-[11px] text-muted-foreground">{user.email}</div>
              </div>
              <button onClick={handleSignOut} aria-label={t("sidebar.logout")} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-terracotta">
                <LogOut className="h-4 w-4"/>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-foreground/40"
              onClick={() => setOpen(false)}
            >
              <motion.aside
                initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
                onClick={(e) => e.stopPropagation()}
                className="h-full w-72 bg-card border-r border-border p-4 flex flex-col overflow-y-auto"
              >
                <div className="space-y-1 flex-1">
                  {nav.map((n) => (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                    >
                      <n.icon className="h-4 w-4" />
                      {t(n.labelKey)}
                    </Link>
                  ))}
                </div>
                <Button onClick={handleSignOut} variant="outline" className="mt-3 w-full gap-2">
                  <LogOut className="h-4 w-4"/> {t("sidebar.logout")}
                </Button>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main */}
        <main className="flex-1 lg:ml-64">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
            <motion.h1
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl font-semibold tracking-tight"
            >
              {title}
            </motion.h1>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
