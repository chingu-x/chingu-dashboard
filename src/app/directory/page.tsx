import { getMembers } from "@/api/routes";
import TeamDirectory from "./components/TeamDirectory";
import { TeamMember } from "./components/fixtures/MyTeam";
import Banner from "@/components/banner/Banner";

async function DirectoryPage() {
  // Get current user logic. For now assume we get current user's object which has user's id and team's id back from some api call, or cookie or etc
  const currentUser = {
    id: "b52046f9-db9c-4373-950a-ce8c861307ab",
    teamId: 9,
  };

  // Get data on the server
  const data = (await getMembers(currentUser.teamId)) as TeamMember[];
  console.log(data);

  return (
    <>
      <Banner
        imageLight="/img/directory_banner_light.png"
        imageDark="/img/directory_banner_dark.png"
        alt="directory_banner"
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      />
      <TeamDirectory members={data} currentUser={currentUser} />
    </>
  );
}

export default DirectoryPage;
