import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type VoyageTeamClientPort } from "@/modules/voyage-team/ports/primary/voyageTeamClientPort";

@injectable()
export class VoyageTeamClientAdapter implements VoyageTeamClientPort {
  constructor(
    @inject(TYPES.GetCurrentVoyageTeamUsecase)
    private readonly getCurrentVoyageTeamUsecase: GetCurrentVoyageTeamUsecase,
  ) {}

  getCurrentVoyageTeam(
    user: GetUserRequestDto,
  ): GetCurrentVoyageTeamResponseDto {
    return this.getCurrentVoyageTeamUsecase.execute(user);
  }
}
