import { BannerContainer } from "@chingu-x/components/banner-container";
import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import DirectoryComponentWrapper from "./components/DirectoryComponentWrapper";

interface DirectoryPageProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryPage({ params }: DirectoryPageProps) {
  return (
    <>
      <BannerContainer
        title="My Team"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      >
        <Banner
          imageLight={
            <Image
              src="/img/directory_banner_light.png"
              alt="Light directory banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/directory_banner_dark.png"
              alt="Dark directory banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[200px]"
          width="w-[276px]"
        />
      </BannerContainer>
      <DirectoryComponentWrapper params={params} />
    </>
  );
}
