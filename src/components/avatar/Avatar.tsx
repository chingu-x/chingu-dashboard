import Image, { type StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

interface AvatarProps {
  image?: string | StaticImageData;
  firstName?: string;
  lastName?: string;
  customClassName?: string;
  width: number;
  height: number;
}

export default function Avatar({
  image,
  firstName,
  lastName,
  customClassName,
  width = 24,
  height = 24,
}: AvatarProps) {
  console.log(width);
  console.log(height);

  return (
    <div
      className={cn(
        `w-[${width}px] h-[${height}px] flex items-center justify-center overflow-hidden rounded-full bg-[#FE6AA6]`,
        customClassName,
      )}
    >
      <span className="font-semibold uppercase">jw</span>
    </div>
  );

  if (image) {
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
            image ??
            "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-avatar-placeholder-png-image_3416697.jpg"
          }
          width={width}
          height={height}
        />
      </div>
    );
  }

  if (firstName && lastName) {
    return (
      <div
        className={cn(
          "shrink-1 cursor-pointer overflow-hidden rounded-full border border-red-400 px-0",
          customClassName,
        )}
      >
        <div className={`w-[${width}px] h-[${height}px]`}>
          <span>jw</span>
        </div>
      </div>
    );
  }
}
