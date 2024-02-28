import Banner from "@/components/banner/Banner";

export default function AuthBannerContainer() {
  return (
    <div className="flex min-h-[486px] flex-col justify-center">
      <Banner
        imageLight="/img/login_image_light.png"
        imageDark="/img/login_image_dark.png"
        height="[300px]"
        width="[628px]"
        alt="Login image"
      />

      <h3 className="text-primary-focus text-2xl text-center mt-[27px] font-semibold">
        Ready to dive in?
      </h3>
      <h2 className="text-primary text-3xl text-center font-semibold">
        Join Chingu today!
      </h2>
    </div>
  );
}
