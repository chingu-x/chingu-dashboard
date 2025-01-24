import { resolve } from "@chingu-x/modules/resolver";
import { TYPES } from "@chingu-x/modules/di-types";
import { type AuthClientAdapter } from "@chingu-x/modules/auth";
import { type UserClientAdapter } from "@chingu-x/modules/user";
import { type VoyageTeamClientAdapter } from "@chingu-x/modules/voyage-team";

export const authAdapter = resolve<AuthClientAdapter>(TYPES.AuthClientAdapter);
export const userAdapter = resolve<UserClientAdapter>(TYPES.UserClientAdapter);
export const voyageTeamAdapter = resolve<VoyageTeamClientAdapter>(
  TYPES.VoyageTeamClientAdapter,
);
