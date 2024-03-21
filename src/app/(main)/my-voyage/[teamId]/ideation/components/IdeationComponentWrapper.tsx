import { redirect } from "next/navigation";
import IdeationContainer from "./IdeationContainer";
import IdeationProvider from "./IdeationProvider";
import CreateIdeationContainer from "./CreateIdeationContainer";
import { FetchIdeationsProps } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";
import { IdeationData } from "@/store/features/ideation/ideationSlice";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import Banner from "@/components/banner/Banner";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { CacheTag } from "@/utils/cacheTag";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
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
      CacheTag.ideation
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
  let projectIdeas: IdeationData[] = [];
  const teamId = Number(params.teamId);

  const { errorResponse, data, shouldRedirect } = await getCurrentVoyageData({
    teamId,
    args: { teamId },
    func: fetchProjectIdeas,
  });

  if (errorResponse) {
    return errorResponse;
  }

  if (shouldRedirect) {
    redirect("/");
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    projectIdeas = res!;
  }

  function renderProjects() {
    if (projectIdeas.length === 0) {
      return (
        <div className="flex w-full mt-20 h-[290px] gap-x-48">
          <div className="flex flex-col justify-center">
            <h1 className="text-base-300 font-medium text-xl">
              Be the First to Share!
            </h1>
            <p className="text-base-300 font-medium text-base my-4">
              It looks like no one has posted anything yet, but don’t worry, you
              can be the first to create a new project idea and vision for your
              team!
            </p>
            <p className="text-base-300 font-medium text-base">
              Click on the{" "}
              <b className="text-base-300 font-semibold text-base">
                Add Project Idea
              </b>{" "}
              button at the top to get started!
            </p>
          </div>
          <Banner
            imageLight="/img/empty_ideation_light.png"
            imageDark="/img/empty_ideation_dark.png"
            alt="ideation_banner"
            height="h-[290px]"
            width="w-[540px]"
          />
        </div>
      );
    }

    return projectIdeas.map((projectIdea) => (
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
    ));
  }

  return (
    <>
      <VoyagePageBannerContainer
        title="Ideation"
        description="Okay, time to put on your thinking caps and channel your inner
          creativity! What kind of amazing, mind-blowing project idea do you
          have that will make SpaceX jealous? Let's hear it!"
      >
        <Banner
          imageLight="/img/ideation_banner_light.png"
          imageDark="/img/ideation_banner_dark.png"
          alt="ideation_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      <div className="flex flex-col items-center gap-y-10">
        <CreateIdeationContainer />
        <IdeationProvider payload={projectIdeas} />
        {renderProjects()}
      </div>
    </>
  );
}
