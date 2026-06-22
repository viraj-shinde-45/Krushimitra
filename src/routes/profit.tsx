import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/profit")({
  head: () => ({ meta: [{ title: "Profit Calculator — KrishiMitra AI" }] }),
  component: ProfitPage,
});

// Realistic Indian crop defaults (per acre)
const CROP_DEFAULTS: Record<string, {
  seed: number; labour: number; fertilizer: number; machinery: number; water: number;
  yieldQtl: number; pricePerQtl: number; msp: number; subsidy: number;
  unit: string; notes: string;
}> = {
  "Wheat": { seed: 1800, labour: 8000, fertilizer: 5500, machinery: 4500, water: 2500, yieldQtl: 20, pricePerQtl: 2380, msp: 2275, subsidy: 2000, unit: "Quintal", notes: "Based on Punjab/UP average. Includes 4–5 irrigations." },
  "Rice / Paddy": { seed: 1200, labour: 12000, fertilizer: 6500, machinery: 5000, water: 4000, yieldQtl: 25, pricePerQtl: 2200, msp: 2183, subsidy: 1500, unit: "Quintal", notes: "Transplanted paddy, Kharif season. High labour due to transplanting." },
  "Soybean": { seed: 3600, labour: 5000, fertilizer: 3500, machinery: 3500, water: 1000, yieldQtl: 10, pricePerQtl: 4650, msp: 4600, subsidy: 1000, unit: "Quintal", notes: "Central India (MP/Maharashtra) rainfed estimate." },
  "Cotton (Bt)": { seed: 2200, labour: 15000, fertilizer: 8000, machinery: 5000, water: 3500, yieldQtl: 10, pricePerQtl: 7200, msp: 6620, subsidy: 3000, unit: "Quintal", notes: "3–4 pickings included. High labour for picking." },
  "Sugarcane": { seed: 8000, labour: 20000, fertilizer: 12000, machinery: 8000, water: 10000, yieldQtl: 280, pricePerQtl: 315, msp: 315, subsidy: 5000, unit: "Quintal (FRP rate)", notes: "FRP = Fair and Remunerative Price. Mill rate." },
  "Onion": { seed: 4000, labour: 20000, fertilizer: 10000, machinery: 4000, water: 6000, yieldQtl: 100, pricePerQtl: 1800, msp: 0, subsidy: 0, unit: "Quintal", notes: "Maharashtra Rabi onion. High variation in market price." },
  "Tomato": { seed: 5500, labour: 18000, fertilizer: 12000, machinery: 4000, water: 8000, yieldQtl: 100, pricePerQtl: 1500, msp: 0, subsidy: 0, unit: "Quintal", notes: "Price highly volatile. Use local market price." },
  "Mustard": { seed: 1500, labour: 5000, fertilizer: 4500, machinery: 3500, water: 1500, yieldQtl: 8, pricePerQtl: 5600, msp: 5650, subsidy: 800, unit: "Quintal", notes: "Rajasthan/Haryana Rabi. Includes 1–2 irrigations." },
  "Gram / Chickpea": { seed: 3500, labour: 4000, fertilizer: 3000, machinery: 3500, water: 1500, yieldQtl: 8, pricePerQtl: 5400, msp: 5440, subsidy: 800, unit: "Quintal", notes: "Central/North India Rabi. Rainfed + 1 irrigation." },
  "Maize": { seed: 2500, labour: 8000, fertilizer: 5500, machinery: 4000, water: 2500, yieldQtl: 22, pricePerQtl: 2100, msp: 2090, subsidy: 1200, unit: "Quintal", notes: "Kharif irrigated. Hybrid seed gives best results." },
  "Groundnut": { seed: 5000, labour: 12000, fertilizer: 4000, machinery: 4000, water: 3000, yieldQtl: 12, pricePerQtl: 5800, msp: 6377, subsidy: 1500, unit: "Quintal", notes: "Gujarat/Rajasthan. Pod yield basis." },
  "Tur / Pigeon Pea": { seed: 2000, labour: 6000, fertilizer: 3000, machinery: 3500, water: 1000, yieldQtl: 6, pricePerQtl: 7100, msp: 7000, subsidy: 1000, unit: "Quintal", notes: "Maharashtra Kharif. Rainfed / minimal irrigation." },
  "Potato": { seed: 18000, labour: 14000, fertilizer: 12000, machinery: 6000, water: 5000, yieldQtl: 120, pricePerQtl: 1000, msp: 0, subsidy: 0, unit: "Quintal", notes: "UP/Punjab Rabi. High seed cost (cut tubers)." },
  "Bajra": { seed: 800, labour: 4000, fertilizer: 3000, machinery: 3000, water: 1000, yieldQtl: 10, pricePerQtl: 2350, msp: 2500, subsidy: 600, unit: "Quintal", notes: "Rajasthan/Gujarat dryland Kharif. Drought tolerant." },
};

function ProfitPage() {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [acres, setAcres] = useState("2");
  const [includeSubsidy, setIncludeSubsidy] = useState(true);

  const defaults = CROP_DEFAULTS[selectedCrop];
  const [st, setSt] = useState({ ...defaults });

  const loadCrop = (crop: string) => {
    setSelectedCrop(crop);
    setSt({ ...CROP_DEFAULTS[crop] });
  };

  const update = (k: keyof typeof st) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setSt((s) => ({ ...s, [k]: Number(e.target.value) || 0 }));

  const acresNum = parseFloat(acres) || 1;
  const totalCostPerAcre = st.seed + st.labour + st.fertilizer + st.machinery + st.water;
  const totalCost = totalCostPerAcre * acresNum;
  const subsidyAmount = includeSubsidy ? st.subsidy * acresNum : 0;
  const netCost = totalCost - subsidyAmount;
  const revenue = st.yieldQtl * st.pricePerQtl * acresNum;
  const mspRevenue = st.msp > 0 ? st.yieldQtl * st.msp * acresNum : 0;
  const profit = revenue - netCost;
  const roi = netCost ? ((profit / netCost) * 100) : 0;
  const breakEvenPrice = st.yieldQtl > 0 ? Math.round(netCost / (st.yieldQtl * acresNum)) : 0;

  const chartData = [
    { name: t("profit.seed"), value: st.seed },
    { name: t("profit.labour"), value: st.labour },
    { name: t("profit.fertilizer"), value: st.fertilizer },
    { name: t("profit.machinery"), value: st.machinery },
    { name: t("profit.irrigation"), value: st.water },
  ];

  // Map English key to localized crops
  const getLocalizedCropName = (c: string) => {
    const keyMap: Record<string, string> = {
      "Wheat": "wheat",
      "Rice / Paddy": "rice",
      "Soybean": "soybean",
      "Cotton (Bt)": "cotton",
      "Sugarcane": "sugarcane",
      "Onion": "onion",
      "Tomato": "tomato",
      "Mustard": "mustard",
      "Gram / Chickpea": "gram",
      "Maize": "maize",
      "Groundnut": "groundnut",
      "Tur / Pigeon Pea": "tur",
      "Potato": "potato",
      "Bajra": "bajra",
    };
    return t("selections.crops." + (keyMap[c] || c.toLowerCase()));
  };

  const getCropTranslationKey = (c: string) => {
    if (c === "Rice / Paddy") return "RicePaddy";
    if (c === "Cotton (Bt)") return "CottonBt";
    if (c === "Gram / Chickpea") return "GramChickpea";
    if (c === "Tur / Pigeon Pea") return "TurPigeonPea";
    return c;
  };

  const translatedUnit = t(`profit.crops.${getCropTranslationKey(selectedCrop)}.unit`);
  const translatedNotes = t(`profit.crops.${getCropTranslationKey(selectedCrop)}.notes`);

  return (
    <DashboardShell title={t("profit.title")}>
      {/* Crop Selector */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>{t("profit.selectCrop")}</Label>
          <Select value={selectedCrop} onValueChange={loadCrop}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(CROP_DEFAULTS).map((c) => (
                <SelectItem key={c} value={c}>{getLocalizedCropName(c)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("profit.farmSizeAcres")}</Label>
          <Input type="number" min="0.1" step="0.1" value={acres} onChange={(e) => setAcres(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{t("profit.includeSubsidy")}</Label>
          <div className="flex h-10 items-center gap-3">
            <button
              onClick={() => setIncludeSubsidy(!includeSubsidy)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${includeSubsidy ? "bg-leaf" : "bg-border"}`}
            >
              <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${includeSubsidy ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm text-muted-foreground">
              {includeSubsidy ? t("profit.savings", { amount: (st.subsidy * acresNum).toLocaleString("en-IN") }) : t("profit.disabled")}
            </span>
          </div>
        </div>
      </div>

      {translatedNotes && (
        <div className="mb-5 flex items-start gap-2 rounded-xl border border-border bg-secondary/30 px-4 py-3 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
          {translatedNotes} {t("profit.notesTip")}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Inputs Panel */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft space-y-4">
          <h2 className="font-display text-xl font-semibold">{t("profit.costsPerAcreHeader")}</h2>
          {[
            { k: "seed", label: t("profit.seedCostLabel") },
            { k: "labour", label: t("profit.labourCostLabel") },
            { k: "fertilizer", label: t("profit.fertilizerCostLabel") },
            { k: "machinery", label: t("profit.machineryCostLabel") },
            { k: "water", label: t("profit.waterCostLabel") },
          ].map((f) => (
            <div key={f.k} className="space-y-1.5">
              <Label>{f.label}</Label>
              <Input type="number" value={st[f.k as keyof typeof st]} onChange={update(f.k as keyof typeof st)} />
            </div>
          ))}
          <div className="border-t border-border pt-4 space-y-4">
            <h2 className="font-display text-xl font-semibold">{t("profit.revenueHeader")}</h2>
            <div className="space-y-1.5">
              <Label>{t("profit.expectedYieldUnit", { unit: translatedUnit })}</Label>
              <Input type="number" value={st.yieldQtl} onChange={update("yieldQtl")} />
            </div>
            <div className="space-y-1.5">
              <Label>{t("profit.sellingPriceUnit", { unit: translatedUnit })}</Label>
              <Input type="number" value={st.pricePerQtl} onChange={update("pricePerQtl")} />
            </div>
            {st.msp > 0 && (
              <div className="rounded-xl border border-leaf/30 bg-leaf/5 px-4 py-3 text-sm">
                <span className="text-leaf font-semibold">{t("common.msp")}: </span>
                ₹{st.msp.toLocaleString("en-IN")}/{translatedUnit}
                {st.pricePerQtl < st.msp ? (
                  <span className="ml-2 text-terracotta font-semibold">{t("profit.belowMsp")}</span>
                ) : (
                  <span className="ml-2 text-leaf font-semibold">{t("profit.aboveMsp", { amount: (st.pricePerQtl - st.msp).toLocaleString("en-IN") })}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: t("profit.netCost"), value: `₹${netCost.toLocaleString("en-IN")}`, sub: t("profit.acresTotal", { count: acresNum }), color: "terracotta" },
              { label: t("profit.revenueHeader"), value: `₹${revenue.toLocaleString("en-IN")}`, sub: `@ ₹${st.pricePerQtl}/${translatedUnit}`, color: "wheat" },
              { label: t("profit.estimatedProfit"), value: `₹${profit.toLocaleString("en-IN")}`, sub: profit >= 0 ? t("profit.profitableCrop") : t("profit.lossWarning"), color: profit >= 0 ? "leaf" : "terracotta" },
              { label: t("profit.roi"), value: `${roi.toFixed(1)}%`, sub: roi > 30 ? t("profit.returnExcellent") : roi > 10 ? t("profit.returnGood") : t("profit.returnLow"), color: "primary" },
            ].map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} sub={s.sub} color={s.color} />
            ))}
          </div>

          {/* Break-even & MSP */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{t("profit.breakEvenPrice")}</span>
              <span className="font-display text-xl font-semibold">
                ₹{breakEvenPrice.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-muted-foreground">/{translatedUnit}</span>
              </span>
            </div>
            {st.pricePerQtl < breakEvenPrice && (
              <div className="mt-2 flex items-center gap-2 text-terracotta text-xs">
                <TrendingDown className="h-3.5 w-3.5" />
                {t("profit.breakEvenLossWarning")}
              </div>
            )}
            {st.msp > 0 && mspRevenue > 0 && (
              <div className="mt-3 pt-3 border-t border-border flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t("profit.revenueMsp")}</span>
                <span className={`font-display text-lg font-semibold ${mspRevenue > netCost ? "text-leaf" : "text-terracotta"}`}>
                  ₹{mspRevenue.toLocaleString("en-IN")}
                  {mspRevenue > netCost ? <TrendingUp className="inline h-4 w-4 ml-1" /> : <TrendingDown className="inline h-4 w-4 ml-1" />}
                </span>
              </div>
            )}
            {includeSubsidy && subsidyAmount > 0 && (
              <div className="mt-3 pt-3 border-t border-border flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{t("profit.subsidySavings")}</span>
                <span className="font-semibold text-leaf">₹{subsidyAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
          </div>

          {/* Cost Breakdown Chart */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-display text-lg font-semibold">{t("profit.costBreakdown")}</h3>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                    formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, t("profit.costLabel")]}
                  />
                  <Bar dataKey="value" fill="var(--leaf)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className={`rounded-2xl border border-${color}/30 bg-${color}/10 p-5`}>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-1 font-display text-3xl font-semibold text-${color}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
