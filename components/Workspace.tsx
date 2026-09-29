"use client";

// components/Workspace.tsx — The only state owner
import { useState, useCallback, useEffect } from "react";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { requestRoast } from "@/lib/api";
import TopBar from "./TopBar";
import RoastControls from "./RoastControls";
import ErrorMessageInput from "./ErrorMessageInput";
import CodeEditor from "./CodeEditor";
import RoastReport from "./RoastReport";
import StatusBar from "./StatusBar";

export default function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState("");
  const [apiError, setApiError] = useState<string | undefined>(undefined);

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;
    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }
    setReportState("loading");
    setRoastResult(null);
    setApiError(undefined);
    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage || undefined,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "An unexpected error occurred.");
      setReportState("error");
    }
  }, [isRoasting, code, language, roastLevel, errorMessage]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  }, []);

  // Ctrl+Enter / Cmd+Enter from anywhere on the page
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleRoast();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleRoast]);

  // errorLine: only defined when results match what's currently in editor
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues[0]?.line
      : undefined;

  return (
    <main className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col overflow-hidden border-x-2 border-[#111111] shadow-[4px_4px_0_#111111]">
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((v) => !v)}
        />
      </TopBar>

      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Split pane */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <CodeEditor
          code={code}
          onChange={setCode}
          language={language}
          errorLine={errorLine}
          onLoadSample={handleLoadSample}
        />
        <RoastReport
          state={reportState}
          roastLevel={roastLevel}
          language={language}
          result={roastResult}
          errorMsg={apiError}
          onRetry={handleRoast}
          onApplyFix={(fixed) => {
            setCode(fixed);
            // Don't auto-re-roast
          }}
        />
      </div>

      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
