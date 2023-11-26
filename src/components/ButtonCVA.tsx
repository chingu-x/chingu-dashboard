import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const button = cva(
  "rounded-lg gap-x-2 flex items-center justify-center text-base-300 font-semibold border-[1px] border-transparent transition-colors capitalize disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary",
          "hover:bg-primary-content",
          "focus:text-base-200",
          "focus:bg-primary-focus",
          "disabled:text-neutral-content",
          "disabled:bg-primary-focus",
        ],
        secondary: [
          "bg-secondary",
          "hover:bg-secondary-content",
          "focus:bg-secondary-focus",
          "disabled:text-neutral-focus",
          "disabled:bg-secondary-focus",
        ],
        accent: [
          "bg-accent",
          "hover:bg-accent-content",
          "focus:bg-accent-focus",
          "disabled:text-neutral-focus",
          "disabled:bg-accent-focus",
        ],
        neutral: [
          "bg-base-100",
          "hover:bg-neutral-content",
          "focus:bg-neutral-focus",
          "disabled:text-neutral-focus",
          "disabled:bg-neutral-content",
        ],
        error: [
          "bg-error-content",
          "hover:bg-error",
          "focus:bg-error",
          "disabled:text-neutral-focus",
          "disabled:bg-error",
        ],
        link: ["hover:text-neutral-focus"],
      },
      size: {
        s: ["text-[13px]", "py-2.5", "px-[18px]"],
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
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => (
  <button className={cn(button({ variant, size, className }))} {...props} />
);
