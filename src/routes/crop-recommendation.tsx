import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sprout, Loader2, CheckCircle, Droplets, Calendar, Leaf, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCropRecommendation } from "@/lib/gemini.functions";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/crop-recommendation")({
  head: () => ({ meta: [{ title: "Crop Recommendation — KrishiMitra AI" }] }),
  component: CropRecommendationPage,
});

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
  "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal",
];

const SOIL_TYPES = [
  { key: "alluvial", apiValue: "Alluvial" },
  { key: "black", apiValue: "Black / Regur" },
  { key: "red_laterite", apiValue: "Red & Laterite" },
  { key: "sandy", apiValue: "Sandy" },
  { key: "clay", apiValue: "Clay" },
  { key: "loamy", apiValue: "Loamy" },
  { key: "silty", apiValue: "Silty" },
];

const WATER_SOURCES = [
  { key: "rainfed", apiValue: "Rain-fed" },
  { key: "canal", apiValue: "Canal" },
  { key: "borewell", apiValue: "Borewell / Tubewell" },
  { key: "river", apiValue: "River / Stream" },
  { key: "tank", apiValue: "Tank / Pond" },
  { key: "drip", apiValue: "Drip Irrigation" },
];

const SEASONS = [
  { key: "kharif", apiValue: "Kharif (Jun–Oct)" },
  { key: "rabi", apiValue: "Rabi (Nov–Mar)" },
  { key: "zaid", apiValue: "Zaid (Apr–Jun)" },
];

const COMMON_CROPS = [
  { key: "none", apiValue: "None (First crop)" },
  { key: "wheat", apiValue: "Wheat" },
  { key: "rice", apiValue: "Rice / Paddy" },
  { key: "sugarcane", apiValue: "Sugarcane" },
  { key: "cotton", apiValue: "Cotton" },
  { key: "soybean", apiValue: "Soybean" },
  { key: "maize", apiValue: "Maize" },
  { key: "groundnut", apiValue: "Groundnut" },
  { key: "tur", apiValue: "Tur / Pigeon Pea" },
  { key: "gram", apiValue: "Gram / Chickpea" },
  { key: "onion", apiValue: "Onion" },
  { key: "tomato", apiValue: "Tomato" },
  { key: "potato", apiValue: "Potato" },
  { key: "mustard", apiValue: "Mustard" },
  { key: "jowar", apiValue: "Jowar" },
  { key: "bajra", apiValue: "Bajra" },
];

interface CropRec {
  cropName: string;
  localName: string;
  suitabilityScore: number;
  reason: string;
  sowingTime: string;
  harvestTime: string;
  durationDays: number;
  expectedYieldPerAcre: string;
  currentMarketPrice: string;
  msp: string;
  estimatedRevenue: string;
  waterRequirement: string;
  fertilizerAdvice: string;
  pestRisks: string[];
  governmentSupport: string;
  difficulty: string;
  tips: string[];
}

function CropRecommendationPage() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState("Maharashtra");
  const [district, setDistrict] = useState("");
  const [landAcres, setLandAcres] = useState("2");
  const [soilType, setSoilType] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [season, setSeason] = useState("");
  const [previousCrop, setPreviousCrop] = useState("none");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CropRec[] | null>(null);
  const [selected, setSelected] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!district || !soilType || !waterSource || !season) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    setResults(null);
    try {
      const res = await getCropRecommendation({
        data: {
          state,
          district,
          landAcres: parseFloat(landAcres) || 2,
          soilType: SOIL_TYPES.find((s) => s.key === soilType)?.apiValue || soilType,
          waterSource: WATER_SOURCES.find((w) => w.key === waterSource)?.apiValue || waterSource,
          season: SEASONS.find((s) => s.key === season)?.apiValue || season,
          previousCrop: previousCrop === "none" ? undefined : (COMMON_CROPS.find((c) => c.key === previousCrop)?.apiValue || previousCrop),
          lang: (i18n.language || "en").split("-")[0],
        },
      });
      if (res.ok) {
        setResults(res.data.recommendations);
        setSelected(0);
        toast.success("Recommendations generated!");
      } else {
        toast.error(res.error);
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to get recommendations");
    } finally {
      setLoading(false);
    }
  };

  const rec = results?.[selected];

  return (
    <DashboardShell title={t("cropRec.title")}>
      <p className="text-muted-foreground max-w-2xl">
        {t("cropRec.desc")}
      </p>

      <form onSubmit={onSubmit} className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-display text-xl font-semibold mb-5">{t("dashboard.features")}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label>{t("common.state")} *</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("common.district")} *</Label>
            <Input
              placeholder={t("cropRec.districtPlaceholder")}
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.acres")} *</Label>
            <Input
              type="number" min="0.1" step="0.1"
              value={landAcres}
              onChange={(e) => setLandAcres(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>{t("common.soil")} *</Label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger><SelectValue placeholder={t("cropRec.selectSoil")} /></SelectTrigger>
              <SelectContent>
                {SOIL_TYPES.map((s) => <SelectItem key={s.key} value={s.key}>{t("selections.soilTypes." + s.key)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("common.water")} *</Label>
            <Select value={waterSource} onValueChange={setWaterSource}>
              <SelectTrigger><SelectValue placeholder={t("cropRec.selectWater")} /></SelectTrigger>
              <SelectContent>
                {WATER_SOURCES.map((s) => <SelectItem key={s.key} value={s.key}>{t("selections.waterSources." + s.key)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t("common.season")} *</Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger><SelectValue placeholder={t("cropRec.selectSeason")} /></SelectTrigger>
              <SelectContent>
                {SEASONS.map((s) => <SelectItem key={s.key} value={s.key}>{t("selections.seasons." + s.key)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Label>{t("common.prevCrop")}</Label>
            <Select value={previousCrop} onValueChange={setPreviousCrop}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {COMMON_CROPS.map((c) => <SelectItem key={c.key} value={c.key}>{t("selections.crops." + c.key)}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={loading} size="lg" className="bg-gradient-leaf text-primary-foreground shadow-glow">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sprout className="mr-2 h-4 w-4" />}
            {loading ? t("common.loading") : t("cropRec.generate")}
          </Button>
        </div>
      </form>

      {loading && (
        <div className="mt-8 flex flex-col items-center gap-4 py-16">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      )}

      {results && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <h2 className="font-display text-2xl font-semibold mb-2">{t("cropRec.resultsTitle")}</h2>
          <p className="text-sm text-muted-foreground mb-5">
            {t("cropRec.basedOnFarm")} <strong>{district}, {state}</strong> · {landAcres} {t("common.acres")} · {t("selections.soilTypes." + soilType)} · {t("selections.seasons." + season)}
          </p>

          {/* Crop Tabs */}
          <div className="flex flex-wrap gap-3 mb-6">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`rounded-2xl border px-5 py-3 text-left transition ${
                  selected === i
                    ? "border-primary bg-gradient-leaf text-primary-foreground shadow-glow"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <div className="text-xs opacity-80">{t("cropRec.recNumber", { number: i + 1 })}</div>
                <div className="font-display font-semibold">{r.cropName}</div>
                <div className={`text-xs ${selected === i ? "opacity-80" : "text-muted-foreground"}`}>{r.localName}</div>
                <div className={`mt-1 text-xs font-semibold ${selected === i ? "opacity-90" : "text-leaf"}`}>
                  {t("cropRec.score")}: {r.suitabilityScore}/100
                </div>
              </button>
            ))}
          </div>

          {rec && (
            <div className="space-y-5">
              {/* Header Card */}
              <div className="rounded-3xl bg-gradient-leaf p-7 text-primary-foreground shadow-glow">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm opacity-80">{t("cropRec.bestMatch")}</div>
                    <h3 className="font-display text-4xl font-semibold mt-1">{rec.cropName}</h3>
                    <p className="mt-1 opacity-85 text-lg">{rec.localName}</p>
                    <p className="mt-3 max-w-2xl opacity-90 text-sm leading-relaxed">{rec.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-display font-bold">{rec.suitabilityScore}<span className="text-lg">/100</span></div>
                    <div className="text-xs opacity-80 mt-1">{t("cropRec.suitability")}</div>
                    <div className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      rec.difficulty === "Easy" ? "bg-green-500/30" : rec.difficulty === "Medium" ? "bg-yellow-500/30" : "bg-red-500/30"
                    }`}>
                      {rec.difficulty}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: Calendar, label: t("cropRec.sowingTime"), value: rec.sowingTime, color: "leaf" },
                  { icon: Calendar, label: t("cropRec.harvestTime"), value: rec.harvestTime, color: "wheat" },
                  { icon: Sprout, label: t("common.expectedYield"), value: rec.expectedYieldPerAcre, color: "primary" },
                  { icon: IndianRupee, label: t("common.estimatedRevenue"), value: rec.estimatedRevenue, color: "terracotta" },
                ].map((s) => (
                  <div key={s.label} className={`rounded-2xl border border-${s.color}/30 bg-${s.color}/10 p-5`}>
                    <s.icon className={`h-5 w-5 text-${s.color}`} />
                    <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Market Info */}
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <h4 className="font-display text-lg font-semibold mb-4">{t("market.title")}</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{t("common.currentPrice")}</span>
                      <span className="font-semibold text-leaf">{rec.currentMarketPrice}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{t("common.msp")}</span>
                      <span className="font-semibold">{rec.msp}</span>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <span className="text-muted-foreground">{t("cropRec.duration")}</span>
                      <span className="font-semibold">{rec.durationDays} {t("cropRec.days")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("cropRec.waterReq")}</span>
                      <span className="font-semibold">{rec.waterRequirement}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                  <h4 className="font-display text-lg font-semibold mb-4">{t("cropRec.fertilizer")}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.fertilizerAdvice}</p>
                  <h5 className="font-semibold mt-4 mb-2">{t("cropRec.pests")}</h5>
                  <div className="flex flex-wrap gap-2">
                    {rec.pestRisks.map((p) => (
                      <span key={p} className="rounded-full border border-terracotta/30 bg-terracotta/10 px-3 py-1 text-xs text-terracotta">{p}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Government Support */}
              <div className="rounded-3xl border border-leaf/30 bg-leaf/5 p-5">
                <div className="flex items-center gap-2 text-leaf font-semibold mb-2">
                  <CheckCircle className="h-5 w-5" />
                  {t("cropRec.govtSupport")}
                </div>
                <p className="text-sm text-foreground/80">{rec.governmentSupport}</p>
              </div>

              {/* Tips */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <h4 className="font-display text-lg font-semibold mb-4">{t("common.tips")} {t("cropRec.for")} {rec.cropName}</h4>
                <ul className="space-y-2">
                  {rec.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                      <span className="text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </DashboardShell>
  );
}
