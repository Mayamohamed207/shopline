import { AlertCircle, CheckCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Props {
  message: string;
  type: ToastType;
}

const Toast = ({ message, type }: Props) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 shrink-0" />
  };

  return (
    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-2xl border border-slate-700 md:px-10 md:py-5 md:text-lg transition-opacity">
      {icons[type]}
      <span className="font-medium whitespace-nowrap">{message}</span>
    </div>
  );
};

export default Toast;