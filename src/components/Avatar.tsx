import Image, { StaticImageData } from "next/image";

interface AvatarProps {
  image?: string | StaticImageData;
  width: number;
  height: number;
}

export default function Avatar({
  image,
  width = 24,
  height = 24,
}: AvatarProps) {
  return (
    <div className="border border-1 border-neutral px-0 rounded-full cursor-pointer">
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
