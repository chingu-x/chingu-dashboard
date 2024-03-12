import { redirect } from "next/navigation";
import ResourcesContainer from "./ResourcesContainer";
import { getUser } from "@/utils/getUser";
import { getAccessToken } from "@/utils/getCookie";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { VoyageTeamMember } from "@/store/features/user/userSlice";
import Banner from "@/components/banner/Banner";

interface fetchResourcesProps {
  teamId: number;
}
export async function fetchResources({ teamId }: fetchResourcesProps) {
  const token = getAccessToken();

  const fetchResourcesAsync = () =>
    GET(
      `api/v1/voyages/${teamId}/resources`,
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
interface ResourceType {
  id: number;
  teamMemberId: number;
  url: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  addedBy: { member: [Object] };
}
interface ResourceArray extends Array<ResourceType> {}

export default async function ResourcesComponentWrapper({
  params,
}: ResourcesComponentWrapperProps) {
  //TODO define ResourceArray type in Redux Store. See ideation example.
  let projectResources: ResourceArray = [];
  let currentVoyageTeam: VoyageTeamMember | undefined;

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active",
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  const teamId = currentVoyageTeam?.voyageTeamId && Number(params.teamId);
  //const teamId = null

  if (teamId) {
    const [res, error] = await fetchResources({ teamId });

    if (res) {
      projectResources = res as ResourceArray;
      console.log(res);
    } else {
      return `Error: ${error?.message}`;
    }
  } else {
    redirect("/");
  }

  return (
    <>
      <Banner
        imageLight="/img/resources_banner_light.png"
        imageDark="/img/resources_banner_dark.png"
        alt="resources_banner"
        title="Resources"
        description="This resources page is your secret weapon for this voyage! Take a look at what your team is sharing or share your own resources for this voyage. Go ahead and be the first to post a new resource for you and your peers!"
      />
      {/* 1.create and call Provider to update Redux with resources
       *  2.pass resources to ResourcesContainer (which is a client component 
          ... b/c of sorting Btn).
       */}
      <ResourcesContainer data={projectResources} />
    </>
  );
}
