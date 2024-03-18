import { redirect } from "next/navigation";
import DirectoryProvider from "./DirectoryProvider";
import TeamMember from "./TeamMember";
import { TeamDirectory } from "@/store/features/directory/directorySlice";
import Banner from "@/components/banner/Banner";
import { getAccessToken } from "@/utils/getCookie";
import { AsyncActionResponse, handleAsync } from "@/utils/handleAsync";
import { GET } from "@/utils/requests";
import { CacheTag } from "@/utils/cacheTag";
import { User, VoyageTeamMember } from "@/store/features/user/userSlice";
import { getUser } from "@/utils/getUser";
import { getTimezone } from "@/utils/getTimezone";
import VoyagePageBannerContainer from "@/components/banner/VoyagePageBannerContainer";

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
      CacheTag.directory
    );

  const [res, error] = await handleAsync(fetchTeamDirectoryAsync);

  if (res) {
    updateDirectoryWithCurrentTime(res);
    const teamMember = res.voyageTeamMembers;
    const elementToSort = teamMember.find(
      (element) => element.member.discordId === user?.discordId
    );
    moveElementToFirst(teamMember, elementToSort);
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
  let currentVoyageTeam: VoyageTeamMember | undefined;
  const teamId = Number(params.teamId);

  const [user, error] = await getUser();

  if (user) {
    currentVoyageTeam = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeam.voyage.status.name === "Active"
    );
  }

  if (error) {
    return `Error: ${error?.message}`;
  }

  if (teamId === currentVoyageTeam?.voyageTeamId) {
    const [res, error] = await fetchTeamDirectory({ teamId, user });

    if (res) {
      teamDirectory = res;
    } else {
      return `Error: ${error?.message}`;
    }
  } else {
    redirect("/");
  }

  return (
    <>
      <VoyagePageBannerContainer
        title="Directory"
        description="Behold, your mighty band of teammates! If you want them to plan with precision and prowess, make sure your deets are up to date, or else prepare for some serious spreadsheet confusion!"
      >
        <Banner
          imageLight="/img/directory_banner_light.png"
          imageDark="/img/directory_banner_dark.png"
          alt="directory_banner"
          height="h-[200px]"
          width="w-[276px]"
        />
      </VoyagePageBannerContainer>
      <DirectoryProvider payload={teamDirectory} />
      {/* For screens > 1920px */}
      <div className="flex flex-col w-full p-10 pb-4 bg-transparent border border-transparent border-base-100 rounded-2xl 3xl:bg-base-200 text-base-300 gap-y-10 3xl:gap-y-0">
        {/* header - table only */}
        <div className="items-center hidden mb-6 text-xl font-semibold text-base-300 3xl:grid 3xl:grid-cols-5">
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
