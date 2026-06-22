import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/app/DashboardShell";
import {
  Thermometer, Droplets, Wind, Sun, CloudRain, CloudSun, AlertTriangle, MapPin, Loader2, Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/weather")({
  head: () => ({ meta: [{ title: "Hyperlocal Weather — KrishiMitra AI" }] }),
  component: WeatherPage,
});

const INDIAN_STATES: Record<string, string[]> = {
  "Maharashtra": ["Nashik","Pune","Nagpur","Aurangabad","Latur","Solapur","Amravati","Kolhapur","Satara","Sangli"],
  "Punjab": ["Ludhiana","Amritsar","Bathinda","Jalandhar","Patiala","Moga","Firozpur","Gurdaspur"],
  "Uttar Pradesh": ["Agra","Lucknow","Kanpur","Varanasi","Allahabad","Meerut","Aligarh","Moradabad","Mathura"],
  "Rajasthan": ["Jaipur","Jodhpur","Ajmer","Kota","Bikaner","Chittorgarh","Alwar","Sikar","Nagaur"],
  "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Rewa","Hoshangabad"],
  "Gujarat": ["Ahmedabad","Surat","Rajkot","Vadodara","Bhavnagar","Junagadh","Anand","Mehsana"],
  "Karnataka": ["Bengaluru","Mysuru","Hubli","Dharwad","Belagavi","Davangere","Tumakuru","Shivamogga"],
  "Haryana": ["Ambala","Karnal","Hisar","Rohtak","Gurugram","Faridabad","Panipat","Sonipat","Bhiwani"],
  "Andhra Pradesh": ["Vijayawada","Visakhapatnam","Kurnool","Nellore","Tirupati","Guntur","Kadapa"],
  "Telangana": ["Hyderabad","Warangal","Karimnagar","Khammam","Nizamabad","Adilabad"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Vellore","Tirunelveli"],
  "Bihar": ["Patna","Gaya","Muzaffarpur","Bhagalpur","Darbhanga","Arrah","Begusarai","Siwan"],
  "West Bengal": ["Kolkata","Bardhaman","Murshidabad","Nadia","Malda","Jalpaiguri","Midnapore"],
  "Odisha": ["Bhubaneswar","Cuttack","Berhampur","Sambalpur","Rourkela","Balasore","Puri"],
};

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  rain: number;
  uvIndex: number;
  weatherCode: number;
  forecast: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    rain: number;
    weatherCode: number;
  }>;
}

function getWeatherIcon(code: number): typeof Sun {
  if (code === 0) return Sun;
  if (code <= 3) return CloudSun;
  if (code <= 67) return CloudRain;
  if (code <= 99) return CloudRain;
  return Cloud;
}

const WEATHER_DESCS: Record<string, Record<number, string>> = {
  en: {
    0: "Clear sky",
    2: "Partly cloudy",
    3: "Overcast",
    48: "Foggy / Misty",
    57: "Light drizzle",
    67: "Rainy",
    77: "Snowfall",
    82: "Showers",
    99: "Thunderstorm",
  },
  hi: {
    0: "साफ आसमान",
    2: "आंशिक रूप से बादल",
    3: "घने बादल",
    48: "कोहरा / धुंध",
    57: "हल्की बूंदाबांदी",
    67: "बारिश",
    77: "बर्फबारी",
    82: "बौछारें",
    99: "बिजली कड़कना / आंधी",
  },
  mr: {
    0: "निरभ्र आकाश",
    2: "अंशतः ढगाळ",
    3: "ढगाळ वातावरण",
    48: "धुके / अंधुक",
    57: "हलका पाऊस",
    67: "पाऊस",
    77: "हिमवृष्टी",
    82: "पावसाच्या सरी",
    99: "वादळी पाऊस / विजांचा कडकडाट",
  }
};

function getWeatherDesc(code: number, lang: string): string {
  const dict = WEATHER_DESCS[lang] || WEATHER_DESCS["en"];
  if (code === 0) return dict[0];
  if (code <= 2) return dict[2];
  if (code <= 3) return dict[3];
  if (code <= 48) return dict[48];
  if (code <= 57) return dict[57];
  if (code <= 67) return dict[67];
  if (code <= 77) return dict[77];
  if (code <= 82) return dict[82];
  if (code <= 99) return dict[99];
  return "Unknown";
}

function getFarmingAlerts(data: WeatherData, lang: string): Array<{ type: "warning" | "info"; title: string; message: string }> {
  const alerts = [];
  const isHi = lang === "hi";
  const isMr = lang === "mr";

  if (data.temp > 38) {
    alerts.push({
      type: "warning" as const,
      title: isHi ? "तापमान अधिक (लू) चेतावनी" : isMr ? "उष्णतेच्या लाटेचा इशारा" : "Heat Wave Alert",
      message: isHi
        ? "तापमान 38°C से अधिक है। खेतों की सिंचाई सुबह जल्दी (7 बजे से पहले) या देर शाम को करें। रसायनों के छिड़काव से बचें। पौधों को छाया प्रदान करें।"
        : isMr
        ? "तापमान ३८°C पेक्षा जास्त. शेताला पहाटे (सकाळी ७ पूर्वी) किंवा संध्याकाळी उशिरा पाणी द्या. कोणत्याही रासायनिक फवारण्या टाळा. रोपवाटिकेला सावली द्या।"
        : "Temperature exceeding 38°C. Irrigate fields early morning (before 7 AM) or late evening. Avoid spraying any chemicals. Provide shade to nursery plants."
    });
  }

  if (data.rain > 50) {
    alerts.push({
      type: "warning" as const,
      title: isHi ? "भारी वर्षा चेतावनी" : isMr ? "मुसळधार पावसाचा इशारा" : "Heavy Rainfall Alert",
      message: isHi
        ? "भारी बारिश की संभावना। उर्वरक या कीटनाशक न डालें। खेतों में जल निकासी की व्यवस्था करें। कटाई का काम स्थगित करें।"
        : isMr
        ? "मुसळधार पावसाची शक्यता. खते किंवा कीटकनाशके टाकू नका. शेतात पाण्याचा निचरा योग्य असल्याची खात्री करा. काढणीची कामे पुढे ढकला।"
        : "Heavy rain expected. Do not apply fertilizers or pesticides. Ensure proper drainage in fields. Postpone any harvesting operations."
    });
  }

  if (data.humidity > 85) {
    alerts.push({
      type: "warning" as const,
      title: isHi ? "अधिक आर्द्रता चेतावनी" : isMr ? "दमट हवेचा इशारा" : "High Humidity Warning",
      message: isHi
        ? "अत्यधिक आर्द्रता से फंगल रोगों का खतरा बढ़ता है। झुलसा और गेरूई रोग की निगरानी करें। मैंकोजेब के सुरक्षात्मक छिड़काव पर विचार करें।"
        : isMr
        ? "जास्त दमटपणामुळे बुरशीजन्य रोगांचा धोका वाढतो. पिकांवर करपा आणि तांबेरा या रोगांवर लक्ष ठेवा. मँकोझेबची प्रतिबंधात्मक फवारणी करावी।"
        : "Very high humidity increases fungal disease risk. Monitor crops for blight and rust. Consider protective spray of Mancozeb."
    });
  }

  if (data.windSpeed > 40) {
    alerts.push({
      type: "warning" as const,
      title: isHi ? "तेज हवा की चेतावनी" : isMr ? "वादळी वाऱ्याचा इशारा" : "Strong Wind Advisory",
      message: isHi
        ? "40 किमी/घंटे से अधिक की हवाएं चलने की संभावना। कीटनाशकों का छिड़काव न करें। मक्का और गन्ना जैसी लंबी फसलों को सहारा दें। ग्रीनहाउस कवर सुरक्षित करें।"
        : isMr
        ? "४० किमी/तास पेक्षा जास्त वेगाने वारे वाहण्याची शक्यता. कीटकनाशकांची फवारणी करू नका. मका आणि ऊसासारख्या उंच पिकांना आधार द्या. ग्रीनहाऊसचे कव्हर व्यवस्थित बांधून घ्या।"
        : "Winds over 40 km/h expected. Do not spray pesticides. Support tall crops like maize and sugarcane. Secure greenhouse covers."
    });
  }

  if (data.uvIndex >= 8) {
    alerts.push({
      type: "info" as const,
      title: isHi ? "उच्च यूवी सूचकांक" : isMr ? "अतिनील किरणांचा इशारा" : "High UV Index",
      message: isHi
        ? "यूवी सूचकांक उच्च है। सुबह 11 बजे से दोपहर 3 बजे के बीच खेतों में काम करने से बचें। नमी के नुकसान को रोकने के लिए मिट्टी को गीली घास (मल्चिंग) से ढकें।"
        : isMr
        ? "अतिनील निर्देशांक जास्त आहे. सकाळी ११ ते दुपारी ३ दरम्यान शेतात काम करणे टाळा. जमिनीतील ओलावा टिकवण्यासाठी आच्छादन (मल्चिंग) करा।"
        : "UV index is high. Avoid working in fields between 11 AM – 3 PM. Cover soil with mulch to prevent moisture loss."
    });
  }

  const forecastRain = data.forecast.slice(0, 3).reduce((s, f) => s + f.rain, 0);
  if (forecastRain > 100) {
    alerts.push({
      type: "info" as const,
      title: isHi ? "अगले 3 दिनों में भारी बारिश" : isMr ? "पुढील ३ दिवसात मुसळधार पाऊस" : "Heavy Rain Next 3 Days",
      message: isHi
        ? "अगले 3 दिनों में 100 मिमी से अधिक बारिश होने की संभावना है। तदनुसार बुवाई और कटाई की योजना बनाएं। बाद में उपयोग के लिए वर्षा जल संचयन का यह अच्छा समय है।"
        : isMr
        ? "पुढील ३ दिवसांत १०० मिमीपेक्षा जास्त पावसाची शक्यता. त्यानुसार पेरणी आणि काढणीचे नियोजन करा. पावसाचे पाणी साठवून ठेवण्यासाठी ही उत्तम वेळ आहे।"
        : "Over 100mm rainfall expected in next 3 days. Plan sowing and harvesting accordingly. Good time to store rainwater for later use."
    });
  }
  return alerts;
}

function WeatherPage() {
  const { t, i18n } = useTranslation();
  const [selectedState, setSelectedState] = useState(() => {
    try {
      return localStorage.getItem("km_state") || "Maharashtra";
    } catch {
      return "Maharashtra";
    }
  });
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    try {
      return localStorage.getItem("km_district") || "Nashik";
    } catch {
      return "Nashik";
    }
  });
  const [locating, setLocating] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchWeather = async (district: string, state: string) => {
    setLoadingWeather(true);
    try {
      // Geocode the district
      let geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(district)}&count=5&language=en&format=json`
      );
      let geoData = await geoRes.json();
      
      // Try to find the Indian result
      let loc = geoData?.results?.find((r: any) => r.country === "India") || geoData?.results?.[0];

      if (!loc) {
        // Fallback to state on Open-Meteo
        geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(state)}&count=1&language=en&format=json`
        );
        geoData = await geoRes.json();
        loc = geoData?.results?.[0];
      }

      if (!loc) {
        // Ultimate Fallback: OpenStreetMap Nominatim
        try {
          const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(district + ", " + state + ", India")}`);
          const nomData = await nomRes.json();
          if (nomData && nomData.length > 0) {
            loc = { latitude: parseFloat(nomData[0].lat), longitude: parseFloat(nomData[0].lon) };
          }
        } catch (e) {
          console.error("Nominatim fallback failed", e);
        }
      }

      if (!loc) { toast.error("Location not found. Please try a nearby major city."); return; }

      const { latitude, longitude } = loc;
      const wxRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,rain,wind_speed_10m,uv_index,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=Asia%2FKolkata`
      );
      const wxData = await wxRes.json();
      const c = wxData.current;
      const d = wxData.daily;

      setWeather({
        temp: Math.round(c.temperature_2m),
        feelsLike: Math.round(c.apparent_temperature),
        humidity: c.relative_humidity_2m,
        windSpeed: Math.round(c.wind_speed_10m),
        rain: Math.round(c.rain * 10) / 10,
        uvIndex: Math.round(c.uv_index),
        weatherCode: c.weather_code,
        forecast: d.time.map((date: string, i: number) => ({
          date,
          maxTemp: Math.round(d.temperature_2m_max[i]),
          minTemp: Math.round(d.temperature_2m_min[i]),
          rain: Math.round(d.precipitation_sum[i] * 10) / 10,
          weatherCode: d.weather_code[i],
        })),
      });
      setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
    } catch {
      toast.error("Failed to fetch weather. Check your connection.");
    } finally {
      setLoadingWeather(false);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem("km_state", selectedState);
      localStorage.setItem("km_district", selectedDistrict);
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }, [selectedState, selectedDistrict]);

  useEffect(() => {
    fetchWeather(selectedDistrict, selectedState);
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) { toast.error("Geolocation not supported"); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const r = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=en&count=1`);
          const data = await r.json();
          const place = data?.results?.[0];
          if (place) {
            const district = place.name || selectedDistrict;
            const state = place.admin1 || selectedState;
            setSelectedDistrict(district);
            toast.success(`Location: ${district}, ${state}`);
            fetchWeather(district, state);
          }
        } catch { toast.error("Could not reverse geocode location"); }
        finally { setLocating(false); }
      },
      (err) => { toast.error(err.message); setLocating(false); },
      { timeout: 8000 }
    );
  };

  const districts = INDIAN_STATES[selectedState] || [];
  const lang = (i18n.language || "en").split("-")[0];
  const alerts = weather ? getFarmingAlerts(weather, lang) : [];
  const WeatherIcon = weather ? getWeatherIcon(weather.weatherCode) : Sun;

  const getUvLevel = (uv: number) => {
    if (uv >= 8) return lang === "hi" ? "अति उच्च" : lang === "mr" ? "खूप जास्त" : "Very High";
    if (uv >= 6) return lang === "hi" ? "उच्च" : lang === "mr" ? "जास्त" : "High";
    if (uv >= 3) return lang === "hi" ? "मध्यम" : lang === "mr" ? "मध्यम" : "Moderate";
    return lang === "hi" ? "कम" : lang === "mr" ? "कमी" : "Low";
  };

  return (
    <DashboardShell title={t("weather.title")}>
      {/* Location Selector */}
      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">{t("common.state")}</label>
          <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedDistrict(Object.values(INDIAN_STATES)[Object.keys(INDIAN_STATES).indexOf(v)]?.[0] || ""); }}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {Object.keys(INDIAN_STATES).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <label className="text-xs text-muted-foreground">{t("common.district")}</label>
          <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => fetchWeather(selectedDistrict, selectedState)} disabled={loadingWeather} className="bg-gradient-leaf text-primary-foreground shadow-glow">
          {loadingWeather ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {lang === "hi" ? "मौसम प्राप्त करें" : lang === "mr" ? "हवामान मिळवा" : "Get Weather"}
        </Button>
        <Button onClick={detectLocation} disabled={locating} variant="outline" size="sm" className="gap-2">
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          {t("weather.detect")}
        </Button>
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            {lang === "hi" ? "अंतिम अपडेट" : lang === "mr" ? "अद्यतनित वेळ" : "Updated at"} {lastUpdated}
          </span>
        )}
      </div>

      {loadingWeather && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {weather && !loadingWeather && (
        <>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {/* Current Weather */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl bg-gradient-leaf p-8 text-primary-foreground shadow-glow">
              <div className="text-sm opacity-80">
                {selectedDistrict}, {selectedState} · {lang === "hi" ? "आज" : lang === "mr" ? "आज" : "Today"}
              </div>
              <div className="mt-2 flex items-end gap-4">
                <WeatherIcon className="h-14 w-14 opacity-90" />
                <div>
                  <div className="font-display text-7xl font-semibold">{weather.temp}°<span className="text-3xl">C</span></div>
                  <div className="mt-1 opacity-90">
                    {getWeatherDesc(weather.weatherCode, lang)} · {t("weather.feelsLike")} {weather.feelsLike}°C
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Droplets, label: t("weather.humidity"), v: `${weather.humidity}%` },
                  { icon: CloudRain, label: t("weather.rain"), v: `${weather.rain} mm` },
                  { icon: Wind, label: t("weather.wind"), v: `${weather.windSpeed} km/h` },
                  { icon: Sun, label: t("weather.uvIndex"), v: `${weather.uvIndex} (${getUvLevel(weather.uvIndex)})` },
                ].map((m) => (
                  <div key={m.label} className="rounded-2xl bg-primary-foreground/10 p-3">
                    <m.icon className="h-4 w-4 opacity-80" />
                    <div className="mt-2 text-xs opacity-80">{m.label}</div>
                    <div className="font-semibold text-sm">{m.v}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Farming Alerts */}
            <div className="space-y-3">
              {alerts.length === 0 && (
                <div className="rounded-3xl border border-leaf/40 bg-leaf/10 p-5">
                  <div className="flex items-center gap-2 text-leaf">
                    <Sun className="h-5 w-5" />
                    <span className="font-display font-semibold">
                      {lang === "hi" ? "आज खेती के लिए अनुकूल परिस्थितियां हैं" : lang === "mr" ? "आज शेतीकामासाठी अनुकूल परिस्थिती आहे" : "Good farming conditions today"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">
                    {lang === "hi" ? "प्रतिकूल मौसम की कोई चेतावनी नहीं है। कृषि कार्यों के लिए अच्छा समय है।" : lang === "mr" ? "कोणताही हवामान इशारा नाही. शेतीकामासाठी चांगली वेळ आहे।" : "No adverse weather alerts. Good time for field operations."}
                  </p>
                </div>
              )}
              {alerts.map((alert, i) => (
                <div key={i} className={`rounded-3xl p-5 ${alert.type === "warning" ? "border border-terracotta/40 bg-terracotta/10" : "border border-border bg-card"}`}>
                  <div className={`flex items-center gap-2 font-semibold ${alert.type === "warning" ? "text-terracotta" : "text-foreground"}`}>
                    <AlertTriangle className="h-5 w-5" />
                    {alert.title}
                  </div>
                  <p className="mt-2 text-sm text-foreground/80">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-day Forecast */}
          <h2 className="mt-12 font-display text-2xl font-semibold">{t("weather.forecast")}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {weather.forecast.map((f, i) => {
              const Icon = getWeatherIcon(f.weatherCode);
              const date = new Date(f.date);
              const dayName = i === 0 
                ? (lang === "hi" ? "आज" : lang === "mr" ? "आज" : "Today") 
                : date.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", { weekday: "short" });
              return (
                <motion.div
                  key={f.date}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-border bg-card p-4 text-center shadow-soft"
                >
                  <div className="text-xs text-muted-foreground">{dayName}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {date.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN", { day: "numeric", month: "short" })}
                  </div>
                  <Icon className="mx-auto mt-2 h-7 w-7 text-primary" />
                  <div className="mt-2 font-display text-base font-semibold">{f.maxTemp}°</div>
                  <div className="text-xs text-muted-foreground">{f.minTemp}°</div>
                  <div className="text-xs text-sky mt-1">
                    {f.rain > 0 ? `${f.rain}mm` : (lang === "hi" ? "बारिश नहीं" : lang === "mr" ? "पाऊस नाही" : "No rain")}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </DashboardShell>
  );
}
