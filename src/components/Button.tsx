import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  children: ReactNode;
  customClassName?: string;
  iconSrc?: string;
}

export default function Button({
  title,
  children,
  customClassName,
  iconSrc,
  ...attributes
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn grid grid-cols-[auto,auto] gap-x-4 ${customClassName}`}
      aria-label={`${title}`}
      {...attributes}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt="Icon"
          width={48}
          height={48}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      )}
      {children}
    </button>
  );
}
