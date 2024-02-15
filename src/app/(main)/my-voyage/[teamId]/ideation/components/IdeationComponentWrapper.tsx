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
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
// import { ideation } from "./fixtures/ideation";

// If user is not logged in, nav should be updated to reflect signed out state
// and page should render error message.
// If user is logged in but not part of a team, they should get redirected
// to dashboard page
export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<AsyncActionResponse<IdeationData[]>> {
  const token = getAccessToken();

  const fetchProjectIdeasAsync = () =>
    GET<IdeationData[]>(
      `api/v1/voyages/${teamId}/ideations`,
      token,
      "force-cache",
    );

  return await handleAsync(fetchProjectIdeasAsync);
}

interface IdeationComponentWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function IdeationComponentWrapper({
  params,
}: IdeationComponentWrapperProps) {
  let projectIdeas: IdeationData[] | null;
  let currentVoyageTeam;

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    return (
      <>
        <Preloader payload={[]} error={error.message} />
        {`Error: ${error.message}`}
      </>
    );
  }

  const teamId = currentVoyageTeam?.voyageTeamId && +params.teamId;

  if (teamId) {
    const [res, error] = await fetchProjectIdeas({ teamId });

    if (res) {
      projectIdeas = res;
    }

    if (error) {
      return <>{`Error: ${error.message}`}</>;
    }
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
        <Preloader payload={projectIdeas!} />
        {projectIdeas!.map((projectIdea) => (
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
