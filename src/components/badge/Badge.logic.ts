import { type VariantProps, cva } from "class-variance-authority";

type Size = "sm" | "md" | "lg" | null | undefined;

interface BadgeBaseProps {
  title: string;
  className?: string;
  isAvatarBadge?: boolean;
  avatarUrlImage?: string;
}

export interface BadgeProps
  extends BadgeBaseProps,
    VariantProps<typeof badge> {}

export const badge = cva("flex items-center justify-center rounded-[100px]", {
  variants: {
    variant: {
      primary: ["bg-accent-content"],
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

export const AVATAR_SIZES = {
  sm: 14,
  md: 16,
  lg: 18,
};
export const useBadgeLogic = (size: Size) => {
  const sizeToH2 = {
    sm: "text-[13px] font-medium text-base-300",
    md: "text-base font-medium text-base-300",
    lg: "text-xl font-medium text-base-300",
  };

  const sizeToAvatarDimension = {
    sm: AVATAR_SIZES.sm,
    md: AVATAR_SIZES.md,
    lg: AVATAR_SIZES.lg,
  };

  const sizeToAvatarClass = {
    sm: "mr-[4px]",
    md: "mr-[5px]",
    lg: "mr-[6px]",
  };

  const getH2Class = (size: Size): string =>
    size ? sizeToH2[size] : sizeToH2.md;
  const getAvatarDimension = (size: Size): number =>
    size ? sizeToAvatarDimension[size] : sizeToAvatarDimension.md;
  const getAvatarClass = (size: Size): string =>
    size ? sizeToAvatarClass[size] : sizeToAvatarClass.md;

  return {
    h2Class: getH2Class(size),
    avatarDimension: getAvatarDimension(size),
    avatarClass: getAvatarClass(size),
  };
};
