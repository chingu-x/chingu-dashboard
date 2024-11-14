import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type UserClientPort } from "@/modules/user/ports/primary/userClientPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";
import { GetUserUsecase } from "@/modules/user/application/usecases/getUserUsecase";

@injectable()
export class UserClientAdapter implements UserClientPort {
  constructor(
    @inject(TYPES.GetUserUsecase)
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  async getUser(): Promise<GetUserResponseDto> {
    return await this.getUserUsecase.execute();
  }
}
