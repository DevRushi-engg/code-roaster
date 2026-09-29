// components/StatusBar.tsx
import { APP, AI } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export default function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="flex flex-col border-t-2 border-[#E6E6E2] bg-[#F5F5F3]">
      {/* Main status row */}
      <div className="flex items-center justify-between px-4 py-1.5">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#666]">
          <span>
            STATUS:{" "}
            {isRoasting ? (
              <span className="font-bold text-amber-600">PROCESSING...</span>
            ) : (
              <span className="font-bold text-green-600">
                ONLINE ({AI.modelLabel.toUpperCase()})
              </span>
            )}
          </span>
          <span className="hidden sm:inline">| ENGINE: GOOGLE GEMINI</span>
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          {APP.name} {APP.version} // LIVE
        </span>
      </div>

      {/* Attribution line — always visible */}
      <div className="border-t border-[#E6E6E2] px-4 py-1 text-center">
        <span className="font-mono text-[9px] text-[#bbb]">
          Made at GDG Nashik Pre-DevFest Workshop
        </span>
      </div>
    </footer>
  );
}
