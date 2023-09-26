import { TeamTable, TeamCardsContainer } from ".";
import { Banner } from "@/components";

function DirectoryPage() {
  return (
    <>
      <Banner
        image="/img/directory_banner.png"
        alt="directory_banner"
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      />
      {/* For screens > 1920px */}
      <TeamTable />
      {/* For screens < 1920px */}
      <TeamCardsContainer />
    </>
  );
}

export default DirectoryPage;
