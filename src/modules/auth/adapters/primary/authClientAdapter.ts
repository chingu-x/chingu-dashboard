import { inject, injectable } from "tsyringe";
import type {
  RequestPasswordResetDto,
  LoginRequestDto,
} from "@/modules/auth/application/dtos/request.dto";
import type {
  LogoutResponseDto,
  LoginResponseDto,
} from "@/modules/auth/application/dtos/response.dto";
import { type LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";
import { type LogoutUsecase } from "@/modules/auth/application/usecases/logoutUsecase";
import { type AuthClientPort } from "@/modules/auth/ports/primary/authClientPort";
import { TYPES } from "@/di/types";
import { type RequestPasswordResetUsecase } from "@/modules/auth/application/usecases/requestPasswordResetUsecase";

@injectable()
export class AuthClientAdapter implements AuthClientPort {
  constructor(
    @inject(TYPES.LoginUsecase)
    private readonly loginUsecase: LoginUsecase,

    @inject(TYPES.LogoutUsecase)
    private readonly logoutUsecase: LogoutUsecase,

    @inject(TYPES.RequestPasswordResetUsecase)
    private readonly requestPasswordResetUsecase: RequestPasswordResetUsecase,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.loginUsecase.execute({ email, password });
  }

  async logout(): Promise<LogoutResponseDto> {
    return await this.logoutUsecase.execute();
  }

  async requestPasswordReset({
    email,
  }: RequestPasswordResetDto): Promise<void> {
    return await this.requestPasswordResetUsecase.execute({ email });
  }
}
