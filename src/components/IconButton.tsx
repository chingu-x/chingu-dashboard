import { cn } from "@/lib/utils";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function IconButton({
  children,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full px-2 hover:bg-base-300/25 [&>*]:h-5 [&>*]:w-5 [&>*]:stroke-[1.5px] [&>*]:text-base-300",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
