import Image from "next/image";

interface BannerProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

function Banner({ image, alt, title, description }: BannerProps) {
  return (
    <div className="card w-full max-h-[320px] flex flex-row justify-between px-20 py-6 box-border gap-x-10 lg:gap-x-20">
      <div className="h-[200px] w-[276px] relative shrink-0">
        <Image
          src={image}
          alt={alt}
          fill={true}
          objectFit="contain"
          priority={false}
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
