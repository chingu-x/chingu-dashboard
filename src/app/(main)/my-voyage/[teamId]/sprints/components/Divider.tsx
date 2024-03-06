import { cn } from "@/lib/utils";

interface DividerProps {
  title: string;
  className?: string;
}

export default function Divider({ title, className }: DividerProps) {
  return (
    <p
      className={cn(
        "flex items-center w-full text-base font-medium rounded-lg gap-x-10 text-neutral whitespace-nowrap",
        className,
      )}
    >
      <span className="w-full bg-neutral h-[1px]" />
      {title}
      <span className="w-full bg-neutral h-[1px]" />
    </p>
  );
}
