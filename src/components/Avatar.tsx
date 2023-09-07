import Image from "next/image";

interface AvatarProps {
  imgPath?: string;
  width?: number;
  height?: number;
}

export default function Avatar({
  imgPath = "/grey_ball.png",
  width = 24,
  height = 24,
}: AvatarProps) {
  return (
    <div className="px-0 pointer-events-none">
      <Image width={width} height={height} src={imgPath} alt="Profile image" />
    </div>
  );
}
