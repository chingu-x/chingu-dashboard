import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";

export default function EmptyBanner() {
  return (
    <div className="m-6 flex w-5/6 items-center">
      <div className="m-2 w-1/2 text-lg font-medium text-base-300">
        <h1 className="text-lg">Be The First to Share!</h1>
        <p className="text-sm">
          It looks like no one has posted anything yet, but don&apos;t worry,
          you can be the first to share your favorite and most valuable resource
          with your fellow Chingus!
          <br></br>
          <br></br>
          Click on the Add Resource button at the top to get started!
        </p>
      </div>
      <Banner
        imageLight={
          <Image
            src="/img/empty_resources_light.png"
            alt="Light desk"
            fill={true}
            sizes="500px"
            priority
            style={{ objectFit: "contain" }}
          />
        }
        imageDark={
          <Image
            src="/img/empty_resources_dark.png"
            alt="Dark desk"
            fill={true}
            sizes="500px"
            priority
            style={{ objectFit: "contain" }}
          />
        }
        height="h-[500px]"
        width="w-[500px]"
      />
    </div>
  );
}
