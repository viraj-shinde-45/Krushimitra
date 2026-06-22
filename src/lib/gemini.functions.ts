import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options);
    if (res.ok || (![429, 503, 500].includes(res.status) && i === retries - 1)) {
      return res;
    }
    if (i < retries - 1 && [429, 503, 500].includes(res.status)) {
      const waitMs = Math.pow(2, i) * 1000 + Math.random() * 500;
      console.warn(`Gemini API returned ${res.status}. Retrying in ${Math.round(waitMs)}ms...`);
      await new Promise(r => setTimeout(r, waitMs));
    } else {
      return res;
    }
  }
  throw new Error("Max retries reached");
}

async function callGemini(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }
  const res = await fetchWithRetry(`${GEMINI_API_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 8192, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${text}`);
  }
  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("No response from Gemini.");
  return text;
}

async function callGeminiVision(prompt: string, base64Image: string, mimeType: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY is not configured.");
  const res = await fetchWithRetry(`${GEMINI_API_URL}?key=${key}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [
          { text: prompt },
          { inline_data: { mime_type: mimeType, data: base64Image } },
        ],
      }],
      generationConfig: { temperature: 0.5, maxOutputTokens: 8192, responseMimeType: "application/json" },
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini Vision API error ${res.status}: ${text}`);
  }
  const json = (await res.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error("No response from Gemini Vision.");
  return text;
}

// --- Crop Recommendation ---
// --- Crop Recommendation ---
const cropRecSchema = z.object({
  state: z.string().min(1),
  district: z.string().min(1),
  landAcres: z.number().positive(),
  soilType: z.string().min(1),
  waterSource: z.string().min(1),
  season: z.string().min(1),
  previousCrop: z.string().optional(),
  lang: z.string().default("en"),
});

export const getCropRecommendation = createServerFn({ method: "POST" })
  .validator((data: unknown) => cropRecSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const languageNames: Record<string, string> = {
        en: "English",
        hi: "Hindi (हिन्दी)",
        mr: "Marathi (मराठी)",
      };
      const targetLangName = languageNames[data.lang] || "English";

      const prompt = `You are an expert Indian agricultural scientist. A farmer needs crop recommendations.

Farmer Details:
- State: ${data.state}
- District: ${data.district}
- Land Size: ${data.landAcres} acres
- Soil Type: ${data.soilType}
- Water Source: ${data.waterSource}
- Season: ${data.season}
- Previous Crop: ${data.previousCrop || "None / First crop"}

Output ALL text string values in the JSON structure strictly in ${targetLangName} (including cropName, localName, reason, sowingTime, harvestTime, expectedYieldPerAcre, currentMarketPrice, msp, estimatedRevenue, waterRequirement, fertilizerAdvice, pestRisks, governmentSupport, difficulty, tips).
The JSON keys (e.g. "cropName", "suitabilityScore", etc.) must remain exactly in English as defined below.

Provide exactly 3 crop recommendations in this JSON format (return ONLY valid JSON, no markdown):
{
  "recommendations": [
    {
      "cropName": "Wheat",
      "localName": "Gehun",
      "suitabilityScore": 92,
      "reason": "Why this crop suits the farmer's conditions",
      "sowingTime": "October - November",
      "harvestTime": "March - April",
      "durationDays": 120,
      "expectedYieldPerAcre": "18-22 quintals",
      "currentMarketPrice": "₹2,200 - ₹2,500 per quintal",
      "msp": "₹2,275 per quintal",
      "estimatedRevenue": "₹45,000 - ₹55,000 per acre",
      "waterRequirement": "4-6 irrigations",
      "fertilizerAdvice": "NPK 120:60:40 kg/ha, apply in 3 splits",
      "pestRisks": ["Aphids", "Rust disease"],
      "governmentSupport": "PM-KISAN, PMFBY crop insurance available",
      "difficulty": "Easy",
      "tips": ["Tip 1", "Tip 2", "Tip 3"]
    }
  ]
}`;

      const text = await callGemini(prompt);
      const cleaned = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(cleaned);
      return { ok: true as const, data: result };
    } catch (e: any) {
      return { ok: false as const, error: e?.message ?? "Failed to get recommendations" };
    }
  });

// --- Disease Detection ---
const diseaseSchema = z.object({
  cropName: z.string().optional(),
  imageBase64: z.string().min(1),
  mimeType: z.string().default("image/jpeg"),
  lang: z.string().default("en"),
});

export const detectCropDisease = createServerFn({ method: "POST" })
  .validator((data: unknown) => diseaseSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const languageNames: Record<string, string> = {
        en: "English",
        hi: "Hindi (हिन्दी)",
        mr: "Marathi (मराठी)",
      };
      const targetLangName = languageNames[data.lang] || "English";

      const prompt = `You are an expert plant pathologist specializing in Indian agriculture. Analyze this crop/leaf image${data.cropName ? ` (crop: ${data.cropName})` : ""} and diagnose any disease or health issue.

Output ALL text string values in the JSON structure strictly in ${targetLangName} (including diseaseName, localName, affectedParts, severity, stage, symptoms, spreadRisk, yieldLossRisk, organicRemedies, chemicalRemedies, preventiveMeasures, immediateAction, nearbyResources).
The JSON keys (e.g. "isHealthy", "diseaseName", etc.) must remain exactly in English as defined below.

Return ONLY valid JSON in this exact format:
{
  "isHealthy": false,
  "diseaseName": "Wheat Leaf Rust",
  "localName": "Patti Ka Rust",
  "confidencePercent": 87,
  "affectedParts": ["Leaves", "Stem"],
  "severity": "Moderate",
  "stage": "Early to Mid stage infection",
  "symptoms": ["Orange-brown pustules on leaves", "Yellowing around pustules"],
  "spreadRisk": "High - spreads rapidly in humid conditions",
  "yieldLossRisk": "20-40% if untreated",
  "organicRemedies": ["Neem oil spray 3ml/L water every 7 days", "Remove and burn infected leaves"],
  "chemicalRemedies": ["Propiconazole 25EC @ 1ml/L water", "Tebuconazole @ 1ml/L water"],
  "preventiveMeasures": ["Use resistant varieties like HD-2967", "Crop rotation", "Avoid overhead irrigation"],
  "immediateAction": "Spray fungicide within 48 hours to prevent spread",
  "nearbyResources": "Contact your local KVK (Krishi Vigyan Kendra) or agriculture department"
}`;

      const text = await callGeminiVision(prompt, data.imageBase64, data.mimeType);
      const cleaned = text.replace(/```json|```/g, "").trim();
      const result = JSON.parse(cleaned);
      return { ok: true as const, data: result };
    } catch (e: any) {
      return { ok: false as const, error: e?.message ?? "Failed to analyze image" };
    }
  });

// --- AI Chat (replaces old Lovable gateway) ---
const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string().min(1).max(8000),
  })).min(1).max(40),
  lang: z.string().default("en"),
});

export const askKrishiMitraGemini = createServerFn({ method: "POST" })
  .validator((data: unknown) => chatSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const languageNames: Record<string, string> = {
        en: "English",
        hi: "Hindi (हिन्दी)",
        mr: "Marathi (मराठी)",
      };
      const selectedLangName = languageNames[data.lang] || "English";

      const systemPrompt =
        `You are KrishiMitra, a warm and practical AI farming assistant for farmers across India. ` +
        `Answer strictly in ${selectedLangName}. ` +
        `Give concrete advice with quantities, timing and Indian crop/scheme/mandi context. Keep answers short and actionable. ` +
        `Use bullet points or numbered steps when helpful. Always mention relevant government schemes when applicable.`;

      const userMessages = data.messages.filter((m) => m.role !== "system");
      const contents = userMessages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const key = process.env.GEMINI_API_KEY;
      if (!key) return { ok: false as const, error: "AI is not configured. Please add GEMINI_API_KEY." };

      const res = await fetchWithRetry(`${GEMINI_API_URL}?key=${key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        return { ok: false as const, error: `AI error: ${res.status} - ${text}` };
      }
      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const reply = json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (!reply) return { ok: false as const, error: "No response from AI." };
      return { ok: true as const, reply };
    } catch (e: any) {
      return { ok: false as const, error: e?.message ?? "AI call failed" };
    }
  });
