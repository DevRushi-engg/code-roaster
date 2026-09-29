// components/RoastControls.tsx
import { ROAST_LEVELS, LANGUAGES } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export default function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Roast Level */}
      <div className="flex items-center gap-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          Level:
        </span>
        <div className="flex">
          {ROAST_LEVELS.map((level) => (
            <button
              key={level.id}
              title={level.description}
              onClick={() => onRoastLevelChange(level.id)}
              className={`border px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all first:border-r-0 last:border-l-0 ${
                roastLevel === level.id
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#E6E6E2] text-[#666] hover:border-[#999]"
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="flex items-center gap-1">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          Lang:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none border border-[#E6E6E2] bg-white py-1 pl-2 pr-6 font-mono text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-[#999]">
            ▾
          </span>
        </div>
      </div>

      {/* Error drawer toggle */}
      <button
        onClick={onToggleErrorDrawer}
        className={`border px-2.5 py-1 font-mono text-xs font-bold uppercase transition-all ${
          errorDrawerOpen
            ? "border-[#111111] bg-[#111111] text-white"
            : "border-dashed border-[#999] text-[#666] hover:border-[#111111]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* Roast CTA */}
      <button
        onClick={onRoast}
        disabled={isRoasting}
        className={`border-2 border-[#111111] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest transition-all ${
          isRoasting
            ? "cursor-not-allowed animate-pulse bg-[#444] text-white"
            : "bg-[#111111] text-white hover:bg-transparent hover:text-[#111111]"
        }`}
      >
        {isRoasting ? "ANALYZING..." : "ROAST MY CODE"}
        {!isRoasting && (
          <span className="ml-2 border border-white/30 px-1 py-0.5 text-[9px]">
            Ctrl ⏎
          </span>
        )}
      </button>
    </div>
  );
}
