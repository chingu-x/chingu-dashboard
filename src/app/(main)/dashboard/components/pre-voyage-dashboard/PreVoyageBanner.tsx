import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";

export default function PreVoyageBanner() {
  return (
    <div className="flex w-full grow flex-col rounded-2xl bg-base-200 px-[80px] pb-6 pt-[70px]">
      <Banner
        imageLight={
          <Image
            src="/img/pre_voyage_light.png"
            alt="Pre Voyage light banner image"
            fill={true}
            sizes="w-full"
            priority
            style={{ objectFit: "contain" }}
          />
        }
        imageDark={
          <Image
            src="/img/pre_voyage_dark.png"
            alt="Pre Voyage dark banner image"
            fill={true}
            sizes="w-full"
            priority
            style={{ objectFit: "contain" }}
          />
        }
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
