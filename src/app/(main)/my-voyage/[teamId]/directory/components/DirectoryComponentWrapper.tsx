import { redirect } from "next/navigation";

import { Banner } from "@chingu-x/components/banner";
import Image from "next/image";
import { BannerContainer } from "@chingu-x/components/banner-container";
import DirectoryProvider from "./DirectoryProvider";
import TeamMember from "./TeamMember";

import ErrorComponent from "@/components/Error";

import { type TeamDirectory } from "@/store/features/directory/directorySlice";

import { getAccessToken } from "@/utils/getCookie";
import { type AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { type User } from "@/store/features/user/userSlice";
import { getUser } from "@/utils/getUser";
import { getTimezone } from "@/utils/getTimezone";
import { getCurrentVoyageData } from "@/utils/getCurrentVoyageData";
import { ErrorType } from "@/utils/error";

interface FetchTeamDirectoryProps {
  teamId: number;
  user: User | null;
}

export async function fetchTeamDirectory({
  teamId,
  user,
}: FetchTeamDirectoryProps): Promise<AsyncActionResponse<TeamDirectory>> {
  const token = getAccessToken();

  const fetchTeamDirectoryAsync = () =>
    GET<TeamDirectory>(
      `api/v1/teams/${teamId}`,
      token,
      "force-cache",
      CacheTag.directory,
    );

  const [res, error] = await handleAsync(fetchTeamDirectoryAsync);

  if (res) {
    updateDirectoryWithCurrentTime(res);
    const teamMembers = res.voyageTeamMembers;
    const userDiscordId = user?.oAuthProfiles.find(
      (profile) => profile.provider.name === "discord",
    )?.providerUsername;
    const elementToSort = teamMembers.find(
      (element) =>
        element.member.oAuthProfiles.find(
          (profile) => profile.provider.name === "discord",
        )?.providerUsername === userDiscordId,
    );

    moveElementToFirst(teamMembers, elementToSort);
  }

  return [res, error];
}

function updateDirectoryWithCurrentTime(data: TeamDirectory) {
  return data.voyageTeamMembers.forEach((teamMember) => {
    const { timezone } = teamMember.member;
    const currentTime = getTimezone(timezone);
    teamMember.member.currentTime = currentTime;
  });
}

function moveElementToFirst<T>(arr: T[], element: T): T[] {
  const index = arr.indexOf(element);
  if (index === -1) {
    return arr;
  }
  [arr[index], arr[0]] = [arr[0], arr[index]];
  return arr;
}

interface TeamDirectoryProps {
  params: {
    teamId: string;
  };
}

export default async function DirectoryComponentWrapper({
  params,
}: TeamDirectoryProps) {
  let teamDirectory: TeamDirectory;
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  const { errorResponse, data } = await getCurrentVoyageData({
    user,
    error,
    teamId,
    args: { teamId, user },
    func: fetchTeamDirectory,
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
          errorType={ErrorType.FETCH_TEAM_DIRECTORY}
          message={error.message}
        />
      );
    }

    teamDirectory = res!;
  } else {
    redirect("/");
  }

  return (
    <>
      <BannerContainer
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      >
        <Banner
          imageLight={
            <Image
              src="/img/directory_banner_light.png"
              alt="Light directory banner"
              fill={true}
              sizes="276px"
              priority
              style={{ objectFit: "contain" }}
            />
          }
          imageDark={
            <Image
              src="/img/directory_banner_dark.png"
              alt="Dark directory banner"
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
      <DirectoryProvider payload={teamDirectory} />
      {/* For screens > 1920px */}
      <div className="flex w-full flex-col gap-y-10 rounded-2xl border border-transparent bg-transparent p-10 pb-4 text-base-300 3xl:gap-y-0 3xl:bg-base-200">
        {/* header - table only */}
        <div className="mb-6 hidden items-center text-xl font-semibold text-base-300 3xl:grid 3xl:grid-cols-5">
          <h2>Name</h2>
          <h2>Discord ID</h2>
          <h2>Time Zone</h2>
          <h2>Position</h2>
          <h2>Average Hour/Sprint</h2>
        </div>
        {/* data */}
        {teamDirectory.voyageTeamMembers.map((teamMember) => (
          <TeamMember key={teamMember.id} teamMember={teamMember} />
        ))}
      </div>
    </>
  );
}
