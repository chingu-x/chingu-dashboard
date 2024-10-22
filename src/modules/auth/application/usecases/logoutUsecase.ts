import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { type LogoutResponseDto } from "@/modules/auth/application/dtos/response.dto";

@injectable()
export class LogoutUsecase {
  constructor(
    @inject(TYPES.AuthApiPort)
    private readonly authApi: AuthApiPort,
  ) {}

  async execute(): Promise<LogoutResponseDto> {
    return await this.authApi.logout();
  }
}
