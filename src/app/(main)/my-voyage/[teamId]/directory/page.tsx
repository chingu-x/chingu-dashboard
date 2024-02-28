import TeamDirectory from "./components/TeamDirectory";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";

export default function DirectoryPage() {
  return (
    <>
      <VoyagePageBannerContainer
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      >
        <Banner
          imageLight="/img/directory_banner_light.png"
          imageDark="/img/directory_banner_dark.png"
          alt="directory_banner"
          height="[200px]"
          width="[276px]"
        />
      </VoyagePageBannerContainer>
      <TeamDirectory />
    </>
  );
}
