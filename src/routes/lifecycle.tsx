import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Shovel, Beaker, Droplets, Bug, Tractor, Package, ChevronDown, ChevronUp, Clock, AlertCircle, Sun } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { CROP_LIFECYCLE_DATA } from "@/lib/crop-lifecycle-data";

export const Route = createFileRoute("/lifecycle")({
  head: () => ({ meta: [{ title: "Crop Lifecycle Guide — KrishiMitra AI" }] }),
  component: LifecyclePage,
});

const getStageIcon = (index: number, crop: string) => {
  const icons: Record<string, any[]> = {
    Wheat: [Package, Shovel, Sprout, Droplets, Beaker, Bug, Sun, Tractor, Package],
    "Rice / Paddy": [Package, Shovel, Sprout, Droplets, Beaker, Bug, Tractor],
    Cotton: [Package, Shovel, Sprout, Sprout, Bug, Sun],
    Soybean: [Package, Shovel, Bug, Tractor],
    Onion: [Package, Shovel, Bug, Tractor]
  };
  const list = icons[crop] || [Package, Shovel, Sprout, Droplets, Beaker, Bug, Sun, Tractor, Package];
  return list[index] || Sprout;
};

// Translating keys for the dropdown options
const CROP_MAP: Record<string, string> = {
  Wheat: "Wheat",
  "Rice / Paddy": "Rice / Paddy",
  Cotton: "Cotton",
  Soybean: "Soybean",
  Onion: "Onion",
};

const CROP_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    Wheat: "Wheat",
    "Rice / Paddy": "Rice / Paddy",
    Cotton: "Cotton",
    Soybean: "Soybean",
    Onion: "Onion",
  },
  hi: {
    Wheat: "गेहूँ",
    "Rice / Paddy": "धान / चावल",
    Cotton: "कपास",
    Soybean: "सोयाबीन",
    Onion: "प्याज",
  },
  mr: {
    Wheat: "गहू",
    "Rice / Paddy": "तांदूळ / भात",
    Cotton: "कापूस",
    Soybean: "सोयाबीन",
    Onion: "कांदा",
  }
};

function LifecyclePage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  const cropLangData = CROP_LIFECYCLE_DATA[lang] || CROP_LIFECYCLE_DATA["en"];
  const crop = cropLangData[selectedCrop];

  const getCropTranslation = (name: string) => {
    return CROP_TRANSLATIONS[lang]?.[name] || name;
  };

  return (
    <DashboardShell title={t("lifecycle.title")}>
      <p className="text-muted-foreground max-w-2xl">
        {t("lifecycle.desc")}
      </p>

      {/* Crop Selector */}
      <div className="mt-6 mb-8 max-w-xs space-y-2">
        <Label>{lang === "hi" ? "फसल चुनें" : lang === "mr" ? "पीक निवडा" : "Select Crop"}</Label>
        <Select value={selectedCrop} onValueChange={(v) => { setSelectedCrop(v); setExpandedStage(null); }}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.keys(CROP_MAP).map((c) => (
              <SelectItem key={c} value={c}>{getCropTranslation(c)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {crop && (
        <>
          {/* Crop Overview */}
          <div className="mb-8 rounded-3xl bg-gradient-leaf p-6 text-primary-foreground shadow-glow">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs opacity-70 uppercase tracking-wider">
                  {lang === "hi" ? "फसल अवलोकन" : lang === "mr" ? "पीक आढावा" : "Crop Overview"}
                </div>
                <h2 className="font-display text-2xl font-semibold mt-1">{getCropTranslation(selectedCrop)}</h2>
                <p className="mt-2 max-w-xl text-sm opacity-90 leading-relaxed">{crop.description}</p>
              </div>
              <div className="space-y-1 text-right">
                <div>
                  <div className="text-xs opacity-70">
                    {lang === "hi" ? "कुल अवधि" : lang === "mr" ? "एकूण कालावधी" : "Total Duration"}
                  </div>
                  <div className="font-display font-semibold">{crop.totalDays}</div>
                </div>
                <div>
                  <div className="text-xs opacity-70">
                    {lang === "hi" ? "मौसम" : lang === "mr" ? "हंगाम" : "Season"}
                  </div>
                  <div className="font-display font-semibold text-sm">{crop.season}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stages */}
          <div className="relative">
            <div aria-hidden className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-leaf via-wheat to-soil" />
            <div className="space-y-4">
              {crop.stages.map((s, i) => {
                const IconComponent = getStageIcon(i, selectedCrop);
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="relative flex gap-5"
                  >
                    <div className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-${s.color}/15 text-${s.color} border-2 border-card shadow-soft`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-border bg-card shadow-soft overflow-hidden">
                      <button
                        onClick={() => setExpandedStage(expandedStage === i ? null : i)}
                        className="w-full p-5 text-left flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                              {lang === "hi" ? `चरण ${i + 1}` : lang === "mr" ? `टप्पा ${i + 1}` : `Stage ${i + 1}`}
                            </span>
                            <span className={`rounded-full border border-${s.color}/30 bg-${s.color}/10 px-2 py-0.5 text-[10px] font-semibold text-${s.color}`}>
                              <Clock className="inline h-2.5 w-2.5 mr-1" />{s.duration}
                            </span>
                          </div>
                          <h3 className="mt-1 font-display text-xl font-semibold">{s.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                        </div>
                        {expandedStage === i ? <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />}
                      </button>

                      {expandedStage === i && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-t border-border px-5 pb-5 pt-4 grid gap-4 sm:grid-cols-3"
                        >
                          <div>
                            <h4 className="text-sm font-semibold text-leaf mb-2">✅ {t("lifecycle.activities")}</h4>
                            <ul className="space-y-1.5">
                              {s.keyActivities.map((a, j) => (
                                <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="text-leaf font-bold shrink-0">{j + 1}.</span>{a}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-primary mb-2">📦 {t("lifecycle.inputs")}</h4>
                            <ul className="space-y-1.5">
                              {s.inputs.map((inp, j) => (
                                <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary font-bold shrink-0">•</span>{inp}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-terracotta mb-2">⚠️ {t("lifecycle.problems")}</h4>
                            <ul className="space-y-1.5">
                              {s.commonProblems.map((p, j) => (
                                <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                  <AlertCircle className="h-3 w-3 text-terracotta shrink-0 mt-0.5" />{p}
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 rounded-xl bg-leaf/5 border border-leaf/20 p-3">
                              <p className="text-xs font-semibold text-leaf">💡 {t("lifecycle.expertTip")}</p>
                              <p className="mt-1 text-xs text-muted-foreground">{s.tips}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </DashboardShell>
  );
}
