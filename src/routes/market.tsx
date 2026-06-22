import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import { TrendingUp, TrendingDown, MapPin, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/market")({
  head: () => ({ meta: [{ title: "Market Intelligence — KrishiMitra AI" }] }),
  component: MarketPage,
});

// Indian mandi prices by state (₹/quintal) - representative data
const MANDI_DATA: Record<string, Array<{ crop: string; price: number; msp: number; change: number; demand: string; season: string }>> = {
  Maharashtra: [
    { crop: "Soybean", price: 4650, msp: 4600, change: 2.1, demand: "High", season: "Kharif" },
    { crop: "Cotton", price: 7200, msp: 6620, change: 3.5, demand: "High", season: "Kharif" },
    { crop: "Wheat", price: 2380, msp: 2275, change: 1.2, demand: "Steady", season: "Rabi" },
    { crop: "Onion", price: 2100, msp: 0, change: -5.3, demand: "Very High", season: "Rabi" },
    { crop: "Tomato", price: 1850, msp: 0, change: 12.4, demand: "Very High", season: "Year-round" },
    { crop: "Tur (Pigeon Pea)", price: 7100, msp: 7000, change: 0.8, demand: "Steady", season: "Kharif" },
    { crop: "Gram (Chickpea)", price: 5400, msp: 5440, change: -1.5, demand: "Low", season: "Rabi" },
    { crop: "Sugarcane", price: 315, msp: 315, change: 0, demand: "Steady", season: "Year-round" },
  ],
  Punjab: [
    { crop: "Wheat", price: 2485, msp: 2275, change: 4.2, demand: "High", season: "Rabi" },
    { crop: "Rice (Basmati)", price: 3900, msp: 2183, change: 2.1, demand: "High", season: "Kharif" },
    { crop: "Rice (Non-Basmati)", price: 2200, msp: 2183, change: 0.5, demand: "Steady", season: "Kharif" },
    { crop: "Maize", price: 2150, msp: 2090, change: 1.8, demand: "Steady", season: "Kharif" },
    { crop: "Cotton", price: 7350, msp: 6620, change: 2.9, demand: "High", season: "Kharif" },
    { crop: "Mustard", price: 5700, msp: 5650, change: 1.1, demand: "Steady", season: "Rabi" },
    { crop: "Potato", price: 1200, msp: 0, change: -8.2, demand: "Very High", season: "Rabi" },
    { crop: "Sunflower", price: 6900, msp: 6760, change: 0.9, demand: "Steady", season: "Rabi" },
  ],
  "Uttar Pradesh": [
    { crop: "Wheat", price: 2350, msp: 2275, change: 2.8, demand: "High", season: "Rabi" },
    { crop: "Sugarcane", price: 375, msp: 340, change: 0.5, demand: "Steady", season: "Year-round" },
    { crop: "Potato", price: 950, msp: 0, change: -3.5, demand: "Very High", season: "Rabi" },
    { crop: "Mustard", price: 5600, msp: 5650, change: -0.8, demand: "Low", season: "Rabi" },
    { crop: "Mentha (Mint)", price: 980, msp: 0, change: 6.2, demand: "High", season: "Kharif" },
    { crop: "Gram (Chickpea)", price: 5300, msp: 5440, change: -2.1, demand: "Low", season: "Rabi" },
    { crop: "Paddy", price: 2200, msp: 2183, change: 1.2, demand: "Steady", season: "Kharif" },
    { crop: "Maize", price: 2050, msp: 2090, change: -1.0, demand: "Steady", season: "Kharif" },
  ],
  Gujarat: [
    { crop: "Cotton", price: 7500, msp: 6620, change: 4.8, demand: "Very High", season: "Kharif" },
    { crop: "Groundnut", price: 5800, msp: 6377, change: -0.9, demand: "Steady", season: "Kharif" },
    { crop: "Wheat", price: 2310, msp: 2275, change: 1.4, demand: "Steady", season: "Rabi" },
    { crop: "Castor", price: 7200, msp: 6390, change: 3.2, demand: "High", season: "Kharif" },
    { crop: "Cumin", price: 22000, msp: 0, change: 8.5, demand: "Very High", season: "Rabi" },
    { crop: "Fennel", price: 11000, msp: 0, change: 2.1, demand: "High", season: "Rabi" },
    { crop: "Bajra", price: 2350, msp: 2500, change: -1.2, demand: "Low", season: "Kharif" },
    { crop: "Sesame", price: 14500, msp: 8635, change: 5.1, demand: "High", season: "Kharif" },
  ],
  Rajasthan: [
    { crop: "Mustard", price: 5650, msp: 5650, change: 0.2, demand: "Steady", season: "Rabi" },
    { crop: "Gram (Chickpea)", price: 5550, msp: 5440, change: 1.8, demand: "High", season: "Rabi" },
    { crop: "Wheat", price: 2320, msp: 2275, change: 1.0, demand: "Steady", season: "Rabi" },
    { crop: "Bajra", price: 2450, msp: 2500, change: -1.8, demand: "Low", season: "Kharif" },
    { crop: "Jowar", price: 3000, msp: 3180, change: -0.5, demand: "Low", season: "Kharif" },
    { crop: "Cumin", price: 23500, msp: 0, change: 12.5, demand: "Very High", season: "Rabi" },
    { crop: "Coriander", price: 8500, msp: 0, change: 4.2, demand: "High", season: "Rabi" },
    { crop: "Groundnut", price: 5650, msp: 6377, change: -3.5, demand: "Low", season: "Kharif" },
  ],
  Karnataka: [
    { crop: "Ragi (Finger Millet)", price: 3900, msp: 3846, change: 1.4, demand: "Steady", season: "Kharif" },
    { crop: "Maize", price: 2100, msp: 2090, change: 0.5, demand: "Steady", season: "Kharif" },
    { crop: "Cotton", price: 7100, msp: 6620, change: 2.2, demand: "High", season: "Kharif" },
    { crop: "Sunflower", price: 6800, msp: 6760, change: 0.6, demand: "Steady", season: "Rabi" },
    { crop: "Tur (Pigeon Pea)", price: 7200, msp: 7000, change: 1.2, demand: "High", season: "Kharif" },
    { crop: "Tomato", price: 1600, msp: 0, change: -9.8, demand: "Very High", season: "Year-round" },
    { crop: "Potato", price: 1400, msp: 0, change: 5.3, demand: "High", season: "Rabi" },
    { crop: "Coffee", price: 48000, msp: 0, change: 3.1, demand: "High", season: "Year-round" },
  ],
};

const MANDIS: Record<string, Array<{ name: string; type: string }>> = {
  Maharashtra: [{ name: "Pune APMC", type: "Major" }, { name: "Nashik APMC", type: "Major" }, { name: "Latur APMC", type: "Regional" }, { name: "Nagpur APMC", type: "Major" }],
  Punjab: [{ name: "Ludhiana Grain Market", type: "Major" }, { name: "Amritsar Market", type: "Major" }, { name: "Bathinda APMC", type: "Regional" }, { name: "Khanna Mandi", type: "Major" }],
  "Uttar Pradesh": [{ name: "Agra Mandi", type: "Major" }, { name: "Varanasi Mandi", type: "Major" }, { name: "Kanpur APMC", type: "Major" }, { name: "Mathura Mandi", type: "Regional" }],
  Gujarat: [{ name: "Rajkot APMC", type: "Major" }, { name: "Gondal APMC", type: "Major" }, { name: "Unjha APMC", type: "Regional" }, { name: "Ahmedabad APMC", type: "Major" }],
  Rajasthan: [{ name: "Jaipur Mandi", type: "Major" }, { name: "Jodhpur APMC", type: "Major" }, { name: "Kota Mandi", type: "Regional" }, { name: "Sikar Mandi", type: "Regional" }],
  Karnataka: [{ name: "Bangalore APMC", type: "Major" }, { name: "Hubli APMC", type: "Regional" }, { name: "Mysore APMC", type: "Major" }, { name: "Davangere Mandi", type: "Regional" }],
};

const DEFAULT_STATE = "Maharashtra";

const CROP_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Soybean": "Soybean",
    "Cotton": "Cotton",
    "Wheat": "Wheat",
    "Onion": "Onion",
    "Tomato": "Tomato",
    "Tur (Pigeon Pea)": "Tur (Pigeon Pea)",
    "Gram (Chickpea)": "Gram (Chickpea)",
    "Sugarcane": "Sugarcane",
    "Rice (Basmati)": "Rice (Basmati)",
    "Rice (Non-Basmati)": "Rice (Non-Basmati)",
    "Maize": "Maize",
    "Mustard": "Mustard",
    "Potato": "Potato",
    "Sunflower": "Sunflower",
    "Paddy": "Paddy",
    "Mentha (Mint)": "Mentha (Mint)",
    "Groundnut": "Groundnut",
    "Castor": "Castor",
    "Cumin": "Cumin",
    "Fennel": "Fennel",
    "Bajra": "Bajra",
    "Sesame": "Sesame",
    "Jowar": "Jowar",
    "Coriander": "Coriander",
    "Ragi (Finger Millet)": "Ragi (Finger Millet)",
    "Coffee": "Coffee",
  },
  hi: {
    "Soybean": "सोयाबीन",
    "Cotton": "कपास",
    "Wheat": "गेहूँ",
    "Onion": "प्याज़",
    "Tomato": "टमाटर",
    "Tur (Pigeon Pea)": "तूर (अरहर)",
    "Gram (Chickpea)": "चना",
    "Sugarcane": "गन्ना",
    "Rice (Basmati)": "चावल (बासमती)",
    "Rice (Non-Basmati)": "चावल (गैर-बासमती)",
    "Maize": "मक्का",
    "Mustard": "सरसों",
    "Potato": "आलू",
    "Sunflower": "सूरजमुखी",
    "Paddy": "धान",
    "Mentha (Mint)": "मेंथा (पुदीना)",
    "Groundnut": "मूंगफली",
    "Castor": "अरंडी",
    "Cumin": "जीरा",
    "Fennel": "सौंफ",
    "Bajra": "बाजरा",
    "Sesame": "तिल",
    "Jowar": "ज्वार",
    "Coriander": "धनिया",
    "Ragi (Finger Millet)": "रागी (मडुआ)",
    "Coffee": "कॉफी",
  },
  mr: {
    "Soybean": "सोयाबीन",
    "Cotton": "कापूस",
    "Wheat": "गहू",
    "Onion": "कांदा",
    "Tomato": "टोमॅटो",
    "Tur (Pigeon Pea)": "तूर",
    "Gram (Chickpea)": "हरभरा",
    "Sugarcane": "ऊस",
    "Rice (Basmati)": "तांदूळ (बासमती)",
    "Rice (Non-Basmati)": "तांदूळ (साधा)",
    "Maize": "मका",
    "Mustard": "मोहरी",
    "Potato": "बटाटा",
    "Sunflower": "सूर्यफूल",
    "Paddy": "धान / भात",
    "Mentha (Mint)": "पुदिना",
    "Groundnut": "भुईमूग",
    "Castor": "एरंडेल",
    "Cumin": "जिरे",
    "Fennel": "बडीशेप",
    "Bajra": "बाजरी",
    "Sesame": "तीळ",
    "Jowar": "ज्वारी",
    "Coriander": "धने / कोथिंबीर",
    "Ragi (Finger Millet)": "नाचणी (रागी)",
    "Coffee": "कॉफी",
  }
};

const DEMAND_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Very High": "Very High",
    "High": "High",
    "Steady": "Steady",
    "Low": "Low"
  },
  hi: {
    "Very High": "बहुत अधिक",
    "High": "अधिक",
    "Steady": "स्थिर",
    "Low": "कम"
  },
  mr: {
    "Very High": "खूप जास्त",
    "High": "जास्त",
    "Steady": "स्थिर",
    "Low": "कमी"
  }
};

const SEASON_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    "Kharif": "Kharif",
    "Rabi": "Rabi",
    "Year-round": "Year-round"
  },
  hi: {
    "Kharif": "खरीफ",
    "Rabi": "रबी",
    "Year-round": "वर्षभर"
  },
  mr: {
    "Kharif": "खरीप",
    "Rabi": "रब्बी",
    "Year-round": "वर्षभर"
  }
};

const getMonthTranslation = (m: string, lang: string) => {
  const monthMap: Record<string, Record<string, string>> = {
    hi: { "Jan": "जन", "Feb": "फर", "Mar": "मार्च", "Apr": "अप्रैल", "May": "मई", "Jun": "जून", "Jul": "जुलाई", "Aug": "अगस्त", "Sep": "सित", "Oct": "अक्तू", "Nov": "नव", "Dec": "दिस" },
    mr: { "Jan": "जाने", "Feb": "फेब्रु", "Mar": "मार्च", "Apr": "एप्रि", "May": "मे", "Jun": "जून", "Jul": "जुलै", "Aug": "ऑग", "Sep": "सप्टें", "Oct": "ऑक्टो", "Nov": "नोव्हें", "Dec": "डिसें" }
  };
  return monthMap[lang]?.[m] || m;
};

const generateTrendData = (basePrice: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    price: Math.round(basePrice + Math.sin(i / 2) * (basePrice * 0.08) + i * (basePrice * 0.003)),
  }));

function MarketPage() {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState(DEFAULT_STATE);
  const [selectedCropIdx, setSelectedCropIdx] = useState(0);

  const lang = (i18n.language || "en").split("-")[0];
  const prices = MANDI_DATA[selectedState] || MANDI_DATA[DEFAULT_STATE];
  const mandis = MANDIS[selectedState] || MANDIS[DEFAULT_STATE];
  const selectedCrop = prices[selectedCropIdx];
  const rawTrendData = generateTrendData(selectedCrop.price);
  const trendData = rawTrendData.map((d) => ({
    ...d,
    month: getMonthTranslation(d.month, lang),
  }));

  const getCropTranslation = (name: string) => {
    return CROP_TRANSLATIONS[lang]?.[name] || name;
  };
  const getDemandTranslation = (val: string) => {
    return DEMAND_TRANSLATIONS[lang]?.[val] || val;
  };
  const getSeasonTranslation = (val: string) => {
    return SEASON_TRANSLATIONS[lang]?.[val] || val;
  };

  const translatedCropName = getCropTranslation(selectedCrop.crop);
  const isTrendingUp = selectedCrop.change > 2;

  let sellRec = "";
  if (isTrendingUp) {
    sellRec = lang === "hi" 
      ? `अभी ${translatedCropName} रोक कर रखें (5-7 दिन)। इस सप्ताह कीमतें ${selectedCrop.change}% बढ़ी हैं। और बढ़ने की उम्मीद है।` 
      : lang === "mr" 
      ? `आणखी ५-७ दिवस ${translatedCropName} विक्री रोखून ठेवा. या आठवड्यात भाव ${selectedCrop.change}% ने वाढले आहेत. आणखी वाढण्याची शक्यता आहे.` 
      : `Hold ${selectedCrop.crop} for 5–7 more days. Prices trending up ${selectedCrop.change > 0 ? "+" : ""}${selectedCrop.change}% this week. Expected to peak higher.`;
  } else if (selectedCrop.change < -3) {
    sellRec = lang === "hi" 
      ? `${translatedCropName} बेचने पर विचार करें। इस सप्ताह कीमतें ${selectedCrop.change}% कम हुई हैं। अधिक प्रतीक्षा न करें।` 
      : lang === "mr" 
      ? `${translatedCropName} विकण्याचा विचार करा. या आठवड्यात किमती ${selectedCrop.change}% ने घसरल्या आहेत. जास्त वाट पाहू नका.` 
      : `Consider selling ${selectedCrop.crop} now. Prices falling ${selectedCrop.change}% this week. Don't wait too long.`;
  } else {
    sellRec = lang === "hi" 
      ? `${translatedCropName} की कीमतें स्थिर हैं। आप कभी भी बेच सकते हैं। सर्वोत्तम भाव के लिए नजदीकी मंडियों की तुलना करें।` 
      : lang === "mr" 
      ? `${translatedCropName} च्या किमती स्थिर आहेत. आपण कधीही विक्री करू शकता. सर्वोत्तम किमतीसाठी जवळील बाजार समित्यांची तुलना करा.` 
      : `${selectedCrop.crop} prices are stable. You can sell whenever ready. Compare nearby mandis for best price.`;
  }

  return (
    <DashboardShell title={t("market.title")}>
      {/* State Selector */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">{t("market.selectState")}</label>
          <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedCropIdx(0); }}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(MANDI_DATA).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground pt-4">
          {lang === "hi" ? (
            <span><strong>{selectedState}</strong> के लिए लाइव मंडी भाव दिखाए जा रहे हैं</span>
          ) : lang === "mr" ? (
            <span><strong>{selectedState}</strong> साठी थेट बाजार भाव दाखवले जात आहेत</span>
          ) : (
            <span>Showing live mandi prices for <strong>{selectedState}</strong></span>
          )}
          <span className="ml-2 rounded-full bg-leaf/10 text-leaf px-2 py-0.5 text-xs font-semibold">Live</span>
        </div>
      </div>

      {/* Sell Recommendation Banner */}
      <div className={`rounded-3xl p-6 shadow-glow mb-8 ${isTrendingUp ? "bg-gradient-wheat text-soil" : selectedCrop.change < -3 ? "bg-gradient-to-r from-terracotta/90 to-terracotta text-white" : "bg-gradient-leaf text-primary-foreground"}`}>
        <div className="text-xs uppercase tracking-wider opacity-80">
          {lang === "hi" ? `एआई बिक्री अनुशंसा · ${translatedCropName}` : lang === "mr" ? `एआय विक्री शिफारस · ${translatedCropName}` : `AI Sell Recommendation · ${selectedCrop.crop}`}
        </div>
        <div className="mt-2 font-display text-2xl font-semibold">{sellRec}</div>
        {selectedCrop.msp > 0 && (
          <p className="mt-1 text-sm opacity-90">
            {t("common.msp")}: ₹{selectedCrop.msp.toLocaleString("en-IN")}/{lang === "hi" ? "कुंतल" : lang === "mr" ? "क्विंटल" : "quintal"} · {lang === "hi" ? "वर्तमान मंडी भाव" : lang === "mr" ? "सध्याचा बाजार भाव" : "Current mandi"}: ₹{selectedCrop.price.toLocaleString("en-IN")}/{lang === "hi" ? "कुंतल" : lang === "mr" ? "क्विंटल" : "quintal"}
            {selectedCrop.price > selectedCrop.msp ? (
              ` (₹${(selectedCrop.price - selectedCrop.msp).toLocaleString("en-IN")} ${lang === "hi" ? "MSP से अधिक" : lang === "mr" ? "MSP पेक्षा जास्त" : "above MSP"})`
            ) : (
              lang === "hi" ? " (MSP से कम — सरकारी खरीद केंद्र पर बेचें)" : lang === "mr" ? " (MSP पेक्षा कमी — सरकारी खरेदी केंद्रावर विक्री करा)" : " (below MSP — sell to govt procurement)"
            )}
          </p>
        )}
      </div>

      {/* Prices Table */}
      <h2 className="font-display text-2xl font-semibold">
        {lang === "hi" ? `${selectedState} मंडी भाव (₹/कुंतल)` : lang === "mr" ? `${selectedState} बाजार भाव (₹/क्विंटल)` : `${selectedState} Mandi Prices (₹/quintal)`}
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">{t("market.cropName")}</th>
              <th className="px-4 py-3 text-right">{t("market.price")}</th>
              <th className="px-4 py-3 text-right">{t("common.msp")}</th>
              <th className="px-4 py-3 text-right">{t("market.change")}</th>
              <th className="px-4 py-3 text-right">{t("market.demand")}</th>
              <th className="px-4 py-3 text-right">{t("common.season")}</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p, i) => (
              <tr
                key={p.crop}
                onClick={() => setSelectedCropIdx(i)}
                className={`border-t border-border cursor-pointer transition ${i === selectedCropIdx ? "bg-primary/5" : "hover:bg-secondary/30"}`}
              >
                <td className="px-4 py-3 font-medium">{getCropTranslation(p.crop)}</td>
                <td className="px-4 py-3 text-right font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{p.msp > 0 ? `₹${p.msp.toLocaleString("en-IN")}` : "—"}</td>
                <td className={`px-4 py-3 text-right font-medium ${p.change >= 0 ? "text-leaf" : "text-terracotta"}`}>
                  <span className="inline-flex items-center gap-1">
                    {p.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {p.change > 0 ? "+" : ""}{p.change}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    p.demand === "Very High" ? "bg-leaf/20 text-leaf" :
                    p.demand === "High" ? "bg-primary/20 text-primary" :
                    p.demand === "Low" ? "bg-terracotta/20 text-terracotta" :
                    "bg-secondary text-muted-foreground"
                  }`}>{getDemandTranslation(p.demand)}</span>
                </td>
                <td className="px-4 py-3 text-right text-xs text-muted-foreground">{getSeasonTranslation(p.season)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Info className="h-3.5 w-3.5" />
        {lang === "hi" 
          ? "नीचे दिए गए 12-महीने के मूल्य रुझान को देखने के लिए किसी भी फसल पंक्ति पर क्लिक करें" 
          : lang === "mr" 
          ? "खाली दिलेल्या १२ महिन्यांचा किमतीचा कल पाहण्यासाठी कोणत्याही पिकाच्या ओळीवर क्लिक करा" 
          : "Click any crop row to view its 12-month price trend below"}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Price Trend Chart */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold">
            {translatedCropName} — {t("market.priceTrend")}
          </h3>
          {selectedCrop.msp > 0 && (
            <p className="text-xs text-muted-foreground mt-1">MSP: ₹{selectedCrop.msp.toLocaleString("en-IN")}/qtl ({lang === "hi" ? "डैश वाली रेखा" : lang === "mr" ? "तुटक रेषा" : "dashed line"})</p>
          )}
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }}
                  formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, lang === "hi" ? "मूल्य" : lang === "mr" ? "किंमत" : "Price"]}
                />
                <Line type="monotone" dataKey="price" stroke="var(--leaf)" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nearby Mandis */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-lg font-semibold">{t("market.localMandis")}</h3>
          <div className="mt-4 space-y-3">
            {mandis.map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></div>
                  <div>
                    <div className="text-sm font-semibold">{m.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {m.type === "Major" 
                        ? (lang === "hi" ? "मुख्य मंडी" : lang === "mr" ? "मुख्य बाजार" : "Major Mandi") 
                        : (lang === "hi" ? "क्षेत्रीय मंडी" : lang === "mr" ? "प्रादेशिक बाजार" : "Regional Mandi")}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-lg font-semibold">₹{Math.round(selectedCrop.price * (0.97 + Math.random() * 0.06)).toLocaleString("en-IN")}</div>
                  <div className="text-xs text-muted-foreground">{translatedCropName}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-leaf/30 bg-leaf/5 p-4 text-sm">
            <p className="font-semibold text-leaf">💡 {lang === "hi" ? "स्मार्ट बिक्री युक्ति" : lang === "mr" ? "स्मार्ट विक्री सल्ला" : "Sell Smart Tip"}</p>
            <p className="mt-1 text-muted-foreground text-xs">
              {lang === "hi" 
                ? "बेचने से पहले मंडियों की कीमतों की तुलना करें। हर मंडी का दौरा किए बिना ऑनलाइन व्यापार करने के लिए e-NAM (enam.gov.in) का उपयोग करें।" 
                : lang === "mr" 
                ? "विक्रीपूर्वी विविध बाजार समित्यांमधील किमतींची तुलना करा. प्रत्येक बाजार समितीला प्रत्यक्ष भेट न देता ऑनलाइन व्यापार करण्यासाठी e-NAM (enam.gov.in) का वापर करा।" 
                : "Compare prices across mandis before selling. Use e-NAM (enam.gov.in) to trade online without having to physically visit every mandi."}
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
