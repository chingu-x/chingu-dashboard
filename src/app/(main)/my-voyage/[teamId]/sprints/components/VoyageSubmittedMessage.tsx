"use client";

import React from "react";
import dynamic from "next/dynamic";
import rocketLight from "@/public/lotties/rocket_light.json";
import rocketDark from "@/public/lotties/rocket_dark.json";
import confetti from "@/public/lotties/confetti.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function VoyageSubmittedMessage() {
  return (
    <div className="gris-rows-2 grid w-full gap-x-10 px-8 pt-[96px] lg:grid-cols-[1fr_300px] xl:px-[80px]">
      <div className="order-2 flex max-w-[650px] flex-col gap-y-4 py-10 text-base-300 lg:order-1">
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
      <div className="relative order-1 flex h-full w-full items-center justify-center lg:order-2">
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
        <div className="absolute left-0 top-0 h-full w-full">
          <Lottie animationData={confetti} loop={false} />
        </div>
      </div>
    </div>
  );
}
