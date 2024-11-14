import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";
import { type UserApiPort } from "@/modules/user/ports/secondary/userApiPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";

@injectable()
export class UserApiAdapter implements UserApiPort {
  constructor(
    @inject(TYPES.RestApiPort)
    private readonly apiClient: RestApiPort,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.apiClient.post({
      url: AuthUrls.login,
      payload: { email, password },
    });
  }

  async logout(): Promise<LogoutResponseDto> {
    return await this.apiClient.post({
      url: AuthUrls.logout,
    });
  }

  async getUser(): Promise<GetUserResponseDto> {
    return await this.apiClient.get({});
  }
}
