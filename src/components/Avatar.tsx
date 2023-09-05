import Image from "next/image";

interface AvatarProps {
  image: string;
  width: number;
  height: number;
}

export default function Avatar({ image, width, height }: AvatarProps) {
  return (
    <div className="avatar rounded-full border border-base-content">
      <Image alt="avatar" src={image} width={width} height={height}></Image>
    </div>
  );
}
