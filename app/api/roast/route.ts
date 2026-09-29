// app/api/roast/route.ts — POST /api/roast

import { NextRequest, NextResponse } from "next/server";
import { analyzeCode } from "@/lib/gemini";
import { LANGUAGES, ROAST_LEVELS, DEFAULTS, LIMITS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code = typeof body.code === "string" ? body.code : "";
  const rawErrorMessage = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validate code
  if (!code.trim()) {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      { error: `Code exceeds the ${LIMITS.maxCodeLength.toLocaleString()} character limit.` },
      { status: 400 }
    );
  }
  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      { error: `Error message exceeds the ${LIMITS.maxErrorMessageLength.toLocaleString()} character limit.` },
      { status: 400 }
    );
  }

  // Validate language — silently fall back
  const knownLanguageIds = LANGUAGES.map((l) => l.id) as string[];
  const language: LanguageId = knownLanguageIds.includes(body.language as string)
    ? (body.language as LanguageId)
    : (DEFAULTS.language as LanguageId);

  // Validate roastLevel — silently fall back
  const knownLevelIds = ROAST_LEVELS.map((l) => l.id) as string[];
  const roastLevel: RoastLevel = knownLevelIds.includes(body.roastLevel as string)
    ? (body.roastLevel as RoastLevel)
    : (DEFAULTS.roastLevel as RoastLevel);

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: rawErrorMessage || undefined,
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    console.error("[/api/roast]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
