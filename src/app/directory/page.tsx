import TeamDirectory from "./components/TeamDirectory";
import BannerWrapper from "@/components/banner/BannerWrapper";

function DirectoryPage() {
  return (
    <>
      <BannerWrapper
        imageLight="/img/directory_banner_light.png"
        imageDark="/img/directory_banner_dark.png"
        alt="directory_banner"
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      />
      <TeamDirectory />
    </>
  );
}

export default DirectoryPage;
