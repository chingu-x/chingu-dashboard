"use client";

import React from "react";
import dynamic from "next/dynamic";
import rocketLight from "@/public/lotties/rocket_light.json";
import rocketDark from "@/public/lotties/rocket_dark.json";
import confetti from "@/public/lotties/confetti.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function VoyageSubmittedMessage() {
  return (
    <div className="grid w-full gris-rows-2 lg:grid-cols-[1fr_300px] gap-x-10 pt-[96px] px-8 xl:px-[80px]">
      <div className="flex flex-col py-10 gap-y-4 text-base-300 max-w-[650px] order-2 lg:order-1">
        <h3 className="text-[30px] font-bold">Congratulations!</h3>
        <p className="text-lg font-medium">
          Big high-fives and a virtual standing ovation for completing your
          voyage!
          <br />
          <br />
          We&apos;ll review your team&apos;s project and will create and email
          Completion Certificates soon. Stay tuned to the Vnn-announcements
          channel in Discord where we will post status updates on this.
          <br />
          <br />
          Keep celebrating your achievements by sharing your project in the
          Discord community and updating your portfolio.
        </p>
      </div>
      <div className="relative flex items-center justify-center order-1 w-full h-full lg:order-2">
        <Lottie
          animationData={rocketLight}
          loop={true}
          data-hide-on-theme="dark"
        />
        <Lottie
          animationData={rocketDark}
          loop={true}
          data-hide-on-theme="light"
        />
        <div className="absolute top-0 left-0 w-full h-full">
          <Lottie animationData={confetti} loop={false} />
        </div>
      </div>
    </div>
  );
}
