import { cn } from "@/lib/utils";

interface DividerProps {
  title: string;
  className?: string;
}

export default function Divider({ title, className }: DividerProps) {
  return (
    <p
      className={cn(
        "flex w-full items-center gap-x-10 whitespace-nowrap rounded-lg text-base font-medium text-neutral",
        className,
      )}
    >
      <span className="h-px w-full bg-neutral" />
      {title}
      <span className="h-px w-full bg-neutral" />
    </p>
  );
}
