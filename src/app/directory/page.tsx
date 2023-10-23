import TeamDirectory from "./components/TeamDirectory";
import { TeamMember } from "./components/fixtures/MyTeam";
import Banner from "@/components/banner/Banner";

async function getMembers(teamId: number) {
  // Get team members
  // TODO: need team members ids in the res
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}teams/${teamId}/members`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function DirectoryPage() {
  // Get current user logic. For now assume we get current user's object which has user's id and team's id back from some api call, or cookie or etc
  const currentUser = {
    id: "",
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
