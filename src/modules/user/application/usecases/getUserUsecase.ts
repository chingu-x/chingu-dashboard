import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type UserApiPort } from "@/modules/user/ports/secondary/userApiPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";

@injectable()
export class GetUserUsecase {
  constructor(
    @inject(TYPES.UserApiPort)
    private readonly userApi: UserApiPort,
  ) {}

  async execute(): Promise<GetUserResponseDto> {
    return await this.userApi.getUser();
  }
}
