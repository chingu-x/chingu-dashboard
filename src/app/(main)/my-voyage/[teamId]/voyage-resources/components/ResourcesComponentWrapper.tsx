import { redirect } from "next/navigation";
import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import ResourcesContainer from "./ResourcesContainer";
import ResourcesProvider from "./ResourcesProvider";
import { getUser } from "@/utils/getUser";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { handleAsync } from "@/utils/handleAsync";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import routePaths from "@/utils/routePaths";
import ErrorComponent from "@/components/Error";
import { ErrorType } from "@/utils/error";

interface FetchResourcesProps {
  teamId: number;
}

export async function fetchResources({ teamId }: FetchResourcesProps) {
  const token = getAccessToken();

  const fetchResourcesAsync = () =>
    GET<ResourceData[]>(
      `api/v1/voyages/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.resources,
    );

  return await handleAsync(fetchResourcesAsync);
}

interface ResourcesComponentWrapperProps {
  params: {
    teamId: string;
  };
}

export default async function ResourcesComponentWrapper({
  params,
}: ResourcesComponentWrapperProps) {
  let projectResources: ResourceData[] = [];
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchResources,
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
          errorType={ErrorType.FETCH_RESOURCES}
          message={error.message}
        />
      );
    }

    projectResources = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <>
      <BannerContainer
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      >
        <Banner
          imageLight={
            <Image
              src="/img/resources_banner_light.png"
              alt="Light resources banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/resources_banner_dark.png"
              alt="Dark resources banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          height="h-[200px]"
          width="w-[276px]"
        />
      </BannerContainer>
      <ResourcesProvider payload={projectResources} />
      <ResourcesContainer data={projectResources} />
    </>
  );
}
