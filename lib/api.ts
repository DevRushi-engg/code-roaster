// lib/api.ts — Browser-only fetch helper. The ONLY place browser code calls our backend.

import { RoastRequest, RoastResult } from "@/types/roast";

export async function requestRoast(payload: RoastRequest): Promise<RoastResult> {
  let response: Response;
  let data: { error?: string } & Partial<RoastResult>;

  try {
    response = await fetch("/api/roast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Could not reach the server. Is `npm run dev` still running?"
    );
  }

  data = await response.json().catch(() => null);

  if (!response.ok || !data) {
    throw new Error(
      data?.error ?? `Server error (${response.status}).`
    );
  }

  return data as RoastResult;
}
