import Banner from "@/components/banner/Banner";

export default function AuthBannerContainer() {
  return (
    <div className="flex h-[486px] flex-col justify-center">
      <div>
        <Banner
          imageLight="/img/login_image_light.png"
          imageDark="/img/login_image_dark.png"
          height="h-[300px]"
          width="w-[628px]"
          alt="Login image"
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
