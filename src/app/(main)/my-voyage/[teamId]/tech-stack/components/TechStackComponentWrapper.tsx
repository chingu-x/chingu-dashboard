import { redirect } from "next/navigation";
import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import TechStackContainer from "./TechStackContainer";
import TechStackProvider from "./TechStackProvider";
import { getAccessToken } from "@/utils/getCookie";
import { CacheTag } from "@/utils/cacheTag";
import { handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { getUser } from "@/utils/getUser";
import type { TechStackData } from "@/store/features/techStack/techStackSlice";
import routePaths from "@/utils/routePaths";
import { ErrorType } from "@/utils/error";
import ErrorComponent from "@/components/Error";

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
          errorType={ErrorType.FETCH_TECH_STACK}
          message={error.message}
        />
      );
    }

    techStackData = res!;
  } else {
    redirect(routePaths.dashboardPage());
  }

  return (
    <>
      <BannerContainer
        title="Tech Stack"
        description="Alright, let's get down to business. We need to figure out which tech stack we're going to use to power this bad boy. Are you a JavaScript junkie, a Python pro, a Java genius, or a Ruby rockstar? Let's vote"
      >
        <Banner
          imageLight={
            <Image
              src="/img/tech_stack_banner_light.png"
              alt="Light tech stack banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/tech_stack_banner_dark.png"
              alt="Dark tech stack banner"
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
      <TechStackProvider payload={techStackData} />
      <TechStackContainer data={techStackData} />
    </>
  );
}
