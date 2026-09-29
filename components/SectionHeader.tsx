// components/SectionHeader.tsx

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export default function SectionHeader({ number, title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#E6E6E2] px-4 py-2">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
        {String(number).padStart(2, "0")} // {title}
      </span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
