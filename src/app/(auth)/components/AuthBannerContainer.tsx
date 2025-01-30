import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";

export default function AuthBannerContainer() {
  return (
    <div className="flex h-[486px] flex-col justify-center">
      <div>
        <Banner
          imageLight={
            <Image
              src="/img/login_image_light.png"
              alt="Login light image"
              fill={true}
              sizes="628px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/login_image_dark.png"
              alt="Login dark image"
              fill={true}
              sizes="628px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[300px]"
          width="w-[628px]"
        />
      </div>

      <h3 className="mt-[27px] text-center text-2xl font-semibold text-primary-focus">
        Ready to dive in?
      </h3>
      <h2 className="text-center text-3xl font-semibold text-primary">
        Join Chingu today!
      </h2>
    </div>
  );
}
