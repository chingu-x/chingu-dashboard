import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type AuthApiPort } from "@/modules/auth/ports/secondary/authApiPort";
import { type RequestPasswordResetDto } from "@/modules/auth/application/dtos/request.dto";

@injectable()
export class RequestPasswordResetUsecase {
  constructor(
    @inject(TYPES.AuthApiPort)
    private readonly authApi: AuthApiPort,
  ) {}

  async execute(props: RequestPasswordResetDto): Promise<void> {
    return await this.authApi.requestPasswordReset({ ...props });
  }
}
