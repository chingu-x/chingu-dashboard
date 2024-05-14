import { redirect } from "next/navigation";
import ResourcesContainer from "./ResourcesContainer";
import ResourcesProvider from "./ResourcesProvider";
import { getUser } from "@/utils/getUser";
import { type ResourceData } from "@/store/features/resources/resourcesSlice";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { handleAsync } from "@/utils/handleAsync";
import Banner from "@/components/banner/Banner";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";

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
    return errorResponse;
  }
  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    projectResources = res!;
  } else {
    redirect("/dashboard");
  }

  return (
    <>
      <VoyagePageBannerContainer
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      >
        <Banner
          imageLight="/img/resources_banner_light.png"
          imageDark="/img/resources_banner_dark.png"
          alt="resources_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      <ResourcesProvider payload={projectResources} />
      <ResourcesContainer data={projectResources} />
    </>
  );
}
