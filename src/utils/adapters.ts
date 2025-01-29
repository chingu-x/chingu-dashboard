import { resolve } from "@chingu-x/modules/resolver";
import { TYPES } from "@chingu-x/modules/di-types";
import type { AuthClientAdapter } from "@chingu-x/modules/auth";
import type { UserClientAdapter } from "@chingu-x/modules/user";
import type { VoyageTeamClientAdapter } from "@chingu-x/modules/voyage-team";
import type { MyTeamClientAdapter } from "@chingu-x/modules/my-team";
import type { SprintsClientAdapter } from "@chingu-x/modules/sprints";
import type { SprintMeetingClientAdapter } from "@chingu-x/modules/sprint-meeting";

export const authAdapter = resolve<AuthClientAdapter>(TYPES.AuthClientAdapter);

export const userAdapter = resolve<UserClientAdapter>(TYPES.UserClientAdapter);

export const voyageTeamAdapter = resolve<VoyageTeamClientAdapter>(
  TYPES.VoyageTeamClientAdapter,
);

export const myTeamAdapter = resolve<MyTeamClientAdapter>(
  TYPES.MyTeamClientAdapter,
);

export const sprintsAdapter = resolve<SprintsClientAdapter>(
  TYPES.SprintsClientAdapter,
);

export const sprintMeetingAdapter = resolve<SprintMeetingClientAdapter>(
  TYPES.SprintMeetingClientAdapter,
);
