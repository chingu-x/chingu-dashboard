import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import { cn } from "@/lib/utils";

// TODO: Move colors to globals
const getBackroundColor = (initials: String) => {
  const charCode = initials.toUpperCase().charCodeAt(initials.length - 1);
  if (charCode < 71) return "bg-[#FE6AA6]";
  if (charCode >= 71 && charCode < 77) return "bg-[#48FE90]";
  if (charCode >= 77 && charCode < 84) return "bg-[#50DBFE]";
  if (charCode >= 84) return "bg-[#D091DF]";
};

const imageSize = {
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 34,
};

const avatar = cva(
  "relative flex items-center justify-center overflow-hidden rounded-full font-semibold uppercase",
  {
    variants: {
      size: {
        sm: ["h-[14px]", "w-[14px]", "text-[7px]"],
        md: ["h-[16px]", "w-[16px]", "text-[8px]"],
        lg: ["h-[18px]", "w-[18px]", "text-[9px]"],
        xl: ["h-[24px]", "w-[24px]", "text-[12px]"],
        xxl: ["h-[34px]", "w-[34px]", "text-[17px]"],
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatar> {
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
}

export default function Avatar({
  className,
  avatarUrl,
  firstName,
  lastName,
  size,
  ...props
}: AvatarProps) {
  if (firstName || lastName) {
    let initials = "";
    if (firstName) initials += firstName.trimStart()[0];
    if (lastName) initials += lastName.trimStart()[0];
    const backgroundColor = getBackroundColor(initials);

    return (
      <div
        className={cn(avatar({ size, className }), backgroundColor)}
        {...props}
      >
        {initials}
      </div>
    );
  }

  if (avatarUrl) {
    return (
      <div className={cn(avatar({ size, className }))} {...props}>
        <Image
          alt={
            firstName && lastName ? `${firstName} ${lastName}` : "User's Avatar"
          }
          src={avatarUrl}
          style={{ objectFit: "cover" }}
          height={size ? imageSize[size] : 34}
          width={size ? imageSize[size] : 34}
        />
      </div>
    );
  }

  return (
    <div className={cn(avatar({ size, className }))} {...props}>
      <Image
        alt={
          firstName && lastName ? `${firstName} ${lastName}` : "User's Avatar"
        }
        src="https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
        style={{ objectFit: "cover" }}
        height={size ? imageSize[size] : 34}
        width={size ? imageSize[size] : 34}
      />
    </div>
  );
}
