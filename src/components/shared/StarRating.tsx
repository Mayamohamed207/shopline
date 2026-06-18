import { Star } from "lucide-react";

interface Props {
  rate: number;
  count?: number;
  dark: boolean;
  full?: boolean;
}

const StarRating = ({ rate, count, dark, full }: Props) => (
  <div className="flex items-center gap-1">
    {full ? (
      [...Array(5)].map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(rate) ? "fill-cyan-400 text-cyan-400" : dark ? "text-slate-700" : "text-slate-200"}`} />
      ))
    ) : (
      <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
    )}
    <span className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>{rate}</span>
    {count && <span className={`text-xs ${dark ? "text-slate-600" : "text-slate-400"}`}>({count})</span>}
  </div>
);

export default StarRating;