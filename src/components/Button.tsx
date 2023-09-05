import { ReactNode } from "react";

interface ButtonProps {
  title: string;
  children: ReactNode;
  customClassName?: string;
}

export default function Button({
  title,
  children,
  customClassName,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn grid grid-cols-[auto,auto] gap-x-1 ${customClassName}`}
      aria-label={`${title}`}
    >
      {children}
    </button>
  );
}
