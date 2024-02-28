import Image from "next/image";

interface BannerProps {
  imageLight: string;
  imageDark: string;
  alt: string;
  height: string;
  width: string;
}

function Banner({ imageLight, imageDark, alt, height, width }: BannerProps) {
  return (
    <>
      <div
        data-hide-on-theme="dark"
        className={`h-[${height}px] w-[${width}px] relative shrink-0`}
      >
        <Image
          src={imageLight}
          alt={alt}
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className={`h-[${height}px] w-[${width}px] relative shrink-0`}
      >
        <Image
          src={imageDark}
          alt={alt}
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
    </>
  );
}

export default Banner;
