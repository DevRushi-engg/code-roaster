// components/ErrorMessageInput.tsx
interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-[#E6E6E2] bg-[#FFFBE6] px-4 py-2">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#999]">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          onClick={onClose}
          className="font-mono text-xs text-[#999] hover:text-[#111111]"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder={`TypeError: unsupported operand type(s) for +: 'int' and 'list'\n  File "main.py", line 4, in calculate_average`}
        className="w-full resize-none border border-[#E6E6E2] bg-white px-3 py-2 font-mono text-xs text-[#333] placeholder:text-[#bbb] focus:border-[#111111] focus:outline-none"
      />
    </div>
  );
}
