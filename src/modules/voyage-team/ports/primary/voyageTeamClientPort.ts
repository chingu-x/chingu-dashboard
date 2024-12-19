import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import { type GetCurrentVoyageTeamResponseDto } from "@/modules/voyage-team/application/dtos/response.dto";

export interface VoyageTeamClientPort {
  getCurrentVoyageTeam: (
    user: GetUserRequestDto,
  ) => GetCurrentVoyageTeamResponseDto | undefined;
}
