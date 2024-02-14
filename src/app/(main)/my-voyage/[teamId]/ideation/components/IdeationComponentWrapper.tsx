import { redirect } from "next/navigation";
import IdeationContainer from "./IdeationContainer";
import Preloader from "./Preloader";
import CreateIdeationContainer from "./CreateIdeationContainer";
import { getUser } from "@/utils/getUser";
import { FetchIdeationsProps } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import Banner from "@/components/banner/Banner";
// import { ideation } from "./fixtures/ideation";

// If user is not logged in, nav should be updated to reflect signed out state
// and page should render error message.
// If user is logged in but not part of a team, they should get redirected
// to dashboard page
export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<IdeationData[]> {
  const token = getAccessToken();
  return await GET<IdeationData[]>(
    `api/v1/voyages/${teamId}/ideations`,
    token,
    "force-cache"
  );
}

export default async function IdeationComponentWrapper() {
  let projectIdeas = [] as IdeationData[];
  let currentVoyageTeam;

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (error) {
    return (
      <>
        <Preloader payload={projectIdeas} error={error.message} />
        {`Error: ${error.message}`}
      </>
    );
  }

  const teamId = currentVoyageTeam?.voyageTeamId;

  if (teamId) {
    projectIdeas = await fetchProjectIdeas({ teamId });
  } else {
    redirect("/");
  }

  // todo: add image when project ideas is empty
  // todo: adjust styles (colors)

  return (
    <>
      <Banner
        imageLight="/img/ideation_banner_light.png"
        imageDark="/img/ideation_banner_dark.png"
        alt="ideation_banner"
        title="Ideation"
        description="Okay, time to put on your thinking caps and channel your inner creativity! What kind of amazing, mind-blowing project idea do you have that will make SpaceX jealous? Let's hear it!"
      />
      <div className="flex flex-col items-center gap-y-10">
        <CreateIdeationContainer />
        <Preloader payload={projectIdeas} />
        {projectIdeas.map((projectIdea) => (
          <IdeationContainer
            key={projectIdea.id}
            projectIdeaId={projectIdea.id}
            title={projectIdea.title}
            project_idea={projectIdea.description}
            vision_statement={projectIdea.vision}
            users={projectIdea.projectIdeaVotes}
            contributed_by={projectIdea.contributedBy}
            teamId={teamId}
          />
        ))}
      </div>
    </>
  );
}
