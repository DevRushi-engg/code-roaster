// components/RoastReport.tsx
import { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import SectionHeader from "./SectionHeader";
import IssueCard from "./IssueCard";
import FixedCode from "./FixedCode";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export default function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  return (
    <div className="flex flex-1 flex-col border-l-2 border-[#E6E6E2] bg-[#FDFDFD] lg:w-[45%]">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-[#E6E6E2] bg-[#F5F5F3] px-4 py-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          AUDIT // REPORT
        </span>
        <span className="font-mono text-sm font-bold text-[#111111]">Roast Report</span>
        <span className="w-24" />
      </div>

      {/* Content */}
      {state === "empty" && <EmptyState />}
      {state === "loading" && <LoadingState />}
      {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}
      {state === "results" && result && (
        <div className="flex-1 overflow-y-auto">
          {/* Section 1: Roast */}
          <div className="border-b border-[#E6E6E2]">
            <SectionHeader number={1} title="Roast">
              <span className="font-mono text-[10px] text-[#999]">
                STYLE: {roastLevel.toUpperCase()}
              </span>
            </SectionHeader>
            <div className="px-4 py-4">
              <blockquote className="border-l-4 border-[#D94826] pl-4 font-mono text-sm italic text-[#333]">
                &ldquo;{result.roast}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Section 2: Issues */}
          <div className="border-b border-[#E6E6E2]">
            <SectionHeader number={2} title="What's Wrong">
              <span className="font-mono text-[10px] text-[#999]">
                {result.issues.length} {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
              </span>
            </SectionHeader>
            <div className="flex flex-col gap-3 p-4">
              {result.issues.length === 0 ? (
                <p className="font-mono text-xs font-bold text-green-600">
                  No issues found. Suspiciously clean.
                </p>
              ) : (
                result.issues.map((issue, i) => (
                  <IssueCard key={i} index={i + 1} issue={issue} />
                ))
              )}
            </div>
          </div>

          {/* Section 3: Fix */}
          {result.correctedCode && (
            <div className="border-b border-[#E6E6E2]">
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            </div>
          )}

          {/* Takeaway */}
          {result.takeaway && (
            <div className="border-b border-[#E6E6E2]">
              <SectionHeader
                number={result.correctedCode ? 4 : 3}
                title="Takeaway"
              />
              <div className="px-4 py-4">
                <p className="font-mono text-xs text-[#444]">{result.takeaway}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
