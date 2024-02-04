import { cva, type VariantProps } from "class-variance-authority";

import { ReactElement } from "react";
import { cn } from "@/lib/utils";

const badge = cva("flex items-center justify-center rounded-[100px]", {
  variants: {
    variant: {
      primary: ["bg-base-100"],
      error: ["bg-error-content"],
      warning: ["bg-warning-content"],
      success: ["bg-success-content"],
    },
    size: {
      sm: ["py-[2px]", "px-[8px]", "h-[20px]"],
      md: ["py-[3px]", "px-[9px]", "h-[25px]"],
      lg: ["py-[4px]", "px-[10px]", "h-[32px]"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

interface BadgeBaseProps {
  title: string;
  className?: string;
  avatar?: ReactElement;
}

export interface BadgeProps extends BadgeBaseProps, VariantProps<typeof badge> {
  TextSize?: "sm" | "md" | "lg";
}

function Badge({
  title,
  avatar,
  variant,
  size,
  TextSize,
  className,
}: BadgeProps) {
  const h2Class = {
    sm: "text-[13px] font-medium",
    md: "text-base font-medium",
    lg: "text-xl font-medium",
  }[TextSize || "md"];

  return (
    <div className={cn(badge({ variant, size, className }))}>
      {avatar}
      <h2 className={h2Class}>{title}</h2>
    </div>
  );
}

export default Badge;
