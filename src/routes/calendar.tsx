import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  CROPS, generateSchedule, stageColors, stageLabels, stageEmoji, type ScheduleEvent,
} from "@/lib/crop-calendar";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "AI Crop Calendar — KrishiMitra AI" }] }),
  component: CalendarPage,
});

const CROP_NAMES: Record<string, Record<string, string>> = {
  en: {
    Wheat: "Wheat",
    Rice: "Rice",
    Maize: "Maize",
    Cotton: "Cotton",
    Soybean: "Soybean",
    Tomato: "Tomato",
    Sugarcane: "Sugarcane",
    Pulses: "Pulses",
  },
  hi: {
    Wheat: "गेहूँ",
    Rice: "धान / चावल",
    Maize: "मक्का",
    Cotton: "कपास",
    Soybean: "सोयाबीन",
    Tomato: "टमाटर",
    Sugarcane: "गन्ना",
    Pulses: "दालें / दलहन",
  },
  mr: {
    Wheat: "गहू",
    Rice: "तांदूळ / धान",
    Maize: "मका",
    Cotton: "कापूस",
    Soybean: "सोयाबीन",
    Tomato: "टोमॅटो",
    Sugarcane: "ऊस",
    Pulses: "कडधान्ये",
  }
};

const STAGE_LABELS: Record<string, Record<string, string>> = {
  en: {
    seed: "Seed",
    land: "Land Prep",
    sowing: "Sowing",
    fertilizer: "Fertilizer",
    irrigation: "Irrigation",
    pest: "Pest Control",
    harvest: "Harvest",
    sell: "Sell",
  },
  hi: {
    seed: "बीज",
    land: "भूमि तैयारी",
    sowing: "बुवाई",
    fertilizer: "उर्वरक (खाद)",
    irrigation: "सिंचाई",
    pest: "कीट नियंत्रण",
    harvest: "कटाई",
    sell: "बिक्री",
  },
  mr: {
    seed: "बियाणे",
    land: "जमीन तयार करणे",
    sowing: "पेरणी",
    fertilizer: "खत व्यवस्थापन",
    irrigation: "सिंचन",
    pest: "कीड नियंत्रण",
    harvest: "काढणी",
    sell: "विक्री",
  }
};

const EVENT_TITLES: Record<string, Record<string, string>> = {
  en: {
    seed: "Buy quality seeds",
    land: "Land preparation",
    sowing: "Sowing window",
    fertilizer: "Apply fertilizer",
    irrigation: "Irrigation cycle",
    pest: "Pest & disease inspection",
    harvest: "Harvesting",
    sell: "Best selling window",
  },
  hi: {
    seed: "गुणवत्तापूर्ण बीज खरीदें",
    land: "भूमि की तैयारी",
    sowing: "बुवाई का समय",
    fertilizer: "उर्वरक (खाद) डालें",
    irrigation: "सिंचाई चक्र",
    pest: "कीट एवं रोग निरीक्षण",
    harvest: "फसल की कटाई",
    sell: "बेचने का सबसे अच्छा समय",
  },
  mr: {
    seed: "दर्जेदार बियाणे खरेदी करा",
    land: "जमीन तयार करणे",
    sowing: "पेरणीचा कालावधी",
    fertilizer: "खत टाका",
    irrigation: "सिंचन चक्र",
    pest: "कीड व रोग पाहणी",
    harvest: "पीक काढणी",
    sell: "विक्रीसाठी सर्वोत्तम वेळ",
  }
};

const EVENT_DESCS: Record<string, Record<string, string>> = {
  en: {
    seed: "Procure certified, treated seeds from an authorized dealer or KVK.",
    land: "Plough, level, and add organic compost. Test soil pH if possible.",
    sowing: "Sow at recommended depth and spacing for your crop and region.",
    fertilizer: "Apply NPK as per soil test. Split-dose for best uptake.",
    irrigation: "Irrigate at critical growth stages. Avoid waterlogging.",
    pest: "Scout fields, identify early symptoms, apply IPM measures.",
    harvest: "Harvest at correct maturity for best yield and quality.",
    sell: "Sell when mandi prices peak. Compare nearby markets.",
  },
  hi: {
    seed: "अधिकृत विक्रेता या निकटतम कृषि विज्ञान केंद्र (KVK) से प्रमाणित एवं उपचारित बीज खरीदें।",
    land: "जुताई करें, समतल करें और जैविक खाद डालें। यदि संभव हो तो मिट्टी के पीएच का परीक्षण करें।",
    sowing: "अपनी फसल और क्षेत्र के लिए अनुशंसित गहराई और दूरी पर बुवाई करें।",
    fertilizer: "मिट्टी परीक्षण के अनुसार एनपीके (NPK) डालें। बेहतर परिणाम के लिए विभाजित खुराक में दें।",
    irrigation: "महत्वपूर्ण विकास चरणों में सिंचाई करें। जलभराव से बचें।",
    pest: "खेतों की निगरानी करें, शुरुआती लक्षणों की पहचान करें और एकीकृत कीट प्रबंधन (IPM) अपनाएं।",
    harvest: "सर्वोत्तम उपज और गुणवत्ता के लिए सही परिपक्वता पर कटाई करें।",
    sell: "मंडी भाव चरम पर होने पर बेचें। नजदीकी बाजारों से तुलना करें।",
  },
  mr: {
    seed: "अधिकृत डीलर किंवा कृषी विज्ञान केंद्राकडून प्रमाणित आणि प्रक्रिया केलेले बियाणे मिळवा.",
    land: "नांगरणी करा, सपाटीकरण करा आणि सेंद्रिय खत घाला. शक्य असल्यास मातीचे पीएच तपासा.",
    sowing: "तुमच्या पिकासाठी आणि प्रदेशासाठी शिफारस केलेल्या खोलीवर आणि अंतरावर पेरणी करा.",
    fertilizer: "माती तपासणीनुसार एनपीके खत घाला. खतांचा जास्तीत जास्त फायदा होण्यासाठी विभागून द्या.",
    irrigation: "पिकाच्या वाढीच्या महत्त्वाच्या टप्प्यात पाणी द्या. शेतात पाणी साचू देऊ नका.",
    pest: "शेताची पाहणी करा, सुरुवातीची लक्षणे ओळखा आणि एकात्मिक कीड व्यवस्थापन (IPM) वापरा.",
    harvest: "उत्तम उत्पादनासाठी आणि गुणवत्तेसाठी पीक योग्य पक्व झाल्यावरच काढा.",
    sell: "बाजार भाव वाढल्यावर विक्री करा. जवळील बाजारपेठांशी तुलना करा.",
  }
};

function CalendarPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const [crop, setCrop] = useState("Wheat");
  const [acres, setAcres] = useState("2");
  const [region, setRegion] = useState("Maharashtra");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date(); d.setHours(0,0,0,0);
    return d.toISOString().slice(0,10);
  });
  const [schedule, setSchedule] = useState<ScheduleEvent[] | null>(null);

  const onGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(startDate);
    setSchedule(generateSchedule(crop, date));
  };

  const getCropTranslation = (name: string) => {
    return CROP_NAMES[lang]?.[name] || name;
  };

  return (
    <DashboardShell title={t("calendar.title")}>
      <p className="text-muted-foreground max-w-2xl">
        {t("calendar.desc")}
      </p>

      <form onSubmit={onGenerate} className="mt-8 grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:grid-cols-4">
        <div className="space-y-2">
          <Label>{t("market.cropName")}</Label>
          <Select value={crop} onValueChange={setCrop}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {CROPS.map((c) => <SelectItem key={c} value={c}>{getCropTranslation(c)}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("common.acres")}</Label>
          <Input value={acres} onChange={(e) => setAcres(e.target.value)} type="number" min="0.1" step="0.1" />
        </div>
        <div className="space-y-2">
          <Label>{t("common.state")}</Label>
          <Input value={region} onChange={(e) => setRegion(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>{lang === "hi" ? "बुवाई शुरू होने की तारीख" : lang === "mr" ? "पेरणी सुरू होण्याची तारीख" : "Sowing start date"}</Label>
          <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <Button type="submit" size="lg" className="bg-gradient-leaf text-primary-foreground shadow-glow">
            <Sparkles className="mr-2 h-4 w-4" /> {t("calendar.generate")}
          </Button>
        </div>
      </form>

      {schedule && <ScheduleViews schedule={schedule} crop={getCropTranslation(crop)} acres={acres} />}
    </DashboardShell>
  );
}

function ScheduleViews({ schedule, crop, acres }: { schedule: ScheduleEvent[]; crop: string; acres: string }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {lang === "hi" ? "तैयार किया गया कैलेंडर" : lang === "mr" ? "तयार केलेले वेळापत्रक" : "Generated schedule"}
          </div>
          <h2 className="font-display text-2xl font-semibold">{crop} · {acres} {lang === "hi" ? "एकड़" : lang === "mr" ? "एकर" : "acres"}</h2>
        </div>
      </div>
      <Tabs defaultValue="month">
        <TabsList>
          <TabsTrigger value="day">{t("calendar.day")}</TabsTrigger>
          <TabsTrigger value="week">{t("calendar.week")}</TabsTrigger>
          <TabsTrigger value="month">{t("calendar.month")}</TabsTrigger>
        </TabsList>
        <TabsContent value="day"><DayList schedule={schedule} /></TabsContent>
        <TabsContent value="week"><WeekView schedule={schedule} /></TabsContent>
        <TabsContent value="month"><MonthView schedule={schedule} /></TabsContent>
      </Tabs>
    </motion.div>
  );
}

function DayList({ schedule }: { schedule: ScheduleEvent[] }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];

  const getStageLabelTranslation = (stage: string) => {
    return STAGE_LABELS[lang]?.[stage] || stageLabels[stage as any] || stage;
  };
  const getEventTitleTranslation = (stage: string) => {
    return EVENT_TITLES[lang]?.[stage] || titles[stage as any] || stage;
  };
  const getEventDescTranslation = (stage: string) => {
    return EVENT_DESCS[lang]?.[stage] || descs[stage as any] || stage;
  };

  return (
    <div className="space-y-3">
      {schedule.map((e, index) => {
        // e.title can be: titles[stage] + (stages.indexOf(stage) !== i ? ` (round ${i})` : "")
        // Let's reconstruct or translate it
        const firstIndex = schedule.findIndex((x) => x.stage === e.stage);
        const isRound = firstIndex !== index;
        const translatedBaseTitle = getEventTitleTranslation(e.stage);
        const finalTitle = isRound 
          ? `${translatedBaseTitle} (${t("calendar.round", "round")} ${index === 6 ? 2 : 2})` 
          : translatedBaseTitle;

        return (
          <div key={e.id} className={`flex gap-4 rounded-2xl border-l-4 ${stageColors[e.stage]} bg-card border border-border p-5 shadow-soft`}>
            <div className="text-center min-w-20">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                {e.date.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", {month:"short"})}
              </div>
              <div className="font-display text-3xl font-semibold">{e.date.getDate()}</div>
              <div className="text-xs text-muted-foreground">
                {e.date.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", {weekday:"short"})}
              </div>
            </div>
            <div className="flex-1">
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${stageColors[e.stage]}`}>
                <span aria-hidden>{stageEmoji[e.stage]}</span> {getStageLabelTranslation(e.stage)}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{finalTitle}</h3>
              <p className="text-sm text-muted-foreground">{getEventDescTranslation(e.stage)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WeekView({ schedule }: { schedule: ScheduleEvent[] }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const [offset, setOffset] = useState(0);
  const start = useMemo(() => {
    const s = new Date(schedule[0].date);
    s.setDate(s.getDate() + offset * 7);
    const day = s.getDay();
    s.setDate(s.getDate() - day);
    s.setHours(0,0,0,0);
    return s;
  }, [schedule, offset]);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start); d.setDate(d.getDate() + i); return d;
  });
  const eventsOn = (d: Date) =>
    schedule.filter((e) => e.date.toDateString() === d.toDateString());

  const getStageLabelTranslation = (stage: string) => {
    return STAGE_LABELS[lang]?.[stage] || stageLabels[stage as any] || stage;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-display text-lg">
          {lang === "hi" ? "का सप्ताह " : lang === "mr" ? "चा आठवडा " : "Week of "} 
          {start.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", {month:"long",day:"numeric"})}
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => setOffset(o=>o-1)}><ChevronLeft className="h-4 w-4"/></Button>
          <Button variant="outline" size="icon" onClick={() => setOffset(o=>o+1)}><ChevronRight className="h-4 w-4"/></Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => {
          const evs = eventsOn(d);
          return (
            <div key={d.toISOString()} className="min-h-32 rounded-xl border border-border bg-card p-2">
              <div className="text-xs text-muted-foreground">
                {d.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", {weekday:"short"})}
              </div>
              <div className="font-display text-lg font-semibold">{d.getDate()}</div>
              <div className="mt-2 space-y-1">
                {evs.map((e) => (
                  <div key={e.id} className={`flex items-center gap-1 rounded-md border px-1.5 py-1 text-[10px] font-medium ${stageColors[e.stage]}`}>
                    <span aria-hidden>{stageEmoji[e.stage]}</span> {getStageLabelTranslation(e.stage)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MonthView({ schedule }: { schedule: ScheduleEvent[] }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const [cursor, setCursor] = useState(() => {
    const d = new Date(schedule[0].date); d.setDate(1); return d;
  });
  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();
  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(cursor.getFullYear(), cursor.getMonth(), i+1)),
  ];
  const eventsOn = (d: Date) =>
    schedule.filter((e) => e.date.toDateString() === d.toDateString());

  const getStageLabelTranslation = (stage: string) => {
    return STAGE_LABELS[lang]?.[stage] || stageLabels[stage as any] || stage;
  };

  const weekdays = lang === "hi" 
    ? ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"] 
    : lang === "mr" 
    ? ["रवि", "सोम", "मंगळ", "बुध", "गुरू", "शुक्र", "शनी"] 
    : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="font-display text-lg">
          {cursor.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", {month:"long",year:"numeric"})}
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth()-1, 1))}>
            <ChevronLeft className="h-4 w-4"/>
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCursor(c => new Date(c.getFullYear(), c.getMonth()+1, 1))}>
            <ChevronRight className="h-4 w-4"/>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground mb-1">
        {weekdays.map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => (
          <div key={i} className={`min-h-20 rounded-lg border border-border p-1 ${d ? "bg-card" : "bg-transparent border-transparent"}`}>
            {d && (
              <>
                <div className="text-xs text-muted-foreground">{d.getDate()}</div>
                <div className="mt-1 space-y-0.5">
                  {eventsOn(d).map((e) => (
                    <div key={e.id} className={`flex items-center gap-1 rounded px-1 py-0.5 text-[9px] font-semibold border ${stageColors[e.stage]}`}>
                      <span aria-hidden>{stageEmoji[e.stage]}</span> {getStageLabelTranslation(e.stage)}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
