import { PackageSearch } from "lucide-react";

const EmptyState = ({ dark }: { dark: boolean }) => (
  <div className="flex flex-col items-center justify-center py-32 gap-3">
    <PackageSearch className={`w-16 h-16 ${dark ? "text-slate-700" : "text-slate-300"}`} />
    <p className={`text-xl font-semibold ${dark ? "text-slate-400" : "text-slate-500"}`}>No results found</p>
    <p className={`text-sm ${dark ? "text-slate-600" : "text-slate-400"}`}>Try a different search or category</p>
  </div>
);
export default EmptyState;