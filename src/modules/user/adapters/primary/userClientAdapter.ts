import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type UserClientPort } from "@/modules/user/ports/primary/userClientPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";

@injectable()
export class UserClientAdapter implements UserClientPort {
  constructor(
    @inject(TYPES.LoginUsecase)
    private readonly loginUsecase: LoginUsecase,

    @inject(TYPES.LogoutUsecase)
    private readonly logoutUsecase: LogoutUsecase,

    @inject(TYPES.GetUserUsecase)
    private readonly getUserUsecase: GetUserUsecase,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.loginUsecase.execute({ email, password });
  }

  async logout(): Promise<LogoutResponseDto> {
    return await this.logoutUsecase.execute();
  }

  async getUser(): Promise<GetUserResponseDto> {
    return await this.getUserUsecase.execute();
  }
}
