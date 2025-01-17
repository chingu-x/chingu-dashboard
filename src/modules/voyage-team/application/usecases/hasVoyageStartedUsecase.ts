import { inject, injectable } from "tsyringe";
import { type HasVoyageStartedRequestDto } from "@/modules/voyage-team/application/dtos/request.dto";
import { type HasVoyageStartedResponseDto } from "@/modules/voyage-team/application/dtos/response.dto";
import { TYPES } from "@/di/types";
import { GetChinguMemberStatusUsecase } from "@/modules/user/application/usecases/getChinguMemberStatusUsecase";

@injectable()
export class HasVoyageStartedUsecase {
  constructor(
    @inject(TYPES.GetChinguMemberStatusUsecase)
    private readonly getChinguMemberStatusUsecase: GetChinguMemberStatusUsecase,
  ) {}
  execute({
    isAuthenticated,
    user,
  }: HasVoyageStartedRequestDto): HasVoyageStartedResponseDto {
    const activeChingu = this.getChinguMemberStatusUsecase.execute(user);
    return isAuthenticated && activeChingu;
  }
}
