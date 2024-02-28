import React from "react";
import Image from "next/image";

function PreVoyageBanner() {
  return (
    <div className="bg-base-200 rounded-2xl flex flex-col flex-grow-1 w-full pt-[70px] pb-6 pl-[80px] pr-[80px]">
      <div
        data-hide-on-theme="dark"
        className="flex h-[437px] w-full relative shrink-0"
      >
        <Image
          src="/img/pre_voyage_light.png"
          alt="Light pre Voyage image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <div
        data-hide-on-theme="light"
        className="flex h-[437px] w-full relative shrink-0"
      >
        <Image
          src="/img/pre_voyage_dark.png"
          alt="Light pre Voyage image"
          fill={true}
          style={{ objectFit: "contain" }}
          priority={true}
        />
      </div>
      <p className="text-center text-[25px] font-semibold">Are you ready?</p>
      <p className="text-center text-base font-medium	">
        Your Voyage starts on May 2, 2024.
      </p>
    </div>
  );
}

export default PreVoyageBanner;
