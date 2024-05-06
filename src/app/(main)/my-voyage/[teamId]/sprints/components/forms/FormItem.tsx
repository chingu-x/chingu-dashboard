import { cn } from "@/lib/utils";

interface FormItemProps {
  children: React.ReactNode;
  isTextField?: boolean;
  isError?: boolean;
}

export default function FormItem({
  children,
  isTextField,
  isError,
}: FormItemProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full p-10 bg-base-100 rounded-2xl",
        isTextField && "pb-4",
        isError && "border border-error",
      )}
    >
      <div className="max-w-[650px] w-full flex flex-col gap-y-10">
        {children}
      </div>
    </div>
  );
}
