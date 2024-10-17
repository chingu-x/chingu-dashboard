import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { type LoginRequestDto } from "@/modules/auth/application/dtos/request.dto";
import { type LoginResponseDto } from "@/modules/auth/application/dtos/response.dto";

@injectable()
export class LoginUsecase {
  constructor(
    @inject(TYPES.IdeationApiPort)
    private readonly authApi: AuthApiPort,
  ) {}

  async execute(props: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authApi.login({
      ...props,
    });
  }
}
