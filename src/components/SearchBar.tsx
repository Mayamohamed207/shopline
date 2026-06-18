import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  dark: boolean;
}

const SearchBar = ({ value, onChange, dark }: Props) => (
  <div className="relative w-full">
    <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${dark ? "text-slate-500" : "text-slate-400"}`} />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className={`w-full rounded-full py-2.5 pl-11 pr-10 text-sm outline-none border transition ${
        dark
          ? "bg-slate-800/80 border-slate-700 hover:border-slate-500 focus:border-cyan-500 text-white placeholder-slate-500"
          : "bg-slate-100 border-slate-200 hover:border-slate-300 focus:border-cyan-400 text-slate-800 placeholder-slate-400"
      }`}
    />
    {value && (
      <button onClick={() => onChange("")} className="absolute right-4 top-1/2 -translate-y-1/2">
        <X className={`w-4 h-4 ${dark ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-700"}`} />
      </button>
    )}
  </div>
);
export default SearchBar;