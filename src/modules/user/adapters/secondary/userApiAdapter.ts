import { inject, injectable } from "tsyringe";
import { TYPES } from "@/di/types";
import { type RestApiPort } from "@/modules/restApi/ports/secondary/restApiPort";
import { type UserApiPort } from "@/modules/user/ports/secondary/userApiPort";
import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";
import UserUrls from "@/modules/user/application/constants/userUrls";

@injectable()
export class UserApiAdapter implements UserApiPort {
  constructor(
    @inject(TYPES.RestApiPort)
    private readonly apiClient: RestApiPort,
  ) {}

  async getUser(): Promise<GetUserResponseDto> {
    return await this.apiClient.get({
      url: UserUrls.getUser(),
    });
  }
}
