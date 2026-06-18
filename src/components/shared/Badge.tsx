interface Props {
  label: string;
  dark: boolean;
}

const Badge = ({ label, dark }: Props) => (
  <span className={`text-xs font-bold px-2 py-1 rounded-full capitalize ${dark ? "bg-slate-900/80 text-cyan-400" : "bg-white/90 text-cyan-600"}`}>
    {label.substring(0, 12)}
  </span>
);

export default Badge;