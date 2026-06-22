import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ExternalLink, ChevronDown, ChevronUp, IndianRupee, Users, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SCHEMES_DATA } from "@/lib/schemes-data";

export const Route = createFileRoute("/schemes")({
  head: () => ({ meta: [{ title: "Government Schemes — KrishiMitra AI" }] }),
  component: SchemesPage,
});

const CATEGORIES = ["All", "Income Support", "Insurance", "Credit", "Soil & Organic", "Market", "Technology"];

const CATEGORY_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "All": "All",
    "Income Support": "Income Support",
    "Insurance": "Insurance",
    "Credit": "Credit",
    "Soil & Organic": "Soil & Organic",
    "Market": "Market",
    "Technology": "Technology"
  },
  hi: {
    "All": "सभी योजनाएं",
    "Income Support": "आय सहायता",
    "Insurance": "फसल बीमा",
    "Credit": "कृषि ऋण (लोन)",
    "Soil & Organic": "मिट्टी और जैविक",
    "Market": "कृषि बाजार (मंडी)",
    "Technology": "तकनीक और मशीनरी"
  },
  mr: {
    "All": "सर्व योजना",
    "Income Support": "थेट आर्थिक मदत",
    "Insurance": "पीक विमा",
    "Credit": "कृषी कर्ज",
    "Soil & Organic": "माती आणि सेंद्रिय शेती",
    "Market": "कृषी बाजार",
    "Technology": "तंत्रज्ञान आणि यंत्रे"
  }
};

function SchemesPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const schemes = SCHEMES_DATA[lang] || SCHEMES_DATA["en"];
  const visible = filter === "All" ? schemes : schemes.filter((s) => s.category === filter);

  const getTranslatedCategory = (cat: string) => {
    return CATEGORY_TRANSLATIONS[lang]?.[cat] || cat;
  };

  return (
    <DashboardShell title={t("schemes.title")}>
      <p className="text-muted-foreground max-w-2xl">
        {t("schemes.desc")}
      </p>

      {/* Category Filter */}
      <div className="mt-6 flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              filter === c
                ? "bg-gradient-leaf text-primary-foreground shadow-soft"
                : "bg-card border border-border hover:bg-secondary"
            }`}
          >
            {getTranslatedCategory(c)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {visible.map((scheme, i) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-3xl border border-border bg-card shadow-soft overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(expanded === scheme.id ? null : scheme.id)}
              className="w-full p-6 text-left flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-${scheme.color}/15 text-${scheme.color}`}>
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`rounded-full border border-${scheme.color}/40 bg-${scheme.color}/10 px-2.5 py-0.5 text-xs font-semibold text-${scheme.color}`}>
                      {scheme.shortName}
                    </span>
                    <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                      {getTranslatedCategory(scheme.category)}
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold">{scheme.name}</h3>
                  <p className="text-sm text-muted-foreground">{scheme.benefit}</p>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-leaf">
                    <IndianRupee className="h-4 w-4" />
                    {scheme.amount}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-muted-foreground">
                {expanded === scheme.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </div>
            </button>

            {/* Expanded Content */}
            {expanded === scheme.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="border-t border-border"
              >
                <div className="p-6 grid gap-6 md:grid-cols-3">
                  <div>
                    <div className="flex items-center gap-2 font-semibold mb-3">
                      <Users className="h-4 w-4 text-primary" />
                      {t("schemes.eligibility")}
                    </div>
                    <ul className="space-y-1.5">
                      {scheme.eligibility.map((e, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-leaf font-bold shrink-0">✓</span>{e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-semibold mb-3">
                      <FileText className="h-4 w-4 text-primary" />
                      {t("schemes.documents")}
                    </div>
                    <ul className="space-y-1.5">
                      {scheme.documents.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold shrink-0">{idx + 1}.</span>{d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-semibold mb-3">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {t("schemes.howToApply")}
                    </div>
                    <ol className="space-y-1.5">
                      {scheme.howToApply.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-primary/10 text-[9px] font-bold text-primary mt-0.5">{idx + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <a
                      href={scheme.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("schemes.officialWebsite")}
                    </a>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <span className="text-xs text-muted-foreground">{t("schemes.availableIn")}: {scheme.states}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </DashboardShell>
  );
}
