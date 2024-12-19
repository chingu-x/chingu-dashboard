import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type VoyageTeamClientPort } from "@/modules/voyage-team/ports/primary/voyageTeamClientPort";
import { type GetUserRequestDto } from "@/modules/user/application/dtos/request.dtos";
import type {
  GetCurrentVoyageTeamIdResponseDto,
  GetCurrentVoyageTeamResponseDto,
  HasVoyageStartedResponseDto,
} from "@/modules/voyage-team/application/dtos/response.dto";
import { GetCurrentVoyageTeamUsecase } from "@/modules/voyage-team/application/usecases/getCurrentVoyageTeamUsecase";
import { type GetCurrentVoyageTeamIdUsecase } from "@/modules/voyage-team/application/usecases/getCurrentVoyageTeamIdUsecase";
import { type HasVoyageStartedRequestDto } from "@/modules/voyage-team/application/dtos/request.dto";
import { HasVoyageStartedUsecase } from "@/modules/voyage-team/application/usecases/hasVoyageStartedUsecase";

@injectable()
export class VoyageTeamClientAdapter implements VoyageTeamClientPort {
  constructor(
    @inject(TYPES.GetCurrentVoyageTeamUsecase)
    private readonly getCurrentVoyageTeamUsecase: GetCurrentVoyageTeamUsecase,

    @inject(TYPES.GetCurrentVoyageTeamIdUsecase)
    private readonly getCurrentVoyageTeamIdUsecase: GetCurrentVoyageTeamIdUsecase,

    @inject(TYPES.HasVoyageStartedUsecase)
    private readonly hasVoyageStartedUsecase: HasVoyageStartedUsecase,
  ) {}

  getCurrentVoyageTeam(
    user: GetUserRequestDto,
  ): GetCurrentVoyageTeamResponseDto | undefined {
    return this.getCurrentVoyageTeamUsecase.execute(user);
  }

  getCurrentVoyageTeamId(
    user: GetUserRequestDto,
  ): GetCurrentVoyageTeamIdResponseDto | undefined {
    const currentVoyageTeam = this.getCurrentVoyageTeam(user);
    return this.getCurrentVoyageTeamIdUsecase.execute(currentVoyageTeam);
  }

  hasVoyageStarted({
    isAuthenticated,
    user,
  }: HasVoyageStartedRequestDto): HasVoyageStartedResponseDto {
    return this.hasVoyageStartedUsecase.execute({ isAuthenticated, user });
  }
}
