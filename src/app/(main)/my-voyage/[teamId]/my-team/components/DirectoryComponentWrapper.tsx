"use client";

import "reflect-metadata";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import TeamMember from "./TeamMember";
import { fetchTeamDirectory } from "@/store/features/my-team/myTeam";
import { CacheTag } from "@/utils/cacheTag";
import { useAppDispatch, useMyTeam, useUser } from "@/store/hooks";
import { myTeamAdapter } from "@/utils/adapters";
import Spinner from "@/components/Spinner";
import useCheckCurrentVoyageTeam from "@/hooks/useCheckCurrentVoyageTeam";
import ErrorComponent from "@/components/Error";
import { ErrorType } from "@/utils/error";

interface TeamDirectoryProps {
  params: {
    teamId: string;
  };
}

export default function DirectoryComponentWrapper({
  params,
}: TeamDirectoryProps) {
  const user = useUser();
  const myTeam = useMyTeam();
  const dispatch = useAppDispatch();
  const { teamId } = params;

  const { isPending, isError, error, data } = useQuery({
    queryKey: [CacheTag.myTeam, { teamId, user: `${user.id}` }],
    queryFn: () => getMyTeamQuery(),
  });

  async function getMyTeamQuery() {
    return await myTeamAdapter.getMyTeam({ teamId, user });
  }

  useCheckCurrentVoyageTeam({ user, teamId });

  useEffect(() => {
    if (data) {
      dispatch(fetchTeamDirectory(data));
    }
  }, [data, dispatch]);

  if (isError) {
    <ErrorComponent
      errorType={ErrorType.FETCH_MY_TEAM}
      message={error.message}
    />;
  }

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
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
        {myTeam.voyageTeamMembers.map((teamMember) => (
          <TeamMember key={teamMember.id} teamMember={teamMember} />
        ))}
      </div>
    </>
  );
}
