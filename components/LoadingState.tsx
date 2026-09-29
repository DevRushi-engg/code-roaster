// components/LoadingState.tsx
export default function LoadingState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center border-2 border-[#111111] animate-spin">
        <span className="font-mono text-xl font-bold text-[#111111]">/</span>
      </div>
      <h3 className="animate-pulse font-mono text-sm font-bold uppercase tracking-widest text-[#111111]">
        Analyzing Code
      </h3>
      <p className="max-w-sm font-mono text-xs text-[#666]">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
