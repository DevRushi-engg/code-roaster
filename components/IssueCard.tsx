// components/IssueCard.tsx
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityStyles: Record<Severity, { badge: string; border: string; bg: string }> = {
  "FATAL BUG": {
    badge: "bg-red-100 text-red-700 border-red-300",
    border: "border-l-4 border-l-red-500",
    bg: "bg-red-50",
  },
  "CODE SMELL": {
    badge: "bg-amber-100 text-amber-700 border-amber-300",
    border: "border-l-4 border-l-amber-500",
    bg: "bg-amber-50",
  },
  OPTIMIZATION: {
    badge: "bg-green-100 text-green-700 border-green-300",
    border: "border-l-4 border-l-green-500",
    bg: "bg-green-50",
  },
};

export default function IssueCard({ index, issue }: IssueCardProps) {
  const style = severityStyles[issue.severity] ?? severityStyles["CODE SMELL"];

  return (
    <div className={`border-2 border-[#E6E6E2] bg-white shadow-sm ${style.border}`}>
      {/* Top row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E6E6E2] px-3 py-2">
        <span className="bg-[#111111] px-2 py-0.5 font-mono text-xs font-bold text-white">
          {String(index).padStart(2, "0")}
        </span>
        <span className="font-mono text-xs font-bold text-[#111111]">
          LINE {issue.line}
        </span>
        <span className={`border px-2 py-0.5 font-mono text-xs font-bold ${style.badge}`}>
          {issue.severity}
        </span>
        <span className="ml-auto font-mono text-xs text-[#666]">{issue.title}</span>
      </div>

      {/* Code snippet */}
      <div className={`px-3 py-2 ${style.bg}`}>
        <pre className="overflow-x-auto font-mono text-xs text-[#111111]">
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>

      {/* Diagnosis + Expected */}
      <div className="space-y-1 px-3 py-2">
        <p className="font-mono text-xs">
          <span className="font-bold text-[#D94826]">✕ Diagnosis:</span>{" "}
          <span className="text-[#444]">{issue.diagnosis}</span>
        </p>
        <p className="font-mono text-xs">
          <span className="font-bold text-green-600">✓ Expected:</span>{" "}
          <span className="text-[#444]">{issue.expected}</span>
        </p>
      </div>
    </div>
  );
}
