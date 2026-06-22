import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
});

export const askKrishiMitra = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { ok: false as const, error: "AI is not configured. Please contact support." };
    }

    const systemPrompt =
      "You are KrishiMitra, a warm and practical AI farming assistant for farmers across India. " +
      "Answer in simple, friendly language. If the user writes in Hindi/Marathi, reply in the same language. " +
      "Give concrete advice with quantities, timing and Indian crop/scheme/mandi context. Keep answers short and actionable. " +
      "Use bullet points or numbered steps when helpful.";

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{ role: "system", content: systemPrompt }, ...data.messages],
        }),
      });
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Please add credits to continue." };
      }
      if (res.status === 429) {
        return { ok: false as const, error: "Too many requests. Please try again in a moment." };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { ok: false as const, error: "The AI is having trouble right now. Please try again." };
      }
      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const reply = json.choices?.[0]?.message?.content?.trim();
      if (!reply) return { ok: false as const, error: "No response from AI." };
      return { ok: true as const, reply };
    } catch (e) {
      console.error("AI call failed", e);
      return { ok: false as const, error: "Network error reaching the AI." };
    }
  });
