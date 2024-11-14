import { type GetUserResponseDto } from "@/modules/user/application/dtos/response.dto";

export interface UserApiPort {
  getUser: () => Promise<GetUserResponseDto>;
}
