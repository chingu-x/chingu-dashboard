import Image from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps {
  image?: string;
  customClassName?: string;
  width: number;
  height: number;
}

export default function Avatar({
  image,
  customClassName,
  width = 24,
  height = 24,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "shrink-1 cursor-pointer overflow-hidden rounded-full border border-neutral px-0",
        customClassName,
      )}
    >
      <Image
        alt="avatar"
        src={
          image
            ? `${image}&v=1.2`
            : "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
        }
        width={width}
        height={height}
      />
    </div>
  );
}
