import Banner from "@/components/banner/Banner";

export default function PreVoyageBanner() {
  return (
    <div className="flex w-full grow flex-col rounded-2xl bg-base-200 px-[80px] pb-6 pt-[70px]">
      <Banner
        imageLight="/img/pre_voyage_light.png"
        imageDark="/img/pre_voyage_dark.png"
        alt="Pre Voyage banner image"
        height="h-[437px]"
        width="w-full"
      />
      <p className="text-center text-[25px] font-semibold">Are you ready?</p>
      <p className="text-center text-base font-medium">
        Your Voyage starts on May 2, 2024.
      </p>
    </div>
  );
}
