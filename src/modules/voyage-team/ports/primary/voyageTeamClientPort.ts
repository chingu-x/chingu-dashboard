import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import type {
  GetCurrentVoyageTeamIdResponseDto,
  GetCurrentVoyageTeamResponseDto,
} from "@/modules/voyage-team/application/dtos/response.dto";

export interface VoyageTeamClientPort {
  getCurrentVoyageTeam: (
    user: GetUserRequestDto,
  ) => GetCurrentVoyageTeamResponseDto | undefined;
  getCurrentVoyageTeamId: (
    user: GetUserRequestDto,
  ) => GetCurrentVoyageTeamIdResponseDto | undefined;
}
