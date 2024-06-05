import { cn } from "@/lib/utils";

interface FormItemProps {
  children: React.ReactNode;
  isTextField?: boolean;
  isError?: boolean;
  isScale?: boolean;
  className?: string;
}

export default function FormInputContainer({
  children,
  isTextField,
  isError,
  isScale,
  className,
}: FormItemProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center rounded-2xl border border-base-100 bg-base-100 p-10",
        isTextField && "pb-4",
        isError && "border-error",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-[650px] flex-col gap-y-10",
          isScale && "max-w-none",
        )}
      >
        {children}
      </div>
    </div>
  );
}
