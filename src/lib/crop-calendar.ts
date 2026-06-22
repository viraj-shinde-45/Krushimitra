export type ScheduleStage =
  | "seed"
  | "land"
  | "sowing"
  | "fertilizer"
  | "irrigation"
  | "pest"
  | "harvest"
  | "sell";

export interface ScheduleEvent {
  id: string;
  stage: ScheduleStage;
  title: string;
  description: string;
  date: Date;
  durationDays: number;
}

const cropOffsets: Record<string, number[]> = {
  // [seed, land, sowing, fert1, irr1, pest1, fert2, irr2, harvest, sell]
  Wheat:   [0, 7, 14, 35, 21, 45, 70, 60, 130, 140],
  Rice:    [0, 5, 10, 30, 14, 40, 65, 50, 120, 135],
  Maize:   [0, 6, 12, 28, 18, 38, 55, 48, 95, 105],
  Cotton:  [0, 10, 18, 40, 25, 55, 90, 75, 160, 175],
  Soybean: [0, 7, 14, 32, 20, 42, 65, 55, 100, 110],
  Tomato:  [0, 5, 10, 25, 12, 35, 55, 45, 80, 90],
  Sugarcane:[0, 14, 28, 60, 30, 75, 120, 90, 300, 320],
  Pulses:  [0, 6, 12, 28, 16, 38, 60, 50, 90, 100],
};

const titles: Record<ScheduleStage, string> = {
  seed: "Buy quality seeds",
  land: "Land preparation",
  sowing: "Sowing window",
  fertilizer: "Apply fertilizer",
  irrigation: "Irrigation cycle",
  pest: "Pest & disease inspection",
  harvest: "Harvesting",
  sell: "Best selling window",
};

const descs: Record<ScheduleStage, string> = {
  seed: "Procure certified, treated seeds from an authorized dealer or KVK.",
  land: "Plough, level, and add organic compost. Test soil pH if possible.",
  sowing: "Sow at recommended depth and spacing for your crop and region.",
  fertilizer: "Apply NPK as per soil test. Split-dose for best uptake.",
  irrigation: "Irrigate at critical growth stages. Avoid waterlogging.",
  pest: "Scout fields, identify early symptoms, apply IPM measures.",
  harvest: "Harvest at correct maturity for best yield and quality.",
  sell: "Sell when mandi prices peak. Compare nearby markets.",
};

export function generateSchedule(
  crop: string,
  startDate: Date,
): ScheduleEvent[] {
  const offsets = cropOffsets[crop] ?? cropOffsets.Wheat;
  const stages: ScheduleStage[] = [
    "seed", "land", "sowing", "fertilizer", "irrigation",
    "pest", "fertilizer", "irrigation", "harvest", "sell",
  ];
  return stages.map((stage, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + offsets[i]);
    return {
      id: `${crop}-${i}`,
      stage,
      title: titles[stage] + (stages.indexOf(stage) !== i ? ` (round ${i})` : ""),
      description: descs[stage],
      date: d,
      durationDays: stage === "harvest" || stage === "sell" ? 14 : 3,
    };
  });
}

export const stageColors: Record<ScheduleStage, string> = {
  seed: "bg-wheat/30 text-soil border-wheat/60",
  land: "bg-soil/20 text-soil border-soil/40",
  sowing: "bg-leaf/20 text-leaf border-leaf/50",
  fertilizer: "bg-primary/15 text-primary border-primary/30",
  irrigation: "bg-sky/25 text-sky border-sky/50",
  pest: "bg-terracotta/20 text-terracotta border-terracotta/40",
  harvest: "bg-wheat/40 text-soil border-wheat/70",
  sell: "bg-primary/20 text-primary border-primary/40",
};

export const stageLabels: Record<ScheduleStage, string> = {
  seed: "Seed",
  land: "Land Prep",
  sowing: "Sowing",
  fertilizer: "Fertilizer",
  irrigation: "Irrigation",
  pest: "Pest Control",
  harvest: "Harvest",
  sell: "Sell",
};

export const stageEmoji: Record<ScheduleStage, string> = {
  seed: "🌱",
  land: "🚜",
  sowing: "🌾",
  fertilizer: "🧪",
  irrigation: "💧",
  pest: "🐛",
  harvest: "🌾",
  sell: "💰",
};

export const CROPS = Object.keys(cropOffsets);
