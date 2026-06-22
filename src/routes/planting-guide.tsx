import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PLANTING_GUIDE_DATA } from "@/lib/planting-guide-data";

export const Route = createFileRoute("/planting-guide")({
  head: () => ({ meta: [{ title: "Planting Guide — KrishiMitra AI" }] }),
  component: PlantingGuidePage,
});

const LABELS: Record<string, Record<string, string>> = {
  en: {
    desc: "Step-by-step instructions for every major Indian crop — from seed selection to selling. Each guide also showcases traditional Indian farming methods with photos.",
    avgYield: "Avg yield",
    stepByStep: "Step-by-step procedure",
    traditional: "Traditional Indian methods",
    wisdom: "Wisdom passed down generations — still relevant today.",
    watchLearn: "Watch & learn"
  },
  hi: {
    desc: "हर प्रमुख भारतीय फसल के लिए चरण-दर-चरण निर्देश — बीज चयन से लेकर बिक्री तक। प्रत्येक मार्गदर्शिका चित्रों के साथ पारंपरिक भारतीय कृषि पद्धतियों को भी प्रदर्शित करती है।",
    avgYield: "औसत उपज",
    stepByStep: "चरण-दर-चरण प्रक्रिया",
    traditional: "पारंपरिक भारतीय पद्धतियां",
    wisdom: "पीढ़ियों से चली आ रही समझ — आज भी प्रासंगिक है।",
    watchLearn: "देखें और सीखें"
  },
  mr: {
    desc: "प्रत्येक प्रमुख भारतीय पिकासाठी टप्प्याटप्प्याने मार्गदर्शक तत्त्वे — बियाणे निवडीपासून ते विक्रीपर्यंत. प्रत्येक मार्गदर्शिका फोटोंसह पारंपरिक भारतीय शेती पद्धती देखील दर्शवते.",
    avgYield: "सरासरी उत्पन्न",
    stepByStep: "टप्प्याटप्प्याने प्रक्रिया",
    traditional: "पारंपरिक भारतीय पद्धती",
    wisdom: "पिढ्यानपिढ्या चालत आलेले ज्ञान — आजच्या काळातही तितकेच उपयुक्त.",
    watchLearn: "पहा आणि शिका"
  }
};

function PlantingGuidePage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const cropsList = PLANTING_GUIDE_DATA[lang] || PLANTING_GUIDE_DATA["en"];

  const [activeId, setActiveId] = useState(cropsList[0]?.id || "wheat");
  const active = cropsList.find((c) => c.id === activeId) || cropsList[0];

  const labels = LABELS[lang] || LABELS["en"];

  return (
    <DashboardShell title={t("sidebar.plantingGuide")}>
      <p className="text-muted-foreground max-w-2xl">
        {labels.desc}
      </p>

      {/* Crop picker */}
      <div className="mt-6 flex flex-wrap gap-2">
        {cropsList.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveId(c.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              c.id === activeId
                ? "border-primary bg-gradient-leaf text-primary-foreground shadow-glow"
                : "border-border bg-card hover:bg-secondary"
            }`}
          >
            <span className="mr-1">{c.emoji}</span> {c.name}
          </button>
        ))}
      </div>

      {active && (
        <>
          {/* Hero */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
          >
            <div
              className="h-56 sm:h-72 w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${active.hero})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
              <div className="absolute bottom-0 p-6 text-white">
                <div className="text-3xl">{active.emoji}</div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold">{active.name}</h2>
                <p className="opacity-90 text-sm mt-1 max-w-2xl">{active.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border">
              {[
                { label: t("common.season"), value: active.season },
                { label: t("cropRec.duration"), value: active.duration },
                { label: labels.avgYield, value: active.yield },
              ].map((m) => (
                <div key={m.label} className="p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                  <div className="font-display text-base sm:text-lg font-semibold mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step-by-step timeline */}
          <h3 className="font-display text-2xl font-semibold mt-10">{labels.stepByStep}</h3>
          <ol className="mt-6 relative border-l-2 border-dashed border-primary/30 ml-3 space-y-5">
            {active.steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="ml-6 relative"
                >
                  <span className="absolute -left-[37px] top-1 grid h-8 w-8 place-items-center rounded-full bg-gradient-leaf text-primary-foreground shadow-glow">
                    <Icon className="h-4 w-4"/>
                  </span>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                    <h4 className="font-display text-lg font-semibold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-leaf"/> {s.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{s.detail}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* Traditional methods */}
          <h3 className="font-display text-2xl font-semibold mt-12">{labels.traditional}</h3>
          <p className="text-sm text-muted-foreground">{labels.wisdom}</p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {active.traditional.map((tr) => (
              <div key={tr.title} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${tr.img})` }}/>
                <div className="p-4">
                  <h4 className="font-display font-semibold">{tr.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{tr.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video */}
          <h3 className="font-display text-2xl font-semibold mt-12 flex items-center gap-2">
            <Play className="h-5 w-5 text-primary"/> {labels.watchLearn}
          </h3>
          <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-soft aspect-video">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${active.videoId}`}
              title={`${active.name} farming video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </>
      )}
    </DashboardShell>
  );
}
