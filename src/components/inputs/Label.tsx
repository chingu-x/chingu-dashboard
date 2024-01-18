import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "text-base font-medium capitalize text-base-300",
        className,
      )}
      {...props}
    />
  );
}
