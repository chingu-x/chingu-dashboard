import { redirect } from "next/navigation";
import ContributionCard from "./ContributionCard";
import CreateIdeationContainer from "./CreateIdeationContainer";
import FinalizedIdeationCard from "./FinalizedIdeationCard";
import IdeationContainer from "./IdeationContainer";
import IdeationProvider from "./IdeationProvider";
import VoteCard from "./VoteCard";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import ErrorComponent from "@/components/Error";

import { type IdeationData } from "@/store/features/ideation/ideationSlice";
import { CacheTag } from "@/utils/cacheTag";
import { getAccessToken } from "@/utils/getCookie";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { getUser } from "@/utils/getUser";
import { handleAsync } from "@/utils/handleAsync";
import { type AsyncActionResponse } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import routePaths from "@/utils/routePaths";
import { ErrorType } from "@/utils/error";
import { type FetchIdeationsProps } from "@/app/(main)/my-voyage/[teamId]/ideation/ideationService";

// import { ideation } from "./fixtures/ideation";

// If user is not logged in, nav should be updated to reflect signed out state
// and page should render error message.
// If user is logged in but not part of a team or try to access a past voyage, they should get redirected
// to dashboard page
export async function fetchProjectIdeas({
  teamId,
}: FetchIdeationsProps): Promise<AsyncActionResponse<IdeationData[]>> {
  const token = getAccessToken();

  const fetchProjectIdeasAsync = () =>
    GET<IdeationData[]>(
      `api/v1/voyages/teams/${teamId}/ideations`,
      token,
      "force-cache",
      CacheTag.ideation,
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

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchProjectIdeas,
  });

  if (errorResponse) {
    return (
      <ErrorComponent
        errorType={ErrorType.FETCH_VOYAGE_DATA}
        message={errorResponse}
      />
    );
  }

  if (data) {
    const [res, error] = data;

    if (error) {
      return (
        <ErrorComponent
          errorType={ErrorType.FETCH_IDEATIONS}
          message={error.message}
        />
      );
    }

    projectIdeas = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  function renderProjects() {
    const finalizedIdeation = projectIdeas.find(
      (project) => project.isSelected === true,
    );

    if (finalizedIdeation) {
      return (
        <IdeationContainer
          title={finalizedIdeation.title}
          project_idea={finalizedIdeation.description}
          vision_statement={finalizedIdeation.vision}
          isIdeationFinalized={true}
          firstChild={<FinalizedIdeationCard />}
          secondChild={
            <ContributionCard
              contributed_by={finalizedIdeation.contributedBy}
              isIdeationFinalized={true}
            />
          }
        />
      );
    }

    return (
      <>
        <CreateIdeationContainer />
        {!projectIdeas.length ? (
          <>
            <div className="my-20 flex h-[290px] w-full gap-x-48">
              <div className="flex flex-col justify-center">
                <h1 className="text-xl font-medium text-base-300">
                  Be the First to Share!
                </h1>
                <p className="my-4 text-base font-medium text-base-300">
                  It looks like no one has posted anything yet, but don’t worry,
                  you can be the first to create a new project idea and vision
                  for your team!
                </p>
                <p className="text-base font-medium text-base-300">
                  Click on the{" "}
                  <b className="text-base font-semibold text-base-300">
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
          </>
        ) : (
          projectIdeas.map((projectIdea) => (
            <IdeationContainer
              key={projectIdea.id}
              title={projectIdea.title}
              project_idea={projectIdea.description}
              vision_statement={projectIdea.vision}
              isIdeationFinalized={false}
              firstChild={
                <VoteCard
                  projectIdeaId={projectIdea.id}
                  users={projectIdea.projectIdeaVotes}
                />
              }
              secondChild={
                <ContributionCard
                  projectIdeaId={projectIdea.id}
                  contributed_by={projectIdea.contributedBy}
                  isIdeationFinalized={false}
                />
              }
            />
          ))
        )}
      </>
    );
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
        <IdeationProvider payload={projectIdeas} />
        {renderProjects()}
      </div>
    </>
  );
}
