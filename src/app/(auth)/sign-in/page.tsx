"use client";

import Image from "next/image";

export default function Component() {
  return (
    <div className="flex items-center">
      <div className="flex min-h-[486px] flex-col justify-center">
        <div
          data-hide-on-theme="dark"
          className="h-[300px] max-w-[628px] relative shrink-0"
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
          className="h-[300px] max-w-[628px] relative shrink-0"
        >
          <Image
            src="/img/login_image_dark.png"
            alt="Dark login image"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <h3 className="text-primary-focus text-2xl text-center mt-[27px]">
          Ready to dive in?
        </h3>
        <h2 className="text-primary text-3xl text-center">
          Join Chingu today!
        </h2>
      </div>
      <div className="w-[403px] h-[652px] bg-base-200 rounded-2xl"></div>
    </div>
  );
}
