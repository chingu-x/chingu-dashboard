import { inject, injectable } from "tsyringe";
import { type LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { type LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";
import { LoginUsecase } from "@/modules/auth/application/usecases/loginUsecase";
import { type AuthClientPort } from "@/modules/auth/ports/primary/authClientPort";
import { TYPES } from "@/di/types";

@injectable()
export class AuthClientAdapter implements AuthClientPort {
  constructor(
    @inject(TYPES.LoginUsecase)
    private readonly loginUsecase: LoginUsecase,
  ) {}

  async login({ email, password }: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.loginUsecase.execute({ email, password });
  }
}
