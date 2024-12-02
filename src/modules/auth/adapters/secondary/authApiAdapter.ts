import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";
import type {
  RequestResetPasswordDto,
  LoginRequestDto,
} from "@/modules/auth/application/dtos/request.dto";
import type {
  LogoutResponseDto,
  LoginResponseDto,
} from "@/modules/auth/application/dtos/response.dto";
import AuthUrls from "@/modules/auth/application/constants/authUrls";

@injectable()
export class AuthApiAdapter implements AuthApiPort {
  constructor(
    @inject(TYPES.RestApiPort)
    private readonly apiClient: RestApiPort,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.apiClient.post({
      url: AuthUrls.login(),
      payload: { email, password },
    });
  }

  async logout(): Promise<LogoutResponseDto> {
    return await this.apiClient.post({
      url: AuthUrls.logout(),
    });
  }

  async requestResetPassword({
    email,
  }: RequestResetPasswordDto): Promise<void> {
    return await this.apiClient.post({
      url: AuthUrls.requestResetPassword(),
      payload: { email },
    });
  }
}
