import { type VoyageTeamMember } from "./response.dto";
import { type User } from "@/modules/user/application/types";

export interface GetCurrentVoyageTeamIdRequestDto extends VoyageTeamMember {}
export interface HasVoyageStartedRequestDto {
  isAuthenticated: boolean;
  user: User;
}
