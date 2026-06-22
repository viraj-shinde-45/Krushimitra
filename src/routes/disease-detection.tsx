import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Camera, Upload, Loader2, AlertTriangle, CheckCircle, Leaf, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { detectCropDisease } from "@/lib/gemini.functions";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/disease-detection")({
  head: () => ({ meta: [{ title: "Disease Detection — KrishiMitra AI" }] }),
  component: DiseaseDetectionPage,
});

const CROPS = [
  "Not sure", "Wheat (गेहूँ)", "Rice / Paddy (धान)", "Cotton (कपास)", "Sugarcane (गन्ना)",
  "Tomato (टमाटर)", "Potato (आलू)", "Onion (प्याज)", "Maize (मक्का)", "Soybean (सोयाबीन)",
  "Groundnut (मूंगफली)", "Gram / Chickpea (चना)", "Mustard (सरसों)", "Tur / Pigeon Pea (तूर)",
  "Bajra (बाजरा)", "Jowar (ज्वार)", "Sunflower (सूरजमुखी)", "Brinjal (बैंगन)",
  "Chilli (मिर्च)", "Mango (आम)", "Banana (केला)",
];

interface DiseaseResult {
  isHealthy: boolean;
  diseaseName?: string;
  localName?: string;
  confidencePercent?: number;
  affectedParts?: string[];
  severity?: string;
  stage?: string;
  symptoms?: string[];
  spreadRisk?: string;
  yieldLossRisk?: string;
  organicRemedies?: string[];
  chemicalRemedies?: string[];
  preventiveMeasures?: string[];
  immediateAction?: string;
  nearbyResources?: string;
}

function DiseaseDetectionPage() {
  const { t, i18n } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState("Not sure");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    setImageFile(file);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onAnalyze = async () => {
    if (!imageFile || !imagePreview) {
      toast.error("Please upload a crop image first");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const base64 = imagePreview.split(",")[1];
      const mimeType = imageFile.type;
      const res = await detectCropDisease({
        data: {
          cropName: selectedCrop === "Not sure" ? undefined : selectedCrop,
          imageBase64: base64,
          mimeType,
          lang: (i18n.language || "en").split("-")[0],
        },
      });
      if (res.ok) {
        setResult(res.data);
        toast.success("Analysis complete!");
      } else {
        toast.error(res.error);
      }
    } catch (e: any) {
      toast.error(e?.message ?? "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <DashboardShell title={t("disease.title")}>
      <p className="text-muted-foreground max-w-2xl">
        {t("disease.desc")}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Upload Panel */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label>{t("disease.selectCrop")}</Label>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CROPS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Drop Zone */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => !imagePreview && fileRef.current?.click()}
            className={`relative rounded-3xl border-2 border-dashed transition cursor-pointer ${
              imagePreview ? "border-primary/40 bg-card" : "border-border bg-card hover:border-primary/60 hover:bg-secondary/30"
            }`}
          >
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Crop preview" className="w-full rounded-3xl object-cover max-h-80" />
                <button
                  onClick={(e) => { e.stopPropagation(); clearImage(); }}
                  className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary mb-4">
                  <Camera className="h-8 w-8" />
                </div>
                <p className="font-semibold">{t("disease.dragDrop")}</p>
                <p className="mt-1 text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("disease.uploadTip", "Tip: Take a close-up photo of the affected leaf in good natural light")}
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />

          {imagePreview && (
            <div className="flex gap-3">
              <Button
                onClick={onAnalyze}
                disabled={loading}
                className="flex-1 bg-gradient-leaf text-primary-foreground shadow-glow"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Leaf className="mr-2 h-4 w-4" />}
                {loading ? t("common.loading") : t("disease.analyze")}
              </Button>
              <Button variant="outline" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">📸 {t("disease.bestResultsTip", "Tips for best results:")}</p>
            <p>• {t("disease.tip1", "Use natural light, avoid shadows")}</p>
            <p>• {t("disease.tip2", "Focus on the most affected area")}</p>
            <p>• {t("disease.tip3", "Include both healthy and diseased parts")}</p>
            <p>• {t("disease.tip4", "Multiple leaves in one photo is fine")}</p>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center h-full py-24 gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground text-center">
                {t("disease.analyzing", "AI is analyzing your crop image…")}
                <br/>
                <span className="text-xs">{t("disease.timeWait", "This takes 5–10 seconds")}</span>
              </p>
            </div>
          )}

          {!loading && !result && (
            <div className="flex flex-col items-center justify-center h-full py-24 gap-4 text-center">
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-secondary text-muted-foreground">
                <Camera className="h-10 w-10" />
              </div>
              <p className="text-muted-foreground">
                {t("disease.placeholder", "Upload a crop image to see AI disease analysis here")}
              </p>
            </div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              {/* Status Banner */}
              {result.isHealthy ? (
                <div className="rounded-3xl border border-leaf/40 bg-leaf/10 p-6">
                  <div className="flex items-center gap-3 text-leaf">
                    <CheckCircle className="h-7 w-7" />
                    <div>
                      <div className="font-display text-xl font-semibold">{t("disease.healthy")} 🌱</div>
                      <div className="text-sm opacity-80">{t("disease.healthyDesc", "No disease detected in the uploaded image")}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`rounded-3xl p-6 ${
                  result.severity === "Severe" ? "border border-terracotta/50 bg-terracotta/10" :
                  result.severity === "Moderate" ? "border border-yellow-500/40 bg-yellow-500/10" :
                  "border border-orange-400/40 bg-orange-400/10"
                }`}>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-terracotta" />
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{t("disease.unhealthy")}</span>
                      </div>
                      <h3 className="font-display text-2xl font-semibold mt-1">{result.diseaseName}</h3>
                      <p className="text-muted-foreground">{result.localName}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-4xl font-bold text-primary">{result.confidencePercent}%</div>
                      <div className="text-xs text-muted-foreground">{t("disease.confidence", "Confidence")}</div>
                      <div className={`mt-1 rounded-full px-3 py-0.5 text-xs font-semibold inline-block ${
                        result.severity === "Severe" ? "bg-terracotta/20 text-terracotta" :
                        result.severity === "Moderate" ? "bg-yellow-500/20 text-yellow-700" :
                        "bg-orange-400/20 text-orange-700"
                      }`}>{result.severity} {t("disease.severityText", "severity")}</div>
                    </div>
                  </div>
                </div>
              )}

              {!result.isHealthy && result.immediateAction && (
                <div className="rounded-2xl border border-terracotta/40 bg-terracotta/10 p-4">
                  <p className="text-sm font-semibold text-terracotta">⚡ {t("disease.action")}</p>
                  <p className="mt-1 text-sm">{result.immediateAction}</p>
                </div>
              )}

              {!result.isHealthy && (
                <>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h4 className="font-display font-semibold mb-3">{t("disease.resultsTitle")}</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">{t("disease.stage", "Stage")}</div>
                        <div className="font-medium">{result.stage}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{t("disease.affectedParts", "Affected Parts")}</div>
                        <div className="font-medium">{result.affectedParts?.join(", ")}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{t("disease.spreadRisk", "Spread Risk")}</div>
                        <div className="font-medium text-terracotta">{result.spreadRisk}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">{t("disease.yieldLossRisk", "Yield Loss Risk")}</div>
                        <div className="font-medium text-terracotta">{result.yieldLossRisk}</div>
                      </div>
                    </div>
                    {result.symptoms && result.symptoms.length > 0 && (
                      <>
                        <h5 className="mt-3 text-sm font-semibold">{t("disease.symptoms")}</h5>
                        <ul className="mt-1 space-y-1">
                          {result.symptoms.map((s, i) => (
                            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-terracotta">•</span>{s}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-leaf/30 bg-leaf/5 p-4">
                      <h4 className="font-display font-semibold text-leaf mb-3">{t("disease.organic")}</h4>
                      <ul className="space-y-2">
                        {result.organicRemedies?.map((r, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-leaf font-bold">{i + 1}.</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4">
                      <h4 className="font-display font-semibold text-primary mb-3">{t("disease.chemical")}</h4>
                      <ul className="space-y-2">
                        {result.chemicalRemedies?.map((r, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-primary font-bold">{i + 1}.</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {result.preventiveMeasures && result.preventiveMeasures.length > 0 && (
                    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                      <h4 className="font-display font-semibold mb-3">{t("disease.prevention")}</h4>
                      <ul className="space-y-2">
                        {result.preventiveMeasures.map((m, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-leaf mt-0.5 shrink-0" />{m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.nearbyResources && (
                    <div className="rounded-2xl border border-sky/30 bg-sky/5 p-4 text-sm">
                      <p className="font-semibold text-sky">{t("disease.resources")}</p>
                      <p className="mt-1 text-muted-foreground">{result.nearbyResources}</p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
