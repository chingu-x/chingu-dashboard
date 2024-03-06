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
        "flex items-center justify-center w-10 h-10 px-2 rounded-full hover:bg-base-300/25 [&>*]:w-5 [&>*]:h-5 [&>*]:text-base-300 [&>*]:stroke-[1.5px]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
