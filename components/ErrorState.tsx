// components/ErrorState.tsx
interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center border-2 border-[#D94826]">
        <span className="font-mono text-2xl font-bold text-[#D94826]">!</span>
      </div>
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#D94826]">
        Analysis Failed
      </h3>
      <p className="max-w-sm font-mono text-xs text-[#666]">
        {error ?? "An unknown error occurred during code evaluation."}
      </p>
      <button
        onClick={onRetry}
        className="border-2 border-[#111111] bg-[#111111] px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-[#111111]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
