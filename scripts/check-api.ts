// scripts/check-api.ts — Standalone API test script (not part of the Next app)
// Run with: npm run check:api

import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`Testing Gemini API with model: ${AI.model}`);
  console.log("Sending sample code...\n");

  try {
    const result = await analyzeCode({
      language: SAMPLE.language as "python",
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("✅ API connection successful!\n");
    console.log("--- ROAST ---");
    console.log(result.roast);
    console.log("\n--- ISSUES ---");
    console.log(`Found ${result.issues.length} issue(s)`);
    result.issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. [${issue.severity}] Line ${issue.line}: ${issue.title}`);
    });
    console.log("\n--- TAKEAWAY ---");
    console.log(result.takeaway);
  } catch (err) {
    console.error("❌ API check failed:");
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
