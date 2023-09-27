import Image from "next/image";

interface BannerProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

function Banner({ image, alt, title, description }: BannerProps) {
  return (
    <div className="card w-full max-h-[320px] bg-primary-content flex flex-row px-20 py-10 box-border">
      <Image src={image} alt={alt} width={454} height={200} priority={false} />
      <div className="flex flex-col justify-center pl-24 gap-y-3.5">
        <h3 className="text-3xl font-bold text-base-300">{title}</h3>
        <p className="text-lg font-medium text-base-300">{description}</p>
      </div>
    </div>
  );
}

export default Banner;
