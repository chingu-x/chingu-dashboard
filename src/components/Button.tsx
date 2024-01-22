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
          "border-primary",
          "hover:bg-primary-content",
          "disabled:text-neutral-content",
          "disabled:bg-primary-focus",
        ],
        secondary: [
          "bg-secondary",
          "border-secondary",
          "hover:bg-secondary-content",
          "disabled:text-neutral-focus",
          "disabled:bg-secondary-focus",
        ],
        accent: [
          "bg-accent",
          "border-accent",
          "hover:bg-accent-content",
          "disabled:text-neutral-focus",
          "disabled:bg-accent-focus",
        ],
        neutral: [
          "bg-base-200",
          "border-base-100",
          "hover:bg-base-100",
          "disabled:text-neutral-focus",
          "disabled:bg-neutral-content",
        ],
        error: [
          "bg-error-content",
          "border-error-content",
          "hover:bg-error",
          "disabled:text-neutral-focus",
          "disabled:bg-error",
        ],
        link: [
          "hover:text-neutral-focus",
          "child:text-base-300",
          "hover:child:text-neutral-focus",
        ],
      },
      size: {
        sm: ["text-[13px]", "py-2.5", "px-[18px]"],
        md: ["text-[13px]", "py-3", "px-5"],
        lg: ["text-base", "py-[14px]", "px-[22px]"],
        xl: ["text-base", "py-4", "px-6"],
        xxl: ["text-xl", "py-[18px]", "px-[26px]"],
      },
      outline: {
        true: ["bg-transparent", "disabled:bg-base-100"],
        false: ["border-transparent"],
      },
    },
    compoundVariants: [{ variant: "primary", size: "md", outline: false }],
    defaultVariants: {
      variant: "primary",
      size: "md",
      outline: false,
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
  outline,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(button({ variant, size, outline, className }))}
      {...props}
    />
  );
}
