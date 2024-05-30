import { redirect } from "next/navigation";
import TechStackContainer from "./TechStackContainer";
import TechStackProvider from "./TechStackProvider";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";
import { handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { getUser } from "@/utils/getUser";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";
import Banner from "@/components/banner/Banner";
import routePaths from "@/utils/routePaths";

interface FetchTechStackProps {
  teamId: number;
}
interface TechStackComponentWrapperProps {
  params: {
    teamId: string;
  };
}

export async function fetchTechStack({ teamId }: FetchTechStackProps) {
  const token = getAccessToken();

  const fetchTechStackAsync = () =>
    GET<TechStackData[]>(
      `api/v1/voyages/teams/${teamId}/techs`,
      token,
      "force-cache",
      CacheTag.techStack,
    );

  return await handleAsync(fetchTechStackAsync);
}

export default async function TechStackComponentWrapper({
  params,
}: TechStackComponentWrapperProps) {
  let techStackData: TechStackData[] = [];
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId },
    func: fetchTechStack,
  });

  if (errorResponse) {
    return errorResponse;
  }
  if (data) {
    const [res, error] = data;

    if (error) {
      return `Error: ${error.message}`;
    }

    techStackData = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <>
      <VoyagePageBannerContainer
        title="Tech Stack"
        description="Alright, let's get down to business. We need to figure out which tech stack we're going to use to power this bad boy. Are you a JavaScript junkie, a Python pro, a Java genius, or a Ruby rockstar? Let's vote"
      >
        <Banner
          imageLight="/img/tech_stack_banner_light.png"
          imageDark="/img/tech_stack_banner_dark.png"
          alt="teck_stack_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      <TechStackProvider payload={techStackData} />
      <TechStackContainer data={techStackData} />
    </>
  );
}
