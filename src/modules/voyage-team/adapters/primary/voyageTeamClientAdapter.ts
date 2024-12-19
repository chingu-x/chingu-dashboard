import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type VoyageTeamClientPort } from "@/modules/voyage-team/ports/primary/voyageTeamClientPort";
import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import { type GetCurrentVoyageTeamResponseDto } from "@/modules/voyage-team/application/dtos/response.dto";
import { GetCurrentVoyageTeamUsecase } from "@/modules/voyage-team/application/usecases/getCurrentVoyageTeamUsecase";

@injectable()
export class VoyageTeamClientAdapter implements VoyageTeamClientPort {
  constructor(
    @inject(TYPES.GetCurrentVoyageTeamUsecase)
    private readonly getCurrentVoyageTeamUsecase: GetCurrentVoyageTeamUsecase,
  ) {}

  getCurrentVoyageTeam(
    user: GetUserRequestDto,
  ): GetCurrentVoyageTeamResponseDto | undefined {
    return this.getCurrentVoyageTeamUsecase.execute(user);
  }
}
