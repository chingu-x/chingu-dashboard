import { cn } from "@/lib/utils";

interface FormItemProps {
  children: React.ReactNode;
  isTextField?: boolean;
  isError?: boolean;
  isScale?: boolean;
  className?: string;
}

export default function FormItem({
  children,
  isTextField,
  isError,
  isScale,
  className,
}: FormItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl",
        isTextField && "pb-4",
        isError && "border border-error",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-[650px] w-full flex flex-col gap-y-10",
          isScale && "max-w-none",
        )}
      >
        {children}
      </div>
    </div>
  );
}
