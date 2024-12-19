import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import type {
  GetCurrentVoyageTeamIdResponseDto,
  GetCurrentVoyageTeamResponseDto,
  HasVoyageStartedResponseDto,
} from "@/modules/voyage-team/application/dtos/response.dto";
import { type HasVoyageStartedRequestDto } from "@/modules/voyage-team/application/dtos/request.dto";

export interface VoyageTeamClientPort {
  getCurrentVoyageTeam: (
    user: GetUserRequestDto,
  ) => GetCurrentVoyageTeamResponseDto | undefined;
  getCurrentVoyageTeamId: (
    user: GetUserRequestDto,
  ) => GetCurrentVoyageTeamIdResponseDto | undefined;
  hasVoyageStarted: ({
    isAuthenticated,
    user,
  }: HasVoyageStartedRequestDto) => HasVoyageStartedResponseDto;
}
