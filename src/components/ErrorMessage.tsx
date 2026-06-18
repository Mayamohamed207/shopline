import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import Button from "./shared/Button";
import { useToast } from "../context/ToastContext";

const ErrorMessage = ({ message }: { message: string }) => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast(message, "error");
  }, [message, showToast]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 md:py-32 gap-3 text-center">
      <AlertTriangle className="w-12 h-12 md:w-14 md:h-14 text-red-400" />
      <p className="text-red-400 text-base md:text-lg font-medium max-w-sm">{message}</p>
      <Button onClick={() => window.location.reload()} className="mt-2 px-6 py-2.5 text-sm rounded-full">
        Try Again
      </Button>
    </div>
  );
};

export default ErrorMessage;