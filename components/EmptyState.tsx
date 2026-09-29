// components/EmptyState.tsx
export default function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center border-2 border-dashed border-[#E6E6E2]">
        <span className="font-mono text-2xl text-[#999]">{"{}"}</span>
      </div>
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#111111]">
        Awaiting Code Submission
      </h3>
      <p className="max-w-sm font-mono text-xs text-[#666]">
        Paste your code on the left, then click &ldquo;ROAST MY CODE&rdquo; or press{" "}
        <kbd className="rounded border border-[#E6E6E2] px-1">Ctrl+Enter</kbd> (
        <kbd className="rounded border border-[#E6E6E2] px-1">⌘+Enter</kbd> on Mac).
      </p>
    </div>
  );
}
