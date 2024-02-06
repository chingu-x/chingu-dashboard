import { AVATAR_SIZES, useBadgeLogic, badge } from "./Badge.logic";
import type { BadgeProps } from "./Badge.logic";
import Avatar from "@/components/Avatar";
import { cn } from "@/lib/utils";

function Badge({
  title,
  variant,
  size,
  className,
  LeftIcon,
  RightIcon,
  isAvatarBadge, //NOTE - this is a boolean that you can use to show avatars without available images
  avatarUrlImage,
}: BadgeProps) {
  const { avatarDimension, h2Class, iconClass } = useBadgeLogic(size);

  return (
    <div className={cn(badge({ variant, size, className }))}>
      {isAvatarBadge || avatarUrlImage ? (
        <Avatar
          image={avatarUrlImage}
          width={avatarDimension ?? AVATAR_SIZES.md}
          height={avatarDimension ?? AVATAR_SIZES.md}
        />
      ) : null}
      {LeftIcon && <LeftIcon className={iconClass} />}
      <h2 className={h2Class}>{title}</h2>
      {RightIcon && <RightIcon className={iconClass} />}
    </div>
  );
}

export default Badge;
