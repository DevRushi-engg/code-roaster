// lib/gemini.ts — SERVER-ONLY. Never import this on the client side.

import { GoogleGenAI, ApiError } from "@google/genai";
import { AI } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const msg = error instanceof Error ? error.message : String(error);
  switch (status) {
    case 400:
      return `Bad request sent to Gemini. Check your input and try again. (${msg})`;
    case 403:
      return `API key rejected. Open .env.local and verify your GEMINI_API_KEY is correct.`;
    case 404:
      return `Model not found. Check AI.model in config/app.config.ts — current value: "${AI.model}".`;
    case 429:
      return `Rate limit hit. You've made too many requests. Wait a moment and try again.`;
    case 503:
      return `Gemini is overloaded right now. Try again in a few seconds.`;
    default:
      return `Gemini returned an unexpected error (${status ?? "unknown"}): ${msg}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents: buildUserPrompt(request),
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("Gemini returned an empty response. Please try again.");
      }

      let result: RoastResult;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Gemini returned invalid JSON. Raw response: ${text.slice(0, 200)}`
        );
      }

      return {
        roast: result.roast ?? "",
        issues: Array.isArray(result.issues) ? result.issues : [],
        correctedCode: result.correctedCode ?? "",
        takeaway: result.takeaway ?? "",
      };
    } catch (error) {
      lastError = error;
      if (
        error instanceof ApiError &&
        error.status === 503 &&
        attempt < AI.maxAttempts
      ) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }
      const status = error instanceof ApiError ? error.status : undefined;
      throw new Error(friendlyErrorMessage(status, error));
    }
  }

  const status = lastError instanceof ApiError ? lastError.status : undefined;
  throw new Error(friendlyErrorMessage(status, lastError));
}
