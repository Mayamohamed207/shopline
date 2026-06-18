import { AlertTriangle } from "lucide-react";
import Button from "./shared/Button";

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-32 gap-3">
    <AlertTriangle className="w-14 h-14 text-red-400" />
    <p className="text-red-400 text-lg font-medium">{message}</p>
    <Button onClick={() => window.location.reload()} className="mt-2 px-6 py-2.5 text-sm rounded-full">
      Try Again
    </Button>
  </div>
);
export default ErrorMessage;