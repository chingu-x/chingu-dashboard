import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

import { ToastContext } from "@/store/features/toast/toastSlice";

interface AlertProps {
  context: ToastContext;
  message: string;
}

function Alert({ context, message }: AlertProps) {
  const icon = {
    success: <CheckCircleIcon />,
    error: <ExclamationTriangleIcon />,
    warning: <InformationCircleIcon />,
    duplicate: <InformationCircleIcon />,
  };

  const customStyles = {
    success: "bg-success-content border-success",
    error: "bg-error-content border-error",
    warning: "bg-info-content border-info",
    duplicate: "bg-warning-content border-warning",
  };

  return (
    <div
      className={`flex gap-x-4 items-center p-6 min-[1920px]:text-xl min-[1920px]:font-medium border rounded-2xl min-w-[420px] text-base-300 shadow-sm ${customStyles[context]}`}
    >
      <div className="w-6 h-6 text-base-300">{icon[context]}</div>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
