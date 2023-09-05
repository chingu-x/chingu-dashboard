import { ReactNode } from "react";

interface EditButtonProps {
  title: string;
  children: ReactNode;
  customClassName: string;
}

export default function Button({
  title,
  children,
  customClassName,
}: EditButtonProps) {
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
