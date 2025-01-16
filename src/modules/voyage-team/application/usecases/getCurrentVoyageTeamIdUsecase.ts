import { injectable } from "tsyringe";
import { type GetCurrentVoyageTeamIdResponseDto } from "@/modules/voyage-team/application/dtos/response.dto";
import { type GetCurrentVoyageTeamIdRequestDto } from "@/modules/voyage-team/application/dtos/request.dto";

@injectable()
export class GetCurrentVoyageTeamIdUsecase {
  execute(
    currentVoyageTeam: GetCurrentVoyageTeamIdRequestDto | undefined,
  ): GetCurrentVoyageTeamIdResponseDto | undefined {
    return currentVoyageTeam?.voyageTeamId.toString();
  }
}
