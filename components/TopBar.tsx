// components/TopBar.tsx
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export default function TopBar({ children }: TopBarProps) {
  return (
    <header className="flex flex-col items-start justify-between gap-2 border-b-2 border-[#111111] bg-[#F5F5F3] px-4 py-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#111111]">
          {APP.name}
        </span>
        <span className="border border-[#999] px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#666]">
          {APP.version}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </header>
  );
}
