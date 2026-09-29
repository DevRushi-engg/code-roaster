"use client";

// components/CodeEditor.tsx
import { useRef, useState, useCallback } from "react";
import { LanguageId } from "@/types/roast";
import { LANGUAGES } from "@/config/app.config";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const lineCount = Math.max(code.split("\n").length, 10);
  const languageLabel = LANGUAGES.find((l) => l.id === language)?.label ?? language;

  const handleSelect = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const before = code.slice(0, ta.selectionStart);
    const line = before.split("\n").length;
    const col = before.split("\n").at(-1)!.length + 1;
    setCursor({ line, col });
  }, [code]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newCode = code.slice(0, start) + "    " + code.slice(end);
        onChange(newCode);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      }
    },
    [code, onChange]
  );

  const syncGutterScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="flex flex-col border-r-2 border-[#E6E6E2] bg-[#FDFDFD] lg:w-[55%]">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b-2 border-[#E6E6E2] bg-[#F5F5F3] px-4 py-2.5">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          INPUT // SRC
        </span>
        <span className="font-mono text-sm font-bold text-[#111111]">Your Code</span>
        <div className="flex gap-3">
          <button
            onClick={onLoadSample}
            className="font-mono text-xs text-[#D94826] underline hover:no-underline"
          >
            SAMPLE BUG
          </button>
          <button
            onClick={() => onChange("")}
            className="font-mono text-xs text-[#999] underline hover:no-underline"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="relative flex flex-1 overflow-hidden bg-[#1e1e1e]">
        {/* Line number gutter */}
        <div
          ref={gutterRef}
          className="select-none overflow-hidden bg-[#252526] px-3 pt-4 text-right"
          style={{ minWidth: "3rem" }}
          onScroll={() => {
            if (textareaRef.current && gutterRef.current) {
              textareaRef.current.scrollTop = gutterRef.current.scrollTop;
            }
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => {
            const lineNum = i + 1;
            const isError = lineNum === errorLine;
            return (
              <div
                key={lineNum}
                className={`font-mono text-xs leading-5 ${
                  isError ? "font-bold text-[#D94826]" : "text-[#858585]"
                }`}
              >
                {lineNum}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          onScroll={syncGutterScroll}
          placeholder="// Paste your code here..."
          spellCheck={false}
          className="flex-1 resize-none bg-[#1e1e1e] p-4 font-mono text-xs leading-5 text-[#d4d4d4] outline-none placeholder:text-[#555]"
          style={{ whiteSpace: "pre", overflowWrap: "normal" }}
        />
      </div>

      {/* Status strip */}
      <div className="hidden items-center justify-between border-t border-[#333] bg-[#1e1e1e] px-4 py-1 sm:flex">
        <span className="font-mono text-[10px] text-[#858585]">
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </span>
        <span className="font-mono text-[10px] text-[#858585]">
          {code.length.toLocaleString()} / 20,000 · UTF-8 · Tab Size: 4
        </span>
      </div>
    </div>
  );
}
