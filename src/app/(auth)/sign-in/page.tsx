"use client";

import Image from "next/image";

export default function Component() {

  return (
    <div className="flex items-center">
      <div className="flex min-h-[486px] flex-col justify-center">
        <div
          data-hide-on-theme="dark"
          className="h-[200px] w-[628px] w-full relative shrink-0"
        >
          <Image
            src="/img/login_image_light.png"
            alt="prova"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <div
          data-hide-on-theme="light"
          className="h-[200px] w-[628px] w-full relative shrink-0"
        >
          <Image
            src="/img/login_image_dark.png"
            alt="prova"
            fill={true}
            style={{ objectFit: "contain" }}
            priority={true}
          />
        </div>
        <h3 className="text-base-300 text-center mt-[27px]">Ready to dive in?</h3>
        <h2 className="text-base-300 text-center">Join Chingu today!</h2>
      </div>
      <div className="w-[403px] h-[652px] w-full bg-base-200"></div>
    </div>
  );
}
