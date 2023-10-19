import { ReactNode } from "react";

interface AlertProps {
  icon: ReactNode;
  backgroundColor: string;
  borderColor: string;
  message: string;
}

function Alert({ icon, backgroundColor, borderColor, message }: AlertProps) {
  return (
    <div
      className={`flex justify-center ${backgroundColor} w-[420px] border border-solid ${borderColor} rounded-2xl p-6`}
    >
      <div className="w-6 h-6 text-base-300 mr-4">{icon}</div>
      <span className="text-base-300">{message}</span>
    </div>
  );
}

export default Alert;
