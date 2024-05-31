import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const button = cva(
  "rounded-lg gap-x-2 flex items-center justify-center text-base-300 font-semibold border-[1px] border-transparent transition-colors child:transition-colors capitalize disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary",
          "text-base-200",
          "hover:bg-primary-focus",
          "active:text-base-300",
          "active:bg-primary-content",
          "disabled:text-neutral-content",
          "disabled:bg-primary-focus",
        ],
        secondary: [
          "bg-secondary",
          "hover:bg-secondary-focus",
          "active:bg-secondary-content",
          "disabled:text-neutral-focus",
          "disabled:bg-secondary-focus",
        ],
        accent: [
          "bg-accent",
          "hover:bg-accent-focus",
          "active:bg-accent-content",
          "disabled:text-neutral-focus",
          "disabled:bg-accent-focus",
        ],
        neutral: [
          "bg-base-200",
          "hover:bg-base-100",
          "active:bg-neutral-content",
          "disabled:text-neutral-focus",
          "disabled:bg-neutral-content",
        ],
        error: [
          "bg-error-content",
          "hover:bg-error",
          "active:bg-error",
          "active:text-base-200",
          "disabled:text-neutral-focus",
          "disabled:bg-error",
        ],
        link: [
          "text-neutral-focus",
          "hover:text-base-300",
          "disabled:text-neutral-content",
          "child:text-base-300",
          "hover:child:text-neutral-focus",
        ],
        outline: [
          "bg-base-200",
          "border-primary",
          "hover:bg-primary-content",
          "active:bg-primary",
          "active:text-base-200",
          "disabled:bg-base-100",
          "disabled:text-neutral",
        ],
      },
      size: {
        xs: ["text-[13px]", "py-1", "px-[18px]"],
        sm: ["text-[13px]", "py-2.5", "px-[18px]"],
        md: ["text-[13px]", "py-3", "px-5"],
        lg: ["text-base", "py-[14px]", "px-[22px]"],
        xl: ["text-base", "py-4", "px-6"],
        xxl: ["text-xl", "py-[18px]", "px-[26px]"],
      },
    },
    compoundVariants: [{ variant: "primary", size: "md" }],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export default function Button({
  className,
  variant,
  size,
  children,
  role,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      role={role}
      aria-label={props["aria-label"]}
      className={cn(button({ variant, size, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
