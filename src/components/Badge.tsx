import { cva, type VariantProps } from "class-variance-authority";

import { ReactElement } from "react";
import { cn } from "@/lib/utils";

const badge = cva(
  "flex bg-base-100 items-center rounded-[100px] h-[25px] gap-x-2 py-[3px] px-[9px]",
  {
    variants: {
      variant: {
        primary: ["text-primary", "border-primary"],
        error: ["text-error-content", "border-error-content"],
        warning: ["text-warning-content", "border-warning-content"],
        success: ["text-success-content", "border-success-content"],
      },
      size: {
        sm: ["text-[13px]", "py-2.5", "px-[18px]"],
        md: ["text-[13px]", "py-3", "px-5"],
        lg: ["text-[13px]", "py-4", "px-6"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const h2Title = cva("text-base font-medium text-base-300 leading-[19px]", {
  variants: {
    size: {
      sm: ["text-[13px]"],
      md: ["text-[15px]"],
      lg: ["text-[17px]"],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface BadgeBaseProps {
  title: string;
  className?: string;
  avatar?: ReactElement;
}

export interface BadgeProps
  extends BadgeBaseProps,
    VariantProps<typeof badge>,
    VariantProps<typeof h2Title> {}

function Badge({ title, avatar, variant, size, className }: BadgeProps) {
  return (
    <div className={cn(badge({ variant, size, className }))}>
      {avatar}
      <h2 className={cn(h2Title({ size, className }))}>{title}</h2>
    </div>
  );
}

export default Badge;
