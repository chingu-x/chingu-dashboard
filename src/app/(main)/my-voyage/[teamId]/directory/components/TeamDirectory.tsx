import TeamCardsContainer from "./TeamCardsContainer";
import TeamTable from "./TeamTable";
import Banner from "@/components/banner/Banner";

interface TeamDirectoryProps {
  params: {
    teamId: string;
  };
}

export default function TeamDirectory({ params }: TeamDirectoryProps) {
  const teamDirectory: IdeationData[] = [];
  let currentVoyageTeam: VoyageTeamMember | undefined;

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  const teamId = currentVoyageTeam?.voyageTeamId && +params.teamId;

  if (teamId) {
    const [res, error] = await fetchProjectIdeas({ teamId });

    if (res) {
      projectIdeas = res;
    } else {
      return `Error: ${error?.message}`;
    }
  } else {
    redirect("/");
  }

  return (
    <>
      <Banner
        imageLight="/img/directory_banner_light.png"
        imageDark="/img/directory_banner_dark.png"
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
