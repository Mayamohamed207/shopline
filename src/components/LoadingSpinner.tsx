const LoadingSpinner = ({ dark }: { dark: boolean }) => (
  <div className="flex flex-col items-center justify-center py-32 gap-4">
    <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
    <p className={`text-sm tracking-widest uppercase ${dark ? "text-slate-500" : "text-slate-400"}`}>
      Loading products
    </p>
  </div>
);
export default LoadingSpinner;