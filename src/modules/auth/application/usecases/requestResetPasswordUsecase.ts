import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { type RequestResetPasswordDto } from "@/modules/auth/application/dtos/request.dto";

@injectable()
export class RequestResetPasswordUsecase {
  constructor(
    @inject(TYPES.AuthApiPort)
    private readonly authApi: AuthApiPort,
  ) {}

  async execute(props: RequestResetPasswordDto): Promise<void> {
    return await this.authApi.requestResetPassword({ ...props });
  }
}
