import Image, { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps {
  image?: string | StaticImageData;
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
        "border border-1 border-neutral px-0 rounded-full cursor-pointer overflow-hidden shrink-0",
        customClassName,
      )}
    >
      <Image
        alt="avatar"
        src={
          image ??
          "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
        }
        width={width}
        height={height}
      />
    </div>
  );
}
