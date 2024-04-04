import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

interface AlertProps {
  context: string;
  message: string;
}

function Alert({ context, message }: AlertProps) {
  const icon: Record<string, JSX.Element> = {
    success: <CheckCircleIcon />,
    info: <InformationCircleIcon className="w-6 h-6" />,
    error: <ExclamationTriangleIcon />,
    warning: <InformationCircleIcon />,
    neutral: <InformationCircleIcon />,
  };

  const customStyles: Record<string, string> = {
    success: "bg-success-content border-success",
    info: "bg-info-content border-info",
    error: "bg-error-content border-error",
    warning: "bg-warning-content border-warning",
    neutral: "bg-base-100 border-neutral",
  };

  return (
    <div
      className={`flex gap-x-4 items-center p-6 border rounded-2xl font-medium text-base text-base-300 shadow-sm ${customStyles[context]}`}
    >
      <div className="w-6 h-6">{icon[context]}</div>
      <span>{message}</span>
    </div>
  );
}

export default Alert;
