import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
}

export default function Label({ id, label, className, ...props }: LabelProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "text-base font-medium capitalize text-base-300",
        className,
      )}
      {...props}
    >
      {label}
    </label>
  );
}
