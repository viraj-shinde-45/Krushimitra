import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import i18n from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — KrishiMitra AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        return localStorage.getItem("km_lang") || "en";
      } catch (e) {
        console.warn("localStorage not available:", e);
      }
    }
    return "en";
  });
  const [dark, setDark] = useState<boolean>(() =>
    typeof window !== "undefined" ? document.documentElement.classList.contains("dark") : false);
  const [notifs, setNotifs] = useState({ weather: true, disease: true, scheme: true, market: false });
  const [name, setName] = useState("Farmer");
  const [phone, setPhone] = useState("+91 98XXXXXXXX");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("km_dark", dark ? "1" : "0");
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }, [dark]);

  useEffect(() => {
    try {
      localStorage.setItem("km_lang", lang);
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <DashboardShell title={t("settings.title")}>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title={t("settings.languageCard")}>
          <Label>{t("settings.appLanguage")}</Label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
              <SelectItem value="mr">मराठी (Marathi)</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        <Card title={t("settings.appearanceCard")}>
          <div className="flex items-center justify-between">
            <div>
              <Label>{t("settings.darkMode")}</Label>
              <p className="text-xs text-muted-foreground">{t("settings.darkModeDesc")}</p>
            </div>
            <Switch checked={dark} onCheckedChange={setDark}/>
          </div>
        </Card>

        <Card title={t("settings.notifsCard")}>
          {([
            ["weather", t("settings.notifsWeather")],
            ["disease", t("settings.notifsDisease")],
            ["scheme", t("settings.notifsScheme")],
            ["market", t("settings.notifsMarket")],
          ] as const).map(([k,l]) => (
            <div key={k} className="flex items-center justify-between py-1.5">
              <Label className="font-normal">{l}</Label>
              <Switch checked={notifs[k]} onCheckedChange={(v) => setNotifs((n) => ({...n,[k]:v}))}/>
            </div>
          ))}
        </Card>

        <Card title={t("settings.accountCard")}>
          <div className="space-y-3">
            <div>
              <Label>{t("settings.name")}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
              <Label>{t("settings.phone")}</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </div>
            <Button onClick={() => toast.success(t("settings.savedSuccess"))} className="bg-gradient-leaf text-primary-foreground">{t("settings.saveChanges")}</Button>
          </div>
        </Card>
      </div>
    </DashboardShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-3">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}
