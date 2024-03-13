import Banner from "@/components/banner/Banner";

export default function PreVoyageBanner() {
  return (
    <div className="bg-base-200 rounded-2xl flex flex-col flex-grow-1 w-full pt-[70px] pb-6 pl-[80px] pr-[80px]">
      <Banner
        imageLight="/img/pre_voyage_light.png"
        imageDark="/img/pre_voyage_dark.png"
        alt="Pre Voyage banner image"
        height="h-[437px]"
        width="w-full"
      />
      <p className="text-center text-[25px] font-semibold">Are you ready?</p>
      <p className="text-center text-base font-medium	">
        Your Voyage starts on May 2, 2024.
      </p>
    </div>
  );
}
