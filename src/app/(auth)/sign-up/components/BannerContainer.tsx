import Image from "next/image";

function BannerContainer() {
  return (
    <div className="flex min-h-[486px] flex-col justify-center">
      <div
        data-hide-on-theme="dark"
        className="h-[300px] w-[628px] relative shrink-0"
      >
        <Image
          src="/img/login_image_light.png"
          alt="Light login image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="h-[300px] w-[628px] relative shrink-0"
      >
        <Image
          src="/img/login_image_dark.png"
          alt="Dark login image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <h3 className="text-primary-focus text-2xl text-center mt-[27px] font-semibold">
        Ready to dive in?
      </h3>
      <h2 className="text-primary text-3xl text-center font-semibold">
        Join Chingu today!
      </h2>
    </div>
  );
}

export default BannerContainer;
