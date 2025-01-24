import { type User } from "@chingu-x/modules/user";

export function getSprintCheckinIsStatus(
  user: User | null,
  sprintNum: number,
): boolean {
  if (user) {
    return !!user.sprintCheckIn.find(
      (sprintNumber) => sprintNumber === sprintNum,
    );
  } else {
    return false;
  }
}
export function getVoyageProjectStatus(
  user: User | null,
  teamId: number,
): boolean {
  if (user) {
    const currentVoyage = user.voyageTeamMembers.find(
      (voyage) => voyage.voyageTeamId === teamId,
    );

    if (currentVoyage) {
      return currentVoyage.voyageTeam.projectSubmitted;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
