import { resolve } from "@chingu-x/modules/resolver";
import { TYPES } from "@chingu-x/modules/di-types";
import { type AuthClientAdapter } from "@chingu-x/modules/auth";
import { type UserClientAdapter } from "@chingu-x/modules/user";

export const authAdapter = resolve<AuthClientAdapter>(TYPES.AuthClientAdapter);
export const userAdapter = resolve<UserClientAdapter>(TYPES.UserClientAdapter);
