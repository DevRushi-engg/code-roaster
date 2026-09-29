"use client";

// components/FixedCode.tsx
import { useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";
import SectionHeader from "./SectionHeader";

type CopyStatus = "idle" | "copied" | "failed";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export default function FixedCode({ sectionNumber, language, code, onApply }: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");

  const extension =
    LANGUAGES.find((l) => l.id === language)?.extension ?? "txt";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  }

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
        ? "✕ COPY BLOCKED, SELECT MANUALLY"
        : "📋 COPY FIXED CODE";

  return (
    <div>
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold uppercase text-green-600">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border-b border-t border-[#E6E6E2]">
        {/* File header strip */}
        <div className="flex items-center justify-between border-b border-[#E6E6E2] bg-[#F5F5F3] px-4 py-1.5">
          <span className="font-mono text-xs text-[#666]">solution.{extension}</span>
          <span className="font-mono text-xs font-bold text-green-600">READY TO APPLY</span>
        </div>

        {/* Code block */}
        <div className="max-h-80 overflow-auto bg-[#1e1e1e] p-4">
          <pre className="font-mono text-xs leading-relaxed text-[#d4d4d4]">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 border-b border-[#E6E6E2] px-4 py-3">
        <button
          onClick={handleCopy}
          className="border-2 border-[#111111] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition-all hover:bg-[#111111] hover:text-white"
        >
          {copyLabel}
        </button>
        <button
          onClick={() => onApply(code)}
          className="border-2 border-[#111111] bg-[#111111] px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-transparent hover:text-[#111111]"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
