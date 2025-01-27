import type { User } from "@chingu-x/modules/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { voyageTeamAdapter } from "@/utils/adapters";
import routePaths from "@/utils/routePaths";

interface UseCheckCurrentVoyageTeamProps {
  user: User;
  teamId: string;
}

export default function useCheckCurrentVoyageTeam({
  user,
  teamId,
}: UseCheckCurrentVoyageTeamProps) {
  const router = useRouter();

  useEffect(() => {
    const currentVoyageTeam = voyageTeamAdapter.isCurrentVoyageTeam({
      user,
      teamId,
    });

    if (!currentVoyageTeam) {
      router.push(routePaths.dashboardPage());
    }
  }, [router, teamId, user]);
}
