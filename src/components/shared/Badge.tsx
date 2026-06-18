interface Props {
  label: string;
  dark: boolean;
}

const Badge = ({ label, dark }: Props) => (
  <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize max-w-[120px] truncate ${dark ? "bg-slate-900/80 text-cyan-400" : "bg-white/90 text-cyan-600"}`}>
    {label}
  </span>
);

export default Badge;