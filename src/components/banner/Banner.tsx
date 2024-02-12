import Image from "next/image";

interface BannerProps {
  imageLight: string;
  imageDark: string;
  alt: string;
  title: string;
  description: string;
}

function Banner({
  imageLight,
  imageDark,
  alt,
  title,
  description,
}: BannerProps) {
  return (
    <div className="card w-full max-h-[320px] flex flex-row justify-between px-20 box-border gap-x-10 lg:gap-x-20">
      <div
        data-hide-on-theme="dark"
        className="h-[200px] w-[276px] relative shrink-0"
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
        className="h-[200px] w-[276px] relative shrink-0"
      >
        <Image
          src={imageDark}
          alt={alt}
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div className="flex flex-col max-w-[700px] 2xl:max-w-none justify-center gap-y-3.5">
        <h3 className="text-3xl font-bold text-base-300">{title}</h3>
        <p className="text-lg font-medium text-base-300">{description}</p>
      </div>
    </div>
  );
}

export default Banner;
